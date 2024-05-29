import { Module } from "@nestjs/common";

import { RankerProvider } from "../../../providers/connector/sort/RankerProvider";
import { RankController } from "./RankController";

@Module({
  imports: [],
  providers: [RankerProvider],
  controllers: [RankController],
})
export class RankModule {}
