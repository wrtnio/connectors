import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { BadRequestException, Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";

import { IAws } from "@wrtn/connector-api/lib/structures/connector/aws/IAws";

import { ConnectorGlobal } from "../../../ConnectorGlobal";

@Injectable()
export class AwsProvider {
  private readonly s3: S3Client;
  private readonly region = "ap-northeast-2";
  private readonly accessKeyId = ConnectorGlobal.env.AWS_ACCESS_KEY_ID;
  private readonly secretAccessKey = ConnectorGlobal.env.AWS_SECRET_ACCESS_KEY;
  private readonly fileBucket = ConnectorGlobal.env.AWS_S3_BUCKET;
  private readonly EXPIRATION_IN_MINUTES = 3;

  constructor() {
    this.s3 = new S3Client({
      region: this.region,
      maxAttempts: 3,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
      },
    });
  }

  async uploadObject(input: IAws.IUploadObjectInput): Promise<string> {
    const { key, data, contentType } = input;
    const putObjectConfig = new PutObjectCommand({
      Bucket: this.fileBucket,
      Key: key,
      Body: data,
      ContentType: contentType,
    });
    await this.s3.send(putObjectConfig);
    return `https://${this.fileBucket}.s3.amazonaws.com/${key}`;
  }

  async getPutObjectUrl(
    input: IAws.IGetPutObjectUrlInput,
  ): Promise<IAws.IGetPutObjectUrlOutput> {
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
      const key = match[3];

      return { bucket, key };
    } catch (error) {
      console.error("Invalid URL:", error);
      throw new BadRequestException("Invalid S3 URL");
    }
  }
}
