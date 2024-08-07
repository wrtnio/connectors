import { Module } from "@nestjs/common";
import { GoogleShoppingUniqloController } from "./GoogleShoppingUniqloController";
import { GoogleShoppingProvider } from "../../../../providers/connector/google_shopping/GoogleShoppingProvider";

@Module({
  imports: [],
  controllers: [GoogleShoppingUniqloController],
  providers: [GoogleShoppingProvider],
  exports: [GoogleShoppingProvider],
})
export class GoogleShoppingUniqloModule {}
