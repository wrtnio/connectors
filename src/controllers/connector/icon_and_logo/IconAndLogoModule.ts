import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

import { IconAndLogoProvider } from "../../../providers/connector/icon_and_logo/IconAndLogoProvider";
import { AwsModule } from "../aws/AwsModule";
import { IconAndLogoController } from "./IconAndLogoController";

@Module({
  imports: [AwsModule],
  providers: [IconAndLogoProvider],
  controllers: [IconAndLogoController],
  exports: [IconAndLogoProvider],
})
export class IconAndLogoModule {}
