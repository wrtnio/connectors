import { Module } from "@nestjs/common";

import { AwsProvider } from "../../../providers/connector/aws/AwsProvider";
import { GoogleSlidesProvider } from "../../../providers/connector/google_slides/GoogleSlidesProvider";
import { GoogleModule } from "../internal/google/GoogleModule";
import { GoogleSlidesController } from "./GoogleSlidesController";

@Module({
  imports: [GoogleModule],
  providers: [GoogleSlidesProvider, AwsProvider],
  controllers: [GoogleSlidesController],
  exports: [GoogleSlidesProvider],
})
export class GoogleSlidesModule {}
