import { Module } from "@nestjs/common";
import { RagProvider } from "../../../providers/connector/rag/RagProvider";
import { XProvider } from "../../../providers/connector/x/XProvider";
import { XController } from "./XController";

@Module({
  controllers: [XController],
  providers: [XProvider, RagProvider],
  exports: [XProvider],
})
export class XModule {}
