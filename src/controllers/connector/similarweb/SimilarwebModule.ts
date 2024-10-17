import { Module } from "@nestjs/common";
import { SimilarwebProvider } from "../../../providers/connector/similarweb/SimilarwebProvider";
import { SimilarwebController } from "./SimilarwebController";

@Module({
  controllers: [SimilarwebController],
  providers: [SimilarwebProvider],
})
export class SimilarwebModule {}
