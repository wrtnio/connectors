// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { KoreaEximbankModule } from "../src/controllers/connector/korea_eximbank/KoreaEximbankModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(KoreaEximbankModule),
  swagger: {
    info: {
      title: "실시간 환율 정보 제공",
      summary: "실시간 원화 환율 정보를 쉽게 확인해요.",
      description:
        "한국수출입은행의 API를 통해 실시간 환율 정보를 조회할 수 있어요. 주요 통화의 현재 환율은 물론, 과거 특정 날짜의 환율도 확인할 수 있어요. 환율 동향을 분석하고, 특정 기간의 평균 환율을 계산할 수도 있어요. 이를 통해 국제 거래나 여행 계획에 필요한 정보를 쉽게 얻을 수 있고, 환율 변동에 따른 리스크를 관리하는 데 도움을 받을 수 있어요.",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/korea-eximbank.swagger.json",
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
