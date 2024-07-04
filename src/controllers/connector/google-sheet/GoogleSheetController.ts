import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtn/decorators";

import { IGoogleSheet } from "@wrtn/connector-api/lib/structures/connector/google_sheet/IGoogleSheet";

import { GoogleSheetProvider } from "../../../providers/connector/google_sheet/GoogleSheetProvider";
import { Try, createResponseForm } from "../../../utils/createResponseForm";
import { retry } from "../../../utils/retry";

@Controller("connector/google-sheet")
export class GoogleSheetController {
  constructor(private readonly googleSheetProvider: GoogleSheetProvider) {}

  /**
   * 구글 시트의 헤더 정보를 가져옵니다.
   *
   * @summary 구글 시트 헤더 정보 가져오기.
   *
   * @param input 구글 시트 URL과 가져올 헤더 index.
   *
   * @returns 구글 시트 헤더 정보.
   *
   * @tag Google-Sheet
   * @tag 구글 시트
   * @tag 스프레드 시트
   * @tag 엑셀
   * @tag 엑셀 파일
   * @tag 데이터 입력
   * @tag 데이터 분석
   * @tag 차트 생성
   * @tag 엑셀 함수
   * @tag 함수 생성
   * @tag 셀 서식
   * @tag 데이터 필터
   * @tag 피벗 테이블
   * @tag 데이터 시각화
   * @tag 조건부 서식
   * @tag 파일 내보내기
   * @tag 파일 가져오기
   * @tag CSV 불러오기
   * @tag 데이터 정렬
   * @tag 데이터 정리
   * @tag 통계
   * @tag 통계 계산
   * @tag 매크로
   * @tag 자동화 스크립트
   * @tag 시트 복제
   * @tag 시트 삭제
   * @tag 시트 생성
   * @tag 시트 이름 수정
   * @tag 시트 잠금
   * @tag 시트 공유
   * @tag 데이터 추출
   * @tag 시트 병합
   * @tag 데이터 추가
   * @tag 데이터 관리
   * @tag Google Sheets
   * @tag Spreadsheet
   * @tag Excel
   * @tag Excel File
   * @tag Enter Data
   * @tag Analyze Data
   * @tag Create Chart
   * @tag Excel Functions
   * @tag Create Functions
   * @tag Cell Format
   * @tag Filter Data
   * @tag Pivot Table
   * @tag Visualize Data
   * @tag Conditional Formatting
   * @tag Export File
   * @tag Import File
   * @tag Load CSV
   * @tag Sort Data
   * @tag Clean Data
   * @tag Statistics
   * @tag Calculate Statistics
   * @tag Macro
   * @tag Automation Script
   * @tag Duplicate Sheet
   * @tag Delete Sheet
   * @tag Create Sheet
   * @tag Rename Sheet
   * @tag Lock Sheet
   * @tag Share Sheet
   * @tag Extract Data
   * @tag Merge Sheets
   * @tag Add Data
   * @tag Manage Data
   */
  @Standalone()
  @RouteIcon("https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_sheet.svg")
  @core.TypedRoute.Post()
  async getHeaders(
    @core.TypedBody() input: IGoogleSheet.IReadGoogleSheetHeadersInput,
  ): Promise<Try<IGoogleSheet.IReadGoogleSheetOutput>> {
    const data = await retry(() => this.googleSheetProvider.readHeaders(input))();
    return createResponseForm(data);
  }

  /**
   * 구글 시트에 권한을 부여합니다.
   *
   * @summary 구글 시트 권한 부여.
   *
   * @param input 권한 부여를 위한 정보.
   *
   * @tag Google-Sheet
   * @tag 구글 시트
   * @tag 스프레드 시트
   * @tag 엑셀
   * @tag 엑셀 파일
   * @tag 데이터 입력
   * @tag 데이터 분석
   * @tag 차트 생성
   * @tag 엑셀 함수
   * @tag 함수 생성
   * @tag 셀 서식
   * @tag 데이터 필터
   * @tag 피벗 테이블
   * @tag 데이터 시각화
   * @tag 조건부 서식
   * @tag 파일 내보내기
   * @tag 파일 가져오기
   * @tag CSV 불러오기
   * @tag 데이터 정렬
   * @tag 데이터 정리
   * @tag 통계
   * @tag 통계 계산
   * @tag 매크로
   * @tag 자동화 스크립트
   * @tag 시트 복제
   * @tag 시트 삭제
   * @tag 시트 생성
   * @tag 시트 이름 수정
   * @tag 시트 잠금
   * @tag 시트 공유
   * @tag 데이터 추출
   * @tag 시트 병합
   * @tag 데이터 추가
   * @tag 데이터 관리
   * @tag Google Sheets
   * @tag Spreadsheet
   * @tag Excel
   * @tag Excel File
   * @tag Enter Data
   * @tag Analyze Data
   * @tag Create Chart
   * @tag Excel Functions
   * @tag Create Functions
   * @tag Cell Format
   * @tag Filter Data
   * @tag Pivot Table
   * @tag Visualize Data
   * @tag Conditional Formatting
   * @tag Export File
   * @tag Import File
   * @tag Load CSV
   * @tag Sort Data
   * @tag Clean Data
   * @tag Statistics
   * @tag Calculate Statistics
   * @tag Macro
   * @tag Automation Script
   * @tag Duplicate Sheet
   * @tag Delete Sheet
   * @tag Create Sheet
   * @tag Rename Sheet
   * @tag Lock Sheet
   * @tag Share Sheet
   * @tag Extract Data
   * @tag Merge Sheets
   * @tag Add Data
   * @tag Manage Data
   */
  @Standalone()
  @RouteIcon("https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_sheet.svg")
  @core.TypedRoute.Post("/permission")
  async permission(@core.TypedBody() input: IGoogleSheet.IPermissionInput): Promise<Try<void>> {
    const data = await retry(() => this.googleSheetProvider.permission(input))();
    return createResponseForm(data);
  }

