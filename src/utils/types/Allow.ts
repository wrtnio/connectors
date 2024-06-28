export type Allow<A, B> = A extends B ? A : never;
