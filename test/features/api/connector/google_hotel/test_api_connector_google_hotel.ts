import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IGoogleHotel } from "@wrtn/connector-api/lib/structures/connector/google_hotel/IGoogleHotel";

export const test_api_connector_google_hotel = async (
  connection: CApi.IConnection,
) => {
  const today = new Date();
  const oneWeekLater = new Date();
  oneWeekLater.setDate(today.getDate() + 7);

  const formatDate = (date: Date) => date.toISOString().split("T")[0];
  const results = await CApi.functional.connector.google_hotel.search(
    connection,
    {
      keyword: "Tokyo",
      check_in_date: formatDate(today),
      check_out_date: formatDate(oneWeekLater),
      adults: 2,
      children: 0,
      // sort_by: "3",
      // rating: "8",
      // type: ["12", "13"],
      // hotel_class: ["4", "5"],
      // free_cancellation: true,
      max_results: 10,
    },
  );
  typia.assert<IGoogleHotel.IResponse[]>(results);
};
