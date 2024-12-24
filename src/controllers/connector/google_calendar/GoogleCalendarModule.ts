import { Module } from "@nestjs/common";

import { GoogleCalendarController } from "./GoogleCalendarController";

@Module({
  controllers: [GoogleCalendarController],
})
export class GoogleCalendarModule {}
