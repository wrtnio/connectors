import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGithub } from "../../../../src/api/structures/connector/github/IGithub";

export const test_api_connector_github_get_labels_getLabels = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IGithub.IGetLabelOutput> =
    await api.functional.connector.github.get_labels.getLabels(
      connection,
      typia.random<IGithub.IGetLabelInput>(),
    );
  typia.assert(output);
};
