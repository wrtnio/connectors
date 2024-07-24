import { Module } from "@nestjs/common";
import { KakaoMapModule } from "../controllers/connector/kakao_map/KakaoMapModule";
import { KakaoNaviModule } from "../controllers/connector/kakao_navi/KakaoNaviModule";
import { GoogleHotelModule } from "../controllers/connector/google_hotel/GoogleHotelModule";

@Module({
  imports: [KakaoMapModule, KakaoNaviModule, GoogleHotelModule],
})
export class TravelModule {}
