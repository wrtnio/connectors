import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export async function test_api_connector_github_get_my_profile(
  connection: CApi.IConnection,
) {
  const res =
    await CApi.functional.connector.github.get_my_profile.getMyProfile(
      connection,
      {
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );
  typia.assertEquals(res);
  return res;
}
