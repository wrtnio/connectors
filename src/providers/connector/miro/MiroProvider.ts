import axios from "axios";

import { IMiro } from "@wrtn/connector-api/lib/structures/connector/miro/IMiro";

import { ConnectorGlobal } from "../../../ConnectorGlobal";

export namespace MiroProvider {
  export async function refresh(
    input: IMiro.IRefreshAccessTokenInput,
  ): Promise<IMiro.IRefreshAccessTokenOutput> {
    try {
      const res = await axios.post(
        "https://api.miro.com/v1/oauth/token",
        {
          grant_type: "refresh_token",
          client_id: ConnectorGlobal.env.MIRO_CLIENT_ID,
          client_secret: ConnectorGlobal.env.MIRO_CLIENT_SECRET,
          refresh_token: input.refresh_token,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      console.log("refresh : ", res);

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
      const res = await axios.post(
        "https://api.miro.com/v2/boards",
        {
          name: input.name,
          description: input.description,
        },
        {
          headers: {
            Authorization: `Bearer ${input.secretKey}`,
            "Content-Type": "application/json",
          },
        },
      );

      console.log("createBoard : ", res);

      return res.data;
    } catch (err) {
      console.error("err : ", err);
      throw err;
    }
  }

  // export async function getBoard()

  export async function copyBoard(
    input: IMiro.ICopyBoardInput,
  ): Promise<IMiro.ICopyBoardOutput> {
    try {
      const res = await axios.put(
        `https://api.miro.com/v2/boards`,
        {
          name: input.name,
          description: input.description,
        },
        {
          headers: {
            Authorization: `Bearer ${input.secretKey}`,
            "Content-Type": "application/json",
          },
          params: {
            copy_from: input.copy_from,
          },
        },
      );

      console.log("copyBoard : ", res);

      return res.data;
    } catch (err) {
      console.error("err : ", err);
      throw err;
    }
  }
}
