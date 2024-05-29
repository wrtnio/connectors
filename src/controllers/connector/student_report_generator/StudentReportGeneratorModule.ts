import { Module } from "@nestjs/common";

import { StudentReportGeneratorProvider } from "../../../providers/connector/student_report_generator/StudentReportGeneratorProvider";
import { OpenAIModule } from "../../../providers/open_ai/OpenAIModule";
import { StudentReportGeneratorController } from "./StudentReportGeneratorController";

@Module({
  imports: [OpenAIModule],
  providers: [StudentReportGeneratorProvider],
  controllers: [StudentReportGeneratorController],
})
export class StudentReportGeneratorModule {}
