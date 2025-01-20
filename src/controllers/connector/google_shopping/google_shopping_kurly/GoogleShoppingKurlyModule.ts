import { Module } from "@nestjs/common";
import { GoogleShoppingProvider } from "../../../../providers/connector/google_shopping/GoogleShoppingProvider";
import { GoogleShoppingKurlyController } from "./GoogleShoppingKurlyController";

@Module({
  imports: [],
  controllers: [GoogleShoppingKurlyController],
  providers: [GoogleShoppingProvider],
  exports: [GoogleShoppingProvider],
})
export class GoogleShoppingKurlyModule {}
