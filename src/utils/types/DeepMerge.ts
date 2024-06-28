export type DeepMerge<T extends object, P extends object> = {
  [key in keyof T | keyof P]: key extends keyof T
    ? key extends keyof P
      ? T[key] extends object
        ? P[key] extends object
          ? DeepMerge<T[key], P[key]>
          : T[key]
        : T[key]
      : T[key]
    : key extends keyof P
    ? key extends keyof T
      ? P[key] extends object
        ? T[key] extends object
          ? DeepMerge<T[key], P[key]>
          : P[key]
        : P[key]
      : P[key]
    : never;
};
