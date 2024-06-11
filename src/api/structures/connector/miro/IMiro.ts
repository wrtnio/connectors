import { tags } from "typia";

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

  /**
   * @title Create Card Item DTO
   */
  export interface ICreateCardItemInput
    extends ICommon.ISecret<"miro", ["boards:write"]> {
    /**
     * @title 보드 아이디
     * @description Unique identifier (ID) of the board where you want to create the item.
     */
    board_id: string;

    /**
     * @title 카드 아이템 정보
     * @description Contains card item data, such as the title, description, due date, or assignee ID.
     */
    data: {
      /**
       * @title 담당자 아이디
       * @description Unique user identifier. In the GUI, the user ID is mapped to the name of the user who is assigned as the owner of the task or activity described in the card. The identifier is a string containing numbers, and it is automatically assigned to a user when they first sign up.
       */
      assigneeId?: string;

      /**
       * @title 카드 설명
       * @description A short text description to add context about the card.
       */
      description?: string;

      /**
       * @title 마감일
       * @description The date when the task or activity described in the card is due to be completed. In the GUI, users can select the due date from a calendar. Format: UTC, adheres to ISO 8601, includes a trailing Z offset.
       */
      dueDate?: string & tags.Format<"date-time">;

      /**
       * @title 카드 이름
       * @description A short text header for the card.
       */
      title?: string;
    };

    /**
     * @title 스타일
     * @description Contains information about the style of a card item, such as the card theme.
     */
    style: {
      /**
       * @title 카드 색상
       * @description Hex value of the border color of the card.
       * @default #2d9bf0
       */
      cardTheme?: string;
    };

    /**
     * @title 위치
     * @description Contains information about the item's position on the board, such as its x coordinate, y coordinate, and the origin of the x and y coordinates.
     */
    position: {
      /**
       * @title x 좌표
       * @description X-axis coordinate of the location of the item on the board.
       * By default, all items have absolute positioning to the board, not the current viewport. Default: 0.
       * The center point of the board has x: 0 and y: 0 coordinates.
       */
      x?: number;

      /**
       * @title y 좌표
       * @description X-axis coordinate of the location of the item on the board.
       * By default, all items have absolute positioning to the board, not the current viewport. Default: 0.
       * The center point of the board has x: 0 and y: 0 coordinates.
       */
      y?: number;
    };

    /**
     * @title 크기
     * @description Contains geometrical information about the item, such as its width or height.
     */
    geometry: {
      /**
       * @title 높이
       * @description Height of the item, in pixels.
       */
      height?: number;

      /**
       * @title 회전
       * @description Rotation angle of an item, in degrees, relative to the board. You can rotate items clockwise (right) and counterclockwise (left) by specifying positive and negative values, respectively.
       */
      rotation?: number;

      /**
       * @title 너비
       * @description Width of the item, in pixels.
       */
      width?: number;
    };

    /**
     * @title 부모
     * @description Contains information about the parent this item must be attached to. A maximum of 1000 items can be attached to a frame. Passing null for parent.id directly attaches an item to the canvas.
     */
    parent?: {
      /**
       * @title 부모 아이디
       * @description Unique identifier (ID) of the parent frame for the item.
       */
      id?: string;
    };
  }

  /**
   * @title Create Card Item DTO
   */
  export interface ICreateCardItemOutput {
    /**
     * @title Card ID
     * @description Unique identifier (ID) of the board.
     */
    id: string;
  }
}
