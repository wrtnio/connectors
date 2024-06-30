import type { tags } from "typia";
import typia from "typia";

import { IExcel } from "../excel/IExcel";

export namespace IHancell {
  export interface IUpsertSheetInput extends IReadHancellInput {
    /**
     * @title 시트 이름
     * @description 존재하지 않는 시트라면 추가되고 존재한다면 수정됩니다.
     */
    sheetName: string;

    /**
     * @title 시트 정보
     * @description 시트의 각 셀마다 담긴 정보를 의미합니다.
     */
    cells: Cells;
  }

  export interface IUpsertSheetOutput {
    /**
     * @title 새 한셀 파일 링크
     */
    fileUrl: string;
  }

  /**
   * @title 한셀 읽기 조건
   */
  export type IReadHancellInput = Pick<IExcel.IReadExcelInput, "fileUrl">;

  /**
   * @title 한셀 읽기 응답
   */
  export type IReadHancellOutput = {
    [sheetName: string]: Cells;
  };

  /**
   * @todo cell에 대한 타입 지정 필요
   */
  // export type CellName = string & tags.Pattern<"/^[A-Z]+[1-9][0-9]*$/">;

  /**
   * @title 셀에 담긴 정보
   */
  export type Cells = Record<string, any>;
}
