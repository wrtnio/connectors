// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { GmailModule } from "../src/controllers/connector/gmail/GmailModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(GmailModule),
  swagger: {
    info: {
      title: "구글 이메일 서비스 관리",
      summary: "지메일로 이메일을 편리하게 관리해요.",
      description:
        "지메일을 통해 메일을 보내고, 초안을 만들고, 답장을 할 수 있어요. 메일 정보를 가져오고, 삭제하고, 라벨을 관리할 수 있어요. 대량의 이메일을 자동으로 처리하거나, 특정 조건에 따라 이메일을 분류하고 정리할 수 있어요. 중요한 메일에 대한 알림을 설정하거나, 자동 응답 메일을 설정할 수도 있어요. 개인 사용자부터 비즈니스 사용자까지 효율적인 이메일 관리와 커뮤니케이션을 할 수 있어요.",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/google-gmail.swagger.json",
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
