import { Module } from "@nestjs/common";

import { MarpProvider } from "../../../providers/connector/marp/MarpProvider";
import { MarpController } from "./MarpController";
import { AwsModule } from "../aws/AwsModule";

@Module({
  imports: [AwsModule],
  providers: [MarpProvider],
  controllers: [MarpController],
  exports: [MarpProvider],
})
export class MarpModule {}
