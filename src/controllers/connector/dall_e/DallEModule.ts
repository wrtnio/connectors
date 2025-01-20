import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

import { DallEProvider } from "../../../providers/connector/dall_e/DallEProvider";
import { OpenAIModule } from "../../../providers/open_ai/OpenAIModule";
import { DallEController } from "./DallEController";

@Module({
  imports: [OpenAIModule, HttpModule],
  providers: [DallEProvider],
  controllers: [DallEController],
  exports: [DallEProvider],
})
export class DallEModule {}
