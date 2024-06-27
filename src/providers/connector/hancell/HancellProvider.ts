import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import axios from "axios";
import { v4 } from "uuid";
import xlsx from "xlsx";

import { IHancell } from "@wrtn/connector-api/lib/structures/connector/hancell/IHancell";

import { ConnectorGlobal } from "../../../ConnectorGlobal";

@Injectable()
export class HancellProvider {
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

  async insertRows(
    input: IHancell.IInsertRowsInput,
  ): Promise<IHancell.IInsertRowsOutput> {
    const workbook = await this.getWorkboot(input);
    const sheet = workbook.Sheets[input.sheetName];

    if (workbook.SheetNames.includes(input.sheetName)) {
      workbook.SheetNames = workbook.SheetNames.filter(
        (name) => name !== input.sheetName,
      );
    }

    Object.entries(input.cells).forEach(([key, value]) => {
      sheet[key] = {
        t: typeof value === "number" ? "n" : "s",
        v: value,
        w: String(value),
      };
    });

    xlsx.utils.book_append_sheet(workbook, sheet, input.sheetName);
    const buffer = xlsx.write(workbook, { bookType: "xlsx", type: "buffer" });

    if (sheet["!ref"]) {
      /**
       * @todo 범위를 넘어선 수정이 있을 수 있기 때문에 시트 범위 조정 필요
       */
      const [from, to] = sheet["!ref"]?.split(":");
    }

    const key = `${this.uploadPrefix}/${v4()}`;
    const uploadCommand = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: buffer,
      ContentType: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`, // ContentType 지정
    });

    await this.s3.send(uploadCommand);

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
}
