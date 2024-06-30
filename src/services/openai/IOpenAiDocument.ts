import { OpenApiV3 } from "@samchon/openapi";

export interface IOpenAiDocument {
  openapi: "3.0" | `3.0.${number}`;
  operations: IOpenAiDocument.IOperation[];
}
export namespace IOpenAiDocument {
  export type IPath = Record<OpenApiV3.Method, IOperation>;
  export interface IOperation {
    method: OpenApiV3.Method;
    path: string;
    name: string;
    parameters: IJsonSchema[];
    output?: IJsonSchema | undefined;
    description?: string;
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
