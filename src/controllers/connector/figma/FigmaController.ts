import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IFigma } from "@wrtn/connector-api/lib/structures/connector/figma/IFigma";

import { FigmaProvider } from "../../../providers/figma/FigmaProvider";

@Controller("connector/figma")
export class FigmaController {
  constructor(private readonly figmaProvider: FigmaProvider) {}

  /**
   * 피그마 파일들을 가져옵니다.
   *
   * @summary 피그마 파일 가져오기.
   *
   * @returns 피그마 파일 목록
   *
   * @param input
   * @returns
   */
  @core.TypedRoute.Post("get-files")
  async readFiles(
    @core.TypedBody() input: IFigma.IReadFileInput,
  ): Promise<IFigma.IReadFileOutput> {
    return null!;
  }
}
