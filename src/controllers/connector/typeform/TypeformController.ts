import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { ITypeform } from "@wrtn/connector-api/lib/structures/connector/typeform/ITypeform";

import { TypeformProvider } from "../../../providers/connector/typeform/TypeformProvider";
import { Try, createResponseForm } from "../../../utils/createResponseForm";
import { retry } from "../../../utils/retry";

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
   * @tag 타입폼
   * @tag 설문조사
   * @tag 온라인 폼
   * @tag 설문지
   * @tag 고객 만족도 조사
   * @tag 설문 양식
   * @tag 퀴즈
   * @tag 설문조사
   * @tag 응답 확인
   * @tag 응답 관리
   * @tag 응답자 관리
   * @tag 설문 분석
   * @tag 응답 데이터
   * @tag 설문지 템플릿
   * @tag 설문 응답
   * @tag 설문지 공유
   * @tag 설문조사 결과
   * @tag 질문지 작성
   * @tag 인터뷰 신청
   * @tag 응답 수집
   * @tag 행사
   * @tag 피드백
   * @tag 사용자 조사
   * @tag 이벤트 피드백
   * @tag 행사 피드백
   * @tag Typeform
   * @tag Survey
   * @tag Online Form
   * @tag Questionnaire
   * @tag Customer Satisfaction Survey
   * @tag Survey Form
   * @tag Quiz
   * @tag Survey Responses
   * @tag Manage Responses
   * @tag Manage Respondents
   * @tag Survey Analysis
   * @tag Response Data
   * @tag Survey Template
   * @tag Survey Answers
   * @tag Share Survey
   * @tag Survey Results
   * @tag Create Questionnaire
   * @tag Interview Application
   * @tag Collect Responses
   * @tag Event
   * @tag Feedback
   * @tag User Survey
   * @tag Event Feedback
   *
   * @internal
   */
  @core.TypedRoute.Post("/workspace")
  async createWorkspace(
    @core.TypedBody() input: ITypeform.ICreateWorkspaceInput,
  ): Promise<Try<ITypeform.ICreateWorkspaceOutput>> {
    const data = await retry(() => TypeformProvider.createWorkspace(input))();
    return createResponseForm(data);
  }

  /**
   * 워크스페이스를 삭제합니다.
   *
   * @summary 타입폼 워크스페이스 삭제.
   *
   * @param workspaceId 삭제할 워크스페이스 ID.
   *
   * @tag Typeform
   * @tag 타입폼
   * @tag 설문조사
   * @tag 온라인 폼
   * @tag 설문지
   * @tag 고객 만족도 조사
   * @tag 설문 양식
   * @tag 퀴즈
   * @tag 설문조사
   * @tag 응답 확인
   * @tag 응답 관리
   * @tag 응답자 관리
   * @tag 설문 분석
   * @tag 응답 데이터
   * @tag 설문지 템플릿
   * @tag 설문 응답
   * @tag 설문지 공유
   * @tag 설문조사 결과
   * @tag 질문지 작성
   * @tag 인터뷰 신청
   * @tag 응답 수집
   * @tag 행사
   * @tag 피드백
   * @tag 사용자 조사
   * @tag 이벤트 피드백
   * @tag 행사 피드백
   * @tag Typeform
   * @tag Survey
   * @tag Online Form
   * @tag Questionnaire
   * @tag Customer Satisfaction Survey
   * @tag Survey Form
   * @tag Quiz
   * @tag Survey Responses
   * @tag Manage Responses
   * @tag Manage Respondents
   * @tag Survey Analysis
   * @tag Response Data
   * @tag Survey Template
   * @tag Survey Answers
   * @tag Share Survey
   * @tag Survey Results
   * @tag Create Questionnaire
   * @tag Interview Application
   * @tag Collect Responses
   * @tag Event
   * @tag Feedback
   * @tag User Survey
   * @tag Event Feedback
   *
   * @internal
   */
  @core.TypedRoute.Delete("/workspace/:workspaceId")
  async deleteWorkspace(@core.TypedParam("workspaceId") workspaceId: string): Promise<Try<void>> {
    const data = await retry(() => TypeformProvider.deleteWorkspace(workspaceId))();
    return createResponseForm(data);
  }

  /**
   * 워크스페이스 정보를 가져옵니다.
   *
   * @summary 타입폼 워크스페이스 정보 가져오기.
   *
   * @returns 워크스페이스 ID, 제목, URL.
   *
   * @tag Typeform
   * @tag 타입폼
   * @tag 설문조사
   * @tag 온라인 폼
   * @tag 설문지
   * @tag 고객 만족도 조사
   * @tag 설문 양식
   * @tag 퀴즈
   * @tag 설문조사
   * @tag 응답 확인
   * @tag 응답 관리
   * @tag 응답자 관리
   * @tag 설문 분석
   * @tag 응답 데이터
   * @tag 설문지 템플릿
   * @tag 설문 응답
   * @tag 설문지 공유
   * @tag 설문조사 결과
   * @tag 질문지 작성
   * @tag 인터뷰 신청
   * @tag 응답 수집
   * @tag 행사
   * @tag 피드백
   * @tag 사용자 조사
   * @tag 이벤트 피드백
   * @tag 행사 피드백
   * @tag Typeform
   * @tag Survey
   * @tag Online Form
   * @tag Questionnaire
   * @tag Customer Satisfaction Survey
   * @tag Survey Form
   * @tag Quiz
   * @tag Survey Responses
   * @tag Manage Responses
   * @tag Manage Respondents
   * @tag Survey Analysis
   * @tag Response Data
   * @tag Survey Template
   * @tag Survey Answers
   * @tag Share Survey
   * @tag Survey Results
   * @tag Create Questionnaire
   * @tag Interview Application
   * @tag Collect Responses
   * @tag Event
   * @tag Feedback
   * @tag User Survey
   * @tag Event Feedback
   *
   * @internal
   */
  @core.TypedRoute.Post("/get-workspaces")
  async getWorkspaces(): Promise<Try<ITypeform.IFindWorkspaceOutput[]>> {
    const data = await retry(() => TypeformProvider.getWorkspaces())();
    return createResponseForm(data);
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
   * @tag 타입폼
   * @tag 설문조사
   * @tag 온라인 폼
   * @tag 설문지
   * @tag 고객 만족도 조사
   * @tag 설문 양식
   * @tag 퀴즈
   * @tag 설문조사
   * @tag 응답 확인
   * @tag 응답 관리
   * @tag 응답자 관리
   * @tag 설문 분석
   * @tag 응답 데이터
   * @tag 설문지 템플릿
   * @tag 설문 응답
   * @tag 설문지 공유
   * @tag 설문조사 결과
   * @tag 질문지 작성
   * @tag 인터뷰 신청
   * @tag 응답 수집
   * @tag 행사
   * @tag 피드백
   * @tag 사용자 조사
   * @tag 이벤트 피드백
   * @tag 행사 피드백
   * @tag Typeform
   * @tag Survey
   * @tag Online Form
   * @tag Questionnaire
   * @tag Customer Satisfaction Survey
   * @tag Survey Form
   * @tag Quiz
   * @tag Survey Responses
   * @tag Manage Responses
   * @tag Manage Respondents
   * @tag Survey Analysis
   * @tag Response Data
   * @tag Survey Template
   * @tag Survey Answers
   * @tag Share Survey
   * @tag Survey Results
   * @tag Create Questionnaire
   * @tag Interview Application
   * @tag Collect Responses
   * @tag Event
   * @tag Feedback
   * @tag User Survey
   * @tag Event Feedback
   *
   * @internal
   */
  @core.TypedRoute.Post("/empty-form")
  async createEmptyForm(
    @core.TypedBody() input: ITypeform.ICreateEmptyFormInput,
  ): Promise<Try<ITypeform.ICreateFormOutput>> {
    const data = await retry(() => TypeformProvider.createEmptyForm(input))();
    return createResponseForm(data);
  }

  /**
   * 워크스페이스에 존재하는 폼 목록을 가져옵니다.
   *
   * @summary 타입폼 폼 목록 가져오기.
   *
   * @returns 폼 ID, 제목.
   *
   * @tag Typeform
   * @tag 타입폼
   * @tag 설문조사
   * @tag 온라인 폼
   * @tag 설문지
   * @tag 고객 만족도 조사
   * @tag 설문 양식
   * @tag 퀴즈
   * @tag 설문조사
   * @tag 응답 확인
   * @tag 응답 관리
   * @tag 응답자 관리
   * @tag 설문 분석
   * @tag 응답 데이터
   * @tag 설문지 템플릿
   * @tag 설문 응답
   * @tag 설문지 공유
   * @tag 설문조사 결과
   * @tag 질문지 작성
   * @tag 인터뷰 신청
   * @tag 응답 수집
   * @tag 행사
   * @tag 피드백
   * @tag 사용자 조사
   * @tag 이벤트 피드백
   * @tag 행사 피드백
   * @tag Typeform
   * @tag Survey
   * @tag Online Form
   * @tag Questionnaire
   * @tag Customer Satisfaction Survey
   * @tag Survey Form
   * @tag Quiz
   * @tag Survey Responses
   * @tag Manage Responses
   * @tag Manage Respondents
   * @tag Survey Analysis
   * @tag Response Data
   * @tag Survey Template
   * @tag Survey Answers
   * @tag Share Survey
   * @tag Survey Results
   * @tag Create Questionnaire
   * @tag Interview Application
   * @tag Collect Responses
   * @tag Event
   * @tag Feedback
   * @tag User Survey
   * @tag Event Feedback
   *
   * @internal
   */
  @core.TypedRoute.Post("/get-forms")
  async getForms(): Promise<Try<ITypeform.IFindFormOutput[]>> {
    const data = await retry(() => TypeformProvider.getForms())();
    return createResponseForm(data);
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
   * @tag 타입폼
   * @tag 설문조사
   * @tag 온라인 폼
   * @tag 설문지
   * @tag 고객 만족도 조사
   * @tag 설문 양식
   * @tag 퀴즈
   * @tag 설문조사
   * @tag 응답 확인
   * @tag 응답 관리
   * @tag 응답자 관리
   * @tag 설문 분석
   * @tag 응답 데이터
   * @tag 설문지 템플릿
   * @tag 설문 응답
   * @tag 설문지 공유
   * @tag 설문조사 결과
   * @tag 질문지 작성
   * @tag 인터뷰 신청
   * @tag 응답 수집
   * @tag 행사
   * @tag 피드백
   * @tag 사용자 조사
   * @tag 이벤트 피드백
   * @tag 행사 피드백
   * @tag Typeform
   * @tag Survey
   * @tag Online Form
   * @tag Questionnaire
   * @tag Customer Satisfaction Survey
   * @tag Survey Form
   * @tag Quiz
   * @tag Survey Responses
   * @tag Manage Responses
   * @tag Manage Respondents
   * @tag Survey Analysis
   * @tag Response Data
   * @tag Survey Template
   * @tag Survey Answers
   * @tag Share Survey
   * @tag Survey Results
   * @tag Create Questionnaire
   * @tag Interview Application
   * @tag Collect Responses
   * @tag Event
   * @tag Feedback
   * @tag User Survey
   * @tag Event Feedback
   *
   * @internal
   */
  @core.TypedRoute.Post("/duplicate-form")
  async duplicateExistingForm(
    @core.TypedBody() input: ITypeform.IDuplicateExistingFormInput,
  ): Promise<Try<ITypeform.ICreateFormOutput>> {
    const data = await retry(() => TypeformProvider.duplicateExistingForm(input))();
    return createResponseForm(data);
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
   * @tag 타입폼
   * @tag 설문조사
   * @tag 온라인 폼
   * @tag 설문지
   * @tag 고객 만족도 조사
   * @tag 설문 양식
   * @tag 퀴즈
   * @tag 설문조사
   * @tag 응답 확인
   * @tag 응답 관리
   * @tag 응답자 관리
   * @tag 설문 분석
   * @tag 응답 데이터
   * @tag 설문지 템플릿
   * @tag 설문 응답
   * @tag 설문지 공유
   * @tag 설문조사 결과
   * @tag 질문지 작성
   * @tag 인터뷰 신청
   * @tag 응답 수집
   * @tag 행사
   * @tag 피드백
   * @tag 사용자 조사
   * @tag 이벤트 피드백
   * @tag 행사 피드백
   * @tag Typeform
   * @tag Survey
   * @tag Online Form
   * @tag Questionnaire
   * @tag Customer Satisfaction Survey
   * @tag Survey Form
   * @tag Quiz
   * @tag Survey Responses
   * @tag Manage Responses
   * @tag Manage Respondents
   * @tag Survey Analysis
   * @tag Response Data
   * @tag Survey Template
   * @tag Survey Answers
   * @tag Share Survey
   * @tag Survey Results
   * @tag Create Questionnaire
   * @tag Interview Application
   * @tag Collect Responses
   * @tag Event
   * @tag Feedback
   * @tag User Survey
   * @tag Event Feedback
   *
   * @internal
   */
  @core.TypedRoute.Get("/forms/:formId/fields")
  async getFieldsForUpdateFieldValue(
    @core.TypedParam("formId") formId: string,
  ): Promise<Try<ITypeform.IFieldInfoForUpdateFieldValueOutput[]>> {
    const data = await retry(() => TypeformProvider.getFieldsForUpdateFieldValue(formId))();
    return createResponseForm(data);
  }

  /**
   * 랭킹, 드롭다운, 다중선택 질문의 옵션을 업데이트합니다.
   *
   * @summary 타입폼 폼 필드 옵션 업데이트.
   *
   * @param input 업데이트할 폼 필드명과 업데이트 할 값.
   *
   * @tag Typeform
   * @tag 타입폼
   * @tag 설문조사
   * @tag 온라인 폼
   * @tag 설문지
   * @tag 고객 만족도 조사
   * @tag 설문 양식
   * @tag 퀴즈
   * @tag 설문조사
   * @tag 응답 확인
   * @tag 응답 관리
   * @tag 응답자 관리
   * @tag 설문 분석
   * @tag 응답 데이터
   * @tag 설문지 템플릿
   * @tag 설문 응답
   * @tag 설문지 공유
   * @tag 설문조사 결과
   * @tag 질문지 작성
   * @tag 인터뷰 신청
   * @tag 응답 수집
   * @tag 행사
   * @tag 피드백
   * @tag 사용자 조사
   * @tag 이벤트 피드백
   * @tag 행사 피드백
   * @tag Typeform
   * @tag Survey
   * @tag Online Form
   * @tag Questionnaire
   * @tag Customer Satisfaction Survey
   * @tag Survey Form
   * @tag Quiz
   * @tag Survey Responses
   * @tag Manage Responses
   * @tag Manage Respondents
   * @tag Survey Analysis
   * @tag Response Data
   * @tag Survey Template
   * @tag Survey Answers
   * @tag Share Survey
   * @tag Survey Results
   * @tag Create Questionnaire
   * @tag Interview Application
   * @tag Collect Responses
   * @tag Event
   * @tag Feedback
   * @tag User Survey
   * @tag Event Feedback
   *
   * @internal
   */
  @core.TypedRoute.Put("/forms/:formId")
  async updateFormFieldValue(
    @core.TypedParam("formId") formId: string,
    @core.TypedBody() input: ITypeform.IUpdateFormFieldValueInput,
  ): Promise<Try<ITypeform.IUpdateFormFieldValueOutput>> {
    const data = await retry(() => TypeformProvider.updateFormFieldValue(formId, input))();
    return createResponseForm(data);
  }

  /**
   * 폼을 삭제합니다.
   *
   * @summary 타입폼 폼 삭제.
   *
   * @param formId 삭제할 폼 ID.
   *
   * @tag Typeform
   * @tag 타입폼
   * @tag 설문조사
   * @tag 온라인 폼
   * @tag 설문지
   * @tag 고객 만족도 조사
   * @tag 설문 양식
   * @tag 퀴즈
   * @tag 설문조사
   * @tag 응답 확인
   * @tag 응답 관리
   * @tag 응답자 관리
   * @tag 설문 분석
   * @tag 응답 데이터
   * @tag 설문지 템플릿
   * @tag 설문 응답
   * @tag 설문지 공유
   * @tag 설문조사 결과
   * @tag 질문지 작성
   * @tag 인터뷰 신청
   * @tag 응답 수집
   * @tag 행사
   * @tag 피드백
   * @tag 사용자 조사
   * @tag 이벤트 피드백
   * @tag 행사 피드백
   * @tag Typeform
   * @tag Survey
   * @tag Online Form
   * @tag Questionnaire
   * @tag Customer Satisfaction Survey
   * @tag Survey Form
   * @tag Quiz
   * @tag Survey Responses
   * @tag Manage Responses
   * @tag Manage Respondents
   * @tag Survey Analysis
   * @tag Response Data
   * @tag Survey Template
   * @tag Survey Answers
   * @tag Share Survey
   * @tag Survey Results
   * @tag Create Questionnaire
   * @tag Interview Application
   * @tag Collect Responses
   * @tag Event
   * @tag Feedback
   * @tag User Survey
   * @tag Event Feedback
   *
   * @internal
   */
  @core.TypedRoute.Delete("/forms/:formId")
  async deleteForm(@core.TypedParam("formId") formId: string): Promise<Try<void>> {
    const data = await retry(() => TypeformProvider.deleteForm(formId))();
    return createResponseForm(data);
  }
}
