import { Module } from "@nestjs/common";

import { GoogleShoppingProvider } from "../../../../providers/connector/google_shopping/GoogleShoppingProvider";
import { GoogleShoppingAladinController } from "./GoogleShoppingAladinController";

@Module({
  imports: [],
  controllers: [GoogleShoppingAladinController],
  providers: [GoogleShoppingProvider],
  exports: [GoogleShoppingProvider],
})
export class GoogleShoppingAladinModule {}
