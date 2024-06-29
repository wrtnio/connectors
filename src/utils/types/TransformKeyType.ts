import type { DeepStrictMerge } from "./DeepStrictMerge";
import { DeepStrictObjectKeys } from "./DeepStrictObjectKeys";
import { DeepStrictOmit } from "./DeepStrictOmit";
import { GetType } from "./GetType";
import type { RemoveArraySymbol } from "./RemoveArraySymbol";
import { StringToDeepObject } from "./StringToDeepObject";
import { ToObject } from "./ToObject";

type __FirstElementsOfTuples<T extends [string, string][]> = T extends [
  infer First extends [string, string],
  ...infer Rest extends [string, string][],
]
  ? [First[0], ...__FirstElementsOfTuples<Rest>]
  : [];

export type Rename<
  T extends object,
  Commands extends [DeepStrictObjectKeys<T>, string][],
  AllKeys extends DeepStrictObjectKeys<T> = __FirstElementsOfTuples<Commands>[number],
> = Commands extends [
  [infer Before extends DeepStrictObjectKeys<T>, infer After extends string],
  ...infer RestCommands extends [DeepStrictObjectKeys<T>, string][],
]
  ? DeepStrictMerge<
      DeepStrictMerge<
        DeepStrictOmit<T, AllKeys>,
        ToObject<
          StringToDeepObject<RemoveArraySymbol<After>, GetType<T, Before>>
        >
      >,
      Rename<T, RestCommands, AllKeys>
    >
  : {};
