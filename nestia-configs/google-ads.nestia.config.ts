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
        "키워드 검색을 통한 SEO 전략을 최적화하고, 노출 광고의 효과를 높여 잠재 고객에게 효과적으로 도달할 수 있어요.구글 광고에서 검색 광고, 디스플레이 광고, 동영상 광고 등 다양한 유형의 광고를 만들고 수정할 수 있어요. 이후 광고 상태를 관리하고, 성과를 조회할 수 있어요.",
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
