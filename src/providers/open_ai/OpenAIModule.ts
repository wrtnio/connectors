import { Module } from "@nestjs/common";
import dotenv from "dotenv";
import OpenAI from "openai";

import { OpenAIProvider } from "./OpenAIProvider";
import {
  IMAGE_OPEN_AI_INJECT_IDENTIFIER,
  OPEN_AI_INJECT_IDENTIFIER,
} from "./constants";

@Module({
  providers: [
    OpenAIProvider,
    {
      provide: OPEN_AI_INJECT_IDENTIFIER,
      useFactory: () => {
        dotenv.config();
        return new OpenAI({ baseURL: process.env.HAMLET_URL });
      },
    },
    {
      // image not supported by hamlet
      provide: IMAGE_OPEN_AI_INJECT_IDENTIFIER,
      useFactory: () => {
        dotenv.config();
        return new OpenAI();
      },
    },
  ],
  exports: [OpenAIProvider],
})
export class OpenAIModule {}
