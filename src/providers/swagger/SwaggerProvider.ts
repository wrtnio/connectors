import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import fs from "fs";
import path from "path";

import { ConnectorGlobal } from "../../ConnectorGlobal";

@Injectable()
export class SwaggerProvider {
  private readonly s3: S3Client;
  private readonly region = "ap-northeast-2";
  private readonly accessKeyId = ConnectorGlobal.env.AWS_ACCESS_KEY_ID;
  private readonly secretAccessKey = ConnectorGlobal.env.AWS_SECRET_ACCESS_KEY;
  private readonly fileBucket = ConnectorGlobal.env.AWS_S3_BUCKET;

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
  async updateSwagger() {
    const buildSwaggerAndUpload = async () => {
      try {
        // const { stdout, stderr } = await exec('npm run build:swagger');
        // console.log(`stdout: ${stdout}`);
        // if (stderr) {
        //   console.error(`stderr: ${stderr}`);
        // }

        const swaggerFilePath = path.join(
          __dirname,
          "../../../packages/api/swagger.json",
        );
        await this.uploadToS3(swaggerFilePath);
      } catch (error) {
        console.error(`exec error: ${error}`);
      }
    };

    await buildSwaggerAndUpload();
  }

  private uploadToS3 = async (filePath: string) => {
    const fileContent = fs.readFileSync(filePath);

    const params = new PutObjectCommand({
      Bucket: this.fileBucket,
      Key: "swagger.json", // S3에 저장될 파일 이름
      Body: fileContent,
      ContentType: "application/json",
    });

    try {
      await this.s3.send(params);
      console.log(`File uploaded successfully`);
    } catch (err) {
      console.error("Error uploading file to S3:", err);
    }
  };
}
