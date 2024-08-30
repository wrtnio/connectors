// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { ArxivSearchModule } from "../src/controllers/connector/arxiv_search/ArxivSearchModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(ArxivSearchModule),
  swagger: {
    info: {
      title: "학술 논문 탐색기",
      summary: "최신 학술 논문을 손쉽게 찾아볼 수 있어요.",
      description:
        "아카이브를 통해 다양한 과학 분야의 최신 연구 논문을 효율적으로 검색하고 접근할 수 있어요. 물리학, 수학, 컴퓨터 과학 등 여러 분야의 프리프린트 논문을 찾아볼 수 있어요. 키워드 검색, 저자 검색, 카테고리별 검색 등 다양한 방식으로 원하는 논문을 빠르게 찾을 수 있어요. 최신 연구 동향을 파악하거나 관심 분야의 깊이 있는 정보를 얻는 데 매우 유용해요.",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/arxiv-search.swagger.json",
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
