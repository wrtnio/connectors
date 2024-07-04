/**
 * @packageDocumentation
 * @module api.functional.connector.google_sheet.worksheet
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, Primitive, Resolved } from "@nestia/fetcher";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";

import type { Try } from "../../../../../utils/createResponseForm";
import type { IGoogleSheet } from "../../../../structures/connector/google_sheet/IGoogleSheet";

/**
 * 구글 워크시트 목록을 가져옵니다.
 *
 * @summary 구글 시트 워크시트 목록 가져오기.
 * @param input 워크시트 목록을 가져올 구글 시트 url.
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
 * @controller GoogleSheetController.getWorkSheet
 * @path POST /connector/google-sheet/worksheet
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function getWorkSheet(
  connection: IConnection,
  input: getWorkSheet.Input,
): Promise<getWorkSheet.Output> {
  return !!connection.simulate
    ? getWorkSheet.simulate(connection, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...getWorkSheet.METADATA,
          template: getWorkSheet.METADATA.path,
          path: getWorkSheet.path(),
        },
        input,
      );
}
export namespace getWorkSheet {
  export type Input = Primitive<IGoogleSheet.IGetWorkSheetInput>;
  export type Output = Primitive<Try<IGoogleSheet.IGetWorkSheetOutput>>;

  export const METADATA = {
    method: "POST",
    path: "/connector/google-sheet/worksheet",
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

  export const path = () => "/connector/google-sheet/worksheet";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<Try<IGoogleSheet.IGetWorkSheetOutput>>> =>
    typia.random<Primitive<Try<IGoogleSheet.IGetWorkSheetOutput>>>(g);
  export const simulate = (
    connection: IConnection,
    input: getWorkSheet.Input,
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
