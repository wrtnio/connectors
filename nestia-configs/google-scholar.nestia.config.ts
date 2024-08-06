// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { GoogleScholarModule } from "../src/controllers/connector/google_scholar/GoolgeScholarModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(GoogleScholarModule),
  swagger: {
    info: {
      title: "Google Scholar",
      description: "Google Scholar로 다양한 학술 자료를 찾아봐요",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/google-scholar.swagger.json",
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
