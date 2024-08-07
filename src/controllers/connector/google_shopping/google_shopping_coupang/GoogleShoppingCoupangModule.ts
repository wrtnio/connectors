import { Module } from "@nestjs/common";
import { GoogleShoppingCoupangController } from "./GoogleShoppingCoupangController";
import { GoogleShoppingProvider } from "../../../../providers/connector/google_shopping/GoogleShoppingProvider";

@Module({
  imports: [],
  controllers: [GoogleShoppingCoupangController],
  providers: [GoogleShoppingProvider],
  exports: [GoogleShoppingProvider],
})
export class GoogleShoppingCoupangModule {}
