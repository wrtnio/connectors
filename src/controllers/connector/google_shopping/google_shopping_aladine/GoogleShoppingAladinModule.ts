import { Module } from "@nestjs/common";

import { GoogleShoppingProvider } from "../../../../providers/connector/google_shopping/GoogleShoppingProvider";
import { GoogleShoppingAladineController } from "./GoogleShoppingAladineController";

@Module({
  imports: [],
  controllers: [GoogleShoppingAladineController],
  providers: [GoogleShoppingProvider],
  exports: [GoogleShoppingProvider],
})
export class GoogleShoppingAladineModule {}
