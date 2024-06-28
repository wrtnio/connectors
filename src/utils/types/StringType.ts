export namespace StringType {
  export type Split<
    T extends string,
    P extends string = "",
  > = T extends `${infer F}${P}${infer Rest}`
    ? [F, ...Split<Rest, P>]
    : T extends ""
    ? []
    : [T];

  export type Includes<
    T extends string,
    P extends string,
  > = T extends `${string}${P}${string}` ? true : false;

  export type ToString<T> = T extends string ? T : never;

  export type Join<
    T extends readonly string[],
    U extends string,
  > = T extends readonly []
    ? ""
    : T extends readonly [infer F]
    ? F
    : `${T[0]}${U}${Join<Tail<T>, U>}`;

  export type Tail<T extends readonly string[]> = T extends readonly [
    unknown,
    ...infer Rest,
  ]
    ? Rest
    : [];
}
