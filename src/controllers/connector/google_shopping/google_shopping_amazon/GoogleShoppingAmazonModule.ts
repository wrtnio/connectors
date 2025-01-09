import { Module } from "@nestjs/common";
import { GoogleShoppingAmazonController } from "./GoogleShoppingAmazonController";
import { GoogleShoppingProvider } from "../../../../providers/connector/google_shopping/GoogleShoppingProvider";

@Module({
  imports: [],
  controllers: [GoogleShoppingAmazonController],
  providers: [GoogleShoppingProvider],
  exports: [GoogleShoppingProvider],
})
export class GoogleShoppingAmazonModule {}
