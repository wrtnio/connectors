import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { NotFoundException } from "@nestjs/common";
import * as Excel from "exceljs";
import { v4 } from "uuid";

import { IExcel } from "@wrtn/connector-api/lib/structures/connector/excel/IExcel";

import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { AwsProvider } from "../aws/AwsProvider";
import axios from "axios";

export namespace ExcelProvider {
  export const region = "ap-northeast-2";
  export const accessKeyId = ConnectorGlobal.env.AWS_ACCESS_KEY_ID;
  export const secretAccessKey = ConnectorGlobal.env.AWS_SECRET_ACCESS_KEY;
  export const bucket = ConnectorGlobal.env.AWS_S3_BUCKET;
  export const uploadPrefix = "excel-connector";

  /**
   * @todo excel 쪽 S3 부분 AWS Provider를 주입하여 분리할 것
   */
  export const s3: S3Client = new S3Client({
    region: ExcelProvider.region,
    maxAttempts: 3,
    credentials: {
      accessKeyId: ExcelProvider.accessKeyId,
      secretAccessKey: ExcelProvider.secretAccessKey,
    },
  });

  export async function readSheets(
    input: IExcel.IGetWorksheetListInput,
  ): Promise<IExcel.IWorksheetListOutput> {
    try {
      const { fileUrl } = input;

      const { bucket, key } = AwsProvider.extractS3InfoFromUrl(fileUrl);
      const command = new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      });

      const { Body } = await ExcelProvider.s3.send(command);

      if (!Body) {
        throw new NotFoundException("Not existing excel file");
      }
      const chunks = [];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      for await (const chunk of Body) {
        chunks.push(chunk);
      }
      const buffer = Buffer.concat(chunks);

      const workbook = new Excel.Workbook();
      await workbook.xlsx.load(buffer);

      const result: { id: number; sheetName: string }[] = [];
      workbook.eachSheet((sheet, id) => {
        result.push({
          id,
          sheetName: sheet.name,
        });
      });

      return { data: result };
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function getExcelData(
    input: IExcel.IReadExcelInput,
  ): Promise<IExcel.IReadExcelOutput> {
    try {
      const { fileUrl, sheetName } = input;
      const { bucket, key } = AwsProvider.extractS3InfoFromUrl(fileUrl);
      const command = new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      });

      const { Body } = await ExcelProvider.s3.send(command);

      if (!Body) {
        throw new NotFoundException("Not existing excel file");
      }

      const chunks = [];

      for await (const chunk of Body) {
        chunks.push(chunk);
      }

      const buffer = Buffer.concat(chunks);

      const workbook = new Excel.Workbook();
      await workbook.xlsx.load(buffer);

      const sheet = workbook.getWorksheet(sheetName ?? 1);
      if (!sheet) {
        throw new NotFoundException("Not existing sheet");
      }

      const result: Record<string, string>[] = [];
      let headers: string[] = [];

      sheet.eachRow(
        { includeEmpty: false },
        (row: Excel.Row, rowNumber: number) => {
          if (rowNumber === 1) {
            headers = row.values as string[];
            headers.shift(); // 첫 번째 요소(undefined)를 제거합니다.
          } else {
            const rowData: Record<string, string> = {};
            // headers 배열을 기반으로 각 열에 대해 순회합니다.
            headers.forEach((header: string, index: number) => {
              // +1을 하는 이유는 headers에서 첫 번째 undefined 값을 제거했기 때문
              // @TODO type definition
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              const value = row.values[index + 1];

              rowData[header] = value ?? "";
            });
            result.push(rowData);
          }
        },
      );

      return { data: result };
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function insertRows(
    input: IExcel.IInsertExcelRowInput,
  ): Promise<IExcel.IExportExcelFileOutput> {
    try {
      const { sheetName, data, fileUrl } = input;
      const workbook = await getExcelFile({ fileUrl });
      if (
        workbook.worksheets.every((worksheet) => worksheet.name !== sheetName)
      ) {
        // 아직까지 워크 시트가 만들어진 적이 없다면 우선 생성한다.
        workbook.addWorksheet(sheetName ?? "Sheet1");
      }

      // 0번 인덱스는 우리가 생성한 적 없는 시트이므로 패스한다.
      const CREATED_SHEET = 1 as const;
      const sheet = workbook.getWorksheet(sheetName ?? CREATED_SHEET);
      if (!sheet) {
        throw new NotFoundException("Not existing sheet");
      }

      // 모든 데이터의 key를 추출하여 header로 사용합니다.
      const headers = Object.keys(
        data.reduce((curr, acc) => ({ ...acc, ...curr })),
      );
      sheet.addRow(headers);

      data.forEach((rowData: Record<string, any>) => {
        const data: string[] = [];
        headers.forEach((header: string) => {
          data.push(rowData[header] ?? "");
        });
        sheet.addRow(data);
      });

      const modifiedBuffer = await workbook.xlsx.writeBuffer();
      const buffer = Buffer.from(modifiedBuffer);
      const key = `${ExcelProvider.uploadPrefix}/${v4()}`;

      return await upsertFile({ Key: key, Body: buffer });
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  export async function getExcelFile(input: {
    fileUrl?: string;
  }): Promise<Excel.Workbook> {
    if (input.fileUrl) {
      const response = await axios.get(input.fileUrl, {
        responseType: "arraybuffer",
      });

      // 워크북 로드
      return new Excel.Workbook().xlsx.load(response.data);
    }
    return new Excel.Workbook();
  }

  export async function createSheets(
    input: IExcel.ICreateSheetInput,
  ): Promise<IExcel.IExportExcelFileOutput> {
    const workbook = new Excel.Workbook();
    workbook.addWorksheet(input.sheetName ?? "Sheet1");

    const modifiedBuffer: ArrayBuffer = await workbook.xlsx.writeBuffer();
    const buffer = Buffer.from(modifiedBuffer);
    const key = `${ExcelProvider.uploadPrefix}/${v4()}`;

    return await upsertFile({ Key: key, Body: buffer });
  }

  export async function upsertFile(input: {
    Key: string;
    Body: Buffer;
  }): Promise<IExcel.IExportExcelFileOutput> {
    const ContentType = `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`;
    const uploadCommand = new PutObjectCommand({
      Bucket: ExcelProvider.bucket,
      Key: input.Key,
      Body: input.Body,
      ContentType,
    });

    await ExcelProvider.s3.send(uploadCommand);
    const fileUrl = `https://${ExcelProvider.bucket}.s3.amazonaws.com/${input.Key}`;
    return { fileUrl };
  }
}
