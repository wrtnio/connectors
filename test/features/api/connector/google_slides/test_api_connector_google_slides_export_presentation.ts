import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { test_api_connector_google_slides_create_presentation } from "./test_api_connector_google_slides";

export const test_api_connector_google_slides_export_presentation_power_point =
  async (connection: CApi.IConnection) => {
    const presentation =
      await test_api_connector_google_slides_create_presentation(connection);

    const presentationId = presentation.presentationId;
    const res =
      await CApi.functional.connector.google_slides.presentations.exports.power_point.powerPoint(
        connection,
        presentationId as string,
        {
          secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
        },
      );

    typia.assert(res);
  };

export const test_api_connector_google_slides_export_presentation_hanshow =
  async (connection: CApi.IConnection) => {
    const presentation =
      await test_api_connector_google_slides_create_presentation(connection);

    const presentationId = presentation.presentationId; // 테스트 용 파일
    const res =
      await CApi.functional.connector.google_slides.presentations.exports.hanshow(
        connection,
        presentationId as string,
        {
          secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
        },
      );

    typia.assert(res);
  };
