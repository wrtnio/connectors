import { Module } from "@nestjs/common";

import { GmailProvider } from "../../../providers/connector/gmail/GmailProvider";
import { GoogleModule } from "../internal/google/GoogleModule";
import { GmailController } from "./GmailController";

@Module({
  imports: [GoogleModule],
  controllers: [GmailController],
  providers: [GmailProvider],
  exports: [GmailProvider],
})
export class GmailModule {}
