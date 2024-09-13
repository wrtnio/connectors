import { Module } from "@nestjs/common";
import { AISearchController } from "./AISearchController";
import { AISearchProvider } from "../../../providers/connector/ai_search/AISearchProvider";

@Module({
  controllers: [AISearchController],
  providers: [AISearchProvider],
})
export class AISearchModule {}
