import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import axios, { AxiosError } from "axios";

import { IRag } from "@wrtn/connector-api/lib/structures/connector/rag/IRag";

import { tags } from "typia";
import { v4 } from "uuid";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import {
  getJsonObject,
  getStreamHandler,
} from "../../../utils/handle-stream-data-util";
import { AwsProvider } from "../aws/AwsProvider";

@Injectable()
export class RagProvider {
  private readonly ragServer = ConnectorGlobal.env.RAG_SERVER_URL;
  private readonly logger = new Logger("RagProvider");
  constructor(private readonly awsProvider: AwsProvider) {}

  /**
   * s3 url transform to presigned url
   */
  async transformInput(
    fileUrl: string &
      tags.Format<"uri"> &
      tags.ContentMediaType<"application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.hancom.hwp, text/plain, text/html">,
  ): Promise<
    string &
      tags.Format<"uri"> &
      tags.ContentMediaType<"application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.hancom.hwp, text/plain, text/html">
  > {
    const matches = fileUrl.match(
      /https?:\/\/([^.]+)\.s3(?:\.([^.]+))?\.amazonaws\.com\/([\p{L}\p{N}\/.\-_]+)/gu,
    );

    if (!matches) {
      return fileUrl;
    }
    const transFormedUrl = await this.awsProvider.getGetObjectUrl(matches[0]);
    return transFormedUrl as string &
      tags.Format<"uri"> &
      tags.ContentMediaType<"application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.hancom.hwp, text/plain, text/html">;
  }

  /**
   * 파일 타입 추론
   */
  inferFileType(fileUrl: string): string {
    try {
      const url = new URL(fileUrl);
      const pathSegments = url.pathname.split("/");
      const fileName = pathSegments.pop();

      if (fileName) {
        const fileExtension = fileName.split(".").pop()?.toLowerCase();

        switch (fileExtension) {
          case "pdf":
            return "pdf";
          case "docx":
            return "docx";
          case "hwp":
            return "hwp";
          case "txt":
            return "txt";
          default:
            return "html"; // 기본값은 html
        }
      }

      // 파일 이름이 없는 경우 기본값 반환
      return "html";
    } catch (error) {
      console.error(JSON.stringify("Invalid URL format"));
      return "html"; // URL이 유효하지 않으면 기본값 반환
    }
  }

  /**
   * 파일 업로드 및 분석
   * 최대 5개의 파일 및 링크 분석 가능
   * 파일 크기 5MB 이하로 제한
   * 파일 마다 고유 fileId 생성
   * 여러 개의 파일을 분석 시키고 해당 분석 결과에 대해서 채팅을 하기 위해서 chatId는 같은 것을 사용
   */
  async analyze(input: IRag.IAnalyzeInput[]): Promise<IRag.IAnalysisOutput> {
    const requestUrl = `${this.ragServer}/file-chat/v1/file`;
    const chatId = v4();

    if (input.length > 5) {
      throw new BadRequestException(
        "파일 및 링크는 최대 5개까지 분석할 수 있습니다.",
      );
    }

    /**
     * 여러 개의 파일 중 하나라도 업로드 및 분석 실패시 실패 처리
     */
    const uploadPromises = input.map(async (file) => {
      let url = file.url;
      const fileType = this.inferFileType(file.url);

      // web url일 때 s3 upload 및 파일 크기 제한 X
      if (fileType !== "html") {
        url = await this.transformInput(file.url);
        //파일 크기 5MB 이하로 제한
        const fileSize = await this.awsProvider.getFileSize(url);
        if (fileSize > 5 * 1024 * 1024) {
          throw new BadRequestException("파일 크기가 5MB 보다 큽니다.");
        }
      }

      const fileId = v4();
      const requestBody = {
        url: url,
        file_type: fileType,
        file_id: fileId,
        chat_id: chatId,
      };

      try {
        // https://rag-api.dev.wrtn.club/file-chat/v1/file
        const res = await axios.post(requestUrl, requestBody, {
          headers: {
            "x-service-id": "eco_file_chat",
          },
        });
        const jobId = res.data.job_id;

        /**
         * 파일 분석 진행
         * 2초마다 상태 조회
         */
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
        this.logger.error(err);
        if (
          err instanceof AxiosError &&
          err.response &&
          (err.response.status === 400 || err.response.status === 404)
        ) {
          this.logger.error(
            `File upload Failed: fileId: ${fileId}, msg: ${err.response.data.detail?.message}`,
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
        "x-service-id": "eco_file_chat",
      },
    });
    return res.data;
  }

  /**
   * 위에서 분석된 결과를 기반으로 요청받은 결과물을 생성
   */
  async generate(
    input: IRag.IGenerateInput,
    chatId: string,
  ): Promise<IRag.IGenerateOutput> {
    const requestUrl = `${this.ragServer}/file-chat/v1/chat/stream`;
    const requestBody = {
      text: input.query,
    };

    const response = await axios.post(requestUrl, requestBody, {
      responseType: "stream",
      params: {
        chat_id: chatId,
      },
      headers: {
        "x-service-id": "eco_file_chat",
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
          resolve({ answer: result });
        } catch (err) {
          this.logger.error("Error creating result:", err);
          reject(err);
        } finally {
        }
      });

      // TODO: stream error handling 보강
      stream.on("error", (err: any) => {
        this.logger.error(`Stream error: ${err}`);
        reject(err);
      });
    });
  }
}
