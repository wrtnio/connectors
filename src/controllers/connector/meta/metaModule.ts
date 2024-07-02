import { Module } from "@nestjs/common";

import { MetaController } from "./metaController";

@Module({
  controllers: [MetaController],
})
export class MetaModule {}
