import { Module } from "@nestjs/common";

import { GoogleCalendarProvider } from "../../../providers/connector/google_calendar/GoogleCalendarProvider";
import { GoogleModule } from "../internal/google/GoogleModule";
import { GoogleCalendarController } from "./GoogleCalendarController";

@Module({
  imports: [GoogleModule],
  controllers: [GoogleCalendarController],
  providers: [GoogleCalendarProvider],
  exports: [GoogleCalendarProvider],
})
export class GoogleCalendarModule {}
