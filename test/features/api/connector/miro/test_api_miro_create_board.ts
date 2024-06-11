import CApi from "@wrtn/connector-api/lib/index";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_miro_create_board = async (
  connection: CApi.IConnection,
) => {
  const authRes = await CApi.functional.connector.miro.refresh(connection, {
    refresh_token: ConnectorGlobal.env.TEST_MIRO_REFRESH_TOKEN,
  });

  const createRes = await CApi.functional.connector.miro.createBoard(
    connection,
    {
      secretKey: authRes.access_token,

      name: "create-board-00",
      description: "test board create",
    },
  );

  const copyRes = await CApi.functional.connector.miro.copyBoard(connection, {
    secretKey: authRes.access_token,

    name: "copy-board-00",
    description: "test board copy",
    copy_from: createRes.id,
  });

  const createCardRes = await CApi.functional.connector.miro.createCard(
    connection,
    {
      secretKey: authRes.access_token,
      board_id: copyRes.id,
      data: {
        assigneeId: "3458764591699013898",
        description: "create card description",
        dueDate: "2023-10-12T22:00:55.000Z",
        title: "create card item",
      },
      style: { cardTheme: "#2d9bf0" },
      position: { x: 100, y: 100 },
      geometry: { height: 60, rotation: 0, width: 320 },
    },
  );
};
