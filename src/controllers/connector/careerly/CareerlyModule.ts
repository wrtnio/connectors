import { Module } from "@nestjs/common";
import { GoogleSearchProvider } from "../../../providers/connector/google_search/GoogleSearchProvider";
import { CareerlyProvider } from "../../../providers/connector/careerly/CarrerlyProvider";
import { CareerlyController } from "./CareerlyController";

@Module({
  controllers: [CareerlyController],
  providers: [GoogleSearchProvider, CareerlyProvider],
})
export class CareerlyModule {}
