import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";

export async function test_api_connector_github_get_branches(
  connection: CApi.IConnection,
) {
  const res =
    await CApi.functional.connector.github.get_branches.getRepositoryBranches(
      connection,
      {
        owner: "samchon",
        repo: "nestia",
      },
    );

  typia.assertEquals(res);
}
