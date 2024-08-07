import { Module } from "@nestjs/common";
import { GoogleShoppingProvider } from "../../../../providers/connector/google_shopping/GoogleShoppingProvider";
import { GoogleShoppingTwentyNineCentimeterController } from "./GoogleShoppingTwentyNineCentimeterController";

@Module({
  imports: [],
  controllers: [GoogleShoppingTwentyNineCentimeterController],
  providers: [GoogleShoppingProvider],
  exports: [GoogleShoppingProvider],
})
export class GoogleShoppingTwentyNineCentimeterModule {}
