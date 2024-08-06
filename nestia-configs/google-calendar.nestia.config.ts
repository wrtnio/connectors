// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { GoogleCalendarModule } from "../src/controllers/connector/google_calendar/GoogleCalendarModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(GoogleCalendarModule),
  swagger: {
    info: {
      title: "구글 캘린더",
      description: "구글 캘린더에 내 일정을 기록하고 관리해요",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/google-calendar.swagger.json",
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
