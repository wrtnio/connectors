export interface IOutputStructure {
  /**
   * LLM으로 부터 생성될 필드명입니다.
   *
   * @title LLM으로 부터 생성될 필드명.
   */
  field_name: string;

  /**
   * 필드에 대한 설명 및 LLM이 해당 필드를 어떻게 채울지에 대한 가이드.
   *
   * @title 필드에 대한 설명.
   */
  field_description: string;

  /**
   * 필드에 대한 예시입니다.
   *
   * @title 필드에 대한 예시.
   */
  example: string;
}

export interface ITableRowData {
  /**
   * 생기부 데이터 생성시 참고할 표의 데이터입니다.
   *
   * @title 테이블의 각 열에 대한 데이터.
   */
  [column: string]: string;
}

export interface IStudentReportGeneratorRequest {
  /**
   * 생기부 데이터 생성시 LLM에게 전달할 고려사항입니다.
   *
   * @title 고려사항.
   */
  consideration: string;

  /**
   * 생성될 생기부 데이터 구조 입니다.
   *
   * @title 생성될 생기부 데이터 구조.
   */
  outputs: IOutputStructure[];

  /**
   * 생기부 데이터 생성시 참고할 표의 데이터입니다.
   *
   * @title 참고자료 데이터.
   */
  reference_data: ITableRowData[];
}

export interface IStudentReportGeneratorResponse {
  /**
   * 생성된 생기부 데이터입니다.
   *
   * @title 생성된 생기부 데이터.
   */
  data: ITableRowData[];
}

export interface IStudentReportRowGeneratorRequest {
  /**
   * 생기부 데이터 생성시 LLM에게 전달할 고려사항입니다.
   *
   * @title 고려사항.
   */
  consideration: string;

  /**
   * 생성될 생기부 데이터 구조 입니다.
   *
   * @title 생성될 생기부 데이터 구조.
   */
  output_structure: IOutputStructure;

  /**
   * 생기부 데이터 생성시 참고할 표의 데이터입니다.
   *
   * @title 참고자료 데이터.
   */
  reference_data: ITableRowData;
}

export interface IStudentReportRowGeneratorResponse {
  /**
   * 생성된 생기부 데이터입니다.
   *
   * @title 생성된 생기부 데이터.
   */
  data: ITableRowData;
}
