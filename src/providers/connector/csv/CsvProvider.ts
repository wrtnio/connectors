import { parse } from "csv-parse/sync";
import ExcelJS from "exceljs";
import * as csv from "fast-csv";
import * as streamBuffers from "stream-buffers";
import { WritableStreamBuffer } from "stream-buffers";

import { ICsv } from "@wrtn/connector-api/lib/structures/connector/csv/ICsv";

import { Injectable } from "@nestjs/common";
import { Readable } from "stream";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { AwsProvider } from "../aws/AwsProvider";

@Injectable()
export class CsvProvider {
  constructor(private readonly awsProvider: AwsProvider) {}

  async read(input: ICsv.IReadInput): Promise<ICsv.IReadOutput> {
    try {
      const { s3Url, delimiter } = input;
      const match = s3Url.match(AwsProvider.S3BucketURL);

      const body: string = await (async (): Promise<string> => {
        if (match) {
          return (await AwsProvider.getObject(match[0])).toString("utf-8");
        } else {
          const response: Response = await fetch(s3Url);
          return response.text();
        }
      })();
      const res = parse(body, {
        columns: true,
        delimiter: delimiter,
        relaxColumnCount: true,
      });

      return { data: res };
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async write(input: ICsv.IWriteInput): Promise<ICsv.IWriteOutput> {
    const { values, fileName, delimiter } = input;
    let existValues = [];
    try {
      const response =
        (await this.awsProvider.getObjectByFileName(fileName)).toString(
          "utf-8",
        ) || "";
      existValues = parse(response, {
        columns: true,
        delimiter: delimiter,
      });
    } catch (err: unknown) {
      if ((err as any).code !== "NoSuchKey") {
        console.error("Error reading file:", err);
        throw err;
      }
    }

    const insertValues = [...existValues, ...values];

    const csvBuffer = new streamBuffers.WritableStreamBuffer();
    await new Promise<void>((resolve, reject) =>
      csv
        .write(insertValues, { headers: true, delimiter: delimiter })
        .pipe(csvBuffer)
        .on("finish", async function () {
          try {
            const bufferContent = csvBuffer.getContents() || Buffer.from("");

            await AwsProvider.uploadObject({
              key: fileName,
              data: bufferContent,
              contentType: "text/csv",
            });
            resolve();
          } catch (err) {
            console.error("Error uploading file:", err);
            reject(err);
          }
        }),
    );
    // TODO: override bucket
    return {
      s3Url: `https://${ConnectorGlobal.env.AWS_S3_BUCKET}.s3.amazonaws.com/${fileName}`,
    };
  }

  async convertCsvToExcel(
    input: ICsv.ICsvToExcelInput,
  ): Promise<ICsv.ICsvToExcelOutput> {
    const { s3Url, delimiter } = input;
    const match = s3Url.match(AwsProvider.S3BucketURL);
    if (!match) throw new Error("Invalid S3 URL");

    const fileName = match[3];
    const s3Buffer = await this.awsProvider.getObjectByFileName(fileName);

    // Buffer를 스트림으로 변환
    const s3Stream = new Readable();
    s3Stream.push(s3Buffer);
    s3Stream.push(null); // 스트림의 끝을 나타냄

    const buffer = new WritableStreamBuffer();
    const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({ stream: buffer });
    const worksheet = workbook.addWorksheet("Sheet1");
    let headers;

    const key = `${fileName.split(".").slice(0, -1).join(".")}.xlsx`;

    await new Promise<void>((resolve, reject) => {
      try {
        s3Stream
          .pipe(csv.parse({ headers: true, delimiter: delimiter }))
          .on("headers", (receivedHeaders: string[]) => {
            headers = receivedHeaders;
            worksheet.columns = headers.map((header: string) => ({
              header,
              key: header,
            }));
          })
          .on("data", (row: { [key: string]: string }) => {
            worksheet.addRow(row).commit();
          })
          .on("end", async () => {
            await workbook.commit();

            const uploadParams = {
              key: key,
              data: buffer.getContents() || Buffer.from(""), // 버퍼 내용이 없을 경우 빈 버퍼 처리
              contentType:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            };
            await AwsProvider.uploadObject(uploadParams);
            resolve();
          });
      } catch (err) {
        reject(err);
      }
    });
    return {
      url: `https://${ConnectorGlobal.env.AWS_S3_BUCKET}.s3.ap-northeast-2.amazonaws.com/${key}`,
    };
  }
}
