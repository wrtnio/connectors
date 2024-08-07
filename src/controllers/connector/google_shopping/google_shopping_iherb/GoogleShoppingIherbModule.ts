import { Module } from "@nestjs/common";
import { GoogleShoppingIherbController } from "./GoogleShoppingIherbController";
import { GoogleShoppingProvider } from "../../../../providers/connector/google_shopping/GoogleShoppingProvider";

@Module({
  imports: [],
  controllers: [GoogleShoppingIherbController],
  providers: [GoogleShoppingProvider],
  exports: [GoogleShoppingProvider],
})
export class GoogleShoppingIherbModule {}
