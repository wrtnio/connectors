import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type {
  IStudentReportGeneratorRequest,
  IStudentReportGeneratorResponse,
} from "../../../../src/api/structures/connector/student_report_generator/IStudentReportGenerator";

export const test_api_connector_student_report_generator_generate = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IStudentReportGeneratorResponse> =
    await api.functional.connector.student_report_generator.generate(
      connection,
      typia.random<IStudentReportGeneratorRequest>(),
    );
  typia.assert(output);
};
