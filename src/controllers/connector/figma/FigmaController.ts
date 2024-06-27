import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon } from "@wrtn/decorators";

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
   * @returns 피그마 파일 목록.
   *
   * @param input 파일을 가져오기 위한 조건 값.
   *
   * @tag figma
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/figma.svg",
  )
  @core.TypedRoute.Post("get-files")
  async readFiles(
    @core.TypedBody() input: IFigma.IReadFileInput,
  ): Promise<IFigma.IReadFileOutput> {
    return this.figmaProvider.getFiles(input);
  }

  /**
   * 댓글을 작성합니다.
   *
   * @summary 캔버스 내 댓글 작성하기.
   *
   * @returns 방금 작성된 댓글의 정보.
   *
   * @param input 댓글을 작성하기 위한 조건 값.
   *
   * @tag figma
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/figma.svg",
  )
  @core.TypedRoute.Post("comments")
  async addComment(
    @core.TypedBody() input: IFigma.IAddCommentInput,
  ): Promise<IFigma.IAddCommentOutput> {
    return this.figmaProvider.addComment(input);
  }

  /**
   * 피그마 댓글들을 가져옵니다.
   *
   * @summary 피그마 댓글 가져오기.
   *
   * @returns 피그마 댓글 목록.
   *
   * @param input 댓글을 가져오기 위한 조건 값.
   *
   * @tag figma
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/figma.svg",
  )
  @core.TypedRoute.Post("get-comments")
  async readComments(
    @core.TypedBody() input: IFigma.IReadCommentInput,
  ): Promise<IFigma.IReadCommentOutput> {
    return this.figmaProvider.getComments(input);
  }
}
