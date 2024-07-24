import core, { TypedBody, TypedParam } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { Prerequisite, RouteIcon } from "@wrtnio/decorators";

import { IFigma } from "@wrtn/connector-api/lib/structures/connector/figma/IFigma";

import { FigmaProvider } from "../../../providers/figma/FigmaProvider";
import { retry } from "../../../utils/retry";

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
    return retry(() => this.figmaProvider.getFiles(input))();
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
    return retry(() => this.figmaProvider.addComment(input))();
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
    return retry(() => this.figmaProvider.getComments(input))();
  }

  /**
   * 특정 프로젝트의 모든 파일을 가져옵니다.
   *
   * @param projectId 조회할 프로젝트의 아이디
   * @param input 프로젝트 조회 조건
   * @returns 프로젝트의 모든 파일
   */
  @core.TypedRoute.Post("projects/:id/get-files")
  async getProjectFiles(
    @Prerequisite({
      neighbor: () => 1,
      jmesPath: "",
    })
    @TypedParam("id")
    projectId: string,
    @TypedBody()
    input: IFigma.Secret,
  ) {
    return retry(() => this.figmaProvider.getProjectFiles(projectId, input))();
  }

  /**
   * 팀 내의 프로젝트를 조회합니다.
   * 인자로는 teamId를 받아야 하는데, 이 프로퍼티는 팀 아이디를 의미하며 figma의 URL 경로를 보고 파악할 수 있습니다.
   * `https://www.figma.com/files/team` 링크 접속 시 `team` 키워드 뒤에 자동으로 숫자가 붙게 되는데 이것이 팀의 아이디입니다.
   * 유저는 여러가지 팀에 속할 수 있으므로, 만일 이 프로젝트들에 대한 조회를 자동화하고 싶지 않다면 다른 팀 아이디를 가져와야 합니다.
   *
   * @summary 팀 내 프로젝트 조회
   * @param input 프로젝트 조회 조건
   * @tag figma
   *
   * @returns 프로젝트 목록
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/figma.svg",
  )
  @core.TypedRoute.Post("get-projects")
  async getProjects(
    @core.TypedBody() input: IFigma.IGetProjectInput,
  ): Promise<IFigma.IGetProejctOutput> {
    return retry(() => this.figmaProvider.getProjects(input))();
  }
}
