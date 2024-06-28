import type { Allow } from "./Allow";
import type { DeepStrictObjectKeys } from "./DeepStrictObjectKeys";
import type { RemoveArraySymbol } from "./RemoveArraySymbol";
import type { StringType } from "./StringType";
import type { ToObject } from "./ToObject";
import type { ValueOf } from "./ValueOf";

export type GetType<
  T extends object,
  K extends DeepStrictObjectKeys<T>,
> = StringType.Split<K, "."> extends [infer First extends keyof T]
  ? ValueOf<ToObject<Pick<T, First>>>
  : StringType.Split<K, "."> extends [
      infer First extends string,
      ...infer Rest extends string[],
    ]
  ? RemoveArraySymbol<First> extends keyof T
    ? ValueOf<ToObject<Pick<T, RemoveArraySymbol<First>>>> extends object
      ? ValueOf<ToObject<Pick<T, RemoveArraySymbol<First>>>> extends Array<
          infer E
        >
        ? E extends object
          ? GetType<
              E,
              Allow<StringType.Join<Rest, ".">, DeepStrictObjectKeys<E>>
            >
          : E
        : GetType<
            ValueOf<ToObject<Pick<T, RemoveArraySymbol<First>>>>,
            Allow<
              StringType.Join<Rest, ".">,
              DeepStrictObjectKeys<
                ValueOf<ToObject<Pick<T, RemoveArraySymbol<First>>>>
              >
            >
          >
      : never
    : never
  : never;
