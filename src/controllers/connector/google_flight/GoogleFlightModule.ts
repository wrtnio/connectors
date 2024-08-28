import { Module } from "@nestjs/common";

import { GoogleFlightProvider } from "../../../providers/connector/google_flight/GoogleFlightProvider";
import { GoogleFlightController } from "./GoogleFlightController";
import { ShortLinkProvider } from "../../../providers/connector/short_link/ShortLinkProvider";

@Module({
  imports: [],
  controllers: [GoogleFlightController],
  providers: [GoogleFlightProvider, ShortLinkProvider],
  exports: [GoogleFlightProvider],
})
export class GoogleFlightModule {}
