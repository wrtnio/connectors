// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { DallE3Module } from "../src/controllers/connector/dall_e_3/DallE3Module";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(DallE3Module),
  swagger: {
    info: {
      title: "DallE3",
      description: "DallE3를 이용해 그림을 그릴 수 있어요",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/dalle3.swagger.json",
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
