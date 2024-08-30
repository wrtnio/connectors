// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { DaumModule } from "../src/controllers/connector/daum/DaumModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(DaumModule),
  swagger: {
    info: {
      title: "다음 포털 콘텐츠 조회",
      summary: "다음에서 블로그와 카페 정보를 쉽게 찾아볼 수 있어요.",
      description:
        "다음의 블로그와 카페에서 원하는 정보를 효과적으로 검색할 수 있어요. 블로그 검색을 통해 개인의 경험담, 리뷰, 일상 이야기 등을 찾아볼 수 있고, 카페 검색으로 특정 주제에 대한 커뮤니티의 대화를 확인할 수 있어요. 키워드 검색, 최신순/인기순 정렬, 특정 기간 내 검색 등 다양한 옵션을 활용해 원하는 정보를 정확하게 찾을 수 있어요. 트렌드 파악, 제품 리뷰 확인, 여행 정보 수집 등 다양한 목적으로 활용할 수 있어요.",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/daum.swagger.json",
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
