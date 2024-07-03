import { Injectable } from "@nestjs/common";
import axios from "axios";

import { IFigma } from "@wrtn/connector-api/lib/structures/connector/figma/IFigma";

@Injectable()
export class FigmaProvider {
  async getFiles(
    input: IFigma.IReadFileInput,
  ): Promise<IFigma.IReadFileOutput> {
    try {
      const { secretKey, fileKey, ...getFileQueryParams } = input;
      const queryParams = Object.entries(getFileQueryParams)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      const res = await axios.get(
        `https://api.figma.com/v1/files/${fileKey}?${queryParams}`,
        {
          headers: {
            "X-Figma-Token": secretKey,
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

      const res = await axios.post(
        `https://api.figma.com/v1/files/${fileKey}/comments`,
        requestBody,
        {
          headers: {
            "X-Figma-Token": secretKey,
          },
        },
      );
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getComments(
    input: IFigma.IReadCommentInput,
  ): Promise<IFigma.IReadCommentOutput> {
    try {
      const { fileKey, secretKey, ...getCommentQueryParam } = input;
      const queryParams = Object.entries(getCommentQueryParam)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      const res = await axios.get(
        `https://api.figma.com/v1/files/${fileKey}/comments?${queryParams}`,
        {
          headers: {
            "X-Figma-Token": secretKey,
          },
        },
      );
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }
}
