import { Module } from "@nestjs/common";
import { GoogleTrendProvider } from "../../../providers/connector/google_trend/GoogleTrendProvider";
import { GoogleTrendController } from "./GoogleTrendController";

@Module({
  imports: [],
  providers: [GoogleTrendProvider],
  controllers: [GoogleTrendController],
  exports: [GoogleTrendProvider],
})
export class GoogleTrendModule {}
