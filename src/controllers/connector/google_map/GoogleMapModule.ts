import { Module } from "@nestjs/common";
import { GoogleMapController } from "./GoogleMapController";
import { GoogleMapProvider } from "../../../providers/connector/google_map/GoogleMapProvider";

@Module({
  imports: [],
  controllers: [GoogleMapController],
  providers: [GoogleMapProvider],
  exports: [GoogleMapProvider],
})
export class GoogleMapModule {}
