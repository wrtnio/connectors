import { Module } from "@nestjs/common";
import { GoogleShoppingMusinsaController } from "./GoogleShoppingMusinsaController";
import { GoogleShoppingProvider } from "../../../../providers/connector/google_shopping/GoogleShoppingProvider";

@Module({
  imports: [],
  controllers: [GoogleShoppingMusinsaController],
  providers: [GoogleShoppingProvider],
  exports: [GoogleShoppingProvider],
})
export class GoogleShoppingMusinsaModule {}
