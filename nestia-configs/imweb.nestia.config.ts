// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { ImwebModule } from "../src/controllers/connector/imweb/ImwebModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(ImwebModule),
  swagger: {
    info: {
      title: "아임웹 상품 정보 관리",
      summary: "아임웹으로 상품 정보를 효과적으로 관리해요.",
      description:
        "아임웹에서 상품 리스트를 조회회할 수 있어요. 판매자 인증을 통해 API 토큰을 발급받아 더 많은 기능을 활용할 수 있어요.",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/imweb.swagger.json",
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
