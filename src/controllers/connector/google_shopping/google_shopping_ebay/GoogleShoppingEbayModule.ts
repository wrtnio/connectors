import { Module } from "@nestjs/common";
import { GoogleShoppingEbayController } from "./GoogleShoppingEbayController";
import { GoogleShoppingProvider } from "../../../../providers/connector/google_shopping/GoogleShoppingProvider";

@Module({
  imports: [],
  controllers: [GoogleShoppingEbayController],
  providers: [GoogleShoppingProvider],
  exports: [GoogleShoppingProvider],
})
export class GoogleShoppingEbayModule {}
