import { Injectable } from "@nestjs/common";

import { IImage } from "@wrtn/connector-api/lib/structures/connector/image/IImage";

import { StableDiffusionBetaProvider } from "./StableDiffusionBetaProvider";

@Injectable()
export class ImageProvider {
  constructor(
    private stableDiffusionBetaProvider: StableDiffusionBetaProvider,
  ) {}
  async generateImage(input: IImage.IRequest): Promise<IImage.IResponse> {
    if (input.model === "stable-diffusion-xl-beta-v2-2-2") {
      const { category, englishText } =
        await this.stableDiffusionBetaProvider.imageCompletion(input.prompt);
      const img = await this.stableDiffusionBetaProvider.generateTextToImage(
        category,
        englishText,
      );
      const { imgUrl } = await this.stableDiffusionBetaProvider.uploadImageToS3(
        img,
      );
      return { imgUrl: imgUrl };
    } else {
      return { imgUrl: "" };
    }
  }
}
