import { Injectable } from "@nestjs/common";
import { IMarp } from "@wrtn/connector-api/lib/structures/connector/marp/IMarp";
import { promises as fs } from "fs";

import * as path from "path";
import { randomUUID } from "crypto";
import { AwsProvider } from "../aws/AwsProvider";
import { execSync } from "child_process";

@Injectable()
export class MarpProvider {
  constructor(private readonly awsProvider: AwsProvider) {}
  /**
   * Converts Marp markdown to a PPT and uploads to S3.
   *
   * @param input The Marp markdown input
   * @returns Promise resolving to the S3 link of the converted PPT
   */
  async convertToPpt(
    input: IMarp.IConvertInput,
  ): Promise<IMarp.IConvertOutput> {
    const uuid = randomUUID();
    const markdownFilePath = path.join(__dirname, `${uuid}.md`);
    const pptFilePath = path.join(__dirname, `${uuid}.html`);

    try {
      await fs.writeFile(markdownFilePath, input.markdown);

      const marpCli = path.join(
        __dirname,
        "../../../../../node_modules/@marp-team/marp-cli/marp-cli.js",
      );

      // Marp CLI를 사용하여 마크다운 파일을 PPT로 변환
      const command = `node ${marpCli} ${markdownFilePath} -o ${pptFilePath}`;
      execSync(command, { stdio: "inherit" });

      const data = await fs.readFile(pptFilePath);
      const uploaded = await this.awsProvider.uploadObject({
        contentType: "text/html; charset=UTF-8",
        data: data,
        key: `connector/marp/${uuid}.html`,
      });

      return { s3Link: uploaded };
    } catch (error) {
      throw new Error(
        `Failed to convert Marp markdown to PPT: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }
}
