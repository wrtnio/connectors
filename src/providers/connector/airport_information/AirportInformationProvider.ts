import { Injectable, Logger } from "@nestjs/common";
import { IAirportInformation } from "@wrtn/connector-api/lib/structures/connector/airport_information/IAirportInformation";
import AWS from "aws-sdk";
import * as csv from "fast-csv";

@Injectable()
export class AirportInformationProvider {
  private readonly logger = new Logger("AirportInformationProvider");
  async search(
    input: IAirportInformation.IRequest,
  ): Promise<IAirportInformation.IResponse[]> {
    const s3 = new AWS.S3();
    const fileUrl =
      "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/airport_inforamtion.csv";
    const match = fileUrl.match(
      /https?:\/\/([^.]+)\.s3(?:\.([^.]+))?\.amazonaws\.com\/(.+)/,
    );
    if (!match) throw new Error("Invalid S3 URL");

    const bucket = match[1];
    const fileName = match[3];

    const params = {
      Bucket: bucket,
      Key: fileName,
    };
    const s3Stream = s3.getObject(params).createReadStream();

    const results: IAirportInformation.IResponse[] = [];
    return new Promise<IAirportInformation.IResponse[]>((resolve, reject) => {
      s3Stream
        .pipe(csv.parse({ headers: true }))
        .on("data", (row) => {
          if (
            row["한글국가명"] === input.keyword ||
            row["한글도시명"] === input.keyword ||
            row["영문도시명"] === input.keyword
          ) {
            results.push({
              country_name: row["한글국가명"],
              city_name: row["한글도시명"],
              airport_name: row["한글공항"],
              airport_code: row["공항코드"],
            });
          }
        })
        .on("end", () => resolve(results))
        .on("error", (error) => {
          this.logger.error(`Airport data Parsing Error: ${error}`);
          reject(error);
        });
    });
  }
}
