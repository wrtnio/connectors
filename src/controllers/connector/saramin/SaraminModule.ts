import { Module } from "@nestjs/common";
import { GoogleSearchProvider } from "../../../providers/connector/google_search/GoogleSearchProvider";
import { SaraminController } from "./SaraminController";
import { SaraminProvider } from "../../../providers/connector/saramin/SaraminProvider";

@Module({
  providers: [SaraminProvider, GoogleSearchProvider],
  controllers: [SaraminController],
})
export class SaraminModule {}
