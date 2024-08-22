import CApi from "@wrtn/connector-api/lib/index";
import { randomUUID } from "crypto";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export async function test_api_connector_github_create_file_contents(
  connection: CApi.IConnection,
) {
  const randomString = randomUUID();
  const res =
    await CApi.functional.connector.github.repos.contents.createFileContents(
      connection,
      {
        owner: "studio-pro",
        repo: "github_connector",
        content: "hello, studio-pro!",
        message: `src/${randomString}.ts`,
        path: `src/${randomString}.ts`,
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assert(res);
}
