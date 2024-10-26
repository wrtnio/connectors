import { tags } from 'typia';

export namespace ISalesforce {
  export interface IFetchDataInput {
    query: string & tags.Format<'sql'>;
  }

  export interface IFetchDataOutput {
    records: Array<Record<string, any>>;
  }
}