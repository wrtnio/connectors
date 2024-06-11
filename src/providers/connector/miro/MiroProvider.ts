import axios from "axios";

import { IMiro } from "@wrtn/connector-api/lib/structures/connector/miro/IMiro";

import { ConnectorGlobal } from "../../../ConnectorGlobal";

export namespace MiroProvider {
  export async function refresh(
    input: IMiro.IRefreshTokenInput,
  ): Promise<IMiro.IRefreshTokenOutput> {
    try {
      const {
        grant_type = "refresh_token",
        client_id,
        client_secret,
        refresh_token,
      } = input;

      const res = await axios.post(
        "https://api.miro.com/v1/oauth/token",
        {
          grant_type: grant_type,
          client_id: client_id,
          client_secret: client_secret,
          refresh_token: refresh_token,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      return res.data;
    } catch (err) {
      console.error("err : ", err);
      throw err;
    }
  }

  export async function createBoard(
    input: IMiro.ICreateBoardInput,
  ): Promise<IMiro.ICreateBoardOutput> {
    try {
      const { secretKey, ...data } = input;

      const res = await axios.post("https://api.miro.com/v2/boards", data, {
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
      });

      return res.data;
    } catch (err) {
      console.error("err : ", err);
      throw err;
    }
  }

  export async function copyBoard(
    input: IMiro.ICopyBoardInput,
  ): Promise<IMiro.ICopyBoardOutput> {
    try {
      const { secretKey, ...data } = input;

      const res = await axios.put(`https://api.miro.com/v2/boards`, data, {
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
        params: {
          copy_from: input.copy_from,
        },
      });

      return res.data;
    } catch (err) {
      console.error("err : ", err);
      throw err;
    }
  }

  export async function createCard(
    input: IMiro.ICreateCardItemInput,
  ): Promise<IMiro.ICreateCardItemOutput> {
    try {
      const { secretKey, board_id, ...data } = input;

      const res = await axios.post(
        `https://api.miro.com/v2/boards/${board_id}/cards`,
        data,
        {
          headers: {
            Authorization: `Bearer ${secretKey}`,
            "Content-Type": "application/json",
          },
        },
      );

      return res.data;
    } catch (err) {
      console.error("err : ", err);
      throw err;
    }
  }
}
