import { Module } from "@nestjs/common";

import { GoogleDocsController } from "./GoogleDocsController";

@Module({
  controllers: [GoogleDocsController],
})
export class GoogleDocsModule {}
