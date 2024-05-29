import { Module } from "@nestjs/common";

import { RagProvider } from "../../../providers/connector/rag/RagProvider";
import { RagController } from "./RagController";

@Module({
  controllers: [RagController],
  providers: [RagProvider],
  exports: [RagProvider],
})
export class RagModule {}
