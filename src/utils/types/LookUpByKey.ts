import { UnionToIntersection } from "./UnionToIntersection";

/**
 * The type that extracts the type that has a property corresponding to the name of a particular property among the union types.
 *
 * ```ts
 * type A = LookUpByKey<{ a: true } | { b: false }, "a">; // It must be { a: true }.
 * ```
 */
export type LookUpByKey<
  U,
  K extends keyof UnionToIntersection<U>,
> = U extends infer E
  ? K extends keyof E
    ? E[K] extends never
      ? never
      : E
    : never
  : never;
