import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { IGoogleSheet } from "@wrtn/connector-api/lib/structures/connector/google_sheet/IGoogleSheet";

import { GoogleSheetProvider } from "../../../providers/connector/google_sheet/GoogleSheetProvider";
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
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSheet_full.svg",
  )
  @core.TypedRoute.Post()
  async getHeaders(
    @core.TypedBody() input: IGoogleSheet.IReadGoogleSheetHeadersInput,
  ): Promise<IGoogleSheet.IReadGoogleSheetOutput> {
    return retry(() => this.googleSheetProvider.readHeaders(input))();
  }

  /**
   * 구글 시트에 내용을 추가합니다.
   *
   * @summary 구글 시트에 내용 추가하기
   *
   * @param input 내용을 추가하기 위한 정보
   *
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSheet_full.svg",
  )
  @core.TypedRoute.Post("append")
  async appendGoogleSheet(
    @core.TypedBody() input: IGoogleSheet.IAppendToSheetInput,
  ): Promise<void> {
    return retry(() => this.googleSheetProvider.appendToSheet(input))();
  }

  /**
   * 구글 시트를 생성합니다.
   *
   * 생성된 시트는 구글 드라이브 루트 경로에 생성됩니다.
   *
   * @summary 구글 시트 생성하기
   *
   * @param input 생성할 시트 제목
   *
   * @returns 생성된 시트 id와 Url
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSheet_full.svg",
  )
  @core.TypedRoute.Post("create")
  async createGoogleSheet(
    @core.TypedBody() input: IGoogleSheet.ICreateGoogleSheetInput,
  ): Promise<IGoogleSheet.ICreateGoogleSheetOutput> {
    return retry(() => this.googleSheetProvider.createSpreadsheet(input))();
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
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSheet_full.svg",
  )
  @core.TypedRoute.Post("/permission")
  async permission(
    @core.TypedBody() input: IGoogleSheet.IPermissionInput,
  ): Promise<void> {
    return retry(() => this.googleSheetProvider.permission(input))();
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
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSheet_full.svg",
  )
  @core.TypedRoute.Post("/header")
  async writeHeaders(
    @core.TypedBody() input: IGoogleSheet.IWriteGoogleSheetHeadersInput,
  ): Promise<void> {
    return retry(() => this.googleSheetProvider.writeHeaders(input))();
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
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSheet_full.svg",
  )
  @core.TypedRoute.Post("/worksheet")
  async getWorkSheet(
    @core.TypedBody() input: IGoogleSheet.IGetWorkSheetInput,
  ): Promise<IGoogleSheet.IGetWorkSheetOutput> {
    return retry(() => this.googleSheetProvider.getWorkSheet(input))();
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
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSheet_full.svg",
  )
  @core.TypedRoute.Post("/get-rows")
  async readRows(
    @core.TypedBody() input: IGoogleSheet.IReadGoogleSheetRowsInput,
  ): Promise<IGoogleSheet.IReadGoogleSheetRowsOutput> {
    return retry(() => this.googleSheetProvider.readRows(input))();
  }
}
