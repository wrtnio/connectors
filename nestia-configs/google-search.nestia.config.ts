// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { GoogleSearchModule } from "../src/controllers/connector/google_search/GoogleSearchModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(GoogleSearchModule),
  swagger: {
    info: {
      title: "구글 웹 검색 엔진",
      summary: "구글 검색 기능을 쉽게 활용할 수 있어요.",
      description:
        "검색어를 통해 구글의 일반 검색 결과를 얻을 수 있어요. 웹페이지, 이미지, 뉴스 등 다양한 유형의 검색 결과를 가져올 수 있고, 검색 결과의 순위, URL, 제목, 설명 등 상세 정보를 확인할 수 있어요. 특정 사이트 내에서만 검색하거나, 특정 기간 동안의 결과만 찾는 등 고급 검색 옵션도 사용할 수 있어요. 이를 통해 정보 수집, 트렌드 분석, 경쟁사 모니터링 등 다양한 목적으로 활용할 수 있어요.",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/google-search.swagger.json",
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
