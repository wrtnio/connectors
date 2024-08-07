// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { NaverModule } from "../src/controllers/connector/naver/NaverModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(NaverModule),
  swagger: {
    info: {
      title: "네이버 포털 정보 검색",
      summary: "네이버의 블로그와 카페 정보를 한눈에 볼 수 있어요.",
      description:
        "네이버의 블로그와 카페에서 필요한 정보를 빠르게 검색할 수 있어요. 블로그 검색을 통해 다양한 주제의 포스트를 찾아볼 수 있고, 카페 검색으로 특정 관심사를 공유하는 커뮤니티의 게시글을 확인할 수 있어요. 최신 트렌드, 상품 리뷰, 여행 후기, 요리 레시피 등 다양한 정보를 얻을 수 있어요. 검색 필터를 사용해 원하는 기간, 정확도, 최신순 등으로 결과를 정렬할 수 있어 더욱 효율적인 정보 탐색이 가능해요.",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/naver.swagger.json",
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
