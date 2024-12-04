import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type {
  IStudentReportRowGeneratorRequest,
  IStudentReportRowGeneratorResponse,
} from "../../../../src/api/structures/connector/student_report_generator/IStudentReportGenerator";

export const test_api_connector_student_report_generator_row_generateRow =
  async (connection: api.IConnection) => {
    const output: Primitive<IStudentReportRowGeneratorResponse> =
      await api.functional.connector.student_report_generator.row.generateRow(
        connection,
        typia.random<IStudentReportRowGeneratorRequest>(),
      );
    typia.assert(output);
  };
