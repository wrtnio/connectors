import { Module } from "@nestjs/common";
import { AirportInformationProvider } from "../../../providers/connector/airport_information/AirportInformationProvider";
import { AwsModule } from "../aws/AwsModule";
import { AirportInformationController } from "./AirportInformationController";

@Module({
  imports: [AwsModule],
  controllers: [AirportInformationController],
  providers: [AirportInformationProvider],
  exports: [AirportInformationProvider],
})
export class AirportInformationModule {}
