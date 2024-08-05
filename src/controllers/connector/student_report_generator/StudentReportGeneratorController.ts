import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import {
  IStudentReportGeneratorRequest,
  IStudentReportGeneratorResponse,
  IStudentReportRowGeneratorRequest,
  IStudentReportRowGeneratorResponse,
} from "../../../api/structures/connector/student_report_generator/IStudentReportGenerator";
import { StudentReportGeneratorProvider } from "../../../providers/connector/student_report_generator/StudentReportGeneratorProvider";
import { RouteIcon } from "@wrtnio/decorators";

/**
 * StudentReportGeneratorNode controller.
 */
@Controller("connector/student-report-generator")
export class StudentReportGeneratorController {
  constructor(
    private studentReportGeneratorProvider: StudentReportGeneratorProvider,
  ) {}

  /**
   * 입력된 정보를 바탕으로 학생 생활 기록부를 생성합니다.
   *
   * @summary 학생 생활 기록부 생성
   *
   * @param input 학생 생활 기록부 생성을 위한 정보.
   *
   * @returns 생성된 학생 생활 기록부.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/StudentReport.svg",
  )
  @core.TypedRoute.Post()
  public generate(
    @core.TypedBody() input: IStudentReportGeneratorRequest,
  ): Promise<IStudentReportGeneratorResponse> {
    return this.studentReportGeneratorProvider.generate(input);
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
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/StudentReport.svg",
  )
  @core.TypedRoute.Post("row")
  public generateRow(
    @core.TypedBody() input: IStudentReportRowGeneratorRequest,
  ): Promise<IStudentReportRowGeneratorResponse> {
    return this.studentReportGeneratorProvider.generateRow(input);
  }
}
