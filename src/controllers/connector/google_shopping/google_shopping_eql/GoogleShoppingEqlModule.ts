import { Module } from "@nestjs/common";
import { GoogleShoppingEqlController } from "./GoogleShoppingEqlController";
import { GoogleShoppingProvider } from "../../../../providers/connector/google_shopping/GoogleShoppingProvider";

@Module({
  imports: [],
  controllers: [GoogleShoppingEqlController],
  providers: [GoogleShoppingProvider],
  exports: [GoogleShoppingProvider],
})
export class GoogleShoppingEqlModule {}
