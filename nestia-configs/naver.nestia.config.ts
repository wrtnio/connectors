// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { NaverModule } from "../src/controllers/connector/naver/NaverModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(NaverModule),
  swagger: {
    info: {
      title: "네이버",
      description: "네이버의 각종 기능을 활용할 수 있어요",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/naver.swagger.json",
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
