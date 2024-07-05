/**
 * @packageDocumentation
 * @module api.functional.connector.google_docs
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, Primitive, Resolved } from "@nestia/fetcher";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";

import type { IGoogleDocs } from "../../../structures/connector/google_docs/IGoogleDocs";

export * as get from "./get";
export * as template from "./template";
export * as get_list from "./get_list";

/**
 * 구글 docs를 생성합니다.
 *
 * @summary 구글 docs 생성.
 * @param input 생성할 구글 docs 제목.
 * @returns 생성된 구글 docs 고유 ID.
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
 * @controller GoogleDocsController.createDocs
 * @path POST /connector/google-docs
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function createDocs(
  connection: IConnection,
  input: createDocs.Input,
): Promise<createDocs.Output> {
  return !!connection.simulate
    ? createDocs.simulate(connection, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...createDocs.METADATA,
          template: createDocs.METADATA.path,
          path: createDocs.path(),
        },
        input,
      );
}
export namespace createDocs {
  export type Input = Primitive<IGoogleDocs.ICreateGoogleDocsInput>;
  export type Output = Primitive<IGoogleDocs.ICreateGoogleDocsOutput>;

  export const METADATA = {
    method: "POST",
    path: "/connector/google-docs",
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

  export const path = () => "/connector/google-docs";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<IGoogleDocs.ICreateGoogleDocsOutput>> =>
    typia.random<Primitive<IGoogleDocs.ICreateGoogleDocsOutput>>(g);
  export const simulate = (
    connection: IConnection,
    input: createDocs.Input,
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
 * 구글 docs에 권한을 부여합니다.
 *
 * @summary 구글 docs 권한 부여.
 * @param input 구글 docs 권한 부여를 위한 정보.
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
 * @controller GoogleDocsController.permission
 * @path POST /connector/google-docs/permission
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
  export type Input = Primitive<IGoogleDocs.IPermissionGoogleDocsInput>;

  export const METADATA = {
    method: "POST",
    path: "/connector/google-docs/permission",
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

  export const path = () => "/connector/google-docs/permission";
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

/**
 * 구글 docs를 삭제합니다.
 *
 * @summary 구글 docs 삭제.
 * @param id 삭제할 구글 docs 고유 ID.
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
 * @controller GoogleDocsController.deleteById
 * @path DELETE /connector/google-docs/:id
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function deleteById(
  connection: IConnection,
  id: string,
  input: deleteById.Input,
): Promise<void> {
  return !!connection.simulate
    ? deleteById.simulate(connection, id, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...deleteById.METADATA,
          template: deleteById.METADATA.path,
          path: deleteById.path(id),
        },
        input,
      );
}
export namespace deleteById {
  export type Input = Primitive<IGoogleDocs.ISecret>;

  export const METADATA = {
    method: "DELETE",
    path: "/connector/google-docs/:id",
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
    `/connector/google-docs/${encodeURIComponent(id ?? "null")}`;
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<void>> => typia.random<Primitive<void>>(g);
  export const simulate = (
    connection: IConnection,
    id: string,
    input: deleteById.Input,
  ): void => {
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

/**
 * 구글 docs에 텍스트를 추가합니다.
 *
 * @summary 구글 docs 텍스트 추가.
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
 * @controller GoogleDocsController.append
 * @path POST /connector/google-docs/append
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function append(
  connection: IConnection,
  input: append.Input,
): Promise<void> {
  return !!connection.simulate
    ? append.simulate(connection, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...append.METADATA,
          template: append.METADATA.path,
          path: append.path(),
        },
        input,
      );
}
export namespace append {
  export type Input = Primitive<IGoogleDocs.IAppendTextGoogleDocsInput>;

  export const METADATA = {
    method: "POST",
    path: "/connector/google-docs/append",
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

  export const path = () => "/connector/google-docs/append";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<void>> => typia.random<Primitive<void>>(g);
  export const simulate = (
    connection: IConnection,
    input: append.Input,
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
