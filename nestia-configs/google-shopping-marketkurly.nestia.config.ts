// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { GoogleShoppingMarketKurlyModule } from "../src/controllers/connector/google_shopping/google_shopping_market_kurly/GoogleShoppingMarketKurlyModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(GoogleShoppingMarketKurlyModule),
  swagger: {
    info: {
      title: "마켓컬리 상품 검색",
      summary: "마켓컬리 쇼핑몰의 상품을 한 번에 검색해요.",
      description:
        "알라딘 쇼핑몰의 상품을 검색할 수 있어요. 원하는 상품의 가격, 을 비교할 수 있고, 최저가 정보도 쉽게 확인할 수 있어요. 카테고리별 검색 옵션을 사용할 수 있어요. 이를 통해 효율적인 쇼핑은 물론, 시장 조사나 가격 동향 분석 등에도 활용할 수 있어요.",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/google-shopping-marketkurly.swagger.json",
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
