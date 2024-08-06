// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { GoogleSearchModule } from "../src/controllers/connector/google_search/GoogleSearchModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(GoogleSearchModule),
  swagger: {
    info: {
      title: "구글 검색",
      description: "구글 검색 및 채용 공고 조회에 활용할 수 있어요",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/google-search.swagger.json",
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
