// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { StableDiffusionBetaModule } from "../src/controllers/connector/stable_diffustion_beta/StableDiffusionBetaModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(StableDiffusionBetaModule),
  swagger: {
    info: {
      title: "Stable Diffusion 이미지 생성",
      summary: "프롬프트를 입력하여 AI로 이미지를 생성해요.",
      description:
        "텍스트 프롬프트를 입력하면 AI가 그에 맞는 이미지를 생성해줘요. 원하는 스타일, 분위기, 구체적인 요소들을 자세히 설명하면 그에 맞는 이미지를 만들 수 있어요. 생성된 이미지의 크기, 품질, 생성 속도 등을 조절할 수 있고, 여러 장의 이미지를 한 번에 생성할 수도 있어요. 디자인 아이디어 얻기, 콘텐츠 제작, 아트워크 생성 등 다양한 창작 활동에 활용할 수 있어요.",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/stable-diffusion.swagger.json",
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
