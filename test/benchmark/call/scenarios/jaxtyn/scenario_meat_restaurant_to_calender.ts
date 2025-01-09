import { GoogleCalendarController } from "../../../../../src/controllers/connector/google_calendar/GoogleCalendarController";
import { GoogleMapController } from "../../../../../src/controllers/connector/google_map/GoogleMapController";
import { GoogleSearchController } from "../../../../../src/controllers/connector/google_search/GoogleSearchController";
import { KakaoMapController } from "../../../../../src/controllers/connector/kakao_map/KakaoMapController";
import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";

export const scenario_meat_restaurant_to_calender =
  (): IFunctionCallBenchmarkScenario => ({
    title: "강남역 소고기 식당 캘린더 등록",
    prompt: `
      강남에서 소고기를 먹을 수 있는 식당 찾아서 
      오늘 7시부터 9시까지 캘린더에 회식일정 잡아줘.
      
      캘린더 제목은 "강남역 소고기 식당 회식"으로 해주고,
      식사 시간은 2 시간으로 해 줘.`,
    expected: {
      type: "array",
      items: [
        {
          type: "anyOf",
          anyOf: [
            GoogleSearchController.prototype.search,
            GoogleMapController.prototype.search,
            KakaoMapController.prototype.search,
          ].map((func) => ({
            type: "standalone",
            function: func,
          })),
        },
        {
          type: "standalone",
          function: GoogleCalendarController.prototype.createEvent,
        },
      ],
    },
  });
