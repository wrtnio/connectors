import { Module } from "@nestjs/common";
import { CalendlyController } from "./CalendlyController";

@Module({
  controllers: [CalendlyController],
  providers: [],
})
export class CalendlyModule {}
