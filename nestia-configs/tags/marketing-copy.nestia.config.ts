// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { MarketingCopyModule } from "../../src/controllers/connector/marketing/MarketingCopyModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(MarketingCopyModule),
  swagger: {
    info: {
      title: "마케팅 카피",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/categories/marketing-copy.swagger.json",
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
