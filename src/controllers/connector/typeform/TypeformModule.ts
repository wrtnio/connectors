import { Module } from "@nestjs/common";
import { TypeformController } from "./TypeformController";
import { TypeformProvider } from "../../../providers/connector/typeform/TypeformProvider";

@Module({
  controllers: [TypeformController],
  providers: [TypeformProvider],
  exports: [TypeformProvider],
})
export class TypeformModule {}
