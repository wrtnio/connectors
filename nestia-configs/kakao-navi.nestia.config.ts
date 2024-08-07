// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { KakaoNaviModule } from "../src/controllers/connector/kakao_navi/KakaoNaviModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(KakaoNaviModule),
  swagger: {
    info: {
      title: "카카오 내비게이션 경로 안내",
      summary: "카카오 내비로 빠른 길을 찾아요.",
      description:
        "카카오 내비게이션을 통해 교통 정보를 조회하고 길찾기를 할 수 있어요. 출발지와 도착지를 설정하면 최적의 경로를 제안받을 수 있어요.",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/kakao-navi.swagger.json",
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
