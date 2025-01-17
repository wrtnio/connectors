import { Module } from "@nestjs/common";
import { GoogleSearchProvider } from "../../../providers/connector/google_search/GoogleSearchProvider";
import { JumpitController } from "./JumpitController";
import { JumpitProvider } from "../../../providers/connector/jumpit/JumpitProvider";

@Module({
  controllers: [JumpitController],
  providers: [GoogleSearchProvider, JumpitProvider],
})
export class JumpitModule {}
