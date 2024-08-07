import { Module } from "@nestjs/common";
import { GoogleShoppingOcoController } from "./GoogleShoppingOcoController";
import { GoogleShoppingProvider } from "../../../../providers/connector/google_shopping/GoogleShoppingProvider";

@Module({
  imports: [],
  controllers: [GoogleShoppingOcoController],
  providers: [GoogleShoppingProvider],
  exports: [GoogleShoppingProvider],
})
export class GoogleShoppingOcoModule {}
