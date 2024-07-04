import { SecretKey } from "@wrtn/decorators";

export namespace ICommon {
  export interface ISecret<T extends string, S extends undefined | never | string[] = never> {
    /**
     * secret key.
     *
     * @title 인증을 위한 시크릿 값
     */
    secretKey: string & SecretKey<T, S>;
  }
}
