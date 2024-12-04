import type { Comment } from "@figma/rest-api-spec/dist/api_types";
import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IFigma } from "../../../../src/api/structures/connector/figma/IFigma";

export const test_api_connector_figma_comments_addComment = async (
  connection: api.IConnection,
) => {
  const output: Primitive<Comment> =
    await api.functional.connector.figma.comments.addComment(
      connection,
      typia.random<IFigma.IAddCommentInput>(),
    );
  typia.assert(output);
};
