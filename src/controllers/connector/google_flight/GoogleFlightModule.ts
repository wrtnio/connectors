import { Module } from "@nestjs/common";

import { GoogleFlightProvider } from "../../../providers/connector/google_flight/GoogleFlightProvider";
import { GoogleFlightController } from "./GoogleFlightController";

@Module({
  imports: [],
  controllers: [GoogleFlightController],
  providers: [GoogleFlightProvider],
  exports: [GoogleFlightProvider],
})
export class GoogleFlightModule {}
