import { Injectable } from "@nestjs/common";
import axios from "axios";
import { GoogleApis } from "googleapis";
import typia from "typia";

import { IGoogleSlides } from "@wrtn/connector-api/lib/structures/connector/google_slides/IGoogleSlides";

import { GoogleProvider } from "../../internal/google/GoogleProvider";

@Injectable()
export class GoogleSlidesProvider {
  constructor(private readonly googleProvider: GoogleProvider) {}

  async getPresentation(
    input: IGoogleSlides.IGetPresentationInput,
  ): Promise<IGoogleSlides.Presentation> {
    try {
      const { secretKey, presentationId } = input;
      const accessToken = await this.googleProvider.refreshAccessToken(
        secretKey,
      );

      const res = await axios.get(
        `https://slides.googleapis.com/v1/presentations/${presentationId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return res.data;
    } catch (err) {
      if (typia.is<GoogleProvider.GoogleError>(err)) {
        this.googleProvider.error(err);
      }

      throw err;
    }
  }

  async createPresentation(
    input: IGoogleSlides.ICreatePresentationInput,
  ): Promise<IGoogleSlides.Presentation> {
    try {
      const { secretKey, ...body } = input;
      const accessToken = await this.googleProvider.refreshAccessToken(
        secretKey,
      );

      const res = await axios.post(
        "https://slides.googleapis.com/v1/presentations",
        body,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return res.data;
    } catch (err) {
      if (typia.is<GoogleProvider.GoogleError>(err)) {
        this.googleProvider.error(err);
      }

      throw err;
    }
  }
}
