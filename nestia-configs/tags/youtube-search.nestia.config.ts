// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { YoutubeSearchModule } from "../../src/controllers/connector/youtube_search/YoutubeSearchModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(YoutubeSearchModule),
  swagger: {
    info: {
      title: "유튜브 검색",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/categories/youtube-search.swagger.json",
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
