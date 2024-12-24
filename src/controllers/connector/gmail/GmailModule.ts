import { Module } from "@nestjs/common";

import { GmailController } from "./GmailController";

@Module({
  controllers: [GmailController],
})
export class GmailModule {}
