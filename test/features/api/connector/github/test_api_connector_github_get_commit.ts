import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export async function test_api_connector_github_get_commit_list(
  connection: CApi.IConnection,
) {
  const res =
    await CApi.functional.connector.github.get_commit_list.getCommitList(
      connection,
      {
        owner: "samchon",
        repo: "nestia",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assertEquals(res);
  return res;
}

export async function test_api_connector_github_get_commit(
  connection: CApi.IConnection,
) {
  const list = await test_api_connector_github_get_commit_list(connection);

  const res = await CApi.functional.connector.github.get_commit.getCommit(
    connection,
    {
      owner: "samchon",
      repo: "nestia",
      ref: list.result.at(0)?.sha as string,
      secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
    },
  );
  typia.assertEquals(res);
  return res;
}

export async function test_api_connector_github_get_commit_diff(
  connection: CApi.IConnection,
) {
  const list = await test_api_connector_github_get_commit_list(connection);

  const res =
    await CApi.functional.connector.github.get_commit_diff.getCommitDiff(
      connection,
      {
        owner: "samchon",
        repo: "nestia",
        ref: list.result.at(0)?.sha as string,
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );
  typia.assertEquals(res);
  return res;
}

export async function test_api_connector_github_get_pull_requests_associated_with_a_commit(
  connection: CApi.IConnection,
) {
  const list = await test_api_connector_github_get_commit_list(connection);

  const res =
    await CApi.functional.connector.github.get_pull_requests_associated_with_a_commit.getPullRequestAssociatedWithACommit(
      connection,
      {
        owner: "samchon",
        repo: "nestia",
        commit_sha: list.result[0].sha,
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );
  typia.assertEquals(res);
  return res;
}

export async function test_api_connector_github_get_commit_heads(
  connection: CApi.IConnection,
) {
  const list = await test_api_connector_github_get_commit_list(connection);

  const res =
    await CApi.functional.connector.github.get_commit_heads.getCommitHeads(
      connection,
      {
        owner: "samchon",
        repo: "nestia",
        commit_sha: list.result[0].sha,
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );
  typia.assertEquals(res);
  return res;
}
