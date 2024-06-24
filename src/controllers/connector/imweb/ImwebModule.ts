import { Module } from "@nestjs/common";

import { ImwebController } from "./ImwebController";

@Module({
  controllers: [ImwebController],
})
export class ImwebModule {}
