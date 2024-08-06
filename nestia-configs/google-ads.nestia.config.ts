// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { GoogleAdsModule } from "../src/controllers/connector/google_ads/GoogleAdsModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(GoogleAdsModule),
  swagger: {
    info: {
      title: "구글 광고 캠페인 운영",
      summary: "구글 광고를 쉽게 만들고 관리해요.",
      description:
        "구글 광고에서 캠페인과 광고 그룹을 만들고 수정할 수 있어요. 광고 성과를 조회하고, 키워드를 생성하며, 광고 상태를 관리할 수 있어요. 검색 광고, 디스플레이 광고, 동영상 광고 등 다양한 유형의 광고를 설정할 수 있어요. 입찰 전략을 최적화하고, 광고 확장을 추가하여 광고의 효과를 높일 수 있어요. 또한 리마케팅 목록을 만들고 관리할 수 있어, 잠재 고객에게 효과적으로 도달할 수 있어요.",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/google-ads.swagger.json",
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
