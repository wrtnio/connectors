import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import {
  IStudentReportGeneratorRequest,
  IStudentReportGeneratorResponse,
  IStudentReportRowGeneratorRequest,
  IStudentReportRowGeneratorResponse,
} from "../../../api/structures/connector/student_report_generator/IStudentReportGenerator";
import { StudentReportGeneratorProvider } from "../../../providers/connector/student_report_generator/StudentReportGeneratorProvider";
import { Try, createResponseForm } from "../../../utils/createResponseForm";

/**
 * StudentReportGeneratorNode controller.
 */
@Controller("connector/student-report-generator")
export class StudentReportGeneratorController {
  constructor(private studentReportGeneratorProvider: StudentReportGeneratorProvider) {}

  /**
   * 입력된 정보를 바탕으로 학생 생활 기록부를 생성합니다.
   *
   * @summary 학생 생활 기록부 생성
   *
   * @param input 학생 생활 기록부 생성을 위한 정보.
   *
   * @returns 생성된 학생 생활 기록부.
   */
  @core.TypedRoute.Post()
  async generate(
    @core.TypedBody() input: IStudentReportGeneratorRequest,
  ): Promise<Try<IStudentReportGeneratorResponse>> {
    const data = await this.studentReportGeneratorProvider.generate(input);
    return createResponseForm(data);
  }

  /**
   * 입력된 정보를 바탕으로 학생 생활 기록부를 생성합니다.
   *
   * @summary 학생 생활 기록부 생성
   *
   * @param input 학생 생활 기록부 생성을 위한 정보.
   *
   * @returns 생성된 학생 생활 기록부.
   */
  @core.TypedRoute.Post("row")
  async generateRow(
    @core.TypedBody() input: IStudentReportRowGeneratorRequest,
  ): Promise<Try<IStudentReportRowGeneratorResponse>> {
    const data = await this.studentReportGeneratorProvider.generateRow(input);
    return createResponseForm(data);
  }
}
