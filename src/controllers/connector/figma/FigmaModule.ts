import { Module } from "@nestjs/common";

import { FigmaProvider } from "../../../providers/connector/figma/FigmaProvider";
import { FigmaController } from "./FigmaController";

@Module({
  controllers: [FigmaController],
  providers: [FigmaProvider],
  exports: [FigmaProvider],
})
export class FigmaModule {}
