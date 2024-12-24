import { Module } from "@nestjs/common";

import { GmailProvider } from "../../../providers/connector/gmail/GmailProvider";
import { GmailController } from "./GmailController";

@Module({
  controllers: [GmailController],
  providers: [GmailProvider],
  exports: [GmailProvider],
})
export class GmailModule {}
