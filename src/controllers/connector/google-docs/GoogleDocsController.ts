import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { Prerequisite, RouteIcon, Standalone } from "@wrtnio/decorators";

import { IGoogleDocs } from "@wrtn/connector-api/lib/structures/connector/google_docs/IGoogleDocs";

import { GoogleDocsProvider } from "../../../providers/connector/google_docs/GoogleDocsProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/google-docs")
export class GoogleDocsController {
  constructor(private readonly googleDocsProvider: GoogleDocsProvider) {}
  /**
   * 구글 docs를 생성합니다
   *
   * @summary 구글 docs 생성
   * @param input 생성할 구글 docs 제목
   * @returns 생성된 구글 docs 고유 ID
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Google+Docs_full.svg",
  )
  @core.TypedRoute.Post()
  async createDocs(
    @core.TypedBody() input: IGoogleDocs.ICreateGoogleDocsInput,
  ): Promise<IGoogleDocs.ICreateGoogleDocsOutput> {
    return retry(() => this.googleDocsProvider.createDocs(input))();
  }

  /**
   * 구글 docs에 권한을 부여합니다
   *
   * @summary 구글 docs 권한 부여
   * @param input 구글 docs 권한 부여를 위한 정보
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Google+Docs_full.svg",
  )
  @core.TypedRoute.Post("/permission")
  async permission(
    @core.TypedBody() input: IGoogleDocs.IPermissionGoogleDocsInput,
  ): Promise<void> {
    return retry(() => this.googleDocsProvider.permission(input))();
  }

  /**
   * 구글 docs의 내용을 읽어옵니다
   *
   * @summary 구글 docs 읽기
   *
   * @TODO read other elements if necessary
   * @param id 구글 docs 고유 ID
   * @returns 구글 docs 내용
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Google+Docs_full.svg",
  )
  @core.TypedRoute.Post("get/:id")
  async readDocs(
    /**
     * @title 가져올 docs 파일
     * @description 가져올 docs 파일을 선택해 주세요.
     */
    @Prerequisite({
      neighbor: () => GoogleDocsController.prototype.list,
      jmesPath: "[].{value: id, label: title || ''}",
    })
    @core.TypedParam("id")
    id: string,
    @core.TypedBody()
    input: IGoogleDocs.ISecret,
  ): Promise<IGoogleDocs.IReadGoogleDocsOutput> {
    return retry(() => this.googleDocsProvider.readDocs(id, input))();
  }

  /**
   * 이미 존재하는 구글 docs를 복사하여 새로운 구글 docs를 생성합니다
   *
   * @summary 구글 docs 복사
   * @param input 복사할 구글 docs 링크와 생성할 구글 docs 제목
   * @returns 생성된 구글 docs 고유 ID
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Google+Docs_full.svg",
  )
  @core.TypedRoute.Post("/template")
  async createDocByTemplate(
    @core.TypedBody() input: IGoogleDocs.ICreateDocByTemplateInput,
  ): Promise<IGoogleDocs.ICreateDocByTemplateOutput> {
    return retry(() => this.googleDocsProvider.createDocByTemplate(input))();
  }

  /**
   * 구글 docs를 삭제합니다.
   *
   * @summary 구글 docs 삭제
   * @param id 삭제할 구글 docs 고유 ID
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Google+Docs_full.svg",
  )
  @core.TypedRoute.Delete(":id")
  async deleteById(
    /**
     * @title 삭제할 docs 파일
     * @description 삭제할 docs 파일을 선택해 주세요.
     */
    @Prerequisite({
      neighbor: () => GoogleDocsController.prototype.list,
      jmesPath: "[].{value: id, label: title || ''}",
    })
    @core.TypedParam("id")
    id: string,
    @core.TypedBody()
    input: IGoogleDocs.ISecret,
  ): Promise<void> {
    return retry(() => this.googleDocsProvider.deleteById(id, input))();
  }

  /**
   * 구글 docs 목록을 가져옵니다
   *
   * @summary 구글 docs 목록 가져오기
   * @returns 구글 docs 목록
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Google+Docs_full.svg",
  )
  @core.TypedRoute.Post("get-list")
  async list(
    @core.TypedBody()
    input: IGoogleDocs.ISecret,
  ): Promise<IGoogleDocs.IListGoogleDocsOutput> {
    return retry(() => this.googleDocsProvider.list(input))();
  }

  /**
   * 구글 docs에 텍스트를 추가합니다
   *
   * @summary 구글 docs 텍스트 추가
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Google+Docs_full.svg",
  )
  @core.TypedRoute.Post("/append")
  async append(
    @TypedBody() input: IGoogleDocs.IAppendTextGoogleDocsInput,
  ): Promise<void> {
    return retry(() => this.googleDocsProvider.append(input))();
  }
}
