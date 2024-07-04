import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

const requestBody = {
  secretKey: ConnectorGlobal.env.FIGMA_TEST_SECRET,
  fileKey: ConnectorGlobal.env.FIGMA_TEST_FILE_KEY,
};

export const test_api_connector_figma_read_file = async (connection: CApi.IConnection) => {
  /**
   * read file API
   */
  const readFileEvent = await CApi.functional.connector.figma.get_files.readFiles(connection, requestBody);

  typia.assertEquals(readFileEvent);
};

export const test_api_connector_figma_read_comment = async (connection: CApi.IConnection) => {
  /**
   * read comment API
   */
  const readCommentEvent = await CApi.functional.connector.figma.get_comments.readComments(connection, {
    ...requestBody,
    as_md: true,
  });

  typia.assert(readCommentEvent);
  return readCommentEvent;
};

export const test_api_connector_figma_add_comment = async (connection: CApi.IConnection) => {
  /**
   * add comment API
   */
  const addCommentEvent = await CApi.functional.connector.figma.comments.addComment(connection, {
    ...requestBody,
    message: typia.random<string>(),
  });

  typia.assertEquals(addCommentEvent);

  /**
   * 방금 추가한 댓글이 조회되어야 한다.
   */
  const readCommentEvent = await test_api_connector_figma_read_comment(connection);
  typia.assert(readCommentEvent.data.comments.find((el) => el.id === addCommentEvent.data.id)!);
};