  /**
   * 구글 시트에 헤더를 추가합니다.
   *
   * @summary 구글 시트 헤더 추가.
   *
   * @param input 구글 시트 url과 추가할 헤더 이름.
   *
   * @tag Google-Sheet
   * @tag 구글 시트
   * @tag 스프레드 시트
   * @tag 엑셀
   * @tag 엑셀 파일
   * @tag 데이터 입력
   * @tag 데이터 분석
   * @tag 차트 생성
   * @tag 엑셀 함수
   * @tag 함수 생성
   * @tag 셀 서식
   * @tag 데이터 필터
   * @tag 피벗 테이블
   * @tag 데이터 시각화
   * @tag 조건부 서식
   * @tag 파일 내보내기
   * @tag 파일 가져오기
   * @tag CSV 불러오기
   * @tag 데이터 정렬
   * @tag 데이터 정리
   * @tag 통계
   * @tag 통계 계산
   * @tag 매크로
   * @tag 자동화 스크립트
   * @tag 시트 복제
   * @tag 시트 삭제
   * @tag 시트 생성
   * @tag 시트 이름 수정
   * @tag 시트 잠금
   * @tag 시트 공유
   * @tag 데이터 추출
   * @tag 시트 병합
   * @tag 데이터 추가
   * @tag 데이터 관리
   * @tag Google Sheets
   * @tag Spreadsheet
   * @tag Excel
   * @tag Excel File
   * @tag Enter Data
   * @tag Analyze Data
   * @tag Create Chart
   * @tag Excel Functions
   * @tag Create Functions
   * @tag Cell Format
   * @tag Filter Data
   * @tag Pivot Table
   * @tag Visualize Data
   * @tag Conditional Formatting
   * @tag Export File
   * @tag Import File
   * @tag Load CSV
   * @tag Sort Data
   * @tag Clean Data
   * @tag Statistics
   * @tag Calculate Statistics
   * @tag Macro
   * @tag Automation Script
   * @tag Duplicate Sheet
   * @tag Delete Sheet
   * @tag Create Sheet
   * @tag Rename Sheet
   * @tag Lock Sheet
   * @tag Share Sheet
   * @tag Extract Data
   * @tag Merge Sheets
   * @tag Add Data
   * @tag Manage Data
   */
  @Standalone()
  @RouteIcon("https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_sheet.svg")
  @core.TypedRoute.Post("/header")
  async writeHeaders(@core.TypedBody() input: IGoogleSheet.IWriteGoogleSheetHeadersInput): Promise<Try<void>> {
    const data = await retry(() => this.googleSheetProvider.writeHeaders(input))();
    return createResponseForm(data);
  }

