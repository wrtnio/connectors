import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { ITool } from "@wrtn/connector-api/lib/structures/connector/tool/ITool";

import { ToolProvider } from "../../../providers/connector/tool/ToolProvider";

@Controller("connector/tool")
export class ToolController {
  constructor(private readonly toolProvider: ToolProvider) {}

  /**
   * 툴을 사용합니다.
   *
   * @summary 툴 사용
   *
   * @param id
   * @param input
   *
   * @tag Tool
   */
  @core.TypedRoute.Post(":id/generate")
  async generateTool(
    @core.TypedParam("id") id: string,
    @core.TypedBody() input: ITool.IGenerateInput,
  ): Promise<ITool.IGenerateOutput> {
    return this.toolProvider.generateTool(id, input);
  }
}
