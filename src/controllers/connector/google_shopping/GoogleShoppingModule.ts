import { Module } from "@nestjs/common";

import { GoogleShoppingProvider } from "../../../providers/connector/google_shopping/GoogleShoppingProvider";
import { GoogleShoppingController } from "./GoogleShoppingController";

@Module({
  imports: [],
  controllers: [GoogleShoppingController],
  providers: [GoogleShoppingProvider],
  exports: [GoogleShoppingProvider],
})
export class GoogleShoppingModule {}