  /**
   * 구글 워크시트 목록을 가져옵니다.
   *
   * @summary 구글 시트 워크시트 목록 가져오기.
   *
   * @param input 워크시트 목록을 가져올 구글 시트 url.
   *
   * @tag Google-Sheet
   * @tag 구글 시트
   * @tag 스프레드 시트
   * @tag 엑셀
   * @tag 엑셀 파일
   * @tag 데이터 입력
   * @tag 데이터 분석
   * @tag 차트 생성
   * @tag 엑셀 함수
   * @tag 함수 생성
   * @tag 셀 서식
   * @tag 데이터 필터
   * @tag 피벗 테이블
   * @tag 데이터 시각화
   * @tag 조건부 서식
   * @tag 파일 내보내기
   * @tag 파일 가져오기
   * @tag CSV 불러오기
   * @tag 데이터 정렬
   * @tag 데이터 정리
   * @tag 통계
   * @tag 통계 계산
   * @tag 매크로
   * @tag 자동화 스크립트
   * @tag 시트 복제
   * @tag 시트 삭제
   * @tag 시트 생성
   * @tag 시트 이름 수정
   * @tag 시트 잠금
   * @tag 시트 공유
   * @tag 데이터 추출
   * @tag 시트 병합
   * @tag 데이터 추가
   * @tag 데이터 관리
   * @tag Google Sheets
   * @tag Spreadsheet
   * @tag Excel
   * @tag Excel File
   * @tag Enter Data
   * @tag Analyze Data
   * @tag Create Chart
   * @tag Excel Functions
   * @tag Create Functions
   * @tag Cell Format
   * @tag Filter Data
   * @tag Pivot Table
   * @tag Visualize Data
   * @tag Conditional Formatting
   * @tag Export File
   * @tag Import File
   * @tag Load CSV
   * @tag Sort Data
   * @tag Clean Data
   * @tag Statistics
   * @tag Calculate Statistics
   * @tag Macro
   * @tag Automation Script
   * @tag Duplicate Sheet
   * @tag Delete Sheet
   * @tag Create Sheet
   * @tag Rename Sheet
   * @tag Lock Sheet
   * @tag Share Sheet
   * @tag Extract Data
   * @tag Merge Sheets
   * @tag Add Data
   * @tag Manage Data
   */
  @Standalone()
  @RouteIcon("https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_sheet.svg")
  @core.TypedRoute.Post("/worksheet")
  async getWorkSheet(
    @core.TypedBody() input: IGoogleSheet.IGetWorkSheetInput,
  ): Promise<Try<IGoogleSheet.IGetWorkSheetOutput>> {
    const data = await retry(() => this.googleSheetProvider.getWorkSheet(input))();
    return createResponseForm(data);
  }

  /**
   * 구글 시트의 Row 정보를 가져옵니다.
   *
   * @summary 구글 시트 Row 정보 가져오기.
   *
   * @returns 구글 시트 Row 정보.
   *
   * @tag Google-Sheet
   * @tag 구글 시트
   * @tag 스프레드 시트
   * @tag 엑셀
   * @tag 엑셀 파일
   * @tag 데이터 입력
   * @tag 데이터 분석
   * @tag 차트 생성
   * @tag 엑셀 함수
   * @tag 함수 생성
   * @tag 셀 서식
   * @tag 데이터 필터
   * @tag 피벗 테이블
   * @tag 데이터 시각화
   * @tag 조건부 서식
   * @tag 파일 내보내기
   * @tag 파일 가져오기
   * @tag CSV 불러오기
   * @tag 데이터 정렬
   * @tag 데이터 정리
   * @tag 통계
   * @tag 통계 계산
   * @tag 매크로
   * @tag 자동화 스크립트
   * @tag 시트 복제
   * @tag 시트 삭제
   * @tag 시트 생성
   * @tag 시트 이름 수정
   * @tag 시트 잠금
   * @tag 시트 공유
   * @tag 데이터 추출
   * @tag 시트 병합
   * @tag 데이터 추가
   * @tag 데이터 관리
   * @tag Google Sheets
   * @tag Spreadsheet
   * @tag Excel
   * @tag Excel File
   * @tag Enter Data
   * @tag Analyze Data
   * @tag Create Chart
   * @tag Excel Functions
   * @tag Create Functions
   * @tag Cell Format
   * @tag Filter Data
   * @tag Pivot Table
   * @tag Visualize Data
   * @tag Conditional Formatting
   * @tag Export File
   * @tag Import File
   * @tag Load CSV
   * @tag Sort Data
   * @tag Clean Data
   * @tag Statistics
   * @tag Calculate Statistics
   * @tag Macro
   * @tag Automation Script
   * @tag Duplicate Sheet
   * @tag Delete Sheet
   * @tag Create Sheet
   * @tag Rename Sheet
   * @tag Lock Sheet
   * @tag Share Sheet
   * @tag Extract Data
   * @tag Merge Sheets
   * @tag Add Data
   * @tag Manage Data
   *
   * @Todo determine api endpoint in later because not decided select options
   */
  @Standalone()
  @RouteIcon("https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_sheet.svg")
  @core.TypedRoute.Post("/get-rows")
  async readRows(
    @core.TypedBody() input: IGoogleSheet.IReadGoogleSheetRowsInput,
  ): Promise<Try<IGoogleSheet.IReadGoogleSheetRowsOutput>> {
    const data = await retry(() => this.googleSheetProvider.readRows(input))();
    return createResponseForm(data);
  }
}
