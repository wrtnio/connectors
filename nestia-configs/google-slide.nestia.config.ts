// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { GoogleSlidesModule } from "../src/controllers/connector/google_slides/GoogleSlidesModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(GoogleSlidesModule),
  swagger: {
    info: {
      title: "구글 프레젠테이션 제작",
      summary: "구글 프레젠테이션을 쉽게 만들고 꾸밀 수 있어요.",
      description:
        "구글 슬라이드로 프레젠테이션을 만들고, 페이지를 추가하거나 수정할 수 있어요. 텍스트, 이미지, 도형을 추가하고 다양한 효과를 설정할 수 있어요. 슬라이드 전환 효과를 적용하고, 개체의 순서를 조정할 수 있어요. 슬라이드 노트를 작성하여 발표 준비를 할 수 있고, 프레젠테이션의 메타데이터를 수정할 수 있어요. 팀원들과 실시간으로 협업하며 프레젠테이션을 만들 수 있고, 완성된 프레젠테이션을 PDF로 내보낼 수도 있어요.",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/google-slide.swagger.json",
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
