/**
 * @packageDocumentation
 * @module api.functional.connector.notion.get.database_info
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, Primitive, Resolved } from "@nestia/fetcher";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";

import type { ICommon } from "../../../../../structures/connector/common/ISecretValue";
import type { INotion } from "../../../../../structures/connector/notion/INotion";

/**
 * 데이터베이스에 아이템을 생성하기 위해 데이터베이스 목록을 조회합니다.
 *
 * @summary 데이터베이스 목록 조회
 * @returns 데이터베이스 정보 목록
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
 * @controller NotionController.getDatabaseListInfo
 * @path POST /connector/notion/get/database-info
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function getDatabaseListInfo(
  connection: IConnection,
  input: getDatabaseListInfo.Input,
): Promise<getDatabaseListInfo.Output> {
  return !!connection.simulate
    ? getDatabaseListInfo.simulate(connection, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...getDatabaseListInfo.METADATA,
          template: getDatabaseListInfo.METADATA.path,
          path: getDatabaseListInfo.path(),
        },
        input,
      );
}
export namespace getDatabaseListInfo {
  export type Input = Primitive<ICommon.ISecret<"notion", never>>;
  export type Output = Primitive<Array<INotion.IDatabaseInfo>>;

  export const METADATA = {
    method: "POST",
    path: "/connector/notion/get/database-info",
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

  export const path = () => "/connector/notion/get/database-info";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<Array<INotion.IDatabaseInfo>>> =>
    typia.random<Primitive<Array<INotion.IDatabaseInfo>>>(g);
  export const simulate = (
    connection: IConnection,
    input: getDatabaseListInfo.Input,
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
 * 데이터베이스에 아이템을 생성하기 위한 데이터베이스 정보를 조회합니다.
 *
 * @summary 데이터베이스 정보 조회
 * @param databaseId 데이터베이스 고유 id
 * @returns 데이터베이스 정보
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
 * @controller NotionController.getDatabaseInfo
 * @path POST /connector/notion/get/database-info/:databaseId
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function getDatabaseInfo(
  connection: IConnection,
  input: getDatabaseInfo.Input,
  databaseId: string,
): Promise<getDatabaseInfo.Output> {
  return !!connection.simulate
    ? getDatabaseInfo.simulate(connection, input, databaseId)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...getDatabaseInfo.METADATA,
          template: getDatabaseInfo.METADATA.path,
          path: getDatabaseInfo.path(databaseId),
        },
        input,
      );
}
export namespace getDatabaseInfo {
  export type Input = Primitive<ICommon.ISecret<"notion", never>>;
  export type Output = Primitive<INotion.IDatabaseInfo>;

  export const METADATA = {
    method: "POST",
    path: "/connector/notion/get/database-info/:databaseId",
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
    `/connector/notion/get/database-info/${encodeURIComponent(databaseId ?? "null")}`;
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<INotion.IDatabaseInfo>> =>
    typia.random<Primitive<INotion.IDatabaseInfo>>(g);
  export const simulate = (
    connection: IConnection,
    input: getDatabaseInfo.Input,
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
