import { Module } from "@nestjs/common";

import { KeywordExtractorProvider } from "../../../providers/connector/extract/KeywordExtractorProvider";
import { OpenAIModule } from "../../../providers/open_ai/OpenAIModule";
import { KeywordExtractController } from "./KeywordExtractController";

@Module({
  imports: [OpenAIModule],
  providers: [KeywordExtractorProvider],
  controllers: [KeywordExtractController],
})
export class KeywordExtractModule {}
