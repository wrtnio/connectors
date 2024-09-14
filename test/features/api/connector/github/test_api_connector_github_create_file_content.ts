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

export async function test_api_connector_github_update_file_contents_by_content_sha(
  connection: CApi.IConnection,
) {
  const created =
    await test_api_connector_github_create_file_contents(connection);

  /**
   * 수정 후에는 이전 `created` 객체의 content.sha를 사용하여 commit할 수 없다.
   * content.sha는 해당 파일의 수정 내역 중 가장 마지막 값인 sha를 사용해야 한다.
   * 즉, 수정 후 이 sha 값은 변동된다.
   */
  const update =
    await CApi.functional.connector.github.repos.commits.contents.updateFileContents(
      connection,
      {
        owner: "studio-pro",
        repo: "github_connector",
        sha: created.content.sha,
        content: "[updated] hello, studio-pro!",
        message: `update ${created.content.path}`,
        path: created.content.path,
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );
  typia.assert(update);
}
