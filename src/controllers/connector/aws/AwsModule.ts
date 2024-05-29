import { Module } from "@nestjs/common";

import { AwsProvider } from "../../../providers/connector/aws/AwsProvider";
import { AwsController } from "./AwsController";

@Module({
  controllers: [AwsController],
  providers: [AwsProvider],
  exports: [AwsProvider],
})
export class AwsModule {}
