import { IMigrateRoute, OpenApi, OpenApiV3 } from "@samchon/openapi";

export interface IOpenAiDocument {
  openapi: "3.0" | `3.0.${number}`;
  functions: IOpenAiDocument.IFunction[];

  /**
   * Whether the parameters are keyworded or not.
   *
   * If this property value is `true`, length of the
   * {@link IOpenAiDocument.IFunction.parameters} is always 1, and type of the
   * pararameter is always `object` type. Also, its properties are following below
   * rules:
   *
   * - `parameters`: Path parameters of {@link IMigrateRoute.parameters}
   * - `query: Query parameter of {@link IMigrateRoute.query}
   * - `body`: Body parameter of {@link IMigrateRoute.body}
   *
   * Otherwise (this property value is `false`), length of the
   * {@link IOpenAiDocument.IFunction.parameters} is variable, and sequence of the
   * parameters are following below rules.
   *
   * - `...parameters`: Path parameters of {@link IMigrateRoute.parameters}
   * - `query`: Only when query parameter of {@link IMigrateRoute.query} is not `null`
   * - `body`: Only when body parameter of {@link IMigrateRoute.body} is not `null`
   */
  isKeywordParameter: boolean;
}
export namespace IOpenAiDocument {
  export type IPath = Record<OpenApiV3.Method, IFunction>;
  export interface IFunction {
    method: OpenApiV3.Method;
    path: string;
    name: string;
    parameters: IJsonSchema[];
    output?: IJsonSchema | undefined;
    description?: string;
    operation: () => OpenApi.IOperation;
    route: () => IMigrateRoute;
  }
  export type IJsonSchema =
    | IJsonSchema.IBoolean
    | IJsonSchema.IInteger
    | IJsonSchema.INumber
    | IJsonSchema.IString
    | IJsonSchema.IArray
    | IJsonSchema.IObject
    | IJsonSchema.IUnknown
    | IJsonSchema.INullOnly
    | IJsonSchema.IOneOf;
  export namespace IJsonSchema {
    export interface IBoolean extends __ISignificant<"boolean"> {
      default?: boolean;
      enum?: boolean[];
    }
    export interface IInteger extends __ISignificant<"integer"> {
      /** @type int64 */ default?: number;
      /** @type int64 */ enum?: number[];
      /** @type int64 */ minimum?: number;
      /** @type int64 */ maximum?: number;
      exclusiveMinimum?: boolean;
      exclusiveMaximum?: boolean;
      /**
       * @type uint64
       * @exclusiveMinimum 0
       */
      multipleOf?: number;
    }
    export interface INumber extends __ISignificant<"number"> {
      default?: number;
      enum?: number[];
      minimum?: number;
      maximum?: number;
      exclusiveMinimum?: boolean;
      exclusiveMaximum?: boolean;
      /** @exclusiveMinimum 0 */ multipleOf?: number;
    }
    export interface IString extends __ISignificant<"string"> {
      default?: string;
      enum?: string[];
      format?:
        | "binary"
        | "byte"
        | "password"
        | "regex"
        | "uuid"
        | "email"
        | "hostname"
        | "idn-email"
        | "idn-hostname"
        | "iri"
        | "iri-reference"
        | "ipv4"
        | "ipv6"
        | "uri"
        | "uri-reference"
        | "uri-template"
        | "url"
        | "date-time"
        | "date"
        | "time"
        | "duration"
        | "json-pointer"
        | "relative-json-pointer"
        | (string & {});
      pattern?: string;
      /** @type uint64 */ minLength?: number;
      /** @type uint64 */ maxLength?: number;
    }

    export interface IArray extends __ISignificant<"array"> {
      items: IJsonSchema;
      uniqueItems?: boolean;
      /** @type uint64 */ minItems?: number;
      /** @type uint64 */ maxItems?: number;
    }
    export interface IObject extends __ISignificant<"object"> {
      properties?: Record<string, IJsonSchema>;
      required?: string[];
      additionalProperties?: boolean | IJsonSchema;
      maxProperties?: number;
      minProperties?: number;
    }

    export interface IUnknown extends __IAttribute {
      type?: undefined;
    }
    export interface INullOnly extends __IAttribute {
      type: "null";
    }
    export interface IOneOf extends __IAttribute {
      oneOf: IJsonSchema[];
    }
    export interface __ISignificant<Type extends string> extends __IAttribute {
      type: Type;
      nullable?: boolean;
    }
    export interface __IAttribute {
      title?: string;
      description?: string;
      deprecated?: boolean;
    }
  }
}
