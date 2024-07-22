import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import axios, { AxiosError } from "axios";
import { Response } from "express";

import { IRag } from "@wrtn/connector-api/lib/structures/connector/rag/IRag";

import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { AwsProvider } from "../aws/AwsProvider";
import { v4 } from "uuid";
import { tags } from "typia";
import {
  getJsonObject,
  getStreamHandler,
} from "../../../utils/handle-stream-data-util";

@Injectable()
export class RagProvider {
  private readonly ragServer = ConnectorGlobal.env.RAG_SERVER_URL;
  private readonly logger = new Logger("RagProvider");
  constructor(private readonly awsProvider: AwsProvider) {}

  async transformInput(
    fileUrl: string & tags.Format<"uri">,
  ): Promise<string & tags.Format<"uri">> {
    const matches = fileUrl.match(
      /https?:\/\/([^.]+)\.s3(?:\.([^.]+))?\.amazonaws\.com\/([\p{L}\p{N}\/.-]+)/gu,
    );

    if (!matches) {
      return fileUrl;
    }
    const transFormedUrl = await this.awsProvider.getGetObjectUrl(matches[0]);
    return transFormedUrl;
  }

  async analyze(input: IRag.IAnalyzeInput[]): Promise<IRag.IAnalysisOutput> {
    const requestUrl = `${this.ragServer}/file-chat/v1/file`;
    const chatId = v4();

    if (input.length > 5) {
      throw new BadRequestException(
        "파일 및 링크는 최대 5개까지 분석할 수 있습니다.",
      );
    }

    const uploadPromises = input.map(async (file) => {
      let url = file.fileUrl;

      // web url일 때 s3 upload 및 파일 크기 제한 X
      if (file.fileType !== "html") {
        url = await this.transformInput(file.fileUrl);
        //파일 크기 5MB 이하로 제한
        const fileSize = await this.awsProvider.getFileSize(url);
        if (fileSize > 5 * 1024 * 1024) {
          throw new BadRequestException("파일 크기가 5MB 보다 큽니다.");
        }
      }

      const fileId = v4();
      const requestBody = {
        url: url,
        file_type: file.fileType,
        file_id: fileId,
        chat_id: chatId,
      };

      try {
        const res = await axios.post(requestUrl, requestBody, {
          headers: {
            "x-service-id": "echo_file_chat",
          },
        });
        const jobId = res.data.job_id;

        await new Promise<void>((resolve, reject) => {
          const intervalId = setInterval(async () => {
            try {
              const status = (await this.getStatus(jobId)).status;
              if (status === "RUNNING") {
                this.logger.log(
                  `Document analysis in progress - jobId: ${jobId}`,
                );
              } else if (status === "COMPLETED") {
                this.logger.log(`Document analysis completed jobId: ${jobId}`);
                clearInterval(intervalId);
                resolve();
              } else if (status === "FAILED") {
                this.logger.error(`Document analysis failed - jobId: ${jobId}`);
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
              } else if (
                err instanceof AxiosError &&
                err.response &&
                err.response.status === 422 &&
                err.response.statusText.includes("Validation Error")
              ) {
                this.logger.error(
                  `Validation Error Occurred when analysis: ${jobId}`,
                );
                reject(
                  new UnprocessableEntityException(`Document analysis failed`),
                );
              } else {
                reject(
                  new InternalServerErrorException(`Document analysis failed`),
                );
              }
            }
          }, 2000);
        });
      } catch (err) {
        if (
          err instanceof AxiosError &&
          err.response &&
          (err.response.status === 400 || err.response.status === 404)
        ) {
          this.logger.error(
            `File upload Failed: fileId: ${fileId}, msg: ${err.response.data.detail.message}`,
          );
          throw new BadRequestException(`File upload failed`);
        } else if (
          err instanceof AxiosError &&
          err.response &&
          err.response.status === 422
        ) {
          this.logger.error(
            `File upload Failed: fileId: ${fileId},${err.response.data.detail[0].msg}`,
          );
          throw new UnprocessableEntityException(`File upload failed`);
        } else {
          this.logger.error(
            `Unexpected error occurred during file upload: fileId: ${fileId}`,
          );
          throw new InternalServerErrorException(`File upload failed`);
        }
      }
    });

    await Promise.all(uploadPromises);
    return { chatId };
  }

  async getStatus(jobId: string): Promise<IRag.IStatusOutput> {
    const requestUrl = `${this.ragServer}/file-chat/v1/status`;
    const res = await axios.get(requestUrl, {
      params: {
        job_id: jobId,
      },
      headers: {
        "x-service-id": "echo_file_chat",
      },
    });
    return res.data;
  }

  async generate(
    input: IRag.IGenerateInput,
    res: Response,
    chatId: string,
  ): Promise<IRag.IGenerateOutput> {
    const requestUrl = `${this.ragServer}/file-chat/v1/chat/stream`;
    const requestBody = {
      text: input.query,
      chat_history: input.histories,
    };
    const response = await axios.post(requestUrl, requestBody, {
      responseType: "stream",
      params: {
        chat_id: chatId,
      },
      headers: {
        "x-service-id": "echo_file_chat",
      },
    });
    const stream = response.data;
    let dataBuffer = "";

    return new Promise<IRag.IGenerateOutput>((resolve, reject) => {
      // 스트림 데이터 저장
      stream.on(
        "data",
        getStreamHandler(
          (message) => {
            const data = getJsonObject(message);
            if (
              data &&
              data.choices &&
              data.choices[0] &&
              data.choices[0].delta &&
              data.choices[0].delta.content
            ) {
              dataBuffer += data.choices[0].delta.content;
            }
          },
          // Parsing 결과 확인
          // (resultLines) => {
          //   console.log("Parsing Result:", resultLines);
          // },
        ),
      );

      // 스트림 끝난 뒤 문자열 반환
      stream.on("end", () => {
        try {
          const result = dataBuffer.trim();
          res.write(JSON.stringify({ answer: result }));
          resolve({ answer: result });
        } catch (err) {
          this.logger.error("Error creating result:", err);
          reject(err);
        } finally {
          res.end();
        }
      });

      // TODO: stream error handling 보강
      stream.on("error", (err: any) => {
        this.logger.error(`Stream error: ${err}`);
        reject(err);
        res.end();
      });
    });
  }
}
