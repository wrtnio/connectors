import { Placeholder } from "@wrtn/decorators";
import { tags } from "typia";
import { ContentMediaType } from "typia/lib/tags";

export namespace ICsv {
  /**
   * @title Csv 파일 정보
   */
  export interface IReadInput {
    /**
     * 읽어올 Csv 파일입니다.
     *
     * @title 파일
     */
    s3Url: string & tags.Format<"uri"> & ContentMediaType<"text/csv">;

    /**
     * 읽어올 Csv 파일 구분자 입니다.
     *
     * @title 구분자
     */
    delimiter: string & Placeholder<",">;
  }

  export interface IReadOutput {
    /**
     * 읽어온 csv 파일 데이터.
     *
     * @title csv 데이터 리스트.
     */
    data: {
      [key: string]: string;
    }[];
  }

  export interface IWriteInput {
    /**
     * 생성할 Csv 파일명입니다.
     *
     * @title 파일명
     */
    fileName: string & Placeholder<"example.csv">;

    /**
     * 생성할 Csv 파일 구분자 입니다.
     *
     * @title 구분자
     */
    delimiter: string & Placeholder<",">;

    /**
     * 생성할 Csv 파일에 넣을 데이터 값 들 입니다.
     *
     * @title 파일 데이터 값들
     */
    values: {
      [key: string]: string;
    }[];
  }

  export interface IWriteOutput {
    /**
     * 작성된 csv 파일의 s3 url입니다.
     *
     * @title csv 파일
     */
    s3Url: string & tags.Format<"uri"> & ContentMediaType<"text/csv">;
  }

  export interface ICsvToExcelInput {
    /**
     * csv에서 excel로 변환할 파일입니다.
     *
     * @title 파일
     */
    s3Url: string & tags.Format<"uri"> & ContentMediaType<"text/csv">;

    /**
     * csv에서 excel로 변환할 파일 구분자 입니다.
     *
     * @title 구분자
     */
    delimiter: string & Placeholder<",">;
  }

  export interface ICsvToExcelOutput {
    /**
     * 변환된 excel 파일의 s3 url입니다.
     *
     * @title s3 url
     */
    url: string & tags.Format<"uri"> & ContentMediaType<"text/csv">;
  }
}
