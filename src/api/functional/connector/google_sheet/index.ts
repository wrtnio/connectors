/**
 * @packageDocumentation
 * @module api.functional.connector.google_sheet
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, Primitive, Resolved } from "@nestia/fetcher";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";

import type { IGoogleSheet } from "../../../structures/connector/google_sheet/IGoogleSheet";

export * as header from "./header";
export * as worksheet from "./worksheet";
export * as get_rows from "./get_rows";

/**
 * 구글 시트의 헤더 정보를 가져옵니다.
 *
 * @param input 구글 시트 URL과 가져올 헤더 index.
 * @summary 구글 시트 헤더 정보 가져오기.
 * @returns 구글 시트 헤더 정보.
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
 * @controller GoogleSheetController.getHeaders
 * @path POST /connector/google-sheet
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function getHeaders(
  connection: IConnection,
  input: getHeaders.Input,
): Promise<getHeaders.Output> {
  return !!connection.simulate
    ? getHeaders.simulate(connection, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...getHeaders.METADATA,
          template: getHeaders.METADATA.path,
          path: getHeaders.path(),
        },
        input,
      );
}
export namespace getHeaders {
  export type Input = Primitive<IGoogleSheet.IReadGoogleSheetHeadersInput>;
  export type Output = Primitive<IGoogleSheet.IReadGoogleSheetOutput>;

  export const METADATA = {
    method: "POST",
    path: "/connector/google-sheet",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: null,
  } as const;

  export const path = () => "/connector/google-sheet";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<IGoogleSheet.IReadGoogleSheetOutput>> =>
    typia.random<Primitive<IGoogleSheet.IReadGoogleSheetOutput>>(g);
  export const simulate = (
    connection: IConnection,
    input: getHeaders.Input,
  ): Output => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: path(),
      contentType: "application/json",
    });
    assert.body(() => typia.assert(input));
    return random(
      "object" === typeof connection.simulate && null !== connection.simulate
        ? connection.simulate
        : undefined,
    );
  };
}

/**
 * 구글 시트에 권한을 부여합니다.
 *
 * @param input 권한 부여를 위한 정보.
 * @summary 구글 시트 권한 부여.
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
 * @controller GoogleSheetController.permission
 * @path POST /connector/google-sheet/permission
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function permission(
  connection: IConnection,
  input: permission.Input,
): Promise<void> {
  return !!connection.simulate
    ? permission.simulate(connection, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...permission.METADATA,
          template: permission.METADATA.path,
          path: permission.path(),
        },
        input,
      );
}
export namespace permission {
  export type Input = Primitive<IGoogleSheet.IPermissionInput>;

  export const METADATA = {
    method: "POST",
    path: "/connector/google-sheet/permission",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: null,
  } as const;

  export const path = () => "/connector/google-sheet/permission";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<void>> => typia.random<Primitive<void>>(g);
  export const simulate = (
    connection: IConnection,
    input: permission.Input,
  ): void => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: path(),
      contentType: "application/json",
    });
    assert.body(() => typia.assert(input));
    return random(
      "object" === typeof connection.simulate && null !== connection.simulate
        ? connection.simulate
        : undefined,
    );
  };
}
