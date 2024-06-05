import { Module } from "@nestjs/common";

import { SweetTrackerController } from "./SweetTackerController";

@Module({
  controllers: [SweetTrackerController],
})
export class SweetTackerModule {}
