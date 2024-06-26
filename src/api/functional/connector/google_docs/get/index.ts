/**
 * @packageDocumentation
 * @module api.functional.connector.google_docs.get
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, Primitive, Resolved } from "@nestia/fetcher";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";

import type { ICommon } from "../../../../structures/connector/common/ISecretValue";
import type { IGoogleDocs } from "../../../../structures/connector/google_docs/IGoogleDocs";

/**
 * 구글 docs의 내용을 읽어옵니다.
 *
 * @summary 구글 docs 읽기.
 * @TODO read other elements if necessary
 * @param id 구글 docs 고유 ID.
 * @returns 구글 docs 내용.
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
 *
 * @controller GoogleDocsController.readDocs
 * @path POST /connector/google-docs/get/:id
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function readDocs(
  connection: IConnection,
  id: string,
  input: readDocs.Input,
): Promise<readDocs.Output> {
  return !!connection.simulate
    ? readDocs.simulate(connection, id, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...readDocs.METADATA,
          template: readDocs.METADATA.path,
          path: readDocs.path(id),
        },
        input,
      );
}
export namespace readDocs {
  export type Input = Primitive<
    ICommon.ISecret<
      "google",
      [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/documents",
      ]
    >
  >;
  export type Output = Primitive<IGoogleDocs.IReadGoogleDocsOutput>;

  export const METADATA = {
    method: "POST",
    path: "/connector/google-docs/get/:id",
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

  export const path = (id: string) =>
    `/connector/google-docs/get/${encodeURIComponent(id ?? "null")}`;
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<IGoogleDocs.IReadGoogleDocsOutput>> =>
    typia.random<Primitive<IGoogleDocs.IReadGoogleDocsOutput>>(g);
  export const simulate = (
    connection: IConnection,
    id: string,
    input: readDocs.Input,
  ): Output => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: path(id),
      contentType: "application/json",
    });
    assert.param("id")(() => typia.assert(id));
    assert.body(() => typia.assert(input));
    return random(
      "object" === typeof connection.simulate && null !== connection.simulate
        ? connection.simulate
        : undefined,
    );
  };
}
