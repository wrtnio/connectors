import { Module } from "@nestjs/common";
import { KakaoMapModule } from "../controllers/connector/kakao_map/KakaoMapModule";
import { KakaoNaviModule } from "../controllers/connector/kakao_navi/KakaoNaviModule";
import { GoogleHotelModule } from "../controllers/connector/google_hotel/GoogleHotelModule";
import { GoogleFlightModule } from "../controllers/connector/google_flight/GoogleFlightModule";

@Module({
  imports: [
    KakaoMapModule,
    KakaoNaviModule,
    GoogleHotelModule,
    GoogleFlightModule,
  ],
})
export class TravelModule {}
