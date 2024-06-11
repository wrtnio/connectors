import core, { TypedBody } from "@nestia/core";
import { Controller, Get, Query } from "@nestjs/common";

import { IMiro } from "@wrtn/connector-api/lib/structures/connector/miro/IMiro";

import { MiroProvider } from "../../../providers/connector/miro/MiroProvider";

@Controller("connector/miro")
export class MiroController {
  /**
   * Miro 액세스 토큰 발급.
   *
   * @internal
   *
   * @param query Authorization Code Dto.
   */
  @Get("auth")
  authorization(
    @Query() query: IMiro.IAccessTokenInput,
  ): Promise<IMiro.IAccessTokenOutput> {
    return null!;
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
    @TypedBody() input: IMiro.IRefreshTokenInput,
  ): Promise<IMiro.IRefreshTokenOutput> {
    return MiroProvider.refresh(input);
  }

  /**
   * Miro Board 생성.
   *
   * @internal
   *
   * @param input Create Board DTO.
   */
  @core.TypedRoute.Post("createBoard")
  async createBoard(
    @TypedBody() input: IMiro.ICreateBoardInput,
  ): Promise<IMiro.ICreateBoardOutput> {
    return MiroProvider.createBoard(input);
  }

  /**
   * Miro Board 생성.
   *
   * @internal
   *
   * @param input Copy Board DTO.
   */
  @core.TypedRoute.Post("copyBoard")
  async copyBoard(
    @TypedBody() input: IMiro.ICopyBoardInput,
  ): Promise<IMiro.ICopyBoardOutput> {
    return MiroProvider.copyBoard(input);
  }

  /**
   * Miro Card 생성.
   *
   * @internal
   *
   * @param input Create Card DTO.
   */
  @core.TypedRoute.Post("createCard")
  async createCard(
    @TypedBody() input: IMiro.ICreateCardItemInput,
  ): Promise<IMiro.ICreateCardItemOutput> {
    return MiroProvider.createCard(input);
  }
}
