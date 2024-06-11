import { tags } from "typia";

import { ICommon } from "@wrtn/connector-api/lib/structures/connector/common/ISecretValue";

export namespace IMiro {
  /**
   * @title Miro Auth Code DTO.
   */
  export interface IAccessTokenInput {
    /**
     * @title 유형
     * @description Always set the value for this parameter to authorization_code
     */
    grant_type: "authorization_code";

    /**
     * @title 앱의 클라이언트 ID
     * @description The Client ID of the app that is requesting for user authorization. For information on how to obtain the client ID, see Create authorization request link
     */
    client_id: string;

    /**
     * @title 앱의 클라이언트 secret
     * @description App client secret. The client secret must be kept confidential.
     */
    client_secret: string;

    /**
     * @title 인증 코드
     * @description Paste the authorization code that was provided as the code parameter value in the redirect URI.
     */
    code: string;

    /**
     * @title redirect URI
     * @description Paste the redirect URI. The URI must match the original redirect URI that was used when requesting the authorization (including slash at the end).
     */
    redirect_uri: string;
  }

  /**
   * @title Access 토큰 DTO.
   */
  export interface IAccessTokenOutput {
    /**
     * @title 사용자 아이디
     */
    user_id: string;

    /**
     * @title 만료 기간
     */
    expires_in: number;

    /**
     * @title 팀 아이디
     */
    team_id: string;

    /**
     * @title access 토큰
     */
    access_token: string;

    /**
     * @title 사용 범위
     */
    scope: string;

    /**
     * @title refresh 토큰
     */
    refresh_token: string;

    /**
     * @title 토큰 유형
     */
    token_type: "bearer";
  }

  /**
   * @title Miro 액세스 토큰 갱신 DTO.
   */
  export interface IRefreshTokenInput {
    /**
     * @title 유형
     */
    grant_type?: "refresh_token";

    /**
     * @title 앱의 클라이언트 ID
     */
    client_id: string;

    /**
     * @title 앱의 클라이언트 secret
     */
    client_secret: string;

    /**
     * @title refresh token
     */
    refresh_token: string;
  }

  /**
   * @title 액세스 토큰 갱신 출력 DTO.
   */
  export type IRefreshTokenOutput = Pick<
    IAccessTokenOutput,
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
    description?: string & tags.MinLength<0> & tags.MaxLength<300>;

    /**
     * @title 보드 이름
     * @description Name for the board.
     */
    name?: string & tags.MinLength<1> & tags.MaxLength<60>;

    /**
     * @title 정책 정보
     * @description Defines the permissions policies and sharing policies for the board.
     */
    policy?: {
      /**
       * @title 권한 정책
       * @description Defines the permissions policies for the board.
       */
      permissionsPolicy?: {
        /**
         * @title 협업 설정
         * @description Defines who can start or stop timer, voting, video chat, screen sharing, attention management. Others will only be able to join. To change the value for the collaborationToolsStartAccess parameter, contact Miro Customer Support.
         *
         * @default all_editors
         */
        collaborationToolsStartAccess?:
          | "all_editors"
          | "board_owners_and_coowners";

        /**
         * @title 보드 복사 설정
         * @description Defines who can copy the board, copy objects, download images, and save the board as a template or PDF.
         *
         * @default anyone
         */
        copyAccess?: "anyone" | "team_members" | "team_editors" | "board_owner";

        /**
         * @title 공유 설정
         * @description Defines who can change access and invite users to this board. To change the value for the sharingAccess parameter, contact Miro Customer Support.
         *
         * @default team_members_with_editing_rights
         */
        sharingAccess?:
          | "team_members_with_editing_rights"
          | "owner_and_coowners";
      };

      /**
       * @title 공유 정책
       * @description Defines the public-level, organization-level, and team-level access for the board. The access level that a user gets depends on the highest level of access that results from considering the public-level, team-level, organization-level, and direct sharing access.
       */
      sharingPolicy?: {
        /**
         * @title 공개 수준
         * @description Defines the public-level access to the board
         *
         * @default private
         */
        access?: "private" | "view" | "edit" | "comment";

        /**
         * @title 초대시 사용자 역할 정의
         * @description Defines the user role when inviting a user via the invite to team and board link. For Enterprise users, the inviteToAccountAndBoardLinkAccess parameter is always set to no_access regardless of the value that you assign for this parameter.
         *
         * @default no_access
         */
        inviteToAccountAndBoardLinkAccess?:
          | "no_access"
          | "viewer"
          | "editor"
          | "commenter";

        /**
         * @title 조직 권한
         * @description Defines the organization-level access to the board. If the board is created for a team that does not belong to an organization, the organizationAccess parameter is always set to the default value.
         *
         * @default private
         */
        organizationAccess?: "private" | "view" | "edit" | "comment";

        /**
         * @title 팀 권한
         * @description Defines the team-level access to the board.
         *
         * @default private
         */
        teamAccess?: "private" | "view" | "edit" | "comment";
      };
    };

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
    /**
     * @title 보드 ID
     * @description Unique identifier (ID) of the board.
     */
    id: string;

