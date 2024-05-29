import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { ITypeform } from "@wrtn/connector-api/lib/structures/connector/typeform/ITypeform";

import { TypeformProvider } from "../../../providers/connector/typeform/TypeformProvider";

@Controller("connector/typeform")
export class TypeformController {
  /**
   * 워크스페이스를 생성합니다.
   *
   * @summary 타입폼 워크스페이스 생성.
   *
   * @param input 생성할 워크스페이스 제목.
   *
   * @returns 생성된 워크스페이스 ID, 제목, URL.
   *
   * @tag Typeform
   *
   * @internal
   */
  @core.TypedRoute.Post("/workspace")
  async createWorkspace(
    @core.TypedBody() input: ITypeform.ICreateWorkspaceInput,
  ): Promise<ITypeform.ICreateWorkspaceOutput> {
    return TypeformProvider.createWorkspace(input);
  }

  /**
   * 워크스페이스를 삭제합니다.
   *
   * @summary 타입폼 워크스페이스 삭제.
   *
   * @param workspaceId 삭제할 워크스페이스 ID.
   *
   * @tag Typeform
   *
   * @internal
   */
  @core.TypedRoute.Delete("/workspace/:workspaceId")
  async deleteWorkspace(
    @core.TypedParam("workspaceId") workspaceId: string,
  ): Promise<void> {
    return TypeformProvider.deleteWorkspace(workspaceId);
  }

  /**
   * 워크스페이스 정보를 가져옵니다.
   *
   * @summary 타입폼 워크스페이스 정보 가져오기.
   *
   * @returns 워크스페이스 ID, 제목, URL.
   *
   * @tag Typeform
   *
   * @internal
   */
  @core.TypedRoute.Post("/get-workspaces")
  async getWorkspaces(): Promise<ITypeform.IFindWorkspaceOutput[]> {
    return TypeformProvider.getWorkspaces();
  }

  /**
   * 워크스페이스에 빈 폼을 생성합니다.
   *
   * @summary 타입폼 빈 폼 생성.
   *
   * @param input 생성할 폼 제목.
   *
   * @returns 생성된 폼 ID, 제목, 타입.
   *
   * @tag Typeform
   *
   * @internal
   */
  @core.TypedRoute.Post("/empty-form")
  async createEmptyForm(
    @core.TypedBody() input: ITypeform.ICreateEmptyFormInput,
  ): Promise<ITypeform.ICreateFormOutput> {
    return TypeformProvider.createEmptyForm(input);
  }

  /**
   * 워크스페이스에 존재하는 폼 목록을 가져옵니다.
   *
   * @summary 타입폼 폼 목록 가져오기.
   *
   * @returns 폼 ID, 제목.
   *
   * @tag Typeform
   *
   * @internal
   */
  @core.TypedRoute.Post("/get-forms")
  async getForms(): Promise<ITypeform.IFindFormOutput[]> {
    return TypeformProvider.getForms();
  }

  /**
   * 워크스페이스에 존재하는 폼을 복사합니다.
   *
   * @summary 타입폼 폼 복사.
   *
   * @param input 복사하여 새로 만들 폼 이름.
   *
   * @returns 생성된 폼 ID, 제목, 타입.
   *
   * @tag Typeform
   *
   * @internal
   */
  @core.TypedRoute.Post("/duplicate-form")
  async duplicateExistingForm(
    @core.TypedBody() input: ITypeform.IDuplicateExistingFormInput,
  ): Promise<ITypeform.ICreateFormOutput> {
    return TypeformProvider.duplicateExistingForm(input);
  }

  /**
   * 랭킹, 드롭다운, 다중선택 질문의 옵션을 업데이트 할 폼의 필드 정보 가져오기.
   *
   * @summary 타입폼 업데이트 할 폼의 필드 정보 가져오기.
   *
   * @param formId 업데이트 할 폼의 ID.
   *
   * @returns 폼의 필드 ID와 필드명.
   *
   * @tag Typeform
   *
   * @internal
   */
  @core.TypedRoute.Get("/forms/:formId/fields")
  async getFieldsForUpdateFieldValue(
    @core.TypedParam("formId") formId: string,
  ): Promise<ITypeform.IFieldInfoForUpdateFieldValueOutput[]> {
    return TypeformProvider.getFieldsForUpdateFieldValue(formId);
  }

  /**
   * 랭킹, 드롭다운, 다중선택 질문의 옵션을 업데이트합니다.
   *
   * @summary 타입폼 폼 필드 옵션 업데이트.
   *
   * @param input 업데이트할 폼 필드명과 업데이트 할 값.
   *
   * @tag Typeform
   *
   * @internal
   */
  @core.TypedRoute.Put("/forms/:formId")
  async updateFormFieldValue(
    @core.TypedParam("formId") formId: string,
    @core.TypedBody() input: ITypeform.IUpdateFormFieldValueInput,
  ): Promise<ITypeform.IUpdateFormFieldValueOutput> {
    return TypeformProvider.updateFormFieldValue(formId, input);
  }

  /**
   * 폼을 삭제합니다.
   *
   * @summary 타입폼 폼 삭제.
   *
   * @param formId 삭제할 폼 ID.
   *
   * @tag Typeform
   *
   * @internal
   */
  @core.TypedRoute.Delete("/forms/:formId")
  async deleteForm(@core.TypedParam("formId") formId: string): Promise<void> {
    return TypeformProvider.deleteForm(formId);
  }
}
