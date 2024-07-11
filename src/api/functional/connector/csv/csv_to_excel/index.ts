/**
 * @packageDocumentation
 * @module api.functional.connector.csv.csv_to_excel
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, Primitive, Resolved } from "@nestia/fetcher";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";

import type { ICsv } from "../../../../structures/connector/csv/ICsv";

/**
 * CSV 파일을 엑셀 파일로 변환합니다.
 *
 * @param input CSV 파일을 엑셀 파일로 변환하기 위한 정보
 * @summary CSV 파일 Excel 파일 변환
 * @returns excel file url
 * @tag CSV
 * @tag 파일
 * @tag 내보내기
 * @tag 다운로드
 * @tag 추출
 * @tag 추출하기
 * @tag 스프레드시트
 * @tag 데이터 저장
 * @tag 데이터 불러오기
 * @tag 데이터 분석
 * @tag 데이터 베이스
 * @tag 데이터 내보내기
 * @tag 데이터 가져오기
 * @tag 엑셀 변환
 * @tag 텍스트 파일
 * @tag 데이터 처리
 * @tag 대량 데이터
 * @tag 데이터 편집
 * @tag 파일 분할
 * @tag 데이터 통합
 * @tag CSV 만들기
 * @tag CSV 파일 열기
 * @tag 데이터 추출
 * @tag 데이터 필터링
 * @tag 데이터 병합
 * @tag File
 * @tag Export
 * @tag Download
 * @tag Extract
 * @tag Spreadsheet
 * @tag Save Data
 * @tag Load Data
 * @tag Data Analysis
 * @tag Database
 * @tag Export Data
 * @tag Import Data
 * @tag Convert to Excel
 * @tag Text File
 * @tag Data Processing
 * @tag Large Data
 * @tag Edit Data
 * @tag Split File
 * @tag Integrate Data
 * @tag Create CSV
 * @tag Open CSV File
 * @tag Extract Data
 * @tag Filter Data
 * @tag Merge Data
 *
 * @controller CsvController.csvToExcel
 * @path POST /connector/csv/csv-to-excel
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function csvToExcel(
  connection: IConnection,
  input: csvToExcel.Input,
): Promise<csvToExcel.Output> {
  return !!connection.simulate
    ? csvToExcel.simulate(connection, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...csvToExcel.METADATA,
          template: csvToExcel.METADATA.path,
          path: csvToExcel.path(),
        },
        input,
      );
}
export namespace csvToExcel {
  export type Input = Primitive<ICsv.ICsvToExcelInput>;
  export type Output = Primitive<ICsv.ICsvToExcelOutput>;

  export const METADATA = {
    method: "POST",
    path: "/connector/csv/csv-to-excel",
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

  export const path = () => "/connector/csv/csv-to-excel";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<ICsv.ICsvToExcelOutput>> =>
    typia.random<Primitive<ICsv.ICsvToExcelOutput>>(g);
  export const simulate = (
    connection: IConnection,
    input: csvToExcel.Input,
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
