import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

import { MarketingCopyGeneratorProvider } from "../../../providers/connector/marketing/MarketingCopyGeneratorProvider";
import { OpenAIModule } from "../../../providers/open_ai/OpenAIModule";
import { AwsModule } from "../aws/AwsModule";
import { MarketingCopyController } from "./MarketingCopyController";

@Module({
  imports: [OpenAIModule, AwsModule, HttpModule],
  providers: [MarketingCopyGeneratorProvider],
  controllers: [MarketingCopyController],
})
export class MarketingCopyModule {}
