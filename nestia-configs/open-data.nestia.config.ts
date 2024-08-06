// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { OpenDataModule } from "../src/controllers/connector/open_data/OpenDataModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(OpenDataModule),
  swagger: {
    info: {
      title: "통합 공공정보 조회",
      summary: "다양한 공공 정보를 한 곳에서 확인해요.",
      description:
        "기업 주가, 날씨, 건축물 정보, 캠핑장, 약국, 관광지, 주택 가격 등 다양한 공공 데이터를 조회할 수 있어요. 지역별 상세 날씨 정보를 확인하고, 전국의 캠핑장 현황을 파악할 수 있어요. 주변 약국이나 병원 위치를 찾을 수 있고, 관심 있는 지역의 부동산 시세도 확인할 수 있어요. 또한 교통 정보, 환경 정보, 문화 행사 정보 등 일상생활에 유용한 다양한 정보를 얻을 수 있어 편리한 생활을 할 수 있어요.",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/open-data.swagger.json",
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
