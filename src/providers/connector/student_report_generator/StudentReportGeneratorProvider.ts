import { Injectable } from "@nestjs/common";
import typia from "typia";

import {
  IOutputStructure,
  IStudentReportGeneratorRequest,
  IStudentReportGeneratorResponse,
  IStudentReportRowGeneratorRequest,
  IStudentReportRowGeneratorResponse,
  ITableRowData,
} from "../../../api/structures/connector/student_report_generator/IStudentReportGenerator";
import {
  IChainOfThought,
  OpenAIProvider,
  dump,
  merge,
} from "../../open_ai/OpenAIProvider";

interface GeneratedOutput {
  [field: string]: string;
}

async function generateStudentReport(
  openAIProvider: OpenAIProvider,
  referenceData: ITableRowData,
  outputStructure: IOutputStructure,
  consideration: string,
): Promise<GeneratedOutput> {
  type GenerateOutput = IChainOfThought & { output: string };
  const response = await openAIProvider.extractInterface(
    `
You are a teacher writing evaluations for students in your class.
These are the data you should refer to when writing the evaluation:
data: ${dump(referenceData)}
consideration: ${dump(consideration)}
Refer to the following output structure described below:
${dump(outputStructure)}

Here are the rules to follow:
  - Strike a balance between being honest and being kind.
  - Be specific about the student's strengths and weaknesses.
  - ALWAYS write in Korean.
  - 한국어로 작성할 때, 개조식(글을 쓸 때 짧게 끊어서 중요한 요점이나 단어를 나열하는 방식) 으로 작성하세요.
  - 개조식 표현의 예시:
    - 창의적인 아이디어를 내며 새로운 방법으로 문제를 해결하려는 모습을 보임.
    - 항상 다른 학생들과 협력하여 팀워크를 발휘함.
  - 500 자 이내로 작성하세요.
    `,
    typia.json.application<[GenerateOutput]>(),
    typia.createIs<GenerateOutput>(),
    // function calling schema followed properly when context gets longer
    //"gpt-3.5-turbo",
    "gpt-4-turbo",
  );

  // TODO: think of a better way... renaming fields inside means this prompt needs another layer of modularizing
  return { [outputStructure.field_name]: response.output };
}

@Injectable()
export class StudentReportGeneratorProvider {
  constructor(private openAIProvider: OpenAIProvider) {}

  public async generate(
    input: IStudentReportGeneratorRequest,
  ): Promise<IStudentReportGeneratorResponse> {
    for (const referenceData of input.reference_data) {
      for (const outputStructure of input.outputs) {
        const response = await merge<ITableRowData, GeneratedOutput>(
          () =>
            generateStudentReport(
              this.openAIProvider,
              referenceData,
              outputStructure,
              input.consideration,
            ),
          referenceData,
        );
        Object.assign(referenceData, response);
      }
    }
    return { data: input.reference_data };
  }

  public async generateRow(
    input: IStudentReportRowGeneratorRequest,
  ): Promise<IStudentReportRowGeneratorResponse> {
    return {
      data: await generateStudentReport(
        this.openAIProvider,
        input.reference_data,
        input.output_structure,
        input.consideration,
      ),
    };
  }
}
