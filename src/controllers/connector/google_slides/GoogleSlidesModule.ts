import { Module } from "@nestjs/common";

import { GoogleSlidesProvider } from "../../../providers/connector/google_slides/GoogleSlidesProvider";
import { GoogleModule } from "../internal/google/GoogleModule";
import { GoogleSlidesController } from "./GoogleSlidesController";

@Module({
  imports: [GoogleModule],
  providers: [GoogleSlidesProvider],
  controllers: [GoogleSlidesController],
  exports: [GoogleSlidesProvider],
})
export class GoogleSlidesModule {}
