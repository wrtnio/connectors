// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { GoogleFlightModule } from "../src/controllers/connector/google_flight/GoogleFlightModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(GoogleFlightModule),
  swagger: {
    info: {
      title: "구글 항공권 검색 및 비교",
      summary: "항공편을 검색하고 최적의 옵션을 선택해요.",
      description:
        "출발지와 목적지, 날짜를 입력하면 다양한 항공편을 검색할 수 있어요. 직항/경유, 항공사, 가격 범위 등으로 검색 결과를 필터링할 수 있고, 가격, 소요 시간, 편의성 등을 기준으로 정렬할 수 있어요. 왕복 항공편 검색도 가능하며, 여러 날짜의 가격을 한눈에 비교할 수 있어요.",
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
