import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IGoogleImage } from "@wrtn/connector-api/lib/structures/connector/google_image/IGoogleImage";

export const test_api_connector_google_image = async (
  connection: CApi.IConnection,
) => {
  const results = await CApi.functional.connector.google_image.search(
    connection,
    {
      query: "베이직 화이트 셔츠",
      lang: "ko",
      ratio: "s",
    },
  );
  typia.assert<IGoogleImage.IResponse[]>(results);
};
