import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

// 폴더를 조회하는 경우
export async function test_api_connector_github_get_file_contents_1(
  connection: CApi.IConnection,
) {
  const res =
    await CApi.functional.connector.github.repos.get_contents.getFileContents(
      connection,
      {
        owner: "samchon",
        repo: "nestia",
        path: "",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assert(res);
}

// 파일을 조회하는 경우
export async function test_api_connector_github_get_file_contents_2(
  connection: CApi.IConnection,
) {
  const res =
    await CApi.functional.connector.github.repos.get_contents.getFileContents(
      connection,
      {
        owner: "samchon",
        repo: "nestia",
        path: "README.md",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assert(res);
}

export async function test_api_connector_github_get_readme_file(
  connection: CApi.IConnection,
) {
  const res =
    await CApi.functional.connector.github.repos.get_readme.getReadmeFile(
      connection,
      {
        owner: "samchon",
        repo: "nestia",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assertEquals(res);
}

export async function test_api_connector_github_get_repo_folder_structures(
  connection: CApi.IConnection,
) {
  const res =
    await CApi.functional.connector.github.repos.get_folder_structures.getRepositoryFolderStructures(
      connection,
      {
        owner: "samchon",
        repo: "typia",
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
        path: "",
      },
    );

  typia.assertEquals(res);
}

export async function test_api_connector_github_get_repo_get_contents_bulk(
  connection: CApi.IConnection,
) {
  const res =
    await CApi.functional.connector.github.repos.get_contents.bulk.getBulkFileContents(
      connection,
      {
        owner: "samchon",
        repo: "nestia",
        paths: ["README.md", ".gitignore"],
        secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
      },
    );

  typia.assert(res);
}
