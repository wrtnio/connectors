import { tags } from 'typia';

export namespace IInstagram {
  export interface IGetDataInput {
    accessToken: string & tags.Format<'uuid'>;
  }

  export interface IGetDataOutput {
    data: any;
  }
}