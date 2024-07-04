import { Module } from "@nestjs/common";

import { GoogleSearchProvider } from "../../../providers/connector/google_search/GoogleSearchProvider";
import { GoogleSearchController } from "./GoogleSearchController";

@Module({
  imports: [],
  controllers: [GoogleSearchController],
  providers: [GoogleSearchProvider],
  exports: [GoogleSearchProvider],
})
export class GoogleSearchModule {}
