import { Module } from "@nestjs/common";

import { LlmProvider } from "../../../providers/connector/llm/LlmProvider";
import { OpenAIModule } from "../../../providers/open_ai/OpenAIModule";
import { LlmController } from "./LlmController";

@Module({
  imports: [OpenAIModule],
  providers: [LlmProvider],
  controllers: [LlmController],
})
export class LlmModule {}
