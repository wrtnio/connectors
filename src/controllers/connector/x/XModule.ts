import { Module } from "@nestjs/common";
import { XController } from "./XController";
import { XProvider } from "../../../providers/connector/x/XProvider";
import { AwsProvider } from "../../../providers/connector/aws/AwsProvider";
import { RagProvider } from "../../../providers/connector/rag/RagProvider";

@Module({
  controllers: [XController],
  providers: [XProvider, AwsProvider, RagProvider],
  exports: [XProvider],
})
export class XModule {}
