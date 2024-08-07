import { Module } from "@nestjs/common";

import { GoogleSearchProvider } from "../../../providers/connector/google_search/GoogleSearchProvider";
import { GoogleSearchCareerController } from "./GoogleSearchCareerController";

@Module({
  imports: [],
  controllers: [GoogleSearchCareerController],
  providers: [GoogleSearchProvider],
  exports: [GoogleSearchProvider],
})
export class GoogleSearchCareerModule {}
