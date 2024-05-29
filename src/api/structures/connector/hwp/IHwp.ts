import { tags } from "typia";
import { ContentMediaType } from "typia/lib/tags/ContentMediaType";

export namespace IHwp {
  /**
   * @title hwp 파일 파싱을 위한 정보
   */
  export interface IParseInput {
    /**
     * 파싱할 hwp 파일.
     *
     * @title hwp 파일
     */
    fileUrl: string &
      tags.Format<"uri"> &
      ContentMediaType<"application/vnd.hancom.hwp">;
  }

  export interface IParseOutput {
    /**
     * 파싱된 hwp 파일의 텍스트
     *
     * @title 텍스트
     */
    text: string;
  }
}
