// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { SweetTackerModule } from "../src/controllers/connector/sweet_tracker/SweetTrackerModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(SweetTackerModule),
  swagger: {
    info: {
      title: "통합 택배 추적기",
      summary: "택배 정보를 쉽게 확인할 수 있어요.",
      description:
        "택배사를 조회하고, 송장번호에 맞는 택배사를 추천받을 수 있어요. 송장 조회로 택배 배송 상태를 실시간으로 확인할 수 있어요. 여러 택배사의 배송 정보를 한 번에 관리할 수 있고, 배송 알림을 설정할 수도 있어요. 개인 사용자는 물론 온라인 쇼핑몰 운영자나 물류 관리자들이 효율적으로 배송 상황을 추적하고 관리할 수 있어요.",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/sweet-tracker.swagger.json",
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
