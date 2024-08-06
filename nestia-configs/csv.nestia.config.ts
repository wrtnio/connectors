// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { CsvModule } from "../src/controllers/connector/csv/CsvModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(CsvModule),
  swagger: {
    info: {
      title: "CSV",
      description: "CSV 파일을 편집하고 엑셀로 내보낼 수 있어요",
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
