import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_google_slides = async (
  connection: CApi.IConnection,
) => {
  /**
   * create a new Google Slides Presentation.
   */
  const res =
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
        title: "TEST2",
        masters: [],
        layouts: [],
        locale: "",
        revisionId: "",
        presentationId: "",
      },
    );

  console.log(JSON.stringify(res, null, 2));

  typia.assertEquals(res);
};
