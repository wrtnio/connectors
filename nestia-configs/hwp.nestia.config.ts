// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { ImwebModule } from "../src/controllers/connector/imweb/ImwebModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(ImwebModule),
  swagger: {
    info: {
      title: "한컴 오피스 HWP 한글 문서 파일 분석기",
      summary: "HWP 파일의 내용을 읽어올 수 있습니다.",
      description:
        "한국에서 널리 사용되는 한컴 오피스 HWP 한글 문서 형식을 쉽게 처리할 수 있어요. 문서의 텍스트 내용을 추출하거나, 문서 구조를 분석할 수 있어요. 이를 통해 대량의 한글 문서를 자동으로 처리하거나, 문서 내용을 기반으로 한 정보 검색 등의 작업을 수행할 수 있어요.",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/imweb.swagger.json",
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
