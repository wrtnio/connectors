import { Injectable } from "@nestjs/common";
import { IMarp } from "@wrtn/connector-api/lib/structures/connector/marp/IMarp";
import * as marpCli from '@marp-team/marp-cli'; // Marp CLI를 Node.js 환경에서 사용
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class MarpProvider {
  /**
   * Converts Marp markdown to a PPT and uploads to S3.
   *
   * @param input The Marp markdown input
   * @returns Promise resolving to the S3 link of the converted PPT
   */
  async convertToPpt(input: IMarp.IConvertInput): Promise<IMarp.IConvertOutput> {
    const tempDir = '/path/to/temp'; // 임시 파일 저장 디렉토리
    const markdownFilePath = path.join(tempDir, 'markdown-file.md');
    const pptFilePath = path.join(tempDir, 'slides.pptx');

    try {
      // 마크다운 문자열을 파일로 저장
      await fs.writeFile(markdownFilePath, input.markdown);

      // Marp CLI를 사용하여 마크다운 파일을 PPT로 변환
      await marpCli([markdownFilePath, '--pptx', '-o', pptFilePath]);

      // 변환된 PPT 파일을 S3에 업로드하는 로직은 직접 구현

      // Placeholder return
      return { s3Link: "https://example.com/path/to/converted.ppt" };
    } catch (error) {
      throw new Error(`Failed to convert Marp markdown to PPT: ${error.message}`);
    } finally {
      // 임시 파일 삭제
      await fs.unlink(markdownFilePath).catch(() => {});
      await fs.unlink(pptFilePath).catch(() => {});
    }
  }
}
