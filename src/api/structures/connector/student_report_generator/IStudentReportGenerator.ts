export interface IOutputStructure {
  /**
   * The field name to be generated from LLM.
   *
   * @title The field name to be generated from LLM
   */
  field_name: string;

  /**
   * Description of the field and guidance on how LLM should fill it out.
   *
   * @title Description of the field
   */
  field_description: string;

  /**
   * Here is an example for the field.
   *
   * @title Example for the field
   */
  example: string;
}

export interface ITableRowData {
  /**
   * This is the data for the table to reference when creating the life data.
   *
   * @title Data for each column in the table
   */
  [column: string]: string;
}

export interface IStudentReportGeneratorRequest {
  /**
   * Here are some things to consider when generating your biometric data to pass on to your LLM.
   *
   * @title Things to consider
   */
  consideration: string;

  /**
   * This is the data structure of the generated lifeblood.
   *
   * @title This is the data structure of the generated lifeblood
   */
  outputs: IOutputStructure[];

  /**
   * This is the data for the table to reference when creating the life data.
   *
   * @title Reference data
   */
  reference_data: ITableRowData[];
}

export interface IStudentReportGeneratorResponse {
  /**
   * Generated life data.
   *
   * @title Generated life data
   */
  data: ITableRowData[];
}

export interface IStudentReportRowGeneratorRequest {
  /**
   * Here are some things to consider when generating your biometric data to pass on to your LLM.
   *
   * @title Things to consider
   */
  consideration: string;

  /**
   * This is the data structure of the generated lifeblood.
   *
   * @title This is the data structure of the generated lifeblood
   */
  output_structure: IOutputStructure;

  /**
   * This is the data for the table to reference when creating the life data.
   *
   * @title Reference data
   */
  reference_data: ITableRowData;
}

export interface IStudentReportRowGeneratorResponse {
  /**
   * Generated life data.
   *
   * @title Generated life data
   */
  data: ITableRowData;
}
