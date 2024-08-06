// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { ImwebModule } from "../src/controllers/connector/imweb/ImwebModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(ImwebModule),
  swagger: {
    info: {
      title: "아임웹",
      description: "아임웹 판매자를 도와주는 기능이 있어요",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/imweb.swagger.json",
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
