import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import * as Excel from "exceljs";
import { v4 } from "uuid";

import { IExcel } from "@wrtn/connector-api/lib/structures/connector/excel/IExcel";

import { ConnectorGlobal } from "../../../ConnectorGlobal";

@Injectable()
export class ExcelProvider {
  private readonly s3: S3Client;
  private readonly region = "ap-northeast-2";
  private readonly accessKeyId = ConnectorGlobal.env.AWS_ACCESS_KEY_ID;
  private readonly secretAccessKey = ConnectorGlobal.env.AWS_SECRET_ACCESS_KEY;
  private readonly bucket = ConnectorGlobal.env.AWS_S3_BUCKET;
  private readonly uploadPrefix = "excel-connector";

  constructor() {
    this.s3 = new S3Client({
      region: this.region,
      maxAttempts: 3,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
      },
    });
  }

  async readSheets(
    input: IExcel.IGetWorksheetListInput,
  ): Promise<IExcel.IWorksheetListOutput> {
    const { fileUrl } = input;

    const { bucket, key } = this.extractS3InfoFromUrl(fileUrl);

    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    const { Body } = await this.s3.send(command);

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
  }

  async getExcelData(
    input: IExcel.IReadExcelInput,
  ): Promise<IExcel.IReadExcelOutput> {
    const { fileUrl, sheetName } = input;
    const { bucket, key } = this.extractS3InfoFromUrl(fileUrl);
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    const { Body } = await this.s3.send(command);

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
  }

  async insertRows(
    input: IExcel.IInsertExcelRowInput,
  ): Promise<IExcel.IInsertExcelRowOutput> {
    const { sheetName, data } = input;
    const workbook = new Excel.Workbook();
    workbook.addWorksheet(sheetName ?? "Sheet1");

    const sheet = workbook.getWorksheet(sheetName ?? 1);
    if (!sheet) {
      throw new NotFoundException("Not existing sheet");
    }

    // 모든 데이터의 key를 추출하여 header로 사용합니다.
    const headers = Object.keys(
      data.reduce((curr, acc) => ({ ...acc, ...curr })),
    );
    sheet.addRow(headers);

    data.forEach((rowData: any) => {
      const data: string[] = [];
      headers.forEach((header: string) => {
        data.push(rowData[header] ?? "");
      });
      sheet.addRow(data);
    });

    const modifiedBuffer = await workbook.xlsx.writeBuffer();

    const key = `${this.uploadPrefix}/${v4()}`;

    const uploadCommand = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Body: modifiedBuffer,
      ContentType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // ContentType 지정
    });

    await this.s3.send(uploadCommand);

    return { fileUrl: `https://${this.bucket}.s3.amazonaws.com/${key}` };
  }

  private extractS3InfoFromUrl(url: string): { bucket: string; key: string } {
    try {
      const match = url.match(
        /https?:\/\/([^.]+)\.s3(?:\.([^.]+))?\.amazonaws\.com\/(.+)/,
      );
      if (!match) {
        throw new BadRequestException("Invalid S3 URL");
      }

      const bucket = match[1];
      const key = match[3];

      return { bucket, key };
    } catch (error) {
      console.error("Invalid URL:", error);
      throw new BadRequestException("Invalid S3 URL");
    }
  }
}
