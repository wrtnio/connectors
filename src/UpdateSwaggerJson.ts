import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import "dotenv/config";
import fs from "fs";
import path from "path";

void updateSwaggerJson().then(() => console.log("swagger.json updated"));

async function updateSwaggerJson() {
  console.log(path.join(__dirname));
  const swaggerFilePath = path.join(__dirname, "../packages/api/swagger.json");
  await uploadToS3(swaggerFilePath);
}

async function uploadToS3(filePath: string) {
  const s3 = new S3Client({
    region: "ap-northeast-2",
    maxAttempts: 3,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });
  const fileContent = fs.readFileSync(filePath);

  const params = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: "swagger.json", // S3에 저장될 파일 이름
    Body: fileContent,
    ContentType: "application/json",
  });

  try {
    await s3.send(params);
    console.log(`File uploaded successfully`);
  } catch (err) {
    console.error("Error uploading file to S3:", err);
  }
}
