// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { GoogleShoppingTwentyNineCentimeterModule } from "../src/controllers/connector/google_shopping/google_shopping_twenty_nine_cenetimeter/GoogleShoppingTwentyNineCentimeterModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () =>
    NestFactory.create(GoogleShoppingTwentyNineCentimeterModule),
  swagger: {
    info: {
      title: "29cm 상품 검색",
      summary: "29cm 쇼핑몰의 상품을 한 번에 검색해요.",
      description: "오늘의 트렌드를 검색해봐요",
    },
    beautify: true,
    decompose: true,
    output:
      "packages/api/connectors/google-shopping-twenty-nine-centimeter.swagger.json",
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
