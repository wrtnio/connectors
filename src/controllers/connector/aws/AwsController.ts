import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IAws } from "@wrtn/connector-api/lib/structures/connector/aws/IAws";

import { AwsProvider } from "../../../providers/connector/aws/AwsProvider";

@Controller("connector/aws")
export class AwsController {
  constructor(private readonly awsProvider: AwsProvider) {}
  /**
   * 파일 업로드를 하기 위해 필요한 URL을 생성합니다.
   *
   * @summary 파일 업로드 URL 생성
   *
   * @Query 파일 확장자
   *
   * @tag AWS
   *
   * @internal
   */
  @core.TypedRoute.Get("/file/upload-url")
  //@TODO 식별자를 입력받아서 bucket folder를 구분지어야 함.
  async getUploadUrl(
    @core.TypedQuery() extension: IAws.IGetPutObjectUrlInput,
  ): Promise<IAws.IGetPutObjectUrlOutput> {
    return await this.awsProvider.getPutObjectUrl(extension);
  }
}
