import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import axios from "axios";
import { firstValueFrom } from "rxjs";
import { v4 } from "uuid";

import { IImage } from "@wrtn/connector-api/lib/structures/connector/image/IImage";

import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { generateGptPromptTranslateForImageGenerate } from "../../../utils/ImagePromptTranslateUtil";
import { OpenAIProvider } from "../../open_ai/OpenAIProvider";
import { AwsProvider } from "../aws/AwsProvider";

@Injectable()
export class ImageProvider {
  constructor(
    private awsProvider: AwsProvider,
    private openAIProvider: OpenAIProvider,
    private httpService: HttpService,
  ) {}
  async generateImage(input: IImage.IRequest): Promise<IImage.IResponse> {
    const translateResult = await this.imageCompletion(
      "dall-e-3",
      input.prompt,
    );
    const res = await this.openAIProvider.generateImage(translateResult);
    const data = await firstValueFrom(
      this.httpService.get(res.url, { responseType: "arraybuffer" }),
    );
    const { imgUrl } = await this.uploadImageToS3(data.data);
    return {
      imgUrl: imgUrl,
    };
  }

  async uploadImageToS3(img: Buffer) {
    try {
      const imgUrl = await this.awsProvider.uploadObject({
        key: `connector/generate-image-node/dall-e-3/${v4()}`,
        data: img,
        contentType: "image/png",
      });

      const presignedUrl = await this.awsProvider.getGetObjectUrl(imgUrl);
      return {
        imgUrl: presignedUrl,
      };
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
    const hamletResponse = await axios.post(
      `${ConnectorGlobal.env.HAMLET_URL}/v2/openai/deployments/wrtn-gpt-35-turbo/chat/completions`,
      {
        messages: gptPrompt.messages,
      },
      {
        headers: {
          "x-feature-id": "scp",
        },
      },
    );
    const content = hamletResponse?.data.choices?.[0].message?.content;
    return content;
  }
}
