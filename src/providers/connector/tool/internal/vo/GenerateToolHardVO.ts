import { uuid } from "typia/lib/utils/RandomGenerator/RandomGenerator";

import { GenerateToolVO } from "./GenerateToolVO";

export class GenerateToolHardVO extends GenerateToolVO {
  static of(tool: any, text: string) {
    const vo = new GenerateToolHardVO();
    vo.name = tool.title;
    vo.model = vo.handleModelName(tool.model);
    vo.prompt_level = tool.difficulty;
    vo.max_tokens = tool.maxTokens;
    vo.id = tool.toolId.$oid;
    vo.instructions = text;
    vo.requestId = uuid();
    vo.plain_text_embedding = !!tool.isPlainTextEmbedding;

    return vo;
  }
}
