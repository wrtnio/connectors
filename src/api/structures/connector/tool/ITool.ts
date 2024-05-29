export namespace ITool {
  export interface IGenerateInput {
    /**
     * 툴을 사용하기 위한 입력값. 키는 툴에서 사용하는 변수명이고 값은 해당 변수의 값입니다.
     *
     */
    [key: string]: string | string[];
  }

  /**
   * 툴을 사용한 결과입니다.
   */
  export interface IGenerateOutput {
    content: string;
  }
}
