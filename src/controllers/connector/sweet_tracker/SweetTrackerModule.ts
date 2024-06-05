import { Module } from "@nestjs/common";

import { SweetTrackerController } from "./SweetTrackerController";

@Module({
  controllers: [SweetTrackerController],
})
export class SweetTackerModule {}
