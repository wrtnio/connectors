import { Module } from "@nestjs/common";

import { PromptProvider } from "../../../providers/connector/prompt/PromptProvider";
import { PromptController } from "./PromptController";

@Module({
  providers: [PromptProvider],
  controllers: [PromptController],
  exports: [PromptProvider],
})
export class PromptModule {}
