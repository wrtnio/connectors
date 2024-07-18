import { Placeholder } from "@wrtnio/decorators";
import { tags } from "typia";

export namespace IGoogleScholar {
  /**
   * @title 검색 조건
   */
  export interface ISearchInput {
    /**
     * 검색 결과에 포함되어야 하는 키워드입니다.
     *
     * @title 꼭 포함할 키워드
     */
    andKeyword: Array<string & Placeholder<"biology">>;

    /**
     * 검색 결과에 포함되면 좋겠는 키워드입니다.
     *
     * @title 포함 되면 좋겠는 키워드
     */
    orKeyword?: Array<string & Placeholder<"ecosystem">>;

    /**
     * 검색 결과에 포함되면 안되는 키워드입니다.
     *
     * @title 제외할 키워드
     */
    notKeyword?: Array<string & Placeholder<"pollution">>;

    /**
     * 몇 개의 검색 결과를 받아올 것인지 설정합니다.
     *
     * @title 검색 결과 갯수
     */
    max_results: number & tags.Type<"int32"> & Placeholder<"10">;
  }

  /**
   * @title 검색 결과
   */

  export interface ISearchOutput {
    /**
     * 검색 결과 데이터의 고유 id 입니다.
     *
     * @title 검색 결과 데이터 고유 id
     */
    id: string;

    /**
     * 검색된 논문의 제목입니다.
     *
     * @title 검색된 논문 제목
     */
    title: string;

    /**
     * 검색된 논문의 링크입니다.
     *
     * @title 검색된 논문 링크
     */
    link: (string & tags.Format<"uri">) | null;

    /**
     * 검색 결과의 내용 단편입니다.
     *
     * @title 검색 결과 내용 단편
     */
    snippet: string;

    /**
     * 검색된 논문의 출판 요약 정보입니다.
     *
     * @title 출판 요약 정보
     */
    publication_info: string;

    /**
     * 검색된 논문의 참고자료 정보입니다.
     *
     * @title 참고자료 정보
     */
    resource: IResource[] | null;

    /**
     * 검색된 논문이 인용된 횟수입니다.
     *
     * @title 인용된 횟수
     */
    citation_count: number & tags.Type<"int32">;

    /**
     * 검색된 논문과 관련된 학술 자료 링크입니다.
     *
     * @title 관련 학술 자료 링크
     */
    related_pages_link: string & tags.Format<"uri">;

    /**
     * 검색된 논문의 버전 정보입니다.
     *
     * @title 버전 정보
     */
    version_info: IVersion;
  }

  /**
   * @title 참고 자료
   */
  export interface IResource {
    /**
     * 참고 자료의 제목입니다.
     *
     * @title 참고 자료 제목
     */
    title: string;

    /**
     * 참고자료 파일의 형식입니다.
     *
     * @title 참고자료 파일 형식
     */
    file_format?: string;

    /**
     * 참고자료의 링크입니다.
     *
     * @title 참고자료 링크
     */
    link: string & tags.Format<"uri">;
  }

  /**
   * @title 버전
   */
  interface IVersion {
    /**
     * 버전 정보입니다.
     *
     * @title 버전 정보
     */
    version: (number & tags.Type<"int32">) | null;

    /**
     * 버전 관련 링크입니다.
     *
     * @title 버전 관련 링크
     */
    link: (string & tags.Format<"uri">) | null;
  }
}
