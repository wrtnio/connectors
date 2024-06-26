// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";

import { StudioModule } from "./src/StudioModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(StudioModule),
  output: "src/api",
  swagger: {
    decompose: true,
    output: "packages/api/swagger.json",
    servers: [
      {
        url: "http://studio-connector-poc",
        description: "k8s",
      },
      {
        url: "http://localhost:3003",
        description: "Local Server",
      },
    ],
  },
  distribute: "packages/api",
  simulate: true,
  e2e: "test",
};
export default NESTIA_CONFIG;
