// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { GoogleSearchCareerModule } from "../src/controllers/connector/google_search_career/GoogleSearchCareerModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(GoogleSearchCareerModule),
  swagger: {
    info: {
      title: "통합 채용정보 검색",
      summary: "다양한 채용 사이트의 공고를 한 번에 검색해요.",
      description:
        "원티드, 인크루트, 사람인, 점핏, 커리어리 등 다양한 채용 사이트의 공고를 검색할 수 있어요. 직무, 지역, 경력 등으로 검색 조건을 설정할 수 있고, 각 사이트별로 제공하는 상세 정보(연봉, 기업 규모, 복지 등)를 비교해볼 수 있어요. 관심 있는 공고를 저장하거나 지원 현황을 관리할 수 있고, 유사한 공고 추천 기능도 활용할 수 있어요. 이를 통해 취업 준비나 이직을 고려 중인 사용자들이 효율적으로 채용 정보를 탐색하고 관리할 수 있어요.",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/google-search-career.swagger.json",
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
