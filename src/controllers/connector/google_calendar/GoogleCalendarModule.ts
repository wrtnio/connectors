import { Module } from "@nestjs/common";

import { GoogleCalendarProvider } from "../../../providers/connector/google_calendar/GoogleCalendarProvider";
import { GoogleCalendarController } from "./GoogleCalendarController";

@Module({
  controllers: [GoogleCalendarController],
  providers: [GoogleCalendarProvider],
  exports: [GoogleCalendarProvider],
})
export class GoogleCalendarModule {}
