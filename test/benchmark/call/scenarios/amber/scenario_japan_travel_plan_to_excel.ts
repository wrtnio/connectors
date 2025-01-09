import { ExcelController } from "../../../../../src/controllers/connector/excel/ExcelController";
import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";

export const scenario_japan_travel_plan_to_excel =
  (): IFunctionCallBenchmarkScenario => ({
    title: "일본 여행 계획 엑셀 정리",
    prompt: `
일본 여행 4 박 5 일 일정을 작성한 뒤에, 엑셀 시트로 정리해줘. 

도쿄에는 3 일, 요코하마에는 2 일을 머물 예정이야. 

상세한 내역은 전부 알아서 해 줘.`,
    expected: {
      type: "array",
      items: [
        {
          type: "standalone",
          function: ExcelController.prototype.createSheets,
        },
        {
          type: "standalone",
          function: ExcelController.prototype.insertRows,
        },
      ],
    },
  });
