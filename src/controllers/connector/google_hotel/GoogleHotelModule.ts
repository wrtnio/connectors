import { Module } from "@nestjs/common";
import { GoogleHotelProvider } from "../../../providers/connector/google_hotel/GoogleHotelProvider";
import { GoogleHotelController } from "./GoolgeHotelController";

@Module({
  imports: [],
  controllers: [GoogleHotelController],
  providers: [GoogleHotelProvider],
  exports: [GoogleHotelProvider],
})
export class GoogleHotelModule {}
