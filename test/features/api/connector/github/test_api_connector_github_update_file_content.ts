import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { test_api_connector_github_create_file_contents } from "./test_api_connector_github_create_file_content";

export async function test_api_connector_github_delete_file_contents_by_content_sha(
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
    await CApi.functional.connector.github.repos.commits.contents.deleteFileContents(
      connection,
      {
        owner: "studio-pro",
        repo: "github_connector",
        sha: created.content.sha,
        message: `delete ${created.content.path}`,
        path: created.content.path,
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );
  typia.assert(update);
}
