import { Module } from "@nestjs/common";
import { GithubProvider } from "../../../providers/connector/github/GithubProvider";
import { AwsModule } from "../aws/AwsModule";
import { RagModule } from "../rag/RagModule";
import { GithubController } from "./GithubController";

@Module({
  imports: [RagModule, AwsModule],
  controllers: [GithubController],
  providers: [GithubProvider],
})
export class GithubModule {}
