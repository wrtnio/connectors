import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import axios from "axios";
import { firstValueFrom } from "rxjs";
import { v4 } from "uuid";

import { IDallE3 } from "@wrtn/connector-api/lib/structures/connector/dall_e_3/IDallE3";

import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { generateGptPromptTranslateForImageGenerate } from "../../../utils/ImagePromptTranslateUtil";
import { OpenAIProvider } from "../../open_ai/OpenAIProvider";
import { AwsProvider } from "../aws/AwsProvider";

@Injectable()
export class DallEProvider {
  constructor(
    private openAIProvider: OpenAIProvider,
    private httpService: HttpService,
  ) {}
  async generateImage(input: IDallE3.IRequest): Promise<IDallE3.IResponse> {
    try {
      const translateResult = await this.DallE3Completion(
        "dall-e-3",
        input.prompt,
      );
      const res = await this.openAIProvider.generateImage(
        translateResult,
        input.image_ratio,
      );
      const data = await firstValueFrom(
        this.httpService.get(res.url, { responseType: "arraybuffer" }),
      );
      const { imgUrl } = await this.uploadDallE3ToS3(data.data);
      return { imgUrl: imgUrl };
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async uploadDallE3ToS3(img: Buffer) {
    try {
      const imgUrl = await AwsProvider.uploadObject({
        key: `connector/generate-DallE3-node/dall-e-3/${v4()}`,
        data: img,
        contentType: "image/png",
      });

      return {
        imgUrl: imgUrl,
      };
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  }

  async DallE3Completion(model: string, message: string) {
    /**
     * 프롬프트 변환
     */
    const gptPrompt = generateGptPromptTranslateForImageGenerate(
      model,
      message,
    );

    try {
      /**
       * 햄릿 통해서 한글 입력 영어로 변환
       */
      const hamletResponse = await axios.post(
        `${ConnectorGlobal.env.HAMLET_URL}${ConnectorGlobal.env.HAMLET_CHAT_COMPLETION_REQUEST_ENDPOINT}`,
        {
          messages: gptPrompt.messages,
        },
        {
          headers: {
            [ConnectorGlobal.env.HAMLET_HEADER_KEY_NAME]:
              ConnectorGlobal.env.HAMLET_HEADER_KEY_VALUE,
          },
        },
      );
      const content = hamletResponse?.data.choices?.[0].message?.content;
      return content;
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  }
}
