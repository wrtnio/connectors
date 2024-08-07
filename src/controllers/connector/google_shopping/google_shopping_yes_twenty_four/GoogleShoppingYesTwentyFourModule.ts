import { Module } from "@nestjs/common";
import { GoogleShoppingYesTwentyFourController } from "./GoogleShoppingYesTwentyFourController";
import { GoogleShoppingProvider } from "../../../../providers/connector/google_shopping/GoogleShoppingProvider";

@Module({
  imports: [],
  controllers: [GoogleShoppingYesTwentyFourController],
  providers: [GoogleShoppingProvider],
  exports: [GoogleShoppingProvider],
})
export class GoogleShoppingYesTwentyFourModule {}
