import {
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { randomUUID } from "crypto";

import { IAws } from "@wrtn/connector-api/lib/structures/connector/aws/IAws";

import { ConnectorGlobal } from "../../../ConnectorGlobal";

@Injectable()
export class AwsProvider {
  private readonly s3: S3Client;
  private readonly region = "ap-northeast-2";
  private readonly fileBucket = ConnectorGlobal.env.AWS_S3_BUCKET;
  private readonly EXPIRATION_IN_MINUTES = 3;

  constructor() {
    this.s3 = new S3Client({
      region: "ap-northeast-2",
      maxAttempts: 3,
      credentials: {
        accessKeyId: ConnectorGlobal.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: ConnectorGlobal.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadObject(input: IAws.IUploadObjectInput): Promise<string> {
    return AwsProvider.uploadObject(input);
  }

  async getPutObjectUrl(
    input: IAws.IGetPutObjectUrlInput,
  ): Promise<IAws.IGetPutObjectUrlOutput> {
    try {
      const { extension } = input;
      const fileUUID = randomUUID();
      const fileSuffixUrl = `${fileUUID}.${extension}`;
      const putObjectConfig = new PutObjectCommand({
        Bucket: this.fileBucket,
        Key: `${fileSuffixUrl}`,
      });
      const urlValidityThresholdInMinutes = 3 * 1000 * 60;
      const now = new Date();
      now.setMinutes(now.getMinutes() + urlValidityThresholdInMinutes);
      const urlExpDate = now;
      const uploadUrl = await getSignedUrl(this.s3, putObjectConfig, {
        expiresIn: 60 * 3,
        signingRegion: this.region,
      });

      return {
        uuid: fileUUID,
        uploadUrl,
        urlExpTsMillis: urlExpDate.getTime(), // * date to milliseconds timestamp
      };
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  /**
   * Transforms S3 URLs in output to presigned URLs
   */
  async getGetObjectUrl(fileUrl: string): Promise<string> {
    const match = fileUrl.match(
      /https?:\/\/([^.]+)\.s3(?:\.([^.]+))?\.amazonaws\.com\/(.+)/,
    );

    if (!match) {
      throw new Error("Invalid format");
    }

    const bucket = match[1];
    const key = match[3];

    return await getSignedUrl(
      this.s3,
      new GetObjectCommand({ Bucket: bucket, Key: key }),
      {
        expiresIn: 60 * this.EXPIRATION_IN_MINUTES,
        signingRegion: this.region,
      },
    );
  }

  /**
   * @param key 키 이름
   * @returns 버킷 이름을 붙여 만든 전체 파일 경로
   */
  getFileUrl(key: string) {
    return `https://${this.fileBucket}.s3.amazonaws.com/${key}`;
  }

  async getFileSize(fileUrl: string): Promise<number> {
    const [url] = fileUrl.split("?"); // 쿼리파라미터 부분 제거
    const matches = url.match(
      /https?:\/\/([^.]+)\.s3(?:\.([^.]+))?\.amazonaws\.com\/([a-zA-Z0-9\/.\-_%]+)/u,
    );

    if (!matches) {
      throw new Error("Invalid S3 URL");
    }

    const bucket = matches[1];
    const key = matches[3];

    try {
      const command = new HeadObjectCommand({
        Bucket: bucket,
        Key: key,
      });

      const { ContentLength } = await this.s3.send(command);

      if (!ContentLength) {
        throw new InternalServerErrorException();
      }
      return ContentLength;
    } catch (err) {
      console.error(JSON.stringify(`Failed to get file size: ${err}`));
      throw err;
    }
  }
}

export namespace AwsProvider {
  export function extractS3InfoFromUrl(url: string): {
    bucket: string;
    key: string;
  } {
    try {
      const match = url.match(
        /https?:\/\/([^.]+)\.s3(?:\.([^.]+))?\.amazonaws\.com\/(.+)/,
      );
      if (!match) {
        throw new BadRequestException("Invalid S3 URL");
      }

      const bucket = match[1];
      const key = decodeURIComponent(match[3]);

      return { bucket, key };
    } catch (error) {
      console.error("Invalid URL:", error);
      throw new BadRequestException("Invalid S3 URL");
    }
  }

  export async function uploadObject(
    input: IAws.IUploadObjectInput,
  ): Promise<string> {
    const s3 = new S3Client({
      region: "ap-northeast-2",
      maxAttempts: 3,
      credentials: {
        accessKeyId: ConnectorGlobal.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: ConnectorGlobal.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const { data, contentType } = input;
    const encodedKey = input.key
      .split("/")
      .map((token) => {
        const unsafeCharactersRegex = /[^a-zA-Z0-9._\-\/]/g;
        if (unsafeCharactersRegex.test(token)) {
          return encodeURIComponent(token);
        }
        return token;
      })
      .join("/");

    const putObjectConfig = new PutObjectCommand({
      Bucket: ConnectorGlobal.env.AWS_S3_BUCKET,
      Key: encodedKey,
      Body: data,
      ContentType: contentType,
    });
    await s3.send(putObjectConfig);
    return `https://${ConnectorGlobal.env.AWS_S3_BUCKET}.s3.amazonaws.com/${encodedKey}`;
  }
}
