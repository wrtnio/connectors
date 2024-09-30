import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IStudentReportGeneratorResponse } from "@wrtn/connector-api/lib/structures/connector/student_report_generator/IStudentReportGenerator";

export async function test_api_student_report_generator(
  connection: CApi.IConnection,
): Promise<IStudentReportGeneratorResponse> {
  const generated =
    await CApi.functional.connector.student_report_generator.generate(
      connection,
      {
        consideration: "Be nice",
        outputs: [
          {
            field_name: "Overall Evaluation",
            field_description: "Overall Evaluation",
            example:
              "Kim is a diligent student who excels in every subject and is a pleasure to teach.",
          },
        ],
        reference_data: [
          {
            name: "Noah",
            activity: "Math, Soccer, Basketball",
            attitude: "Energetic, Outgoing, Sloppy",
          },
        ],
      },
    );
  typia.assert<IStudentReportGeneratorResponse>(generated);
  return generated;
}
