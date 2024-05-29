import { tags } from "typia";

import { ISwaggerSchema } from "./ISwaggerSchema";

export interface ISwaggerRoute {
  parameters?: ISwaggerRoute.IParameter[];
  requestBody?: ISwaggerRoute.IRequestBody;
  responses?: ISwaggerRoute.IResponseBody;
  summary?: string;
  description?: string;
  deprecated?: boolean;
  security?: Record<string, string[]>[];
  tags?: string[];
  "x-wrtn-icon"?: string & tags.Format<"uri">;
}
export namespace ISwaggerRoute {
  export interface IParameter {
    name?: string;
    in: "path" | "query" | "header" | "cookie";
    schema: ISwaggerSchema;
    title?: string;
    required?: boolean;
    description?: string;
  }
  export interface IRequestBody {
    title?: string;
    description?: string;
    content: IContent;
    required?: boolean;
    "x-nestia-encrypted"?: boolean;
  }
  export type IResponseBody = Record<
    string,
    {
      title?: string;
      description?: string;
      content?: IContent;
      "x-nestia-encrypted"?: boolean;
    }
  >;
  export interface IContent {
    "text/plain"?: {
      schema: ISwaggerSchema;
    };
    "application/json"?: {
      schema: ISwaggerSchema;
    };
    "application/x-www-form-urlencoded"?: {
      schema: ISwaggerSchema;
    };
    "multipart/form-data"?: {
      schema: ISwaggerSchema;
    };
    "*/*"?: {
      schema: ISwaggerSchema;
    };
  }

  export type ContentType =
    | "text/plain"
    | "application/json"
    | "application/x-www-form-url-encoded"
    | "multipart/form-data"
    | "*/*"
    | (string & {});
}
