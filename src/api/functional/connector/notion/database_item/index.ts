/**
 * @packageDocumentation
 * @module api.functional.connector.notion.database_item
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, Primitive, Resolved } from "@nestia/fetcher";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";

import type { INotion } from "../../../../structures/connector/notion/INotion";

/**
 * 노션 테이블 데이터베이스에 아이템을 생성합니다.
 *
 * @summary 데이터베이스 아이템 생성
 * @param input 데이터베이스 아이템 생성에 필요한 정보
 * @param databaseId 아이템을 생성할 데이터베이스 고유 id
 * @returns 생성된 데이터베이스 아이템 정보
 * @tag Notion
 * @tag 노션
 * @tag 노트
 * @tag 메모
 * @tag 작업 관리
 * @tag 프로젝트 관리
 * @tag 할 일 목록
 * @tag 일정 관리
 * @tag 문서 작성
 * @tag 회의록 작성
 * @tag 체크리스트
 * @tag 아이디어 정리
 * @tag 업무 기록
 * @tag 학습 노트
 * @tag 스터디 플래너
 * @tag 제품기획
 * @tag 이력서
 * @tag 포트폴리오
 * @tag 협업
 * @tag 문서
 * @tag Note
 * @tag Memo
 * @tag Task Management
 * @tag Project Management
 * @tag To do list
 * @tag Schedule Management
 * @tag Document Creation
 * @tag Meeting Notes
 * @tag Checklist
 * @tag Idea Organization
 * @tag Work Logging
 * @tag Study Notes
 * @tag Study Planner
 * @tag Product Management
 * @tag Resume
 * @tag Portfolio
 * @tag Collaboration
 * @tag Document
 *
 * @controller NotionController.createDatabaseItem
 * @path POST /connector/notion/database-item/:databaseId
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function createDatabaseItem(
  connection: IConnection,
  input: createDatabaseItem.Input,
  databaseId: string,
): Promise<createDatabaseItem.Output> {
  return !!connection.simulate
    ? createDatabaseItem.simulate(connection, input, databaseId)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...createDatabaseItem.METADATA,
          template: createDatabaseItem.METADATA.path,
          path: createDatabaseItem.path(databaseId),
        },
        input,
      );
}
export namespace createDatabaseItem {
  export type Input = Primitive<INotion.ICreateDatabaseItemInput>;
  export type Output = Primitive<INotion.IDatabaseItemOutput>;

  export const METADATA = {
    method: "POST",
    path: "/connector/notion/database-item/:databaseId",
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

  export const path = (databaseId: string) =>
    `/connector/notion/database-item/${encodeURIComponent(databaseId ?? "null")}`;
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<INotion.IDatabaseItemOutput>> =>
    typia.random<Primitive<INotion.IDatabaseItemOutput>>(g);
  export const simulate = (
    connection: IConnection,
    input: createDatabaseItem.Input,
    databaseId: string,
  ): Output => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: path(databaseId),
      contentType: "application/json",
    });
    assert.body(() => typia.assert(input));
    assert.param("databaseId")(() => typia.assert(databaseId));
    return random(
      "object" === typeof connection.simulate && null !== connection.simulate
        ? connection.simulate
        : undefined,
    );
  };
}

/**
 * 데이터베이스에 있는 아이템 정보를 수정합니다.
 *
 * @summary 데이터베이스 아이템 수정
 * @param input 수정할 데이터베이스 아이템 정보
 * @param databaseId 수정할 데이터베이스 고유 id
 * @returns 수정된 데이터베이스 아이템 정보
 * @tag Notion
 * @tag 노션
 * @tag 노트
 * @tag 메모
 * @tag 작업 관리
 * @tag 프로젝트 관리
 * @tag 할 일 목록
 * @tag 일정 관리
 * @tag 문서 작성
 * @tag 회의록 작성
 * @tag 체크리스트
 * @tag 아이디어 정리
 * @tag 업무 기록
 * @tag 학습 노트
 * @tag 스터디 플래너
 * @tag 제품기획
 * @tag 이력서
 * @tag 포트폴리오
 * @tag 협업
 * @tag 문서
 * @tag Note
 * @tag Memo
 * @tag Task Management
 * @tag Project Management
 * @tag To do list
 * @tag Schedule Management
 * @tag Document Creation
 * @tag Meeting Notes
 * @tag Checklist
 * @tag Idea Organization
 * @tag Work Logging
 * @tag Study Notes
 * @tag Study Planner
 * @tag Product Management
 * @tag Resume
 * @tag Portfolio
 * @tag Collaboration
 * @tag Document
 *
 * @controller NotionController.updateDatabaseItem
 * @path PATCH /connector/notion/database-item/:pageId
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function updateDatabaseItem(
  connection: IConnection,
  input: updateDatabaseItem.Input,
  databaseId: string,
): Promise<updateDatabaseItem.Output> {
  return !!connection.simulate
    ? updateDatabaseItem.simulate(connection, input, databaseId)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...updateDatabaseItem.METADATA,
          template: updateDatabaseItem.METADATA.path,
          path: updateDatabaseItem.path(databaseId),
        },
        input,
      );
}
export namespace updateDatabaseItem {
  export type Input = Primitive<INotion.IUpdateDatabaseItemInput>;
  export type Output = Primitive<INotion.IDatabaseItemOutput>;

  export const METADATA = {
    method: "PATCH",
    path: "/connector/notion/database-item/:pageId",
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

  export const path = (databaseId: string) =>
    `/connector/notion/database-item/${encodeURIComponent(databaseId ?? "null")}`;
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<INotion.IDatabaseItemOutput>> =>
    typia.random<Primitive<INotion.IDatabaseItemOutput>>(g);
  export const simulate = (
    connection: IConnection,
    input: updateDatabaseItem.Input,
    databaseId: string,
  ): Output => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: path(databaseId),
      contentType: "application/json",
    });
    assert.body(() => typia.assert(input));
    assert.param("databaseId")(() => typia.assert(databaseId));
    return random(
      "object" === typeof connection.simulate && null !== connection.simulate
        ? connection.simulate
        : undefined,
    );
  };
}
