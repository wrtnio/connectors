import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

const TEST_T_INVOICE = "590329217840" as const;

export const test_api_connector_sweet_tracker_get_companies = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.sweet_tacker.get_companies.getCompanyList(
      connection,
    );

  typia.assert(res);
  return res;
};

export const test_api_connector_sweet_tracker_get_recommended_companies =
  async (connection: CApi.IConnection) => {
    const res =
      await CApi.functional.connector.sweet_tacker.get_companies.recommended.getRecommendedCompanyList(
        connection,
        {
          t_invoice: TEST_T_INVOICE,
        },
      );

    typia.assert(res);
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
        t_code: companies.Recommend.at(0)?.Code as string,
      },
    );

  typia.assert(res);
  return res;
};

export const test_api_connector_sweet_tracker_get_tracking_info_2 = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.sweet_tacker.tracking_info.getTrackingInfo(
      connection,
      {
        t_invoice: "52429929001",
        t_code: "17",
      },
    );

  return res;
};
