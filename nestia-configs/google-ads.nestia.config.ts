// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { GoogleAdsModule } from "../src/controllers/connector/google_ads/GoogleAdsModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(GoogleAdsModule),
  swagger: {
    info: {
      title: "구글 광고",
      description: "광고를 만들고 성과를 분석할 수 있어요",
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
