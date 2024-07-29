import { Module } from "@nestjs/common";
import { AirportInformationController } from "./AirportInformationController";
import { AirportInformationProvider } from "../../../providers/connector/airport_information/AirportInformationProvider";
import { AwsProvider } from "../../../providers/connector/aws/AwsProvider";

@Module({
  imports: [],
  controllers: [AirportInformationController],
  providers: [AirportInformationProvider, AwsProvider],
  exports: [AirportInformationProvider],
})
export class AirportInformationModule {}
