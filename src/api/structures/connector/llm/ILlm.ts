export interface ISelectorLlmRequest {
  /**
   * Here is a list of candidates for selection.
   *
   * @title Choices
   */
  candidates: any[];

  /**
   * The number of candidates to select.
   *
   * @title Number of selections
   */
  num_select: number;

  /**
   * Here are some things to consider when choosing a candidate.
   *
   * @title Considerations
   */
  context: any;
}

export interface ISelectorLlmResponse {
  /**
   * Here is a list of indexes for the selected candidates.
   *
   * @title Selected candidate index information
   */
  selection: number[];
}
