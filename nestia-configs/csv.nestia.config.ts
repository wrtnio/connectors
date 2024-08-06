// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { CsvModule } from "../src/controllers/connector/csv/CsvModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(CsvModule),
  swagger: {
    info: {
      title: "CSV 파일 데이터 처리기",
      summary: "CSV 파일을 쉽게 다룰 수 있어요.",
      description:
        "CSV 파일의 내용을 읽고, 새로운 CSV 파일을 만들 수 있어요. 또한 CSV 파일을 Excel 파일로 변환할 수도 있어요. 데이터 분석, 정보 정리, 대량의 데이터 처리 등 다양한 작업에 활용할 수 있어요.",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/csv.swagger.json",
    servers: [
      {
        url: "https://studio-connector-api.wrtn.ai",
        description: "Production Server",
      },
      {
        url: "https://studio-connector-poc.dev.wrtn.club",
        description: "Develop Server",
      },
      {
        url: "http://localhost:3003",
        description: "Local Server",
      },
    ],
  },
};
export default NESTIA_CONFIG;
