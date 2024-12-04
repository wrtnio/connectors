import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ISlack } from "../../../../src/api/structures/connector/slack/ISlack";

export const test_api_connector_slack_get_files_getFiles = async (
  connection: api.IConnection,
) => {
  const output: Primitive<ISlack.IGetFileOutput> =
    await api.functional.connector.slack.get_files.getFiles(
      connection,
      typia.random<ISlack.IGetFileInput>(),
    );
  typia.assert(output);
};
