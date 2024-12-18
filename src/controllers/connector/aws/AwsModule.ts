import { Module } from "@nestjs/common";

import { AwsController } from "./AwsController";

@Module({
  controllers: [AwsController],
})
export class AwsModule {}