    /**
     * @title 보드 이름
     * @description Name of the board.
     */
    name: string;

    /**
     * @title 보드 설명
     * @description Description of the board.
     */
    description: string;

    /**
     * @title 팀 정보
     * @description Contains information about the team with which the board is associated.
     */
    team: {
      /**
       * @title 팀 아이디
       * @description Unique identifier (ID) of the team.
       */
      id: string;

      /**
       * @title 팀 이름
       * @description Name of the team.
       */
      name: string;
    };

    /**
     * @title 프로젝트 정보
     * @description Contains information about the project with which the board is associated.
     */
    project?: {
      /**
       * @title 프로젝트 아이디
       * @description Unique identifier (ID) of the project.
       */
      id: string;
    };

    /**
     * @title 이미지 정보
     * @description Contains information about the cover picture of the board.
     */
    picture?: {
      /**
       * @title 이미지 아이디
       * @description Unique identifier (ID) of the cover picture for the board.
       */
      id: tags.Type<"int64">;

      /**
       * @title 이미지 URL
       * @description URL of the cover picture of the board.
       */
      imageURL: string;
    };

    /**
     * @title 정책 정보
     * @description Defines the permissions policies and sharing policies for the board.
     */
    policy: {
      /**
       * @title 권한 정책
       * @description Defines the permissions policies for the board.
       */
      permissionsPolicy: {
        /**
         * @title 협업 설정
         * @description Defines who can start or stop timer, voting, video chat, screen sharing, attention management. Others will only be able to join. To change the value for the collaborationToolsStartAccess parameter, contact Miro Customer Support.
         */
        collaborationToolsStartAccess:
          | "all_editors"
          | "board_owners_and_coowners";

        /**
         * @title 보드 복사 설정
         * @description Defines who can copy the board, copy objects, download images, and save the board as a template or PDF.
         */
        copyAccess: "anyone" | "team_members" | "team_editors" | "board_owner";

        /**
         * @title 공유 설정
         * @description Defines who can change access and invite users to this board. To change the value for the sharingAccess parameter, contact Miro Customer Support.
         */
        sharingAccess:
          | "team_members_with_editing_rights"
          | "owner_and_coowners";
      };

      /**
       * @title 공유 정책
       * @description Defines the public-level, organization-level, and team-level access for the board. The access level that a user gets depends on the highest level of access that results from considering the public-level, team-level, organization-level, and direct sharing access.
       */
      sharingPolicy: {
        /**
         * @title 공개 수준
         * @description Defines the public-level access to the board.
         */
        access: "private" | "view" | "edit" | "comment";

        /**
         * @title 초대시 사용자 역할 정의
         * @description Defines the user role when inviting a user via the invite to team and board link. For Enterprise users, the inviteToAccountAndBoardLinkAccess parameter is always set to no_access.
         */
        inviteToAccountAndBoardLinkAccess:
          | "no_access"
          | "viewer"
          | "editor"
          | "commenter"
          | "coowner"
          | "owner"
          | "guest";

        /**
         * @title 조직 권한
         * @description Defines the organization-level access to the board. If the board is created for a team that does not belong to an organization, the organizationAccess parameter is always set to the default value.
         */
        organizationAccess: "private" | "view" | "edit" | "comment";

        /**
         * @title 팀 권한
         * @description Defines the team-level access to the board.
         */
        teamAccess: "private" | "view" | "edit" | "comment";
      };
    };

    /**
     * @title 보드 링크
     * @description URL to view the board.
     */
    viewLink: string;

