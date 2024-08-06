// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { GoogleTagModule } from "../src/swaggers/tags/GoogleTagModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(GoogleTagModule),
  swagger: {
    info: {
      title: "구글 스토리지",
      description: "구글 문서, 시트, 드라이브, 슬라이드 등 자료들을 관리해요",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/google-storage.swagger.json",
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
