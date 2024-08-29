import CApi from "@wrtn/connector-api/lib/index";
import axios from "axios";
import typia from "typia";
import { AwsProvider } from "../../../../../src/providers/connector/aws/AwsProvider";
import { RagProvider } from "../../../../../src/providers/connector/rag/RagProvider";

export async function test_aws_provider_upload_object() {
  const buffer = Buffer.from(JSON.stringify([]), "utf-8");
  const uploaded = await new AwsProvider().uploadObject({
    contentType: "text/plain; charset=utf-8;",
    key: "TES NAME",
    data: buffer,
  });

  try {
    typia.assertEquals(uploaded);
    await axios.get(uploaded);
  } catch (err) {
    throw new Error("AWS 업로드에 실패한 경우");
  }
}

export async function test_api_connector_github_upload_repo(
  connection: CApi.IConnection,
) {
  const test_file_names = [
    "T",
    // "TE_NAME",
    "TES NAME",
    // "TES-NAME",
  ] as const;

  for await (const filename of test_file_names) {
    const url = await CApi.functional.connector.github.upload(connection, {
      files: [{ path: filename, content: "[]" }],
      key: `connector/github/upload-test/${filename}`,
    });

    const ragProvider = new RagProvider(new AwsProvider());
    const transformedUrl = await ragProvider.transformInput(url);

    try {
      // 올바른 URL인지 검증한다.
      await axios.get(transformedUrl);
    } catch (err) {
      throw new Error(
        `올바른 URL이 아니라 파일 접근이 불가능한 경우, filename: ${filename}`,
      );
    }

    typia.assert(transformedUrl);
  }
}

// export async function test_api_connector_github_analyze(
//   connection: CApi.IConnection,
// ) {
//   const res = await CApi.functional.connector.github.analyze(connection, {
//     owner: "wrtnio",
//     repo: "connectors",
//     secretKey: ConnectorGlobal.env.G_GITHUB_TEST_SECRET,
//   });

//   typia.assert(res);
// }
