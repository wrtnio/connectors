import { Injectable } from "@nestjs/common";
import { v4 } from "uuid";

import { IImage } from "@wrtn/connector-api/lib/structures/connector/image/IImage";

import { ConnectorGlobal } from "../../../ConnectorGlobal";
import {
  generateGptPrompt,
  getAdditionalImagePrompt,
  handleImagePrompt,
} from "../../../utils/StableDiffusionUtil";
import { AwsProvider } from "../aws/AwsProvider";

const MAX_HEIGHT = 512;
const MAX_WEIGHT = 512;
const DEFAULT_STEP = 45;
const DEFAULT_CFG_SCALE = 6;
const engineId = "stable-diffusion-xl-beta-v2-2-2";
const apiKey = "sk-gi9Clgw6apZKM8s5ZyeOvGTKPyDVoXmH6R5FNzJyxdicMbvG";
const apiHost = "https://api.stability.ai";

@Injectable()
export class StableDiffusionBetaProvider {
  constructor(private awsProvider: AwsProvider) {}
  async generateImage(input: IImage.IRequest): Promise<IImage.IResponse> {
    const { category, englishText } = await this.imageCompletion(input.prompt);
    const img = await this.generateTextToImage(category, englishText);
    const { imgUrl } = await this.uploadImageToS3(img);
    return { imgUrl: imgUrl };
  }

  async uploadImageToS3(img: Buffer[]) {
    try {
      const imgUrl = await Promise.all(
        img.map(async (img) => {
          return await this.awsProvider.uploadObject({
            key: `connector/generate-image-node/${v4()}`,
            data: img,
            contentType: "image/png",
          });
        }),
      );

      return {
        imgUrl: imgUrl[0],
      };
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  }

  async generateTextToImage(category: string, text: string) {
    const inputs: { prompts: { text: string; weight: number }[] }[] = [];
    const prompts = [{ text, weight: 1 }];
    const additionalPrompt = getAdditionalImagePrompt(category);
    if (additionalPrompt) prompts.push(additionalPrompt);
    inputs.push({ prompts });

    return await this.generateImg(prompts);
  }

  async generateImg(prompts: IImage.ISDXLBetaPromptRequest[]) {
    const response = await fetch(
      `${apiHost}/v1/generation/${engineId}/text-to-image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          text_prompts: prompts,
          cfg_scale: DEFAULT_CFG_SCALE,
          height: MAX_HEIGHT,
          width: MAX_WEIGHT,
          steps: DEFAULT_STEP,
          samples: 1,
        }),
      },
    );

    const result = await response.json();

    if (!result.data || !Array.isArray(result.data.artifacts)) {
      throw new Error("image result not found");
    }

    const output = result.artifacts as IImage.ISDXLBetaPromptResponse[];
    const img = output.map((image) => Buffer.from(image.base64, "base64"));
    return img;
  }

  async imageCompletion(message: string) {
    /**
     * 프롬프트 변환
     */
    const gptPrompt = generateGptPrompt(message);

    /**
     * 햄릿 통해서 한글 입력 영어로 변환
     */
    const hamletResponse = await fetch(
      `${ConnectorGlobal.env.HAMLET_URL}/v2/openai/deployments/wrtn-gpt-35-turbo/chat/completions`,
      {
        headers: {
          "x-feature-id": "scp",
        },
        body: JSON.stringify({
          messages: gptPrompt.messages,
        }),
      },
    );

    const hamletResult = await hamletResponse.json();
    const content = hamletResult?.choices?.[0].message?.content;

    return {
      ...handleImagePrompt(content),
    };
  }
}
