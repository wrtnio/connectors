import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";

export const test_api_connector_crunchbase = async (
  connection: CApi.IConnection,
) => {
  const autocomplete =
    await CApi.functional.connector.crunchbase.auto_complete.autocomplete(
      connection,
      {
        query: "wrtn-technologies",
      },
    );

  typia.assert(autocomplete);

  const organizationData =
    await CApi.functional.connector.crunchbase.get_organization_data.getOrganizationData(
      connection,
      {
        organization_identifier: "wrtn-technologies",
      },
    );

  typia.assert(organizationData);
};
