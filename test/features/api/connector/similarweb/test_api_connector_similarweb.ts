import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

export const test_api_connector_similarweb = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.similarweb.get_domain_info.getDomainInfo(
      connection,
      {
        domain: "wrtn.ai",
      },
    );

  typia.assert(res);
};
