import { Module } from "@nestjs/common";
import { GoogleShoppingOliveYoungController } from "./GoogleShoppingOliveYoungController";
import { GoogleShoppingProvider } from "../../../../providers/connector/google_shopping/GoogleShoppingProvider";

@Module({
  imports: [],
  controllers: [GoogleShoppingOliveYoungController],
  providers: [GoogleShoppingProvider],
  exports: [GoogleShoppingProvider],
})
export class GoogleShoppingOliveYoungModule {}
