export interface IStoryGeneratorRequest {
  query: string;
  chatHistory: { role: string; content: string }[];
  previousStories: string[];
}

//export interface IStudentReportRowGeneratorResponse {
/**
 * 생성된 생기부 데이터입니다.
 *
 * @title 생성된 생기부 데이터.
 */
//data: ITableRowData;
//}
