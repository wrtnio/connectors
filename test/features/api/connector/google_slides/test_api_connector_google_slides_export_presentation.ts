import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_google_slides_export_presentation_power_point =
  async (connection: CApi.IConnection) => {
    const presentationId = "1b_8z1T4FdAxxJwv5wDgATcZwp17lldQLMN4Nb3C8PsE"; // 테스트 용 파일
    const res =
      await CApi.functional.connector.google_slides.presentations.$export.power_point.powerPoint(
        connection,
        presentationId,
        {
          secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
        },
      );

    typia.assertEquals(res);
  };
