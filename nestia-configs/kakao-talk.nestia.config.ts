// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { KakaoTalkModule } from "../src/controllers/connector/kakao_talk/KakaoTalkModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(KakaoTalkModule),
  swagger: {
    info: {
      title: "카카오톡 메시징 및 일정 관리",
      summary: "카카오톡으로 메시지를 보내고 일정을 관리해요.",
      description:
        "카카오톡으로 다양한 유형의 메시지를 보내고, 캘린더를 조회하고 일정을 추가할 수 있어요. 친구 목록도 조회할 수 있어요. 텍스트 메시지는 물론 이미지, 링크, 위치 정보 등을 포함한 다양한 형태의 메시지를 전송할 수 있어요. 개인 캘린더와 채널 캘린더를 관리하여 효율적인 일정 관리가 가능해요. 친구나 그룹채팅방에 일정을 공유하고, 알림을 설정할 수 있어 중요한 약속을 잊지 않을 수 있어요.",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/kakao-talk.swagger.json",
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
