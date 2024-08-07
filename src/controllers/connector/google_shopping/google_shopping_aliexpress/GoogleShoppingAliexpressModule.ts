import { Module } from "@nestjs/common";
import { GoogleShoppingAliexpressController } from "./GoogleShoppingAliexpressController";
import { GoogleShoppingProvider } from "../../../../providers/connector/google_shopping/GoogleShoppingProvider";

@Module({
  imports: [],
  controllers: [GoogleShoppingAliexpressController],
  providers: [GoogleShoppingProvider],
  exports: [GoogleShoppingProvider],
})
export class GoogleShoppingAliexpressModule {}
