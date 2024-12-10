import { SecretKey } from "@wrtnio/decorators";

type Schema = {
  "x-wrtn-secret-key": string;
  "x-wrtn-secret-scopes": string[];
};

type Push<T extends Schema[], V> = [...T, V];
type Length<T extends Schema[]> = T["length"];
type NTuple<N extends number, T extends Schema[] = []> = number extends N
  ? Schema[]
  : N extends Length<T>
    ? T
    : NTuple<N, Push<T, Schema>>;

export namespace ICommon {
  export interface ISecret<
    T extends string,
    S extends undefined | never | string[] = never,
  > {
    /**
     * secret key.
     *
     * @title Select authentication information
     */
    secretKey: string & SecretKey<T, S>;
  }

  type Merge<T extends object, P extends object> = T & P;
  type SchemaConvert<S extends Schema[]> = S extends [
    infer F extends Schema,
    ...infer Rest extends Schema[],
  ]
    ? Length<S> extends 0
      ? Record<string, never>
      : Merge<
          Record<
            F["x-wrtn-secret-key"],
            string &
              SecretKey<F["x-wrtn-secret-key"], F["x-wrtn-secret-scopes"]>
          >,
          SchemaConvert<Rest>
        >
    : Record<string, never>;

  export interface ISecretTuple<Schemas extends NTuple<number>> {
    secretKeys: SchemaConvert<Schemas>;
  }
}
