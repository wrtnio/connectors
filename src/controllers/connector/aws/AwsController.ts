import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IAws } from "@wrtn/connector-api/lib/structures/connector/aws/IAws";

import { SelectBenchmark } from "@wrtnio/decorators";
import { AwsProvider } from "../../../providers/connector/aws/AwsProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/aws")
export class AwsController {
  constructor(private readonly awsProvider: AwsProvider) {}
  /**
   * Generate the URL required to upload a file
   *
   * @summary Generate File Upload URL
   * @internal
   */
  @SelectBenchmark("파일 업로드해줘")
  @core.TypedRoute.Get("/file/upload-url")
  //@TODO 식별자를 입력받아서 bucket folder를 구분지어야 함.
  async getUploadUrl(
    @core.TypedQuery() extension: IAws.IGetPutObjectUrlInput,
  ): Promise<IAws.IGetPutObjectUrlOutput> {
    return retry(() => this.awsProvider.getPutObjectUrl(extension))();
  }
}
