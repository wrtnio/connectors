import { Injectable, Logger } from "@nestjs/common";
import { IAirportInformation } from "@wrtn/connector-api/lib/structures/connector/airport_information/IAirportInformation";
import * as csv from "fast-csv";
import { Readable } from "stream";
import { v4 } from "uuid";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { AwsProvider } from "../aws/AwsProvider";

@Injectable()
export class AirportInformationProvider {
  private readonly logger = new Logger("AirportInformationProvider");
  async search(
    input: IAirportInformation.IRequest,
  ): Promise<IAirportInformation.IResponse[]> {
    try {
      const results =
        await ConnectorGlobal.prisma.airport_informations.findMany({
          where: {
            OR: [
              { kr_country_name: { contains: input.keyword } },
              { kr_city_name: { contains: input.keyword } },
              { en_city_name: { contains: input.keyword } },
              { ko_airport_name: { contains: input.keyword } },
              { en_airport_name: { contains: input.keyword } },
            ],
          },
          select: {
            kr_country_name: true,
            kr_city_name: true,
            ko_airport_name: true,
            airport_code: true,
          },
        });

      return results.map((record) => ({
        country_name: record.kr_country_name,
        city_name: record.kr_city_name,
        airport_name: record.ko_airport_name,
        airport_code: record.airport_code,
      }));
    } catch (err) {
      this.logger.error(
        `Failed to get Airport information by keyword for ${input.keyword}: ${err}`,
      );
      throw err;
    }
  }

  async saveToDatabase(): Promise<void> {
    const fileUrl =
      "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/airport_inforamtion.csv";
    const match = fileUrl.match(AwsProvider.S3BucketURL);
    if (!match) throw new Error("Invalid S3 URL");

    const fileBuffer = await AwsProvider.getObject({ fileUrl });
    const s3Stream = new Readable();
    s3Stream.push(fileBuffer);
    s3Stream.push(null);

    const records: any = [];
    return new Promise<void>((resolve, reject) => {
      s3Stream
        .pipe(csv.parse({ headers: true }))
        .on("data", (row) => {
          records.push(row);
        })
        .on("end", async () => {
          try {
            for (const record of records) {
              await ConnectorGlobal.prisma.airport_informations.create({
                data: {
                  id: v4(),
                  kr_country_name: record["한글국가명"],
                  kr_city_name: record["한글도시명"],
                  ko_airport_name: record["한글공항"],
                  airport_code: record["공항코드"],
                  en_airport_name: record["영문공항명"],
                  en_city_name: record["영문도시명"],
                  created_at: new Date(),
                },
              });
            }
            this.logger.log("CSV data saved to database successfully.");
            resolve();
          } catch (error) {
            this.logger.error(`Database Save Error: ${error}`);
            reject(error);
          }
        })
        .on("error", (error) => {
          this.logger.error(`CSV Parsing Error: ${error}`);
          reject(error);
        });
    });
  }
}
