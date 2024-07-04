import { Equal } from "./types/Equal";

type ValueType = number | boolean | string | null | undefined | symbol | bigint | Date | object; // object도 리턴의 대상이 되어야 한다.

type Int = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0;

export interface Try<T extends ValueType | void> {
  result: true;
  data: Equal<T, void> extends true ? null : T;
}

export interface Exception {
  result: false;
  code: `4${Int}${Int}${Int}`;
  message: string;
}

export type TryCatch<T extends ValueType, E extends Exception> = Try<T> | E;

export function createResponseForm<T extends ValueType | void>(data: T): Try<T> {
  return { result: true, data: (data ? data : null) as Equal<T, void> extends true ? null : T } as const;
}
