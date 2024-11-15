import { Module } from "@nestjs/common";
import { CrunchbaseProvider } from "../../../providers/connector/crunchbase/CrunchbaseProvider";
import { CrunchbaseController } from "./CrunchbaseController";

@Module({
  controllers: [CrunchbaseController],
  providers: [CrunchbaseProvider],
})
export class CrunchbaseModule {}
