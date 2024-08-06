// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { GoogleHotelModule } from "../src/controllers/connector/google_hotel/GoogleHotelModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(GoogleHotelModule),
  swagger: {
    info: {
      title: "Google Hotel",
      description: "여행 전 숙소를 미리 찾아볼 수 있어요",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/google-hotel.swagger.json",
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
