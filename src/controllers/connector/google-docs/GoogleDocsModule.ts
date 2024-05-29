import { Module } from "@nestjs/common";

import { GoogleDocsProvider } from "../../../providers/connector/google_docs/GoogleDocsProvider";
import { GoogleModule } from "../internal/google/GoogleModule";
import { GoogleDocsController } from "./GoogleDocsController";

@Module({
  imports: [GoogleModule],
  controllers: [GoogleDocsController],
  providers: [GoogleDocsProvider],
  exports: [GoogleDocsProvider],
})
export class GoogleDocsModule {}
