import { Module } from "@nestjs/common";

import { ToolProvider } from "../../../providers/connector/tool/ToolProvider";
import { ToolController } from "./ToolController";

@Module({
  controllers: [ToolController],
  providers: [ToolProvider],
})
export class ToolModule {}
