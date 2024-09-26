import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_figma_read_file = async (
  connection: CApi.IConnection,
) => {
  /**
   * read file API
   */
  const readFileEvent =
    await CApi.functional.connector.figma.get_files.readFiles(connection, {
      secretKey: ConnectorGlobal.env.FIGMA_TEST_SECRET,
      fileKey: ConnectorGlobal.env.FIGMA_TEST_FILE_KEY,
    });

  typia.assert(readFileEvent);
};

export const test_api_connector_figma_read_comment = async (
  connection: CApi.IConnection,
) => {
  /**
   * read comment API
   */
  const readCommentEvent =
    await CApi.functional.connector.figma.get_comments.readComments(
      connection,
      {
        secretKey: ConnectorGlobal.env.FIGMA_TEST_SECRET,
        fileKey: ConnectorGlobal.env.FIGMA_TEST_FILE_KEY,
        as_md: true,
      },
    );

  typia.assert(readCommentEvent);
  return readCommentEvent;
};

export const test_api_connector_figma_add_comment = async (
  connection: CApi.IConnection,
) => {
  /**
   * add comment API
   */
  const addCommentEvent =
    await CApi.functional.connector.figma.comments.addComment(connection, {
      secretKey: ConnectorGlobal.env.FIGMA_TEST_SECRET,
      fileKey: ConnectorGlobal.env.FIGMA_TEST_FILE_KEY,
      message: typia.random<string>(),
    });

  typia.assert(addCommentEvent);

  /**
   * 방금 추가한 댓글이 조회되어야 한다.
   */
  const readCommentEvent =
    await test_api_connector_figma_read_comment(connection);
  typia.assert(
    readCommentEvent.comments.find((el) => el.id === addCommentEvent.id)!,
  );
};

export const test_api_connector_figma_get_projects = async (
  connection: CApi.IConnection,
) => {
  const team = await CApi.functional.connector.figma.get_projects.getProjects(
    connection,
    {
      secretKey: ConnectorGlobal.env.FIGMA_TEST_SECRET,
      teamId: "1379663189749043465",
    },
  );

  typia.assert(team);
  return team;
};

export const test_api_connector_figma_get_project_files = async (
  connection: CApi.IConnection,
) => {
  const team = await test_api_connector_figma_get_projects(connection);

  for await (const project of team.projects) {
    const files =
      await CApi.functional.connector.figma.projects.get_canvas.getProjectCanvas(
        connection,
        project.id,
        {
          secretKey: ConnectorGlobal.env.FIGMA_TEST_SECRET,
        },
      );

    typia.assert(files);
  }
};

export const test_api_connector_get_statistics = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.figma.get_statistics.getStatistics(
      connection,
      {
        as_md: true,
        teamId: "1379663189749043465",
        secretKey: ConnectorGlobal.env.FIGMA_TEST_SECRET,
      },
    );

  typia.assert(res);
};
