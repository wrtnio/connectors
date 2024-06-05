import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

const TEST_T_INVOICE = "";
const TEST_KEY = ConnectorGlobal.env.TEST_SWEET_TRACKER_KEY;

export const test_api_connector_sweet_tracker_get_companies = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.sweet_tacker.get_companies.getCompanyList(
      connection,
    );

  typia.assertEquals(res);
  return res;
};

export const test_api_connector_sweet_tracker_get_recommended_companies =
  async (connection: CApi.IConnection) => {
    const res =
      await CApi.functional.connector.sweet_tacker.get_companies.recommended.getRecommendedCompanyList(
        connection,
        {
          t_invoice: TEST_T_INVOICE,
          t_key: TEST_KEY,
        },
      );

    typia.assertEquals(res);
    return res;
  };

export const test_api_connector_sweet_tracker_get_tracking_info = async (
  connection: CApi.IConnection,
) => {
  const companies =
    await test_api_connector_sweet_tracker_get_recommended_companies(
      connection,
    );
  const res =
    await CApi.functional.connector.sweet_tacker.tracking_info.getTrackingInfo(
      connection,
      {
        t_invoice: TEST_T_INVOICE,
        t_code: companies.Company.at(0)?.Code as string,
        t_key: TEST_KEY,
      },
    );

  typia.assertEquals(res);
  return res;
};
