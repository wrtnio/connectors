import { Module } from "@nestjs/common";

import { ChatbotProvider } from "../../../providers/connector/chatbot/ChatbotProvider";
import { ChatBotController } from "./ChatbotController";

@Module({
  controllers: [ChatBotController],
  providers: [ChatbotProvider],
})
export class ChatbotModule {}
