export type LookUp<
  U extends { type?: string },
  T extends U["type"],
> = U extends { type?: T } ? U : never;
