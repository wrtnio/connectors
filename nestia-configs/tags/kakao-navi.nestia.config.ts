// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { KakaoNaviModule } from "../../src/controllers/connector/kakao_navi/KakaoNaviModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(KakaoNaviModule),
  swagger: {
    info: {
      title: "카카오 네비게이션",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/categories/kakao-navi.swagger.json",
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
