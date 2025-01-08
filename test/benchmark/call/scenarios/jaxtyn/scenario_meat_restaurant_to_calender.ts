import ConnectorApi from "@wrtnio/connector-api";

import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";

export const scenario_meat_restaurant_to_calender =
  (): IFunctionCallBenchmarkScenario => ({
    title: "강남역 소고기 식당 캘린더 등록",
    prompt: `
      강남에서 소고기를 먹을 수 있는 식당 찾아서 
      오늘 7시부터 9시까지 캘린더에 회식일정 잡아줘.
      
      캘린더 제목은 "강남역 소고기 식당 회식"으로 해주고,
      식사 시간은 2 시간으로 해 줘.`,
    operations: [
      {
        type: "union",
        elements: [
          ConnectorApi.functional.connector.google_search.search,
          ConnectorApi.functional.connector.google_map.search,
          ConnectorApi.functional.connector.kakao_map.search,
        ].map((func) => ({
          type: "standalone",
          function: func,
          required: true,
        })),
        required: true,
      },
      {
        type: "standalone",
        function:
          ConnectorApi.functional.connector.google_calendar.event.createEvent,
        required: true,
      },
    ],
  });
