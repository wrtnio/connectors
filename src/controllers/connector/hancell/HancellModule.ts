import { Module } from "@nestjs/common";

import { HancellProvider } from "../../../providers/connector/hancell/HancellProvider";
import { AwsModule } from "../aws/AwsModule";
import { HancellController } from "./HancellController";

@Module({
  imports: [AwsModule],
  controllers: [HancellController],
  providers: [HancellProvider],
})
export class HancellModule {}
