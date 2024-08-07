// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { NotionModule } from "../src/controllers/connector/notion/NotionModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(NotionModule),
  swagger: {
    info: {
      title: "노션 워크스페이스 관리",
      summary: "노션 으로 작업 공간을 효율적으로 관리해요.",
      description:
        "노션 에서 페이지를 만들고, 내용을 추가하고, 데이터베이스를 관리할 수 있어요. 페이지 검색, 데이터베이스 아이템 관리 등 다양한 기능을 활용할 수 있어요. 프로젝트 관리, 노트 작성, 팀 협업, 지식 베이스 구축 등 다양한 목적으로 사용할 수 있어요. 텍스트, 이미지, 표, 리스트 등 다양한 형식의 콘텐츠를 조합하여 풍부한 문서를 만들 수 있고, 팀원들과 실시간으로 공유하고 협업할 수 있어요.",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/notion.swagger.json",
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
