import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import axios from "axios";
import { v4 } from "uuid";
import xlsx from "xlsx";

import { IHancell } from "@wrtn/connector-api/lib/structures/connector/hancell/IHancell";

import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { AwsProvider } from "../aws/AwsProvider";

@Injectable()
export class HancellProvider {
  constructor(private readonly awsProvider: AwsProvider) {}

  private readonly region = "ap-northeast-2";
  private readonly accessKeyId = ConnectorGlobal.env.AWS_ACCESS_KEY_ID;
  private readonly secretAccessKey = ConnectorGlobal.env.AWS_SECRET_ACCESS_KEY;
  private readonly bucket = ConnectorGlobal.env.AWS_S3_BUCKET;
  private readonly uploadPrefix = "hancell-connector";

  private readonly s3: S3Client = new S3Client({
    region: this.region,
    maxAttempts: 3,
    credentials: {
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
    },
  });

  async upsertSheet(
    input: IHancell.IUpsertSheetInput,
  ): Promise<IHancell.IUpsertSheetOutput> {
    const workbook = await this.getWorkboot(input);
    const sheet = workbook.Sheets[input.sheetName];

    /**
     * 이미 시트가 존재할 경우 해당 시트를 지우고 셀 정보를 대치한다.
     */
    if (workbook.SheetNames.includes(input.sheetName)) {
      workbook.SheetNames = workbook.SheetNames.filter(
        (name) => name !== input.sheetName,
      );
    }

    const updatedSheet = this.insertCells(sheet, input.cells);

    xlsx.utils.book_append_sheet(workbook, updatedSheet, input.sheetName);
    const buffer = xlsx.write(workbook, { bookType: "xlsx", type: "buffer" });

    const key = `${this.uploadPrefix}/${v4()}`;
    const contentType = `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`;
    await this.awsProvider.uploadObject({ key, data: buffer, contentType });

    return { fileUrl: `https://${this.bucket}.s3.amazonaws.com/${key}` };
  }

  async getHancellData(
    input: IHancell.IReadHancellInput,
  ): Promise<IHancell.IReadHancellOutput> {
    const workbook = await this.getWorkboot(input);

    const data = Object.entries(workbook.Sheets)
      .map(([sheetName, sheet]) => {
        const cells = Object.entries(sheet)
          .filter(([key]) => {
            const cellReferenceRegex = /^[A-Z]+[1-9][0-9]*$/;
            return cellReferenceRegex.test(key);
          })
          .map(([key, value]: [string, { v: any }]) => {
            return { [key]: value.v };
          })
          .reduce<Record<string, any>>((acc, cur) => {
            return Object.assign(acc, cur);
          }, {});

        return { [sheetName]: cells };
      })
      .reduce((acc, cur) => {
        return Object.assign(acc, cur);
      }, {});

    return data;
  }

  private async getWorkboot(input: IHancell.IReadHancellInput) {
    const response = await axios.get(input.fileUrl, {
      responseType: "arraybuffer",
    });

    const file = response.data;
    const workbook = xlsx.read(file, { type: "buffer" });

    return workbook;
  }

  /**
   * 시트의 각 셀에 데이터를 덮어씁니다.
   *
   * @param sheet 시트
   * @param cells 시트에 덮어쓰기 할 셀 정보
   * @returns 인자로 받은 `sheet`를 덮어 쓴 결과물
   */
  insertCells(sheet: xlsx.WorkSheet, cells: IHancell.Cells) {
    Object.entries(cells).forEach(([key, value]) => {
      sheet[key] = {
        t: typeof value === "number" ? "n" : "s",
        v: value,
        w: String(value),
      };
    });

    /**
     * sheet의 범위 밖에 글을 쓰려는 경우, 필요한 최소한의 영역으로 시트 범위를 확장합니다.
     */
    if (sheet["!ref"]) {
      const original = xlsx.utils.decode_range(sheet["!ref"]);
      Object.entries(cells)
        .map(([key]) => xlsx.utils.decode_cell(key))
        .forEach((newRange) => {
          original.s.r = Math.min(original.s.r, newRange.r);
          original.s.c = Math.min(original.s.c, newRange.c);

          original.e.r = Math.max(original.e.r, newRange.r);
          original.e.c = Math.max(original.e.c, newRange.c);
        });

      sheet["!ref"] = xlsx.utils.encode_range(original);
    }

    return sheet;
  }
}
