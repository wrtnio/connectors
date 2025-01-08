import ConnectorApi from "@wrtnio/connector-api";

import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";

export const scenario_airline_and_hotel_to_email =
  (): IFunctionCallBenchmarkScenario => ({
    title: "항공권 티켓/숙소 검색하여 이메일 전송",
    prompt: `
    2025.1.1 일에 한국 인천공항에서 일본 나리타공항으로 가는 가장 싼 항공권을 검색해주고, 
    그 날 묵을 숙소를 추천해서 메일로 보내줘`,
    operations: [
      {
        type: "union",
        elements: [
          ConnectorApi.functional.connector.google_flight.one_way.oneWay,
          ConnectorApi.functional.connector.google_flight.round_trip.roundTrip,
        ].map((func) => ({
          type: "standalone",
          function: func,
          required: true,
        })),
        required: true,
      },
      {
        type: "standalone",
        function: ConnectorApi.functional.connector.google_hotel.search,
        required: true,
      },
    ],
  });
