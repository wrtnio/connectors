import { Module } from "@nestjs/common";
import { ChatbotModule } from "../controllers/connector/chatbot/ChatbotModule";
import { DaumModule } from "../controllers/connector/daum/DaumModule";
import { GoogleCalendarModule } from "../controllers/connector/google_calendar/GoogleCalendarModule";
import { GoogleShoppingModule } from "../controllers/connector/google_shopping/GoogleShoppingModule";
import { KakaoMapModule } from "../controllers/connector/kakao_map/KakaoMapModule";
import { KakaoNaviModule } from "../controllers/connector/kakao_navi/KakaoNaviModule";
import { KakaoTalkModule } from "../controllers/connector/kakao_talk/KakaoTalkModule";
import { NaverModule } from "../controllers/connector/naver/NaverModule";
import { YoutubeSearchModule } from "../controllers/connector/youtube_search/YoutubeSearchModule";

@Module({
  imports: [
    DaumModule,
    NaverModule,
    YoutubeSearchModule,
    GoogleCalendarModule,
    ChatbotModule,
    KakaoTalkModule,
    KakaoMapModule,
    KakaoNaviModule,
    GoogleShoppingModule,
  ],
})
export class LifeStyleModule {}
