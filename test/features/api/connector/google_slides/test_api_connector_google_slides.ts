import CApi from "@wrtn/connector-api/lib/index";
import { IGoogleSlides } from "@wrtn/connector-api/lib/structures/connector/google_slides/IGoogleSlides";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_google_slides = async (
  connection: CApi.IConnection,
) => {
  /**
   * create a new Google Docs
   */
  await CApi.functional.connector.google_slides.presentations.createPresentation(
    connection,
    {
      secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
      pageSize: {
        width: {
          magnitude: 1920,
          unit: "UNIT_UNSPECIFIED",
        },
        height: {
          magnitude: 1080,
          unit: "UNIT_UNSPECIFIED",
        },
      },
      slides: [],
      title: "",
      masters: [],
      layouts: [],
      locale: "",
      revisionId: "",
      notesMaster: {},
    },
  );
};
