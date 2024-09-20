import { SecretKey } from "@wrtnio/decorators";

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
}
