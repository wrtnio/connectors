import { Module } from "@nestjs/common";
import { GithubProvider } from "../../../providers/connector/github/GithubProvider";
import { GithubController } from "./GithubController";
import { RagProvider } from "../../../providers/connector/rag/RagProvider";

@Module({
  imports: [],
  controllers: [GithubController],
  providers: [GithubProvider, RagProvider],
})
export class GithubModule {}
