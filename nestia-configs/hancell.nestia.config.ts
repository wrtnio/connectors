// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { HancellModule } from "../src/controllers/connector/hancell/HancellModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(HancellModule),
  swagger: {
    info: {
      title: "한셀 문서 데이터 관리",
      summary: "한셀 파일을 쉽게 다룰 수 있어요.",
      description:
        "한셀 파일의 내용을 가져오고, 워크시트를 수정하거나 새로운 파일을 만들 수 있어요. 셀 데이터를 읽고 쓸 수 있으며, 수식을 적용하거나 차트를 만들 수도 있어요. 여러 워크시트를 한 번에 관리할 수 있고, 데이터 필터링이나 정렬 기능을 사용할 수 있어요. 또한 한셀 파일을 다른 형식(CSV, PDF 등)으로 변환할 수 있어, 다양한 환경에서 데이터를 활용할 수 있어요. 이를 통해 재무 관리, 성적 관리, 재고 관리 등 다양한 업무를 효율적으로 처리할 수 있어요.",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/hancell.swagger.json",
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
