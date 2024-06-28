import type { DeepStrictObjectKeys } from "./DeepStrictObjectKeys";
import type { GetElementMember } from "./GetMember";

type __DeepStrictOmit<T extends object, K extends DeepStrictObjectKeys<T>> = {
  [key in keyof T as key extends K ? never : key]: T[key] extends Array<
    infer Element extends object
  >
    ? key extends string
      ? Element extends Date
        ? Array<Element>
        : Array<
            __DeepStrictOmit<
              Element,
              GetElementMember<K, key> extends DeepStrictObjectKeys<Element>
                ? GetElementMember<K, key>
                : never
            >
          >
      : never
    : T[key] extends Array<infer Element>
    ? Array<Element>
    : T[key] extends object
    ? key extends string
      ? T[key] extends Date
        ? T[key]
        : __DeepStrictOmit<
            T[key],
            GetElementMember<K, key> extends DeepStrictObjectKeys<T[key]>
              ? GetElementMember<K, key>
              : never
          >
      : never
    : T[key];
};

export type DeepStrictOmit<
  T extends object,
  K extends DeepStrictObjectKeys<T>,
> = T extends Array<infer Element extends object>
  ? Array<
      DeepStrictOmit<
        Element,
        GetElementMember<K, ""> extends DeepStrictObjectKeys<Element>
          ? GetElementMember<K, "">
          : never
      >
    >
  : __DeepStrictOmit<T, K>;
