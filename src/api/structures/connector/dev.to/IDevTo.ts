import { tags } from "typia";
import { ICommon } from "../common/ISecretValue";

export namespace IDevTo {
  export type IUpdateOutput = ICreateOutput;

  export interface IUpdateInput extends ICommon.ISecret<"dev_to", []> {
    article?: {
      /**
       * @title Title
       */
      title?: string;

      /**
       * @title The body of the article
       */
      body_markdown?: string;

      /**
       * @title description
       */
      description?: string;
    };
  }

  export interface ICreateOutput {
    /**
     * @title Article ID
     */
    id: number;

    /**
     * @title Article URL for viewing
     */
    url: string & tags.Format<"iri">;
  }

  export interface ICreateInput extends ICommon.ISecret<"dev_to", []> {
    article: {
      /**
       * @title Title
       */
      title: string;

      /**
       * @title The body of the article
       */
      body_markdown: string;

      /**
       * @title description
       */
      description?: string;
    };
  }
}
