/**
 * @packageDocumentation
 * @module api.functional.connector.google_drive.get.file
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, Primitive, Resolved } from "@nestia/fetcher";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";

import type { IGoogleDrive } from "../../../../../structures/connector/google_drive/IGoogleDrive";

/**
 * 파일에서 텍스트를 읽어옵니다.
 *
 * @summary 구글 드라이브 파일 텍스트 읽기.
 * @param id 파일 고유 ID.
 * @returns 파일 텍스트 내용.
 * @tag Google-Drive
 * @tag 구글 드라이브
 * @tag 드라이브
 * @tag 저장
 * @tag 파일 저장
 * @tag 클라우드 저장
 * @tag 파일 공유
 * @tag 파일 동기화
 * @tag 파일 업데이트
 * @tag 파일 다운로드
 * @tag 파일 생성
 * @tag 파일명 수정
 * @tag 파일 삭제
 * @tag 파일 관리
 * @tag 폴더 추가
 * @tag 폴더명 수정
 * @tag 폴더 삭제
 * @tag 폴더 관리
 * @tag 문서 작성
 * @tag 문서 공유
 * @tag 사진 저장
 * @tag 사진 공유
 * @tag 동영상 저장
 * @tag 동영상 공유
 * @tag 파일 검색
 * @tag 협업
 * @tag 문서 협업
 * @tag 파일 권한 설정
 * @tag 파일 암호화
 * @tag 문서 편집
 * @tag 파일 이동
 * @tag 구글 문서
 * @tag 구글 스위트
 * @tag 구글 시트
 * @tag 구글 닥스
 * @tag 구글 슬라이드
 * @tag 자료 공유
 * @tag 자료
 * @tag 구글 폼
 * @tag 설문 응답
 * @tag 파일 링크 생성
 * @tag 팀 드라이브
 * @tag Google Drive
 * @tag Drive
 * @tag Save
 * @tag Save File
 * @tag Save to Cloud
 * @tag Share File
 * @tag Sync File
 * @tag Update File
 * @tag Download File
 * @tag Create File
 * @tag Rename File
 * @tag Delete File
 * @tag Manage File
 * @tag Add Folder
 * @tag Rename Folder
 * @tag Delete Folder
 * @tag Manage Folder
 * @tag Create Document
 * @tag Share Document
 * @tag Save Photo
 * @tag Share Photo
 * @tag Save Video
 * @tag Share Video
 * @tag Search File
 * @tag Collaborate
 * @tag Collaborate on Document
 * @tag Set File Permissions
 * @tag Encrypt File
 * @tag Edit Document
 * @tag Move File
 * @tag Google Docs
 * @tag Google Suite
 * @tag Google Sheets
 * @tag Google Slides
 * @tag Share Resources
 * @tag Resources
 * @tag Google Forms
 * @tag Survey Responses
 * @tag Create File Link
 * @tag Team Drive
 *
 * @controller GoogleDriveController.readFile
 * @path POST /connector/google-drive/get/file/:id
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function readFile(
  connection: IConnection,
  id: string,
  input: readFile.Input,
): Promise<readFile.Output> {
  return !!connection.simulate
    ? readFile.simulate(connection, id, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...readFile.METADATA,
          template: readFile.METADATA.path,
          path: readFile.path(id),
        },
        input,
      );
}
export namespace readFile {
  export type Input = Primitive<IGoogleDrive.ISecret>;
  export type Output = Primitive<IGoogleDrive.IReadFileGoogleDriveOutput>;

  export const METADATA = {
    method: "POST",
    path: "/connector/google-drive/get/file/:id",
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
    `/connector/google-drive/get/file/${encodeURIComponent(id ?? "null")}`;
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<IGoogleDrive.IReadFileGoogleDriveOutput>> =>
    typia.random<Primitive<IGoogleDrive.IReadFileGoogleDriveOutput>>(g);
  export const simulate = (
    connection: IConnection,
    id: string,
    input: readFile.Input,
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
