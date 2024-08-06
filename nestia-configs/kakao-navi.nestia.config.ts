// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { KakaoNaviModule } from "../src/controllers/connector/kakao_navi/KakaoNaviModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(KakaoNaviModule),
  swagger: {
    info: {
      title: "카카오 네비",
      description: "카카오 네비로 교통 현황에 맞게 길을 찾을 수 있어요",
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
