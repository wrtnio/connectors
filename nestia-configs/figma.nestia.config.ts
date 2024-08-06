// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { FigmaModule } from "../src/controllers/connector/figma/FigmaModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(FigmaModule),
  swagger: {
    info: {
      title: "Figma",
      description: "Figma를 연동해 디자인 생산성을 높이세요",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/figma.swagger.json",
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
