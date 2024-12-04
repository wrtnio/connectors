import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_upload = async (
  connection: api.IConnection,
) => {
  const output: Primitive<string> =
    await api.functional.connector.github.upload(
      connection,
      typia.random<IGithub.UploadFileInput>(),
    );
  typia.assert(output);
};
