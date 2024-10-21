import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { ITool } from "@wrtn/connector-api/lib/structures/connector/tool/ITool";

import { RouteIcon } from "@wrtnio/decorators";
import { ToolProvider } from "../../../providers/connector/tool/ToolProvider";

@Controller("connector/tool")
export class ToolController {
  constructor(private readonly toolProvider: ToolProvider) {}

  /**
   * Use tool
   *
   * This connector is a special purpose connector and is not used in general situations.
   * This connector is only used when using tools migrated from Studio 1.0.
   * This connector is not used when creating general workflows.
   *
   * @summary Use tool
   * @param id
   * @param input
   */
  @RouteIcon(
    "htthttps://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/_Studio1.0Tool_full.svg",
  )
  @core.TypedRoute.Post(":id/generate")
  async generateTool(
    @core.TypedParam("id") id: string,
    @core.TypedBody() input: ITool.IGenerateInput,
  ): Promise<ITool.IGenerateOutput> {
    return this.toolProvider.generateTool(id, input);
  }
}
