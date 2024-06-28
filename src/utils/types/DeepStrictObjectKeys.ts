import type { IsAny } from "./IsAny";
import type { IsUnion } from "./IsUnion";

type __ValueType =
  | number
  | boolean
  | string
  | null
  | undefined
  | symbol
  | bigint
  | Date;

type __DeepStrictObjectKeys<
  T extends object,
  P extends keyof T = keyof T,
> = P extends string
  ? IsUnion<T[P]> extends true
    ? P
    : T[P] extends Array<infer Element extends object>
    ? P | `${P}[*].${__DeepStrictObjectKeys<Element>}`
    : T[P] extends __ValueType
    ? P
    : IsAny<T[P]> extends true
    ? P
    : T[P] extends object
    ? T[P] extends Array<infer Element>
      ? P
      : T[P] extends Record<string, never>
      ? `${P}`
      : `${P}` | `${P}.${__DeepStrictObjectKeys<T[P]>}`
    : never
  : never;

export type DeepStrictObjectKeys<
  T extends object,
  P extends keyof T = keyof T,
> = T extends Array<infer Element>
  ? Element extends object
    ? `[*].${DeepStrictObjectKeys<Element>}`
    : `[*].${keyof Element extends string ? keyof Element : never}`
  : __DeepStrictObjectKeys<T, P>;
