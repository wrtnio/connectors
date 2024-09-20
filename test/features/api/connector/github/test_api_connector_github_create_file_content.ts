import CApi from "@wrtn/connector-api/lib/index";
import { randomUUID } from "crypto";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import assert from "assert";

export async function test_api_connector_github_create_file_contents(
  connection: CApi.IConnection,
) {
  const randomString = randomUUID();
  const created =
    await CApi.functional.connector.github.repos.commits.contents.createFileContents(
      connection,
      {
        owner: "studio-pro",
        repo: "github_connector",
        content: "hello, studio-pro!",
        message: `create src/${randomString}.ts`,
        path: `src/${randomString}.ts`,
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assert(created);
  return created;
}

export async function test_api_connector_github_create_file_contents_with_duplicated_filename(
  connection: CApi.IConnection,
) {
  try {
    const randomString = randomUUID();
    await CApi.functional.connector.github.repos.commits.contents.createFileContents(
      connection,
      {
        owner: "studio-pro",
        repo: "github_connector",
        content: "hello, studio-pro!",
        message: `src/${randomString}.ts`,
        path: `README.md`,
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

    assert(false); // 무조건 실패해야 하므로 false
  } catch (err) {
    assert(true); // 에러가 발생했다면 성공한 것으로 간주
  }
}
