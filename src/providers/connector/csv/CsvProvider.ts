import * as AWS from "aws-sdk";
import { parse } from "csv-parse/sync";
import ExcelJS from "exceljs";
import * as csv from "fast-csv";
import * as streamBuffers from "stream-buffers";
import { WritableStreamBuffer } from "stream-buffers";

import { ICsv } from "@wrtn/connector-api/lib/structures/connector/csv/ICsv";

import { ConnectorGlobal } from "../../../ConnectorGlobal";

export namespace CsvProvider {
  export async function read(input: ICsv.IReadInput): Promise<ICsv.IReadOutput> {
    try {
      const { s3Url, delimiter } = input;
      const s3 = new AWS.S3();
      const match = s3Url.match(/https?:\/\/([^.]+)\.s3(?:\.([^.]+))?\.amazonaws\.com\/(.+)/);

      const body: string = await (async (): Promise<string> => {
        if (match) {
          const bucket = match[1];
          const fileName = match[3];
          const params = {
            Bucket: bucket,
            Key: fileName,
          };
          const response = await s3.getObject(params).promise();
          return response.Body?.toString() ?? "";
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

  export async function write(input: ICsv.IWriteInput): Promise<ICsv.IWriteOutput> {
    const { values, fileName, delimiter } = input;
    const s3 = new AWS.S3();
    const params = {
      Bucket: ConnectorGlobal.env.AWS_S3_BUCKET,
      Key: fileName,
    };

    let existValues = [];
    try {
      const response = await s3.getObject(params).promise();
      existValues = parse(response.Body?.toString() || "", {
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
          const uploadParams = {
            Bucket: ConnectorGlobal.env.AWS_S3_BUCKET,
            Key: fileName,
            // csvBuffer.getContents returns false when empty
            Body: csvBuffer.getContents() || "",
          };

          try {
            await s3.upload(uploadParams).promise();
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

  export async function convertCsvToExcel(input: ICsv.ICsvToExcelInput): Promise<ICsv.ICsvToExcelOutput> {
    const { s3Url, delimiter } = input;
    const s3 = new AWS.S3();

    const match = s3Url.match(/https?:\/\/([^.]+)\.s3(?:\.([^.]+))?\.amazonaws\.com\/(.+)/);
    if (!match) throw new Error("Invalid S3 URL");

    const bucket = match[1];
    const fileName = match[3];

    const downloadParams = {
      Bucket: bucket,
      Key: fileName,
    };
    const s3Stream = s3.getObject(downloadParams).createReadStream();

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
              Bucket: bucket,
              Key: key,
              Body: buffer.getContents(),
            };
            await s3.upload(uploadParams).promise();
            resolve();
          });
      } catch (err) {
        reject(err);
      }
    });
    return { url: `https://${bucket}.s3.ap-northeast-2.amazonaws.com/${key}` };
  }
}
