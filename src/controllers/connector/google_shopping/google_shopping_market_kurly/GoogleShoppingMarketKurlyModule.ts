import { Module } from "@nestjs/common";
import { GoogleShoppingMarketKurlyController } from "./GoogleShoppingMarketKurlyController";
import { GoogleShoppingProvider } from "../../../../providers/connector/google_shopping/GoogleShoppingProvider";

@Module({
  imports: [],
  controllers: [GoogleShoppingMarketKurlyController],
  providers: [GoogleShoppingProvider],
  exports: [GoogleShoppingProvider],
})
export class GoogleShoppingMarketKurlyModule {}
