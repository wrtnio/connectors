/**
 * @packageDocumentation
 * @module api.functional.connector.csv
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, Primitive, Resolved } from "@nestia/fetcher";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";

import type { ICsv } from "../../../structures/connector/csv/ICsv";

export * as csv_to_excel from "./csv_to_excel";

/**
 * CSV 파일 내용을 읽어옵니다.
 *
 * @summary CSV 파일 읽기
 * @param input CSV 파일을 읽어 오기 위한 정보
 * @returns CSV 파일 내용.
 * @tag CSV 텍스트 파일 형식
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
 * @controller CsvController.read
 * @path POST /connector/csv/read
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function read(
  connection: IConnection,
  input: read.Input,
): Promise<read.Output> {
  return !!connection.simulate
    ? read.simulate(connection, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...read.METADATA,
          path: read.path(),
        },
        input,
      );
}
export namespace read {
  export type Input = Primitive<ICsv.IReadInput>;
  export type Output = Primitive<ICsv.IReadOutput>;

  export const METADATA = {
    method: "POST",
    path: "/connector/csv/read",
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

  export const path = () => "/connector/csv/read";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<ICsv.IReadOutput>> =>
    typia.random<Primitive<ICsv.IReadOutput>>(g);
  export const simulate = (
    connection: IConnection,
    input: read.Input,
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
 * CSV 파일을 생성합니다.
 *
 * @summary CSV 파일 생성
 * @param input CSV 파일을 생성하기 위한 정보
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
 * @controller CsvController.write
 * @path POST /connector/csv/write
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function write(
  connection: IConnection,
  input: write.Input,
): Promise<write.Output> {
  return !!connection.simulate
    ? write.simulate(connection, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...write.METADATA,
          path: write.path(),
        },
        input,
      );
}
export namespace write {
  export type Input = Primitive<ICsv.IWriteInput>;
  export type Output = Primitive<ICsv.IWriteOutput>;

  export const METADATA = {
    method: "POST",
    path: "/connector/csv/write",
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

  export const path = () => "/connector/csv/write";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<ICsv.IWriteOutput>> =>
    typia.random<Primitive<ICsv.IWriteOutput>>(g);
  export const simulate = (
    connection: IConnection,
    input: write.Input,
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
