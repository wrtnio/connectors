import { Injectable } from "@nestjs/common";
import axios from "axios";

import { IFigma } from "@wrtn/connector-api/lib/structures/connector/figma/IFigma";
import { ConnectorGlobal } from "../../ConnectorGlobal";

@Injectable()
export class FigmaProvider {
  async getFiles(
    input: IFigma.IReadFileInput,
  ): Promise<IFigma.IReadFileOutput> {
    try {
      const { secretKey, fileKey, ...getFileQueryParams } = input;
      const accessToken = await this.refresh(secretKey);

      const queryParams = Object.entries(getFileQueryParams)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      const res = await axios.get(
        `https://api.figma.com/v1/files/${fileKey}?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return res.data;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async addComment(input: IFigma.IAddCommentInput) {
    try {
      const { secretKey, fileKey, ...requestBody } = input;
      const accessToken = await this.refresh(secretKey);

      const res = await axios.post(
        `https://api.figma.com/v1/files/${fileKey}/comments`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return res.data;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async getComments(
    input: IFigma.IReadCommentInput,
  ): Promise<IFigma.IReadCommentOutput> {
    try {
      const { fileKey, secretKey, ...getCommentQueryParam } = input;
      const accessToken = await this.refresh(secretKey);

      const queryParams = Object.entries(getCommentQueryParam)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      const res = await axios.get(
        `https://api.figma.com/v1/files/${fileKey}/comments?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return res.data;
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  }

  private async refresh(refreshToken: string): Promise<string> {
    const url = `https://www.figma.com/api/oauth/refresh`;
    const res = await axios.post(
      url,
      {
        client_id: ConnectorGlobal.env.FIGMA_CLIENT_ID,
        client_secret: ConnectorGlobal.env.FIGMA_CLIENT_SECRET,
        refresh_token: refreshToken,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    return res.data.access_token;
  }
}
