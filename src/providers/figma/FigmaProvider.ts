import { Injectable } from "@nestjs/common";
import axios from "axios";

import { IFigma } from "@wrtn/connector-api/lib/structures/connector/figma/IFigma";

@Injectable()
export class FigmaProvider {
  async getFiles(
    input: IFigma.IReadFileInput,
  ): Promise<IFigma.IReadFileOutput> {
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
  }

  async addComment(input: IFigma.IAddCommentInput) {
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
  }
}
