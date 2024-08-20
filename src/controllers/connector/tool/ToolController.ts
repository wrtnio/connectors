import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { ITool } from "@wrtn/connector-api/lib/structures/connector/tool/ITool";

import { ToolProvider } from "../../../providers/connector/tool/ToolProvider";
import { RouteIcon } from "@wrtnio/decorators";

@Controller("connector/tool")
export class ToolController {
  constructor(private readonly toolProvider: ToolProvider) {}

  /**
   * 툴을 사용합니다.
   *
   * 이 커넥터는 특수 목적으로 제작된 커넥터로써, 일반적인 상황에는 사용되지 않습니다.
   *
   * 스튜디오 1.0에서 마이그레이션된 툴을 사용할 때만 사용되는 커넥터 입니다.
   *
   * 일반 워크플로우를 만들 때 사용되지 않는 커넥터입니다.
   *
   * @summary 툴 사용
   *
   * @param id
   * @param input
   *
   * @tag Tool
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
