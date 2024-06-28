export type ToObject<T> = T extends Record<any, any> ? T : never;
