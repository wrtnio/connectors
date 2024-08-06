// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { GmailModule } from "../src/controllers/connector/gmail/GmailModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(GmailModule),
  swagger: {
    info: {
      title: "Gmail",
      description: "Gmail로 초안을 작성하거나 이메일을 보낼 수 있어요",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/google-gmail.swagger.json",
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
