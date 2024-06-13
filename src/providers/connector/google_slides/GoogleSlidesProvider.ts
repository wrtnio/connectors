import { Injectable } from "@nestjs/common";
import axios from "axios";

import { IGoogleSlides } from "@wrtn/connector-api/lib/structures/connector/google_slides/IGoogleSlides";

import { GoogleProvider } from "../../internal/google/GoogleProvider";

@Injectable()
export class GoogleSlidesProvider {
  constructor(private readonly googleProvider: GoogleProvider) {}

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
            access_token: accessToken,
          },
        },
      );

      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
