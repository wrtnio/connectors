import { tags } from 'typia';

export namespace IAmazon {
  export interface IGetProductInput {
    productId: string & tags.Format<'uuid'>;
  }

  export interface IGetProductOutput {
    name: string;
    price: number;
    description: string;
    availability: boolean;
  }
}