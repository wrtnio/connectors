// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { ArxivSearchModule } from "../src/controllers/connector/arxiv_search/ArxivSearchModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(ArxivSearchModule),
  swagger: {
    info: {
      title: "아카이브 검색",
      description: "아카이브를 이용해서 다양한 학술 자료 및 논문을 찾아보아요.",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/arxiv-search.swagger.json",
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
