import { Module } from "@nestjs/common";
import { XController } from "./XController";
import { XProvider } from "../../../providers/connector/x/XProvider";

@Module({
  controllers: [XController],
  providers: [XProvider],
  exports: [XProvider],
})
export class XModule {}
