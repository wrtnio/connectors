import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import { pinoLoggerParams } from "../common/logger/logger";
import { ChatbotModule } from "../controllers/connector/chatbot/ChatbotModule";
import { KakaoTalkModule } from "../controllers/connector/kakao_talk/KakaoTalkModule";
import { LlmModule } from "../controllers/connector/llm/LlmModule";
import { YoutubeSearchModule } from "../controllers/connector/youtube_search/YoutubeSearchModule";

@Module({
  imports: [
    LoggerModule.forRoot({ ...pinoLoggerParams }),
    YoutubeSearchModule,
    LlmModule,
    ChatbotModule,
    KakaoTalkModule,
  ],
})
export class EntertainmentModule {}
