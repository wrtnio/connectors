import { Module } from "@nestjs/common";
import { GoogleSearchProvider } from "../../../providers/connector/google_search/GoogleSearchProvider";
import { IncruitController } from "./IncruitController";
import { IncruitProvider } from "../../../providers/connector/incruit/IncruitProvider";

@Module({
  providers: [GoogleSearchProvider, IncruitProvider],
  controllers: [IncruitController],
})
export class IncruitModule {}
