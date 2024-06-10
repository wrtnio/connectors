import core, { TypedBody } from "@nestia/core";
import { Controller, Get, Query } from "@nestjs/common";

import { IMiro } from "@wrtn/connector-api/lib/structures/connector/miro/IMiro";

import { MiroProvider } from "../../../providers/connector/miro/MiroProvider";

@Controller("connector/miro")
export class MiroController {
  /**
   * Miro Board 생성.
   *
   * @internal
   *
   * @param input Board 생성을 위한 .
   */
  @core.TypedRoute.Post("createBoard")
  async createBoard(
    @TypedBody() input: IMiro.ICreateBoardInput,
  ): Promise<IMiro.ICreateBoardOutput> {
    return MiroProvider.createBoard(input);
  }

  /**
   * Miro 액세스 토큰 갱신.
   *
   * @internal
   *
   * @param input Refresh Token DTO.
   */
  @core.TypedRoute.Post("refresh")
  async refresh(
    @TypedBody() input: IMiro.IRefreshAccessTokenInput,
  ): Promise<IMiro.IRefreshAccessTokenOutput> {
    return MiroProvider.refresh(input);
  }

  /**
   * Miro 액세스 토큰 발급.
   *
   * @internal
   *
   * @param query Authorization Code Dto.
   */
  @Get("auth")
  authorization(
    @Query() query: IMiro.IAuthorizationCode,
  ): Promise<IMiro.IGetAccessTokenOutput> {
    return null!;
  }
}
