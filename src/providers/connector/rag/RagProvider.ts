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

@Injectable()
export class RagProvider {
  private readonly ragServer = ConnectorGlobal.env.RAG_SERVER_URL;
  private readonly logger = new Logger("RagProvider");
  constructor(private readonly awsProvider: AwsProvider) {}

  async transformInput(input: IRag.IAnalyzeInput): Promise<IRag.IAnalyzeInput> {
    return {
      fileUrls: await Promise.all(
        input.fileUrls.map(async (fileUrl) => {
          const matches = fileUrl.match(
            /https?:\/\/([^.]+)\.s3(?:\.([^.]+))?\.amazonaws\.com\/([\p{L}\p{N}\/.-]+)/gu,
          );

          // return original object if not S3 url
          if (!matches) {
            return fileUrl;
          }

          const transformed = await Promise.all(
            matches.map(async (match) =>
              this.awsProvider.getGetObjectUrl(match),
            ),
          );

          matches.forEach((match, index) => {
            fileUrl = fileUrl.replace(match, transformed[index]);
          });

          return fileUrl;
        }),
      ),
      fileType: input.fileType,
    };
  }

  async analyze(input: IRag.IAnalyzeInput): Promise<IRag.IAnalysisOutput> {
    const requestUrl = `${this.ragServer}/files/convert`;

    const res = await axios.post(requestUrl, await this.transformInput(input), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const docId = res.data.data.docId;

    return new Promise((resolve, reject) => {
      const intervalId = setInterval(async () => {
        try {
          const status = (await this.getStatus(docId)).status;
          if (status === "INDEXING") {
            this.logger.log(`Document analysis in progress - docId: ${docId}`);
          } else if (status === "INDEXED") {
            this.logger.log(`Document analysis completed docId: ${docId}`);
            clearInterval(intervalId);
            resolve({ docId });
          } else if (status === "FAILED") {
            this.logger.error(`Document analysis failed - docId: ${docId}`);
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
            err.response.data.message.includes("존재하지 않습니다.")
          ) {
            this.logger.error(`Status not found for docId: ${docId}`);
            reject(new NotFoundException(`Document analysis failed`));
          } else {
            reject(err);
          }
        }
      }, 2000);
    });
  }

  async getStatus(docId: string): Promise<IRag.IStatusOutput> {
    const requestUrl = `${this.ragServer}/files/analysis/status/${docId}`;
    const res = await axios.get(requestUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data.data;
  }

  async generate(input: IRag.IGenerateInput) {
    const requestUrl = `${this.ragServer}/files/generate`;
    // const requestUrl = `http://localhost:3001/files/generate`;
    const res = await axios.post(
      requestUrl,
      {
        ...input,
        model: "gpt-35-turbo",
        systemPrompt: "You are a research chatbot.",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return res.data.data;
  }

  async generateSse(input: IRag.IGenerateInput, res: Response) {
    try {
      const requestUrl = `${this.ragServer}/files/generate/sse`;
      // const requestUrl = `http://localhost:3001/files/generate/sse`;
      const response = await axios.post(requestUrl, input, {
        responseType: "stream",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const stream = response.data;
      stream.pipe(res);
    } catch (err) {
      const err2 = await this.handleErrorStream(err);
      res.write("event: error\n");
      res.write(`data: ${JSON.stringify(err2)}\n`);
      res.write(`id: ${Date.now()}\n\n`);
      res.end();
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
