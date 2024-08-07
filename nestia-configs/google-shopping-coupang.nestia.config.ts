// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { GoogleShoppingCoupangModule } from "../src/controllers/connector/google_shopping/google_shopping_coupang/GoogleShoppingCoupangModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(GoogleShoppingCoupangModule),
  swagger: {
    info: {
      title: "쿠팡 상품 검색",
      summary: "쿠팡 쇼핑몰의 상품을 한 번에 검색해요.",
      description: "오늘의 트렌드를 검색해봐요",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/google-shopping-coupang.swagger.json",
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
