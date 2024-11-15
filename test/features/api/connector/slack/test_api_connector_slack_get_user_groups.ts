import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_slack_get_user_groups = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.slack.get_user_groups.getUserGroups(
      connection,
      {
        secretKey: ConnectorGlobal.env.SLACK_TEST_SECRET,
      },
    );

  typia.assert(res);
};