    /**
     * @title 소유자 정보
     * @description Contains information about the user who created the board.
     */
    owner: {
      /**
       * @title 소유자 아이디
       * @description Unique identifier (ID) of the user.
       */
      id: string;

      /**
       * @title 소유자 이름
       * @description Name of the user.
       */
      name: string;

      /**
       * @title 소유자 유형
       * @description Indicates the type of object returned. In this case, type returns user.
       */
      type: string;
    };

    /**
     * @title 현재 사용자
     * @description Contains the current user's board membership details. The current user could be different from the board owner.
     */
    currentUserMembership: {
      /**
       * @title 현재 사용자 아이디
       * @description Unique identifier (ID) of the user.
       */
      id: string;

      /**
       * @title 현재 사용자 이름
       * @description Name of the user.
       */
      name: string;

      /**
       * @title 현재 사용자 역할
       * @description Role of the board member.
       */
      role: string;

      /**
       * @title 현재 사용자 유형
       * @description Type of the object that is returned. In this case, type returns board_member.
       */
      type: string;
    };

    /**
     * @title 작성 시간
     * @description Date and time when the board was created. Format: UTC, adheres to ISO 8601, includes a trailing Z offset.
     */
    createdAt: string & tags.Format<"date-time">;

    /**
     * @title 작성자
     * @description Contains information about the user who created the board.
     */
    createdBy: {
      /**
       * @title 작성자 아이디
       * @description Unique identifier (ID) of the user.
       */
      id: string;

      /**
       * @title 작성자 이름
       * @description Name of the user.
       */
      name: string;

      /**
       * @title 작성자 유형
       * @description Indicates the type of object returned. In this case, type returns user.
       */
      type: string;
    };

    /**
     * @title 수정 시간
     * @description Date and time when the board was last modified. Format: UTC, adheres to ISO 8601, includes a trailing Z offset.
     */
    modifiedAt: string & tags.Format<"date-time">;

    /**
     * @title 수정자
     * @description Contains information about the user who created the board.
     */
    modifiedBy: {
      /**
       * @title 수정자 아이디
       * @description Unique identifier (ID) of the user.
       */
      id: string;

      /**
       * @title 수정자 이름
       * @description Name of the user.
       */
      name: string;

      /**
       * @title 수정자 유형
       * @description Indicates the type of object returned. In this case, type returns user.
       */
      type: string;
    };

    /**
     * @title 링크 정보
     * @description Contains applicable links for the board.
     */
    links: {
      /**
       * @title 관련 링크
       * @description Link to obtain information about the board members associated with the board.
       */
      related: string;

      /**
       * @title 현재 보드 링크
       * @description Link to obtain information about the current board.
       */
      self: string;
    };

