import { Module } from "@nestjs/common";
import { KakaoMapModule } from "../controllers/connector/kakao_map/KakaoMapModule";
import { KakaoNaviModule } from "../controllers/connector/kakao_navi/KakaoNaviModule";

@Module({
  imports: [KakaoMapModule, KakaoNaviModule],
})
export class TravelModule {}
