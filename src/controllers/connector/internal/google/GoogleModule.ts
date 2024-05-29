import { Module } from "@nestjs/common";

import { GoogleProvider } from "../../../../providers/internal/google/GoogleProvider";
import { GoogleController } from "./GoogleController";

@Module({
  controllers: [GoogleController],
  providers: [GoogleProvider],
  exports: [GoogleProvider],
})
export class GoogleModule {}
