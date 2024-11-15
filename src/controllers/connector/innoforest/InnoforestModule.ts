import { Module } from "@nestjs/common";
import { InnoforestProvider } from "../../../providers/connector/innoforest/InnoforestProvider";
import { InnoforestController } from "./InnoforestController";

@Module({
  controllers: [InnoforestController],
  providers: [InnoforestProvider],
})
export class InnoforestModule {}
