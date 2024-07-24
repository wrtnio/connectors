import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IGoogleHotel } from "@wrtn/connector-api/lib/structures/connector/google_hotel/IGoogleHotel";

export const test_api_connector_google_hotel = async (
  connection: CApi.IConnection,
) => {
  const results = await CApi.functional.connector.google_hotel.search(
    connection,
    {
      keyword: "삿포로 호텔",
      check_in_date: "2024-09-07",
      check_out_date: "2024-09-10",
      adults: 4,
      sort_by: "3",
      rating: "8",
      type: ["12", "13"],
      hotel_class: ["4", "5"],
      free_cancellation: true,
      max_results: 30,
    },
  );
  typia.assert<IGoogleHotel.IResponse[]>(results);
};
