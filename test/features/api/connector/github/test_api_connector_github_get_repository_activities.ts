import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_github_get_organization_events_1 = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.github.repositories.get_activities.getRepositoryActivities(
      connection,
      {
        owner: "samchon",
        repo: "typia",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assert(res);
};

export const test_api_connector_github_get_organization_events_2 = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.github.repositories.get_activities.getRepositoryActivities(
      connection,
      {
        owner: "samchon",
        repo: "typia",
        ref: "gh-pages",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assert(res);
};
