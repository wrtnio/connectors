import ConnectorApi from "@wrtnio/connector-api";

import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";

export const scenario_japan_travel_plan_to_excel =
  (): IFunctionCallBenchmarkScenario => ({
    title: "일본 여행 계획 엑셀 정리",
    prompt: `
    일본 여행 4박 5일 계획을 작성한 뒤에, 엑셀 시트로 정리해줘. 
    
    도쿄에 3일, 요코하마에는 2일 머물 예정이야. 상세한 일정은 전부 네가 정해줘.`,
    operations: [
      {
        type: "standalone",
        function: ConnectorApi.functional.connector.excel.createSheets,
        required: true,
      },
      {
        type: "standalone",
        function: ConnectorApi.functional.connector.excel.rows.insertRows,
        required: true,
      },
    ],
  });
