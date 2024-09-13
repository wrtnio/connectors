import { Module } from "@nestjs/common";
import { CalendlyController } from "./CalendlyController";
import { CalendlyProvider } from "../../providers/connector/calendly/CalendlyProvider";

@Module({
  controllers: [CalendlyController],
  providers: [CalendlyProvider],
})
export class CalendlyModule {}
