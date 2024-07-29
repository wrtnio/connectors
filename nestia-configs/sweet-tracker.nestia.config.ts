// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { SweetTackerModule } from "../src/controllers/connector/sweet_tracker/SweetTrackerModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(SweetTackerModule),
  swagger: {
    info: {
      title: "송장 조회",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/categories/sweet-tracker.swagger.json",
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