    /**
     * @title 유형
     * @description Type of the object that is returned. In this case, type returns board.
     */
    type: string;
  }

  /**
   * @title Create Board DTO
   */
  export interface ICopyBoardInput
    extends ICommon.ISecret<"miro", ["boards:write"]> {
    /**
     * @title 복사할 보드의 ID
     * @description Unique identifier (ID) of the board that you want to copy.
     */
    copy_from: string;

    /**
     * @title 보드 설명
     * @description Description of the board.
     */
    description?: string & tags.MinLength<0> & tags.MaxLength<300>;

    /**
     * @title 보드 이름
     * @description Name for the board.
     */
    name?: string & tags.MinLength<1> & tags.MaxLength<60>;

    /**
     * @title 정책 정보
     * @description Defines the permissions policies and sharing policies for the board.
     */
    policy?: {
      /**
       * @title 권한 정책
       * @description Defines the permissions policies for the board.
       */
      permissionsPolicy?: {
        /**
         * @title 협업 설정
         * @description Defines who can start or stop timer, voting, video chat, screen sharing, attention management. Others will only be able to join. To change the value for the collaborationToolsStartAccess parameter, contact Miro Customer Support.
         *
         * @default all_editors
         */
        collaborationToolsStartAccess?:
          | "all_editors"
          | "board_owners_and_coowners";

        /**
         * @title 보드 복사 설정
         * @description Defines who can copy the board, copy objects, download images, and save the board as a template or PDF.
         *
         * @default anyone
         */
        copyAccess?: "anyone" | "team_members" | "team_editors" | "board_owner";

        /**
         * @title 공유 설정
         * @description Defines who can change access and invite users to this board. To change the value for the sharingAccess parameter, contact Miro Customer Support.
         *
         * @default team_members_with_editing_rights
         */
        sharingAccess?:
          | "team_members_with_editing_rights"
          | "owner_and_coowners";
      };

      /**
       * @title 공유 정책
       * @description Defines the public-level, organization-level, and team-level access for the board. The access level that a user gets depends on the highest level of access that results from considering the public-level, team-level, organization-level, and direct sharing access.
       */
      sharingPolicy?: {
        /**
         * @title 공개 수준
         * @description Defines the public-level access to the board
         *
         * @default private
         */
        access?: "private" | "view" | "edit" | "comment";

        /**
         * @title 초대시 사용자 역할 정의
         * @description Defines the user role when inviting a user via the invite to team and board link. For Enterprise users, the inviteToAccountAndBoardLinkAccess parameter is always set to no_access regardless of the value that you assign for this parameter.
         *
         * @default no_access
         */
        inviteToAccountAndBoardLinkAccess?:
          | "no_access"
          | "viewer"
          | "editor"
          | "commenter";

        /**
         * @title 조직 권한
         * @description Defines the organization-level access to the board. If the board is created for a team that does not belong to an organization, the organizationAccess parameter is always set to the default value.
         *
         * @default private
         */
        organizationAccess?: "private" | "view" | "edit" | "comment";

        /**
         * @title 팀 권한
         * @description Defines the team-level access to the board.
         *
         * @default private
         */
        teamAccess?: "private" | "view" | "edit" | "comment";
      };
    };

    /**
     * @title 팀 ID
     * @description Unique identifier (ID) of the team where the board must be placed.
     */
    teamId?: string;
  }

  /**
   * @title Copy Board DTO
   */
  export type ICopyBoardOutput = Pick<
    ICreateBoardOutput,
    | "id"
    | "name"
    | "description"
    | "team"
    | "picture"
    | "policy"
    | "viewLink"
    | "owner"
    | "currentUserMembership"
    | "createdAt"
    | "createdBy"
    | "modifiedAt"
    | "modifiedBy"
    | "links"
    | "type"
  >;

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
    data?: {
      /**
       * @title 담당자 아이디
       * @description Unique user identifier. In the GUI, the user ID is mapped to the name of the user who is assigned as the owner of the task or activity described in the card. The identifier is a string containing numbers, and it is automatically assigned to a user when they first sign up.
       */
      assigneeId?: `${number}`;

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
    style?: {
      /**
       * @title 카드 색상
       * @description Hex value of the border color of the card.
       *
       * @default #2d9bf0
       */
      cardTheme?: string;
    };

    /**
     * @title 위치
     * @description Contains information about the item's position on the board, such as its x coordinate, y coordinate, and the origin of the x and y coordinates.
     */
    position?: {
      /**
       * @title x 좌표
       * @description X-axis coordinate of the location of the item on the board.
       * By default, all items have absolute positioning to the board, not the current viewport. Default: 0.
       * The center point of the board has x: 0 and y: 0 coordinates.
       *
       * @default 0
       */
      x?: number & tags.Type<"double">;

      /**
       * @title y 좌표
       * @description X-axis coordinate of the location of the item on the board.
       * By default, all items have absolute positioning to the board, not the current viewport. Default: 0.
       * The center point of the board has x: 0 and y: 0 coordinates.
       *
       * @default 0
       */
      y?: number & tags.Type<"double">;
    };

    /**
     * @title 크기
     * @description Contains geometrical information about the item, such as its width or height.
     */
    geometry?: {
      /**
       * @title 높이
       * @description Height of the item, in pixels.
       */
      height?: number & tags.Type<"double">;

      /**
       * @title 회전
       * @description Rotation angle of an item, in degrees, relative to the board. You can rotate items clockwise (right) and counterclockwise (left) by specifying positive and negative values, respectively.
       */
      rotation?: number & tags.Type<"double">;

      /**
       * @title 너비
       * @description Width of the item, in pixels.
       */
      width?: number & tags.Type<"double">;
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
      id?: `${number}`;
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

    /**
     * @title 카드 아이템 정보
     * @description Contains card item data, such as the title, description, due date, or assignee ID.
     */
    data: {
      /**
       * @title 담당자 아이디
       * @description Unique user identifier. In the GUI, the user ID is mapped to the name of the user who is assigned as the owner of the task or activity described in the card. The identifier is a string containing numbers, and it is automatically assigned to a user when they first sign up.
       */
      assigneeId: string;

      /**
       * @title 카드 설명
       * @description A short text description to add context about the card.
       */
      description: string;

      /**
       * @title 마감일
       * @description The date when the task or activity described in the card is due to be completed. In the GUI, users can select the due date from a calendar. Format: UTC, adheres to ISO 8601, includes a trailing Z offset.
       */
      dueDate: string & tags.Format<"date-time">;

      /**
       * @title 카드 이름
       * @description A short text header for the card.
       */
      title: string;
    };

    /**
     * @title 스타일
     * @description Contains information about the style of a card item, such as the card theme.
     */
    style: {
      /**
       * @title 카드 색상
       * @description Hex value of the border color of the card.
       *
       * @default #2d9bf0
       */
      cardTheme: string;
    };

    /**
     * @title 위치
     * @description Contains information about the item's position on the board, such as its x coordinate, y coordinate, and the origin of the x and y coordinates.
     */
    position: {
      /**
       * @title origin
       * @description Area of the item that is referenced by its x and y coordinates. For example, an item with a center origin will have its x and y coordinates point to its center. The center point of the board has x: 0 and y: 0 coordinates.
       * Currently, only one option is supported (center).
       */
      origin: "center";

      /**
       * @title
       * @description
       */
      relativeTo: "canvas_center" | "parent_top_left";

      /**
       * @title x 좌표
       * @description X-axis coordinate of the location of the item on the board.
       * By default, all items have absolute positioning to the board, not the current viewport. Default: 0.
       * The center point of the board has x: 0 and y: 0 coordinates.
       *
       * @default 0
       */
      x: number;

      /**
       * @title y 좌표
       * @description X-axis coordinate of the location of the item on the board.
       * By default, all items have absolute positioning to the board, not the current viewport. Default: 0.
       * The center point of the board has x: 0 and y: 0 coordinates.
       *
       * @default 0
       */
      y: number;
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
      height: number;

      /**
       * @title 회전
       * @description Rotation angle of an item, in degrees, relative to the board. You can rotate items clockwise (right) and counterclockwise (left) by specifying positive and negative values, respectively.
       */
      rotation?: number;

      /**
       * @title 너비
       * @description Width of the item, in pixels.
       */
      width: number;
    };

    /**
     * @title 작성 시간
     * @description Date and time when the item was created.
     * Format: UTC, adheres to ISO 8601, includes a trailing Z offset.
     */
    createdAt: string & tags.Format<"date-time">;

    /**
     * @title 작성자
     * @description Contains information about the user who created the item
     */
    createdBy: {
      /**
       * @title 작성자 아이디
       * @description Unique identifier (ID) of the user.
       */
      id: string;

      /**
       * @title 작성자 유형
       * @description Indicates the type of object returned. In this case, type returns user.
       */
      type: string;
    };

    /**
     * @title 수정 시간
     * @description Date and time when the item was last modified.
     * Format: UTC, adheres to ISO 8601, includes a trailing Z offset.
     */
    modifiedAt: string & tags.Format<"date-time">;

    /**
     * @title 수정자
     * @description Contains information about the user who last modified the item.
     */
    modifiedBy: {
      /**
       * @title 수정자 아이디
       * @description Unique identifier (ID) of the user.
       */
      id: string;

      /**
       * @title 수정자 유형
       * @description Indicates the type of object returned. In this case, type returns user.
       */
      type: string;
    };

    /**
     * @title 부모
     * @description Contains information about the parent frame for the item.
     */
    parent?: {
      /**
       * @title 부모 아이디
       * @description Unique identifier (ID) of the parent frame for the item.
       */
      id: string;

      /**
       * @title 링크 정보
       * @description Contains applicable links for the current object.
       */
      links: {
        /**
         * @title 링크 URL
         * @description Link to obtain more information about the current object.
         */
        self: string;
      };
    };

    /**
     * @title 링크 정보
     * @description Contains applicable links for the item.
     */
    links: {
      /**
       * @title 링크 정보???
       * @description Link to obtain information about the child items related to the frame.
       */
      related?: string;

      /**
       * @title 링크 URL
       * @description Link to obtain information about the current item.
       */
      self: string;
    };

    /**
     * @title 유형
     * @description Type of item that is returned.
     */
    type: string;
  }
}
