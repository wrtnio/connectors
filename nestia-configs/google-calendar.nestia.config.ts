// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { GoogleCalendarModule } from "../src/controllers/connector/google_calendar/GoogleCalendarModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(GoogleCalendarModule),
  swagger: {
    info: {
      title: "구글 일정 관리자",
      summary: "구글 캘린더로 일정을 손쉽게 관리해요.",
      description:
        "구글 캘린더를 통해 개인 및 팀의 일정을 효과적으로 관리할 수 있어요. 캘린더 목록을 가져오고, 새로운 캘린더를 만들거나 불필요한 캘린더를 삭제할 수 있어요. 특정 캘린더의 이벤트 목록을 조회하고, 새로운 이벤트를 빠르게 추가할 수 있어요. 기존 이벤트를 수정하거나 삭제할 수도 있고, 이벤트에 참석자를 추가할 수도 있어요. 이를 통해 개인 일정 관리는 물론, 팀 미팅 조율, 프로젝트 일정 관리, 중요 기념일 알림 등 다양한 목적으로 활용할 수 있어요. 여러 기기 간 동기화가 자동으로 이루어져 언제 어디서든 일정을 확인하고 관리할 수 있어요.",
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
