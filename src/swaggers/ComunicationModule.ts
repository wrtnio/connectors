import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import { pinoLoggerParams } from "../common/logger/logger";
import { ChatbotModule } from "../controllers/connector/chatbot/ChatbotModule";
import { DaumModule } from "../controllers/connector/daum/DaumModule";
import { GmailModule } from "../controllers/connector/gmail/GmailModule";
import { KakaoTalkModule } from "../controllers/connector/kakao_talk/KakaoTalkModule";
import { LlmModule } from "../controllers/connector/llm/LlmModule";
import { NaverModule } from "../controllers/connector/naver/NaverModule";
import { YoutubeSearchModule } from "../controllers/connector/youtube_search/YoutubeSearchModule";

@Module({
  imports: [
    LoggerModule.forRoot({ ...pinoLoggerParams }),
    DaumModule,
    NaverModule,
    YoutubeSearchModule,
    LlmModule,
    GmailModule,
    ChatbotModule,
    KakaoTalkModule,
  ],
})
export class ComunicationModule {}
