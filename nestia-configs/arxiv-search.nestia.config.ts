// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { ArxivSearchModule } from "../src/controllers/connector/arxiv_search/ArxivSearchModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(ArxivSearchModule),
  swagger: {
    info: {
      title: "아카이브 검색",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/categories/arxiv-search.swagger.json",
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
