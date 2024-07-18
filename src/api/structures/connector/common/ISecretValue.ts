import { SecretKey } from "@wrtnio/decorators";

export namespace ICommon {
  export interface ISecret<
    T extends string,
    S extends undefined | never | string[] = never,
  > {
    /**
     * secret key.
     *
     * @title 인증 정보 선택
     */
    secretKey: string & SecretKey<T, S>;
  }
}
