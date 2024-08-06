// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { KoreaEximbankModule } from "../src/controllers/connector/korea_eximbank/KoreaEximbankModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(KoreaEximbankModule),
  swagger: {
    info: {
      title: "한국 환율",
      description: "",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/korea-eximbank.swagger.json",
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
