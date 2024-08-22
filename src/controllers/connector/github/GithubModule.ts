import { Module } from "@nestjs/common";
import { GithubController } from "./GithubController";
import { GithubProvider } from "../../../providers/connector/github/GithubProvider";

@Module({
  controllers: [GithubController],
  providers: [GithubProvider],
})
export class GithubModule {}
