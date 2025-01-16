import { Module } from "@nestjs/common";
import { AirportInformationProvider } from "../../../providers/connector/airport_information/AirportInformationProvider";
import { AirportInformationController } from "./AirportInformationController";

@Module({
  controllers: [AirportInformationController],
  providers: [AirportInformationProvider],
  exports: [AirportInformationProvider],
})
export class AirportInformationModule {}
