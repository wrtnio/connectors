// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { HancellModule } from "../src/controllers/connector/hancell/HancellModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(HancellModule),
  swagger: {
    info: {
      title: "한셀",
      description: "한셀을 읽고 쓸 수 있게 도와줘요",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/hancell.swagger.json",
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
