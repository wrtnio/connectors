// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { GoogleDriveModule } from "../src/controllers/connector/google_drive/GoogleDriveModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(GoogleDriveModule),
  swagger: {
    info: {
      title: "구글 클라우드 스토리지 관리",
      summary: "구글 드라이브로 파일을 쉽게 저장하고 공유해요.",
      description:
        "구글 드라이브를 사용해 파일과 폴더를 효율적으로 관리할 수 있어요. 드라이브 내의 폴더와 파일 목록을 가져오고, 새로운 폴더나 파일을 만들 수 있어요. 불필요한 파일이나 폴더는 삭제할 수 있고, 특정 파일이나 폴더에 대한 접근 권한을 다른 사용자에게 부여할 수도 있어요. 텍스트 파일의 경우 내용을 직접 추가하거나 읽을 수 있어요. 이를 통해 개인 파일 보관, 팀 프로젝트 자료 공유, 대용량 파일 전송 등 다양한 목적으로 활용할 수 있어요. 클라우드 기반이라 어느 기기에서든 접근이 가능하고, 자동 동기화 기능으로 항상 최신 버전의 파일을 유지할 수 있어요.",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/google-drive.swagger.json",
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
