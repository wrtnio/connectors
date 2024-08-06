// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { KakaoMapModule } from "../src/controllers/connector/kakao_map/KakaoMapModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(KakaoMapModule),
  swagger: {
    info: {
      title: "카카오 맵",
      description: "카카오 맵으로 지도 검색을 해볼 수 있어요",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/kakao-map.swagger.json",
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
