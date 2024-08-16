import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";

export async function test_api_connector_github_get_commit_list(
  connection: CApi.IConnection,
) {
  const res =
    await CApi.functional.connector.github.get_commit_list.getCommitList(
      connection,
      {
        owner: "samchon",
        repo: "nestia",
      },
    );

  typia.assertEquals(res);
  return res;
}
