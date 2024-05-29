import { tags } from "typia";

export namespace IAws {
  export interface IGetPutObjectUrlInput {
    /**
     * 파일 확장자입니다.
     *
     * @title 파일 확장자
     */
    extension: string;
  }

  export interface IGetPutObjectUrlOutput {
    /**
     * 파일 uuid입니다.
     *
     * @title 파일 uuid
     */
    uuid: string & tags.Format<"uuid">;

    /**
     * 파일을 업로드하기 위한 url입니다.
     *
     * @title 업로드 url
     */
    uploadUrl: string;

    /**
     * url 만료 시간입니다.
     *
     * @title url 만료 시간
     */
    urlExpTsMillis: number;
  }

  export interface IUploadObjectInput {
    key: string;
    data: Buffer;
    contentType: string;
  }
}
