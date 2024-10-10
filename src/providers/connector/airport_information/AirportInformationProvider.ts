import { Injectable, Logger } from "@nestjs/common";
import { IAirportInformation } from "@wrtn/connector-api/lib/structures/connector/airport_information/IAirportInformation";
import * as csv from "fast-csv";
import { AwsProvider } from "../aws/AwsProvider";
import { Readable } from "stream";

@Injectable()
export class AirportInformationProvider {
  constructor(private readonly awsProvider: AwsProvider) {}
  private readonly logger = new Logger("AirportInformationProvider");
  async search(
    input: IAirportInformation.IRequest,
  ): Promise<IAirportInformation.IResponse[]> {
    const fileUrl =
      "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/airport_inforamtion.csv";
    const match = fileUrl.match(AwsProvider.S3BucketURL);
    if (!match) throw new Error("Invalid S3 URL");

    const fileBuffer = await this.awsProvider.getObject(fileUrl);
    const s3Stream = new Readable();
    s3Stream.push(fileBuffer);
    s3Stream.push(null);

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
