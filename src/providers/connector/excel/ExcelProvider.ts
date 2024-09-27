import { Injectable, NotFoundException } from "@nestjs/common";
import * as Excel from "exceljs";
import { v4 } from "uuid";

import { IExcel } from "@wrtn/connector-api/lib/structures/connector/excel/IExcel";

import axios from "axios";
import { AwsProvider } from "../aws/AwsProvider";

@Injectable()
export class ExcelProvider {
  constructor(private readonly awsProvider: AwsProvider) {}
  async readSheets(
    input: IExcel.IGetWorksheetListInput,
  ): Promise<IExcel.IWorksheetListOutput> {
    try {
      const { fileUrl } = input;
      const buffer = await this.awsProvider.getObject(fileUrl); // AWS Provider를 사용해 S3에서 파일 읽기

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

  getExcelData(input: {
    workbook: Excel.Workbook;
    sheetName?: string | null;
  }): IExcel.IReadExcelOutput {
    try {
      const sheet = input.workbook.getWorksheet(input.sheetName ?? 1);
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

      return { headers, data: result };
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async readHeaders(input: IExcel.IReadExcelInput): Promise<string[]> {
    const { fileUrl, sheetName } = input;
    const workbook = await this.getExcelFile({ fileUrl });
    return this.readExcelHeaders(workbook, sheetName);
  }

  private readExcelHeaders(
    workbook: Excel.Workbook,
    sheetName?: string | null,
  ): string[] {
    const worksheet = workbook.getWorksheet(sheetName ?? 1);
    const headerRow = worksheet?.getRow(1); // 첫 번째 행이 헤더라고 가정

    // 헤더 데이터를 배열로 추출
    const headers: string[] = [];
    headerRow?.eachCell((cell) => {
      headers.push(cell.value as string); // 각 셀의 값을 문자열로 변환하여 배열에 추가
    });

    return headers;
  }

  async insertRows(
    input: IExcel.IInsertExcelRowInput,
  ): Promise<IExcel.IExportExcelFileOutput> {
    try {
      const { sheetName, data, fileUrl } = input;
      const workbook = await this.getExcelFile({ fileUrl });
      if (
        typeof sheetName === "string" &&
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

      const headers = Object.keys(
        data.reduce((acc, cur) => ({ ...acc, ...cur })),
      );

      if (!fileUrl) {
        // 수정이 아닌 경우에만 저장하게끔 수정
        sheet.addRow(headers);
      } else {
        // 수정인 경우, 하지만 빈 엑셀 파일인 경우
        const originalData = this.getExcelData({ sheetName, workbook });
        if (originalData.data.length === 0) {
          sheet.addRow(headers);
        }
      }

      data.forEach((rowData: Record<string, any>) => {
        const data: string[] = [];
        headers.forEach((header: string) => {
          data.push(rowData[header] ?? "");
        });
        sheet.addRow(data);
      });

      const modifiedBuffer = await workbook.xlsx.writeBuffer();
      const key = `excel-connector/${v4()}`;
      const url = await this.awsProvider.uploadObject({
        key,
        data: Buffer.from(modifiedBuffer),
        contentType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      return {
        fileUrl: url,
      };
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async getExcelFile(input: { fileUrl?: string }): Promise<Excel.Workbook> {
    if (input.fileUrl) {
      const response = await axios.get(input.fileUrl, {
        responseType: "arraybuffer",
      });

      // 워크북 로드
      return new Excel.Workbook().xlsx.load(response.data);
    }
    return new Excel.Workbook();
  }

  async createSheets(
    input: IExcel.ICreateSheetInput,
  ): Promise<IExcel.IExportExcelFileOutput> {
    const workbook = new Excel.Workbook();
    workbook.addWorksheet(input.sheetName ?? "Sheet1");

    const modifiedBuffer: ArrayBuffer = await workbook.xlsx.writeBuffer();
    const key = `excel-connector/${v4()}`;
    const fileUrl = await this.awsProvider.uploadObject({
      key,
      data: Buffer.from(modifiedBuffer),
      contentType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    return {
      fileUrl: fileUrl,
    };
  }
}
