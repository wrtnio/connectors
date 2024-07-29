// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { StableDiffusionBetaModule } from "../src/controllers/connector/stable_diffustion_beta/StableDiffusionBetaModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(StableDiffusionBetaModule),
  swagger: {
    info: {
      title: "Stable Diffusion",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/stable-diffusion.swagger.json",
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
