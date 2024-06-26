import { Injectable } from "@nestjs/common";
import axios from "axios";
import { v4 } from "uuid";

import { IIconAndLogo } from "@wrtn/connector-api/lib/structures/connector/icon_and_logo/IIconAndLogo";

import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { generateGptPromptTranslateForImageGenerate } from "../../../utils/ImagePromptTranslateUtil";
import {
  getAdditionalImagePrompt,
  handleImagePrompt,
} from "../../../utils/StableDiffusionUtil";
import { AwsProvider } from "../aws/AwsProvider";

const DEFAULT_STEP = 45;
const DEFAULT_CFG_SCALE = 6;
const engineId = "stable-diffusion-xl-beta-v2-2-2";
const apiKey = "sk-gi9Clgw6apZKM8s5ZyeOvGTKPyDVoXmH6R5FNzJyxdicMbvG";
const apiHost = "https://api.stability.ai";

@Injectable()
export class IconAndLogoProvider {
  constructor(private awsProvider: AwsProvider) {}
  async generateImage(
    input: IIconAndLogo.IRequest,
  ): Promise<IIconAndLogo.IResponse> {
    const { category, englishText } = await this.imageCompletion(
      "stable-diffusion-xl-beta-v2-2-2",
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
    prompts: IIconAndLogo.ISDXLBetaPromptRequest[],
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

    const response = await axios.post(
      `${apiHost}/v1/generation/${engineId}/text-to-image`,
      {
        text_prompts: prompts,
        cfg_scale: DEFAULT_CFG_SCALE,
        height: height,
        width: width,
        steps: DEFAULT_STEP,
        samples: 1,
        ...(style_preset && { style_preset: style_preset }),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    if (!response.data || !Array.isArray(response.data.artifacts)) {
      throw new Error("image result not found");
    }

    const output = response.data
      .artifacts as IIconAndLogo.ISDXLBetaPromptResponse[];
    const img = output.map((image) => Buffer.from(image.base64, "base64"));
    return img;
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
    const hamletResponse = await axios.post(
      `${ConnectorGlobal.env.HAMLET_URL}/v2/openai/deployments/wrtn-gpt-35-turbo/chat/completions`,
      { messages: gptPrompt.messages },
      {
        headers: {
          "x-feature-id": "scp",
        },
      },
    );

    const content = hamletResponse?.data.choices?.[0].message?.content;

    return {
      ...handleImagePrompt(content),
    };
  }
}
