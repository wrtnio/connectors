export type RemoveArraySymbol<T extends string> = T extends `${infer P}[*]`
  ? P
  : T;
