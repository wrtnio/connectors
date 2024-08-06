// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { DallE3Module } from "../src/controllers/connector/dall_e_3/DallE3Module";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(DallE3Module),
  swagger: {
    info: {
      title: "DALL-E 3 고급 이미지 생성",
      summary: "프롬프트로 AI가 독특한 이미지를 만들어요.",
      description:
        "텍스트 설명을 바탕으로 AI가 독특하고 창의적인 이미지를 생성해줘요. 추상적인 개념부터 구체적인 장면까지 다양한 유형의 이미지를 만들 수 있어요. 생성된 이미지의 스타일, 구도, 색감 등을 세밀하게 조정할 수 있고, 기존 이미지를 바탕으로 변형하거나 확장할 수도 있어요. 광고 시안 제작, 일러스트레이션, 제품 디자인 아이디어 등 다양한 창작 분야에서 활용할 수 있어요.",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/dalle3.swagger.json",
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
