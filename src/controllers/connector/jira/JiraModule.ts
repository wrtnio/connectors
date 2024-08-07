import { Module } from "@nestjs/common";
import { JiraController } from "./JiraController";
import { JiraProvider } from "../../../providers/connector/jira/JiraProvider";

@Module({
  controllers: [JiraController],
  providers: [JiraProvider],
})
export class JiraModule {}
