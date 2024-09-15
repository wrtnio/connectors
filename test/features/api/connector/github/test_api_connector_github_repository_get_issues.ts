import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import assert, { deepStrictEqual } from "assert";

export async function test_api_connector_github_repositories_get_issues_desc(
  connection: CApi.IConnection,
) {
  const res =
    await CApi.functional.connector.github.repositories.get_issues.getRepositoryIssues(
      connection,
      {
        owner: "samchon",
        repo: "nestia",
        direction: "DESC",
        sort: "COMMENTS",
        per_page: 10,
        state: "OPEN",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assertEquals(res);

  const counts = res.fetchedIssues.map((el) => el.comments.totalCount);
  deepStrictEqual(
    counts,
    counts.sort((a, b) => a - b),
  );

  assert(res.fetchedIssues.every((issue) => typeof issue.title === "string"));
}

export async function test_api_connector_github_repositories_get_issues_asc(
  connection: CApi.IConnection,
) {
  const res =
    await CApi.functional.connector.github.repositories.get_issues.getRepositoryIssues(
      connection,
      {
        owner: "samchon",
        repo: "nestia",
        direction: "ASC",
        sort: "COMMENTS",
        per_page: 10,
        state: "OPEN",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assertEquals(res);

  const counts = res.fetchedIssues.map((el) => el.comments.totalCount);
  deepStrictEqual(
    counts,
    counts.sort((a, b) => b - a),
  );
}

export async function test_api_connector_github_repositories_get_issues_sort_by_created_at(
  connection: CApi.IConnection,
) {
  const res =
    await CApi.functional.connector.github.repositories.get_issues.getRepositoryIssues(
      connection,
      {
        owner: "samchon",
        repo: "nestia",
        direction: "ASC",
        sort: "CREATED_AT",
        per_page: 10,
        state: "OPEN",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assertEquals(res);
}

export async function test_api_connector_github_repositories_get_issues_sort_by_updated_at(
  connection: CApi.IConnection,
) {
  const res =
    await CApi.functional.connector.github.repositories.get_issues.getRepositoryIssues(
      connection,
      {
        owner: "samchon",
        repo: "nestia",
        direction: "ASC",
        sort: "UPDATED_AT",
        per_page: 10,
        state: "OPEN",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assertEquals(res);

  const counts = res.fetchedIssues.map((el) => el.updatedAt);
  deepStrictEqual(
    counts,
    counts.sort((a, b) => new Date(b).getTime() - new Date(a).getTime()),
  );
}

export async function test_api_connector_github_repositories_get_issues_sort_by_reaction(
  connection: CApi.IConnection,
) {
  const res =
    await CApi.functional.connector.github.repositories.get_issues.getRepositoryIssues(
      connection,
      {
        owner: "samchon",
        repo: "nestia",
        direction: "ASC",
        sort: "REACTIONS",
        per_page: 10,
        state: "OPEN",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assertEquals(res);

  const counts = res.fetchedIssues.map((el) => el.reactions.totalCount);
  deepStrictEqual(
    counts,
    counts.sort((a, b) => b - a),
  );
}

export async function test_api_connector_github_repositories_get_issues_closed(
  connection: CApi.IConnection,
) {
  const res =
    await CApi.functional.connector.github.repositories.get_issues.getRepositoryIssues(
      connection,
      {
        owner: "samchon",
        repo: "nestia",
        direction: "ASC",
        sort: "REACTIONS",
        per_page: 10,
        state: "CLOSED",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assertEquals(res);

  const counts = res.fetchedIssues.map((el) => el.reactions.totalCount);
  deepStrictEqual(
    counts,
    counts.sort((a, b) => b - a),
  );
}
