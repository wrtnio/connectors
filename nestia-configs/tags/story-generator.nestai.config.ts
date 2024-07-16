// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { StoryGeneratorModule } from "../../src/controllers/connector/story_generator/StoryGeneratorModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(StoryGeneratorModule),
  swagger: {
    info: {
      title: "스토리 생성",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/categories/story-generator.swagger.json",
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
