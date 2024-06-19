export namespace IMeta {
  export interface AccessTokenDto {
    access_token: string;
    token_type: "bearer";
    expires_in: number;
  }
}
