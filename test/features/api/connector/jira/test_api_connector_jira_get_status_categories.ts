import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

const Configuration = {
  email: "studio@wrtn.io",
  apiToken: ConnectorGlobal.env.JIRA_TEST_SECRET,
  domain: "https://wrtn-ecosystem.atlassian.net",
} as const;

export const test_api_connector_jira_get_status_categories = async (
  connection: CApi.IConnection,
) => {
  const categories =
    await CApi.functional.connector.jira.get_status_categories.getStatusCategories(
      connection,
      {
        ...Configuration,
      },
    );

  typia.assertEquals(categories);
  return categories;
};
