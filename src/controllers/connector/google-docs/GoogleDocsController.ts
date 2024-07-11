import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { Prerequisite, RouteIcon, Standalone } from "@wrtn/decorators";

import { IGoogleDocs } from "@wrtn/connector-api/lib/structures/connector/google_docs/IGoogleDocs";

import { GoogleDocsProvider } from "../../../providers/connector/google_docs/GoogleDocsProvider";
import { retry } from "../../../utils/retry";

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
   * @tag Google-Docs
   * @tag 구글 닥스
   * @tag 구글 닥
   * @tag 구글 독스
   * @tag 구글 스위트
   * @tag 구글 문서
   * @tag 문서 편집
   * @tag 협업
   * @tag 실시간 협업
   * @tag 문서 공유
   * @tag 클라우드 문서
   * @tag 문서 저장
   * @tag 문서 템플릿
   * @tag 문서 서식
   * @tag 텍스트 서식
   * @tag 문서 다운로드
   * @tag 문서 업로드
   * @tag 문서 수정
   * @tag 파일 변환
   * @tag 문서 내보내기
   * @tag 문서 인쇄
   * @tag 문서 댓글
   * @tag 워드파일 열기
   * @tag PDF로 저장
   * @tag 문서 검색
   * @tag 문서 링크
   * @tag 이미지 삽입
   * @tag 차트 삽입
   * @tag 표 삽입
   * @tag Google Docs
   * @tag Google Doc
   * @tag Google Docs
   * @tag Google Suite
   * @tag Google Document
   * @tag Collaboration
   * @tag Real-time Collaboration
   * @tag Share Document
   * @tag Cloud Document
   * @tag Save Document
   * @tag Document Template
   * @tag Document Format
   * @tag Text Format
   * @tag Download Document
   * @tag Upload Document
   * @tag Edit Document
   * @tag File Conversion
   * @tag Export Document
   * @tag Print Document
   * @tag Document Comments
   * @tag Open Word File
   * @tag Save as PDF
   * @tag Search in Document
   * @tag Document Link
   * @tag Insert Image
   * @tag Insert Chart
   * @tag Insert Table
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_docs.svg",
  )
  @core.TypedRoute.Post()
  async createDocs(
    @core.TypedBody() input: IGoogleDocs.ICreateGoogleDocsInput,
  ): Promise<IGoogleDocs.ICreateGoogleDocsOutput> {
    return retry(() => this.googleDocsProvider.createDocs(input))();
  }

  /**
   * 구글 docs에 권한을 부여합니다.
   *
   * @summary 구글 docs 권한 부여.
   *
   * @param input 구글 docs 권한 부여를 위한 정보.
   *
   * @tag Google-Docs
   * @tag 구글 닥스
   * @tag 구글 닥
   * @tag 구글 독스
   * @tag 구글 스위트
   * @tag 구글 문서
   * @tag 문서 편집
   * @tag 협업
   * @tag 실시간 협업
   * @tag 문서 공유
   * @tag 클라우드 문서
   * @tag 문서 저장
   * @tag 문서 템플릿
   * @tag 문서 서식
   * @tag 텍스트 서식
   * @tag 문서 다운로드
   * @tag 문서 업로드
   * @tag 문서 수정
   * @tag 파일 변환
   * @tag 문서 내보내기
   * @tag 문서 인쇄
   * @tag 문서 댓글
   * @tag 워드파일 열기
   * @tag PDF로 저장
   * @tag 문서 검색
   * @tag 문서 링크
   * @tag 이미지 삽입
   * @tag 차트 삽입
   * @tag 표 삽입
   * @tag Google Docs
   * @tag Google Doc
   * @tag Google Docs
   * @tag Google Suite
   * @tag Google Document
   * @tag Collaboration
   * @tag Real-time Collaboration
   * @tag Share Document
   * @tag Cloud Document
   * @tag Save Document
   * @tag Document Template
   * @tag Document Format
   * @tag Text Format
   * @tag Download Document
   * @tag Upload Document
   * @tag Edit Document
   * @tag File Conversion
   * @tag Export Document
   * @tag Print Document
   * @tag Document Comments
   * @tag Open Word File
   * @tag Save as PDF
   * @tag Search in Document
   * @tag Document Link
   * @tag Insert Image
   * @tag Insert Chart
   * @tag Insert Table
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_docs.svg",
  )
  @core.TypedRoute.Post("/permission")
  async permission(
    @core.TypedBody() input: IGoogleDocs.IPermissionGoogleDocsInput,
  ): Promise<void> {
    return retry(() => this.googleDocsProvider.permission(input))();
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
   * @tag Google-Docs
   * @tag 구글 닥스
   * @tag 구글 닥
   * @tag 구글 독스
   * @tag 구글 스위트
   * @tag 구글 문서
   * @tag 문서 편집
   * @tag 협업
   * @tag 실시간 협업
   * @tag 문서 공유
   * @tag 클라우드 문서
   * @tag 문서 저장
   * @tag 문서 템플릿
   * @tag 문서 서식
   * @tag 텍스트 서식
   * @tag 문서 다운로드
   * @tag 문서 업로드
   * @tag 문서 수정
   * @tag 파일 변환
   * @tag 문서 내보내기
   * @tag 문서 인쇄
   * @tag 문서 댓글
   * @tag 워드파일 열기
   * @tag PDF로 저장
   * @tag 문서 검색
   * @tag 문서 링크
   * @tag 이미지 삽입
   * @tag 차트 삽입
   * @tag 표 삽입
   * @tag Google Docs
   * @tag Google Doc
   * @tag Google Docs
   * @tag Google Suite
   * @tag Google Document
   * @tag Collaboration
   * @tag Real-time Collaboration
   * @tag Share Document
   * @tag Cloud Document
   * @tag Save Document
   * @tag Document Template
   * @tag Document Format
   * @tag Text Format
   * @tag Download Document
   * @tag Upload Document
   * @tag Edit Document
   * @tag File Conversion
   * @tag Export Document
   * @tag Print Document
   * @tag Document Comments
   * @tag Open Word File
   * @tag Save as PDF
   * @tag Search in Document
   * @tag Document Link
   * @tag Insert Image
   * @tag Insert Chart
   * @tag Insert Table
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_docs.svg",
  )
  @core.TypedRoute.Post("get/:id")
  async readDocs(
    @Prerequisite({
      neighbor: () => GoogleDocsController.prototype.list,
      array: (response) => response.data,
      value: (elem) => elem?.id,
      label: (elem) => elem?.title ?? "",
    })
    /**
     * @title 가져올 docs 파일
     * @description 가져올 docs 파일을 선택해 주세요.
     */
    @core.TypedParam("id")
    id: string,
    @core.TypedBody()
    input: IGoogleDocs.ISecret,
  ): Promise<IGoogleDocs.IReadGoogleDocsOutput> {
    return retry(() => this.googleDocsProvider.readDocs(id, input))();
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
   * @tag Google-Docs
   * @tag 구글 닥스
   * @tag 구글 닥
   * @tag 구글 독스
   * @tag 구글 스위트
   * @tag 구글 문서
   * @tag 문서 편집
   * @tag 협업
   * @tag 실시간 협업
   * @tag 문서 공유
   * @tag 클라우드 문서
   * @tag 문서 저장
   * @tag 문서 템플릿
   * @tag 문서 서식
   * @tag 텍스트 서식
   * @tag 문서 다운로드
   * @tag 문서 업로드
   * @tag 문서 수정
   * @tag 파일 변환
   * @tag 문서 내보내기
   * @tag 문서 인쇄
   * @tag 문서 댓글
   * @tag 워드파일 열기
   * @tag PDF로 저장
   * @tag 문서 검색
   * @tag 문서 링크
   * @tag 이미지 삽입
   * @tag 차트 삽입
   * @tag 표 삽입
   * @tag Google Docs
   * @tag Google Doc
   * @tag Google Docs
   * @tag Google Suite
   * @tag Google Document
   * @tag Collaboration
   * @tag Real-time Collaboration
   * @tag Share Document
   * @tag Cloud Document
   * @tag Save Document
   * @tag Document Template
   * @tag Document Format
   * @tag Text Format
   * @tag Download Document
   * @tag Upload Document
   * @tag Edit Document
   * @tag File Conversion
   * @tag Export Document
   * @tag Print Document
   * @tag Document Comments
   * @tag Open Word File
   * @tag Save as PDF
   * @tag Search in Document
   * @tag Document Link
   * @tag Insert Image
   * @tag Insert Chart
   * @tag Insert Table
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_docs.svg",
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
   * @summary 구글 docs 삭제.
   *
   * @param id 삭제할 구글 docs 고유 ID.
   *
   * @tag Google-Docs
   * @tag 구글 닥스
   * @tag 구글 닥
   * @tag 구글 독스
   * @tag 구글 스위트
   * @tag 구글 문서
   * @tag 문서 편집
   * @tag 협업
   * @tag 실시간 협업
   * @tag 문서 공유
   * @tag 클라우드 문서
   * @tag 문서 저장
   * @tag 문서 템플릿
   * @tag 문서 서식
   * @tag 텍스트 서식
   * @tag 문서 다운로드
   * @tag 문서 업로드
   * @tag 문서 수정
   * @tag 파일 변환
   * @tag 문서 내보내기
   * @tag 문서 인쇄
   * @tag 문서 댓글
   * @tag 워드파일 열기
   * @tag PDF로 저장
   * @tag 문서 검색
   * @tag 문서 링크
   * @tag 이미지 삽입
   * @tag 차트 삽입
   * @tag 표 삽입
   * @tag Google Docs
   * @tag Google Doc
   * @tag Google Docs
   * @tag Google Suite
   * @tag Google Document
   * @tag Collaboration
   * @tag Real-time Collaboration
   * @tag Share Document
   * @tag Cloud Document
   * @tag Save Document
   * @tag Document Template
   * @tag Document Format
   * @tag Text Format
   * @tag Download Document
   * @tag Upload Document
   * @tag Edit Document
   * @tag File Conversion
   * @tag Export Document
   * @tag Print Document
   * @tag Document Comments
   * @tag Open Word File
   * @tag Save as PDF
   * @tag Search in Document
   * @tag Document Link
   * @tag Insert Image
   * @tag Insert Chart
   * @tag Insert Table
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_docs.svg",
  )
  @core.TypedRoute.Delete(":id")
  async deleteById(
    @Prerequisite({
      neighbor: () => GoogleDocsController.prototype.list,
      array: (response) => response.data,
      value: (elem) => elem?.id,
      label: (elem) => elem?.title ?? "",
    })
    /**
     * @title 삭제할 docs 파일
     * @description 삭제할 docs 파일을 선택해 주세요.
     */
    @core.TypedParam("id")
    id: string,
    @core.TypedBody()
    input: IGoogleDocs.ISecret,
  ): Promise<void> {
    return retry(() => this.googleDocsProvider.deleteById(id, input))();
  }

  /**
   * 구글 docs 목록을 가져옵니다.
   *
   * @summary 구글 docs 목록 가져오기.
   *
   * @returns 구글 docs 목록.
   *
   * @tag Google-Docs
   * @tag 구글 닥스
   * @tag 구글 닥
   * @tag 구글 독스
   * @tag 구글 스위트
   * @tag 구글 문서
   * @tag 문서 편집
   * @tag 협업
   * @tag 실시간 협업
   * @tag 문서 공유
   * @tag 클라우드 문서
   * @tag 문서 저장
   * @tag 문서 템플릿
   * @tag 문서 서식
   * @tag 텍스트 서식
   * @tag 문서 다운로드
   * @tag 문서 업로드
   * @tag 문서 수정
   * @tag 파일 변환
   * @tag 문서 내보내기
   * @tag 문서 인쇄
   * @tag 문서 댓글
   * @tag 워드파일 열기
   * @tag PDF로 저장
   * @tag 문서 검색
   * @tag 문서 링크
   * @tag 이미지 삽입
   * @tag 차트 삽입
   * @tag 표 삽입
   * @tag Google Docs
   * @tag Google Doc
   * @tag Google Docs
   * @tag Google Suite
   * @tag Google Document
   * @tag Collaboration
   * @tag Real-time Collaboration
   * @tag Share Document
   * @tag Cloud Document
   * @tag Save Document
   * @tag Document Template
   * @tag Document Format
   * @tag Text Format
   * @tag Download Document
   * @tag Upload Document
   * @tag Edit Document
   * @tag File Conversion
   * @tag Export Document
   * @tag Print Document
   * @tag Document Comments
   * @tag Open Word File
   * @tag Save as PDF
   * @tag Search in Document
   * @tag Document Link
   * @tag Insert Image
   * @tag Insert Chart
   * @tag Insert Table
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_docs.svg",
  )
  @core.TypedRoute.Post("get-list")
  async list(
    @core.TypedBody()
    input: IGoogleDocs.ISecret,
  ): Promise<IGoogleDocs.IListGoogleDocsOutput> {
    return retry(() => this.googleDocsProvider.list(input))();
  }

  /**
   * 구글 docs에 텍스트를 추가합니다.
   *
   * @summary 구글 docs 텍스트 추가.
   *
   * @tag Google-Docs
   * @tag 구글 닥스
   * @tag 구글 닥
   * @tag 구글 독스
   * @tag 구글 스위트
   * @tag 구글 문서
   * @tag 문서 편집
   * @tag 협업
   * @tag 실시간 협업
   * @tag 문서 공유
   * @tag 클라우드 문서
   * @tag 문서 저장
   * @tag 문서 템플릿
   * @tag 문서 서식
   * @tag 텍스트 서식
   * @tag 문서 다운로드
   * @tag 문서 업로드
   * @tag 문서 수정
   * @tag 파일 변환
   * @tag 문서 내보내기
   * @tag 문서 인쇄
   * @tag 문서 댓글
   * @tag 워드파일 열기
   * @tag PDF로 저장
   * @tag 문서 검색
   * @tag 문서 링크
   * @tag 이미지 삽입
   * @tag 차트 삽입
   * @tag 표 삽입
   * @tag Google Docs
   * @tag Google Doc
   * @tag Google Docs
   * @tag Google Suite
   * @tag Google Document
   * @tag Collaboration
   * @tag Real-time Collaboration
   * @tag Share Document
   * @tag Cloud Document
   * @tag Save Document
   * @tag Document Template
   * @tag Document Format
   * @tag Text Format
   * @tag Download Document
   * @tag Upload Document
   * @tag Edit Document
   * @tag File Conversion
   * @tag Export Document
   * @tag Print Document
   * @tag Document Comments
   * @tag Open Word File
   * @tag Save as PDF
   * @tag Search in Document
   * @tag Document Link
   * @tag Insert Image
   * @tag Insert Chart
   * @tag Insert Table
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_docs.svg",
  )
  @core.TypedRoute.Post("/append")
  async append(
    @TypedBody() input: IGoogleDocs.IAppendTextGoogleDocsInput,
  ): Promise<void> {
    return retry(() => this.googleDocsProvider.append(input))();
  }
}
