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
        "아임웹에서 상품 리스트와 상세 정보를 조회하고, 리뷰와 문의를 관리할 수 있어요. 판매자 인증을 통해 API 토큰을 발급받아 더 많은 기능을 활용할 수 있어요. 상품을 등록하고 수정할 수 있으며, 재고 관리도 할 수 있어요. 주문 정보를 조회하고 처리할 수 있어 효율적인 온라인 쇼핑몰 운영이 가능해요. 고객 문의에 신속하게 대응하고, 상품 리뷰를 통해 고객 피드백을 관리할 수 있어요.",
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
