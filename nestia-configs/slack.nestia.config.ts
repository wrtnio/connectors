// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { SlackModule } from "../src/controllers/connector/slack/SlackModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(SlackModule),
  swagger: {
    info: {
      title: "Slack",
      description: "슬랙 채널에서 대화를 가져오거나 보낼 수 있어요",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/slack.swagger.json",
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
