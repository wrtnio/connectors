import { tags } from "typia";

export type ISwaggerSchema =
  | ISwaggerSchema.IUnknown
  | ISwaggerSchema.INullOnly
  | ISwaggerSchema.IAnyOf
  | ISwaggerSchema.IOneOf
  | ISwaggerSchema.IBoolean
  | ISwaggerSchema.IInteger
  | ISwaggerSchema.INumber
  | ISwaggerSchema.IString
  | ISwaggerSchema.IArray
  | ISwaggerSchema.IObject
  | ISwaggerSchema.IReference;
export namespace ISwaggerSchema {
  export interface IUnknown extends IAttribute {
    type?: undefined;
  }
  export interface INullOnly extends IAttribute {
    type: "null";
  }
  export interface IAnyOf extends IAttribute {
    anyOf: ISwaggerSchema[];
  }
  export interface IOneOf extends IAttribute {
    oneOf: ISwaggerSchema[];
  }

  export interface IBoolean extends ISignificant<"boolean"> {
    default?: boolean;
    enum?: boolean[];
  }
  export interface IInteger extends ISignificant<"integer"> {
    default?: number & tags.Type<"int32">;
    enum?: Array<number & tags.Type<"int32">>;
    minimum?: number & tags.Type<"int32">;
    maximum?: number & tags.Type<"int32">;
    exclusiveMinimum?: boolean;
    exclusiveMaximum?: boolean;
    multipleOf?: number & tags.Type<"int32">;
  }
  export interface INumber extends ISignificant<"number"> {
    default?: number;
    enum?: number[];
    minimum?: number;
    maximum?: number;
    exclusiveMinimum?: boolean;
    exclusiveMaximum?: boolean;
    multipleOf?: number;
  }
  export interface IString extends ISignificant<"string"> {
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
    pattern?: string; // regex
    minLength?: number & tags.Type<"uint32">;
    maxLength?: number & tags.Type<"uint32">;
    contentMediaType?: string;
  }

  export interface IArray extends ISignificant<"array"> {
    items: ISwaggerSchema;
    minItems?: number & tags.Type<"uint32">;
    maxItems?: number & tags.Type<"uint32">;
  }
  export interface ITuple extends ISignificant<"array"> {
    items: ISwaggerSchema[];
  }
  export interface IObject extends ISignificant<"object"> {
    properties?: Record<string, ISwaggerSchema>;
    required?: string[];
    additionalProperties?: ISwaggerSchema | boolean;
  }

  export interface IReference extends IAttribute {
    $ref: string;
  }

  interface ISignificant<Type extends string> extends IAttribute {
    type: Type;
    nullable?: boolean;
  }

  interface IAttribute {
    title?: string;
    description?: string;
    deprecated?: boolean;
  }
}
