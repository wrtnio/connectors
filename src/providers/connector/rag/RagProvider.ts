import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import axios, { AxiosError } from "axios";
import { Response } from "express";

import { IRag } from "@wrtn/connector-api/lib/structures/connector/rag/IRag";

import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { AwsProvider } from "../aws/AwsProvider";
import { v4 } from "uuid";

@Injectable()
export class RagProvider {
  private readonly ragServer = ConnectorGlobal.env.RAG_SERVER_URL;
  private readonly logger = new Logger("RagProvider");
  constructor(private readonly awsProvider: AwsProvider) {}

  // async transformInput(
  //   fileUrl: string & tags.Format<"uri">,
  // ): Promise<string & tags.Format<"uri">> {
  //   const matches = fileUrl.match(
  //     /https?:\/\/([^.]+)\.s3(?:\.([^.]+))?\.amazonaws\.com\/([\p{L}\p{N}\/.-]+)/gu,
  //   );

  //   if (!matches) {
  //     return fileUrl;
  //   }

  //   const transFormedUrl = await this.awsProvider.getGetObjectUrl(matches[0]);
  //   return transFormedUrl;
  // }

  async analyze(input: IRag.IAnalyzeInput): Promise<IRag.IAnalysisOutput> {
    const requestUrl = `${this.ragServer}/file-chat/v1/file`;
    const fileId = v4();
    const chatId = v4();
    // TODO: Henry presigned url 지원 여부 확인
    // const url = await this.transformInput(input.fileUrl);
    const requestBody = {
      url: input.fileUrl,
      file_type: input.fileType,
      file_id: fileId,
      chat_id: chatId,
    };
    const res = await axios.post(requestUrl, requestBody, {
      headers: {
        "x-service-id": "eco-connector-rag",
      },
    });

    const jobId = res.data.job_id;
    return new Promise((resolve, reject) => {
      const intervalId = setInterval(async () => {
        try {
          const status = (await this.getStatus(jobId)).status;
          if (status === "RUNNING") {
            this.logger.log(`Document analysis in progress - jobId: ${jobId}`);
          } else if (status === "COMPLETED") {
            this.logger.log(`Document analysis completed jobId: ${jobId}`);
            clearInterval(intervalId);
            resolve({ jobId, chatId });
          } else if (status === "FAILED") {
            this.logger.error(`Document analysis failed - docId: ${jobId}`);
            clearInterval(intervalId);
            reject(
              new InternalServerErrorException(`Document analysis failed`),
            );
          }
        } catch (err) {
          clearInterval(intervalId);
          if (
            err instanceof AxiosError &&
            err.response &&
            err.response.status === 404 &&
            err.response.statusText.includes("Not Found")
          ) {
            this.logger.error(`Status not found for jobId: ${jobId}`);
            reject(new NotFoundException(`Document analysis failed`));
          } else {
            reject(err);
          }
        }
      }, 2000);
    });
  }

  async getStatus(jobId: string): Promise<IRag.IStatusOutput> {
    const requestUrl = `${this.ragServer}/file-chat/v1/status`;
    const res = await axios.get(requestUrl, {
      params: {
        job_id: jobId,
      },
      headers: {
        "x-service-id": "eco-connector-rag",
      },
    });
    return res.data;
  }

  // async generate(input: IRag.IGenerateInput) {
  //   const requestUrl = `${this.ragServer}/files/generate`;
  //   // const requestUrl = `http://localhost:3001/files/generate`;
  //   const res = await axios.post(
  //     requestUrl,
  //     {
  //       ...input,
  //       model: "gpt-35-turbo",
  //       systemPrompt: "You are a research chatbot.",
  //     },
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     },
  //   );

  //   return res.data.data;
  // }

  async generateSse(input: IRag.IGenerateInput, res: Response, chatId: string) {
    try {
      const requestUrl = `${this.ragServer}/file-chat/v1/chat/stream/${chatId}`;
      const response = await axios.post(requestUrl, input, {
        responseType: "stream",
        headers: {
          "Content-Type": "application/json",
          "x-service-id": "eco-connector-rag",
        },
      });
      const stream = response.data;
      let dataBuffer = "";

      return new Promise<IRag.IGenerateOutput>((resolve, reject) => {
        // 스트림 데이터 저장
        stream.on("data", (chunk: Buffer) => {
          dataBuffer += chunk.toString();
        });

        // 스트림 끝난 뒤 문자열 반환
        stream.on("end", () => {
          try {
            resolve({ answer: dataBuffer });
          } catch (err) {
            reject(err);
          }
        });

        stream.on("error", async (err: any) => {
          try {
            const err2 = await this.handleErrorStream(err);
            reject(err2);
          } catch (error) {
            reject(error);
          }
        });
      });
    } catch (err) {
      const err2 = await this.handleErrorStream(err);
      res.write("event: error\n");
      res.write(`data: ${JSON.stringify(err2)}\n`);
      res.write(`id: ${Date.now()}\n\n`);
      res.end();
      throw err2;
    }
  }

  private handleErrorStream(err: any) {
    if (err instanceof AxiosError) {
      let errStr = "";
      if (err.response?.data?.on) {
        return new Promise<any>((resolve, reject) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          err.response?.data.on("data", (data: string) => {
            errStr += data.toString();
          });
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          err.response?.data.on("end", () => {
            resolve(JSON.parse(errStr) ?? { message: errStr });
          });
        });
      } else {
        return err.response?.data ?? err;
      }
    }
  }
}
