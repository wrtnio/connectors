// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { FigmaModule } from "../src/controllers/connector/figma/FigmaModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(FigmaModule),
  swagger: {
    info: {
      title: "Figma 디자인 협업 플랫폼",
      summary: "피그마 파일을 쉽게 관리하고 협업할 수 있어요.",
      description:
        "피그마 파일에 접근하고, 댓글을 가져오거나 추가할 수 있어요. 디자인 작업과 팀 협업을 효율적으로 진행할 수 있어요. 프로젝트의 진행 상황을 확인하고, 팀원들의 피드백을 실시간으로 주고받을 수 있어요. 디자인 에셋을 관리하고, 버전 히스토리를 추적할 수 있어요. UI/UX 디자인, 프로토타이핑, 그래픽 디자인 등 다양한 디자인 작업을 수행하고 관리할 수 있어요.",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/figma.swagger.json",
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
