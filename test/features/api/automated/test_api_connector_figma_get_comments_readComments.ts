import type { GetCommentsResponse } from "@figma/rest-api-spec/dist/api_types";
import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IFigma } from "../../../../src/api/structures/connector/figma/IFigma";

export const test_api_connector_figma_get_comments_readComments = async (
  connection: api.IConnection,
) => {
  const output: Primitive<GetCommentsResponse> =
    await api.functional.connector.figma.get_comments.readComments(
      connection,
      typia.random<IFigma.IReadCommentInput>(),
    );
  typia.assert(output);
};
