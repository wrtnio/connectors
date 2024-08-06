// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { ChatbotModule } from "../src/controllers/connector/chatbot/ChatbotModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(ChatbotModule),
  swagger: {
    info: {
      title: "Studio 1.0 챗봇",
      description: "",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/chatbot.swagger.json",
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
