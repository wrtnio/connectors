import { Module } from "@nestjs/common";
import { ShortLinkProvider } from "../../../providers/connector/short_link/ShortLinkProvider";
import { ShortLinkController } from "./ShortLinkController";

@Module({
  imports: [],
  controllers: [ShortLinkController],
  providers: [ShortLinkProvider],
  exports: [ShortLinkProvider],
})
export class ShortLinkModule {}
