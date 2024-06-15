import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { Standalone } from "@wrtn/decorators";

import { ICommon } from "@wrtn/connector-api/lib/structures/connector/common/ISecretValue";
import { IGoogleDocs } from "@wrtn/connector-api/lib/structures/connector/google_docs/IGoogleDocs";

import { GoogleDocsProvider } from "../../../providers/connector/google_docs/GoogleDocsProvider";

@Controller("connector/google-docs")
export class GoogleDocsController {
  constructor(private readonly googleDocsProvider: GoogleDocsProvider) {}
  /**
   * 구글 docs를 생성합니다.
   *
   * @summary 구글 docs 생성.
   *
   * @param input 생성할 구글 docs 제목.
   *
   * @returns 생성된 구글 docs 고유 ID.
   *
   * @tag Google Docs
   */
  @Standalone()
  @core.TypedRoute.Post()
  async createDocs(
    @core.TypedBody() input: IGoogleDocs.ICreateGoogleDocsInput,
  ): Promise<IGoogleDocs.ICreateGoogleDocsOutput> {
    return await this.googleDocsProvider.createDocs(input);
  }

  /**
   * 구글 docs에 권한을 부여합니다.
   *
   * @summary 구글 docs 권한 부여.
   *
   * @param input 구글 docs 권한 부여를 위한 정보.
   *
   * @tag Google Docs
   */
  @core.TypedRoute.Post("/permission")
  async permission(
    @core.TypedBody() input: IGoogleDocs.IPermissionGoogleDocsInput,
  ): Promise<void> {
    return await this.googleDocsProvider.permission(input);
  }

  /**
   * 구글 docs의 내용을 읽어옵니다.
   *
   * @summary 구글 docs 읽기.
   *
   * @TODO read other elements if necessary
   *
   * @param id 구글 docs 고유 ID.
   *
   * @returns 구글 docs 내용.
   *
   * @tag Google Docs
   */
  @core.TypedRoute.Post("get/:id")
  async readDocs(
    @core.TypedParam("id") id: string,
    @core.TypedBody()
    input: ICommon.ISecret<
      "google",
      [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/documents",
      ]
    >,
  ): Promise<IGoogleDocs.IReadGoogleDocsOutput> {
    return await this.googleDocsProvider.readDocs(id, input);
  }

  /**
   * 이미 존재하는 구글 docs를 복사하여 새로운 구글 docs를 생성합니다.
   *
   * @summary 구글 docs 복사.
   *
   * @param input 복사할 구글 docs 링크와 생성할 구글 docs 제목.
   *
   * @returns 생성된 구글 docs 고유 ID.
   *
   * @tag Google Docs
   */
  @core.TypedRoute.Post("/template")
  async createDocByTemplate(
    @core.TypedBody() input: IGoogleDocs.ICreateDocByTemplateInput,
  ): Promise<IGoogleDocs.ICreateDocByTemplateOutput> {
    return await this.googleDocsProvider.createDocByTemplate(input);
  }

  /**
   * 구글 docs를 삭제합니다.
   *
   * @summary 구글 docs 삭제.
   *
   * @param id 삭제할 구글 docs 고유 ID.
   *
   * @tag Google Docs
   */
  @core.TypedRoute.Delete(":id")
  async deleteById(
    @core.TypedParam("id") id: string,
    @core.TypedBody()
    input: ICommon.ISecret<
      "google",
      [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/documents",
      ]
    >,
  ): Promise<void> {
    return await this.googleDocsProvider.deleteById(id, input);
  }

  /**
   * 구글 docs 목록을 가져옵니다.
   *
   * @summary 구글 docs 목록 가져오기.
   *
   * @returns 구글 docs 목록.
   *
   * @tag Google Docs
   */
  @Standalone()
  @core.TypedRoute.Post("get-list")
  async list(
    @core.TypedBody()
    input: ICommon.ISecret<
      "google",
      [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/documents",
      ]
    >,
  ): Promise<IGoogleDocs.IListGoogleDocsOutput> {
    return await this.googleDocsProvider.list(input);
  }

  /**
   * 구글 docs에 텍스트를 추가합니다.
   *
   * @summary 구글 docs 텍스트 추가.
   *
   * @tag Google Docs
   */
  @core.TypedRoute.Post("/append")
  async append(
    @TypedBody() input: IGoogleDocs.IAppendTextGoogleDocsInput,
  ): Promise<void> {
    return await this.googleDocsProvider.append(input);
  }
}
