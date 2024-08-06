// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { GoogleDocsModule } from "../src/controllers/connector/google-docs/GoogleDocsModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(GoogleDocsModule),
  swagger: {
    info: {
      title: "구글 문서 작성 및 관리",
      summary: "구글 독스를 쉽게 만들고 관리할 수 있어요.",
      description:
        "구글 독스로 다양한 문서 작업을 할 수 있어요. 새로운 문서를 생성하고, 기존 문서에 접근 권한을 부여하거나 수정할 수 있어요. 문서를 복사하거나 삭제할 수도 있고, 특정 구글 드라이브 내의 모든 문서 목록을 가져올 수도 있어요. 문서에 새로운 텍스트를 추가하는 것도 가능해요. 이를 통해 팀 프로젝트, 개인 노트 작성, 보고서 작성 등 다양한 문서 작업을 클라우드 환경에서 효율적으로 수행할 수 있어요. 실시간 협업이 가능해 여러 사람이 동시에 작업할 수 있는 것도 큰 장점이에요. 주의할 점은 구글 슬라이드를 사용하려면 반드시 구글 드라이브 커넥터도 함께 사용해야 해요.",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/google-docs.swagger.json",
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
