// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { GoogleFlightModule } from "../src/controllers/connector/google_flight/GoogleFlightModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(GoogleFlightModule),
  swagger: {
    info: {
      title: "Google Flight",
      description: "여행 전에 항공권을 조회해볼 수 있어요",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/google-flight.swagger.json",
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
