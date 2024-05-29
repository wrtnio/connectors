export interface ISelectorLlmRequest {
  /**
   * 선택 후보군 리스트입니다.
   *
   * @title 선택지.
   */
  candidates: any[];

  /**
   * 선택할 후보군의 개수입니다.
   *
   * @title 선택 개수.
   */
  num_select: number;

  /**
   * 후보군을 선택할 때 고려해야할 내용들을 넣습니다.
   *
   * @title 고려사항.
   */
  context: any;
}

export interface ISelectorLlmResponse {
  /**
   * 선택된 후보들의 인덱스 리스트입니다.
   *
   * @title 선택된 후보 인덱스 정보.
   */
  selection: number[];
}
