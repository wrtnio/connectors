import { Injectable } from "@nestjs/common";
import axios from "axios";
import { v4 } from "uuid";

import { IStableDiffusionBeta } from "@wrtn/connector-api/lib/structures/connector/stable_diffustion_beta/IStableDiffusionBeta";

import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { generateGptPromptTranslateForImageGenerate } from "../../../utils/ImagePromptTranslateUtil";
import {
  getAdditionalImagePrompt,
  handleImagePrompt,
} from "../../../utils/StableDiffusionUtil";
import { AwsProvider } from "../aws/AwsProvider";

@Injectable()
export class StableDiffusionBetaProvider {
  constructor(private awsProvider: AwsProvider) {}
  async generateImage(
    input: IStableDiffusionBeta.IRequest,
  ): Promise<IStableDiffusionBeta.IResponse> {
    const { category, englishText } = await this.imageCompletion(
      `${ConnectorGlobal.env.STABILITY_AI_ENGINE_ID}`,
      input.prompt,
    );
    const img = await this.generateTextToImage(
      category,
      englishText,
      input.image_ratio,
      input.style_preset,
    );
    const { imgUrl } = await this.uploadImageToS3(img);
    return { imgUrl: imgUrl };
  }

  async uploadImageToS3(img: Buffer[]) {
    try {
      const imgUrl = await Promise.all(
        img.map(async (img) => {
          return await this.awsProvider.uploadObject({
            key: `connector/generate-image-node/sdxl-beta/${v4()}`,
            data: img,
            contentType: "image/png",
          });
        }),
      );

      const presignedUrl = await this.awsProvider.getGetObjectUrl(imgUrl[0]);

      return {
        imgUrl: presignedUrl,
      };
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  }

  async generateTextToImage(
    category: string,
    text: string,
    image_ratio: string,
    style_preset?: string,
  ) {
    const inputs: { prompts: { text: string; weight: number }[] }[] = [];
    const prompts = [{ text, weight: 1 }];
    const additionalPrompt = getAdditionalImagePrompt(category);
    if (additionalPrompt) prompts.push(additionalPrompt);
    inputs.push({ prompts });

    return await this.generateImg(prompts, image_ratio, style_preset);
  }

  async generateImg(
    prompts: IStableDiffusionBeta.ISDXLBetaPromptRequest[],
    image_ratio: string,
    style_preset?: string,
  ) {
    const imageDimensions: {
      [key: string]: { width: number; height: number };
    } = {
      square: { width: 512, height: 512 },
      landscape: { width: 896, height: 512 },
      portrait: { width: 512, height: 896 },
    };

    const { width, height } = imageDimensions[image_ratio];
    try {
      const response = await axios.post(
        `${ConnectorGlobal.env.STABILITY_AI_HOST}/v1/generation/${ConnectorGlobal.env.STABILITY_AI_ENGINE_ID}/text-to-image`,
        {
          text_prompts: prompts,
          cfg_scale: Number(ConnectorGlobal.env.STABILITY_AI_CFG_SCALE),
          height: height,
          width: width,
          steps: Number(ConnectorGlobal.env.STABILITY_AI_DEFAULT_STEP),
          samples: 1,
          ...(style_preset && { style_preset: style_preset }),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${ConnectorGlobal.env.STABILITY_AI_API_KEY}`,
          },
        },
      );
      if (!response.data || !Array.isArray(response.data.artifacts)) {
        throw new Error("image result not found");
      }

      const output = response.data
        .artifacts as IStableDiffusionBeta.ISDXLBetaPromptResponse[];
      const img = output.map((image) => Buffer.from(image.base64, "base64"));
      return img;
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  }

  async imageCompletion(model: string, message: string) {
    /**
     * 프롬프트 변환
     */
    const gptPrompt = generateGptPromptTranslateForImageGenerate(
      model,
      message,
    );

    /**
     * 햄릿 통해서 한글 입력 영어로 변환
     */
    try {
      const hamletResponse = await axios.post(
        `${ConnectorGlobal.env.HAMLET_URL}${ConnectorGlobal.env.HAMLET_CHAT_COMPLETION_REQUEST_ENDPOINT}`,
        { messages: gptPrompt.messages },
        {
          headers: {
            [ConnectorGlobal.env.HAMLET_HEADER_KEY_NAME]:
              ConnectorGlobal.env.HAMLET_HEADER_KEY_VALUE,
          },
        },
      );

      const content = hamletResponse?.data.choices?.[0].message?.content;

      return {
        ...handleImagePrompt(content),
      };
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  }
}
