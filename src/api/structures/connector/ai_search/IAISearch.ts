import { tags } from "typia";

export namespace IAISearch {
  export interface IRequest {
    search_query: string;
    max_results?: number & tags.Maximum<100> & tags.Default<10>;
  }

  export interface IResponse {
    result: string;
  }
}
