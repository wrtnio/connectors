import { Injectable, NotFoundException } from "@nestjs/common";
import axios from "axios";
import fs from "fs";

import { ITool } from "@wrtn/connector-api/lib/structures/connector/tool/ITool";

import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { GenerateToolEasyVO } from "./internal/vo/GenerateToolEasyVO";
import { GenerateToolHardVO } from "./internal/vo/GenerateToolHardVO";

@Injectable()
export class ToolProvider {
  private readonly SHAKESPEARE_URL = ConnectorGlobal.env.SHAKESPEARE_URL;
  async generateTool(id: string, input: ITool.IGenerateInput): Promise<ITool.IGenerateOutput> {
    const docStr = fs.readFileSync("assets/raw/studio1-tool-store-map.json", "utf8");
    const jsonArr = JSON.parse(docStr);
    const dataMap = new Map<string, object>(jsonArr);

    /**
     * 기존 studio 1.0 툴의 타입을 가진다.
     */
    const tool: any = dataMap.get(id);
    if (!tool) {
      throw new NotFoundException(`Tool with id ${id} not found`);
    }
    const inputArr = this.convertObjectToArray(input);
    const { difficulty, promptForEasy, promptForDifficult } = tool;
    const isDifficultyHard = difficulty === "hard";
    const isPlainTextEmbedding = !!tool.additionalInformation;
    let text = isDifficultyHard ? promptForDifficult : promptForEasy.userInput;

    for (const input of inputArr) {
      let value = input.value;
      if (Array.isArray(input.value)) {
        value = input.value.join(", ");
      }
      text = text?.replace(`#${input.name}`, input.value);
    }

    if (isDifficultyHard) {
      const vo = GenerateToolHardVO.of(tool, text);
      return { content: await this.requestToolGenerate(vo) };
    }

    const vo = GenerateToolEasyVO.of(tool, text);
    return { content: await this.requestToolGenerate(vo) };
  }

  protected convertObjectToArray(obj: {
    [key: string]: string | string[];
  }): Array<{ name: string; value: string | string[] }> {
    return Object.entries(obj).map(([key, value]) => ({
      name: key,
      value: value,
    }));
  }

  private async requestToolGenerate(tool: GenerateToolEasyVO | GenerateToolHardVO) {
    const res = await axios.post(`${this.SHAKESPEARE_URL}/studio/tool/${tool.id}`, tool, {
      headers: {
        "x-request-id": tool.requestId,
      },
    });

    return res.data.content;
  }
}
