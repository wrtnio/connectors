import { ICommon } from "@wrtn/connector-api/lib/structures/connector/common/ISecretValue";

export namespace IMiro {
  /**
   * @title Miro Auth Code DTO.
   */
  export interface IAuthorizationCode {
    /**
     * @title Miro Auth Code
     */
    code: string;
  }

  /**
   * @title Access 토큰 DTO.
   */
  export interface IGetAccessTokenOutput {
    /**
     * @title 유저 아이디.
     */
    user_id: string;

    /**
     * @title 이 액세스 토큰의 권한 범위.
     */
    scope: string;

    /**
     * @title 액세스 토큰 만료 시간.
     */
    expires_in: number;

    /**
     * @title 리프레시 토큰.
     */
    refresh_token: string;

    /**
     * @title 토큰 타입.
     */
    token_type: "bearer";

    /**
     * @title 액세스 토큰.
     */
    access_token: string;

    /**
     * @title 팀 아이디.
     */
    team_id: string;
  }

  /**
   * @title Miro 액세스 토큰 갱신 DTO.
   */
  export interface IRefreshAccessTokenInput {
    refresh_token: string;
  }

  /**
   * @title 액세스 토큰 갱신 출력 DTO.
   */
  export type IRefreshAccessTokenOutput = Pick<
    IGetAccessTokenOutput,
    | "token_type"
    | "team_id"
    | "access_token"
    | "refresh_token"
    | "scope"
    | "expires_in"
  >;

  /**
   * @title Create Board DTO
   */
  export interface ICreateBoardInput
    extends ICommon.ISecret<"miro", ["boards:write"]> {
    /**
     * @title 보드 설명
     * @description Description of the board.
     */
    description: string;

    /**
     * @title 보드 이름
     * @description Name for the board.
     */
    name: string;

    /**
     * @title 팀 아이디
     * @description Unique identifier (ID) of the team where the board must be placed.
     */
    teamId?: string;

    /**
     * @title 프로젝트 아이디
     * @description Unique identifier (ID) of the project to which the board must be added.
     */
    projectId?: string;
  }

  /**
   * @title Create Board DTO
   */
  export interface ICreateBoardOutput {
    id: string;
  }

  /**
   * @title Create Board DTO
   */
  export interface ICopyBoardInput
    extends ICommon.ISecret<"miro", ["boards:write"]> {
    /**
     * @title
     * @description Unique identifier (ID) of the board that you want to copy.
     */
    copy_from: string;

    /**
     * @title
     * @description Description of the board.
     */
    description: string;

    /**
     * @title
     * @description Name for the board.
     */
    name: string;

    /**
     * @title
     * @description Unique identifier (ID) of the team where the board must be placed.
     */
    teamId?: string;
  }

  /**
   * @title Copy Board DTO
   */
  export interface ICopyBoardOutput {
    /**
     * @title board ID
     * @description Unique identifier (ID) of the board.
     */
    id: string;
  }
}
