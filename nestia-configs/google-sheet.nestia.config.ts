// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { GoogleSheetModule } from "../src/controllers/connector/google-sheet/GoogleSheetModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(GoogleSheetModule),
  swagger: {
    info: {
      title: "구글 스프레드시트 데이터 관리",
      summary: "구글 스프레드시트로 데이터를 쉽게 관리해요.",
      description:
        "구글 스프레드시트를 사용해 다양한 데이터 관리 작업을 할 수 있어요. 스프레드시트의 헤더 정보를 가져오거나, 특정 사용자에게 접근 권한을 부여할 수 있어요. 새로운 헤더를 추가하거나, 워크시트 목록을 확인할 수 있고, 특정 행(Row)의 정보를 가져올 수도 있어요. 원하는 셀에 새로운 내용을 추가하거나 기존 내용을 수정할 수도 있어요. 이를 통해 예산 관리, 프로젝트 추적, 데이터 분석 등 다양한 작업을 효율적으로 수행할 수 있어요. 실시간 협업이 가능해 팀 단위의 데이터 관리에도 매우 유용해요. 주의할 점은 구글 시트를 사용하려면 반드시 구글 드라이브 커넥터도 함께 사용해야 해요.",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/google-sheet.swagger.json",
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
