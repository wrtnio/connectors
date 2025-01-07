import core, { HumanRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";

import { RouteIcon } from "@wrtnio/decorators";
import {
  IStudentReportGeneratorRequest,
  IStudentReportGeneratorResponse,
  IStudentReportRowGeneratorRequest,
  IStudentReportRowGeneratorResponse,
} from "../../../api/structures/connector/student_report_generator/IStudentReportGenerator";
import { StudentReportGeneratorProvider } from "../../../providers/connector/student_report_generator/StudentReportGeneratorProvider";

/**
 * StudentReportGeneratorNode controller.
 */
@Controller("connector/student-report-generator")
export class StudentReportGeneratorController {
  constructor(
    private studentReportGeneratorProvider: StudentReportGeneratorProvider,
  ) {}

  /**
   * Create a student life record based on the entered information
   *
   * @summary Create a student life record
   * @param input Information for creating a student life record
   * @returns The created student life record
   *
   * @internal
   */
  @HumanRoute()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/StudentRecord_full.svg",
  )
  @core.TypedRoute.Post()
  public generate(
    @core.TypedBody() input: IStudentReportGeneratorRequest,
  ): Promise<IStudentReportGeneratorResponse> {
    return this.studentReportGeneratorProvider.generate(input);
  }

  /**
   * Create a student life record based on the entered information
   *
   * @summary Create a student life record
   * @param input Information for creating a student life record
   * @returns The created student life record
   *
   * @internal
   */
  @HumanRoute()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/StudentRecord_full.svg",
  )
  @core.TypedRoute.Post("row")
  public generateRow(
    @core.TypedBody() input: IStudentReportRowGeneratorRequest,
  ): Promise<IStudentReportRowGeneratorResponse> {
    return this.studentReportGeneratorProvider.generateRow(input);
  }
}
