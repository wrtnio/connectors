export type ElementOf<T extends Array<any>> = T extends Array<infer Element>
  ? Element
  : never;
