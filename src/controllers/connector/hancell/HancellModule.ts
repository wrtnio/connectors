import { Module } from "@nestjs/common";

import { HancellProvider } from "../../../providers/connector/hancell/HancellProvider";
import { HancellController } from "./HancellController";

@Module({
  controllers: [HancellController],
  providers: [HancellProvider],
})
export class HancellModule {}
