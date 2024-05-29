import { Placeholder } from "@wrtn/decorators";
import { tags } from "typia";
import { ContentMediaType } from "typia/lib/tags/ContentMediaType";

export namespace IExcel {
  /**
   * @title 파일 정보
   */
  export interface IReadExcelInput {
    /**
     * 읽어올 엑셀 파일.
     *
     * @title excel 파일
     */
    fileUrl: string &
      tags.Format<"uri"> &
      ContentMediaType<"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">;

    /**
     * 읽어올 excel sheet 이름.
     *
     * @title excel sheet 이름
     */
    sheetName?: (string & Placeholder<"sheet1">) | null;
  }

  interface IReadExcelRowData {
    /**
     * key가 헤더 이름이고 value가 해당 행의 값인 객체.
     *
     * @title 읽어온 excel row 데이터
     */
    [key: string]: any;
  }

  export interface IReadExcelOutput {
    /**
     * 읽어온 excel sheet 데이터.
     *
     * @title excel sheet 데이터
     */
    data: IReadExcelRowData[];
  }

  /**
   * @title 파일 정보
   */
  export interface IGetWorksheetListInput {
    /**
     * excel worksheet 리스트를 가져올 파일
     *
     * @title excel 파일
     */
    fileUrl: string &
      tags.Format<"uri"> &
      ContentMediaType<"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">;
  }

  export interface IWorksheetListOutput {
    /**
     * @title sheet 리스트 데이터
     */
    data: {
      /**
       * 가져온 worksheet의 이름.
       *
       * @title sheet 이름
       */
      sheetName: string;

      /**
       * 가져온 worksheet의 id.
       *
       * @title sheet id
       */
      id: number;
    }[];
  }

  /**
   * @title 데이터 추가를 위한 정보
   */
  export interface IInsertExcelRowInput {
    // TODO: 당장은 flow 상 새로운 파일을 제공하여 유저가 다운로드 받는 flow만 서포트.
    /**
     * excel 행을 추가할 파일.
     *
     * @title excel 파일
     */
    //fileUrl: string &
    //tags.Format<"uri"> &
    //ContentMediaType<"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">;

    /**
     * excel 행을 추가할 sheet 이름.
     * 입력이 들어오지 않을 시 기본으로 첫번째 sheet를 대상으로 동작합니다.
     *
     * @title sheet 이름
     */
    sheetName?: (string & Placeholder<"sheet1">) | null;

    /**
     * key가 header 이름이고 value가 해당 행의 값인 객체의 배열
     *
     * @title 추가할 excel 행 데이터
     */
    data: Record<string, any>[];
  }

  export interface IInsertExcelRowOutput {
    /**
     * 새로 추가된 excel 파일의 url.
     *
     * @title 생성된 파일 url.
     */
    fileUrl: string &
      tags.Format<"uri"> &
      ContentMediaType<"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">;
  }
}
