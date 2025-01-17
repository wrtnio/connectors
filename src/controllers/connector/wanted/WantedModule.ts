import { Module } from "@nestjs/common";
import { GoogleSearchProvider } from "../../../providers/connector/google_search/GoogleSearchProvider";
import { WantedController } from "./WantedController";
import { WantedProvider } from "../../../providers/connector/wanted/WantedProvider";

@Module({
  imports: [],
  providers: [WantedProvider, GoogleSearchProvider],
  controllers: [WantedController],
})
export class WantedModule {}
