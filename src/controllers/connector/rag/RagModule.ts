import { Module } from "@nestjs/common";

import { AwsProvider } from "../../../providers/connector/aws/AwsProvider";
import { RagProvider } from "../../../providers/connector/rag/RagProvider";
import { RagController } from "./RagController";

@Module({
  controllers: [RagController],
  providers: [RagProvider, AwsProvider],
  exports: [RagProvider],
})
export class RagModule {}
