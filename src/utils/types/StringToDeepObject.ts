import type { StringType } from "./StringType";
import type { UnionToIntersection } from "./UnionToIntersection";
import type { ValueOf } from "./ValueOf";

type _BeforeDot<T extends string> = T extends `${infer Before}.${infer _}`
  ? Before
  : never;

type _AfterDot<T extends string> = T extends `${infer _}.${infer After}`
  ? After
  : never;

export type StringToDeepObject<
  TargetString extends string,
  Type = any,
  P extends string[] = StringType.Split<TargetString, ",">,
> = UnionToIntersection<
  ValueOf<{
    [key in P[number]]: StringType.Includes<key, "."> extends true
      ? _BeforeDot<key> extends `${infer PropertyName}[*]`
        ? PropertyName extends "" // PropertyName이 빈 문자라면 `[*].a`와 같이 배열 타입에 해당한다.
          ? StringToDeepObject<StringType.ToString<_AfterDot<key>>, Type>[]
          : Record<
              PropertyName, // PropertyName이 존재하는 경우에는 내부 타입이 배열에 해당한다.
              StringToDeepObject<StringType.ToString<_AfterDot<key>>, Type>[]
            >
        : Record<
            _BeforeDot<key>,
            StringToDeepObject<StringType.ToString<_AfterDot<key>>, Type>
          >
      : Record<key, Type>;
  }>
>;
