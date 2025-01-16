import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

import { DallE3Provider } from "../../../providers/connector/dall_e_3/DallE3Provider";
import { OpenAIModule } from "../../../providers/open_ai/OpenAIModule";
import { DallE3Controller } from "./DallE3Controller";

@Module({
  imports: [OpenAIModule, HttpModule],
  providers: [DallE3Provider],
  controllers: [DallE3Controller],
  exports: [DallE3Provider],
})
export class DallE3Module {}
