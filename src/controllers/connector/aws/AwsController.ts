import core, { HumanRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IAws } from "@wrtn/connector-api/lib/structures/connector/aws/IAws";

import { RouteIcon, SelectBenchmark } from "@wrtnio/decorators";
import { AwsProvider } from "../../../providers/connector/aws/AwsProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/aws")
export class AwsController {
  /**
   * Generate the URL required to upload a file
   *
   * @summary Generate File Upload URL
   * @internal
   */
  @SelectBenchmark("AWS에 파일 업로드해줘")
  @HumanRoute()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/aws.svg",
  )
  @core.TypedRoute.Get("/file/upload-url")
  //@TODO 식별자를 입력받아서 bucket folder를 구분지어야 함.
  async getUploadUrl(
    @core.TypedQuery() extension: IAws.IGetPutObjectUrlInput,
  ): Promise<IAws.IGetPutObjectUrlOutput> {
    return retry(() => AwsProvider.getPutObjectUrl(extension))();
  }
}
