import CApi from "@wrtn/connector-api/lib/index";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_miro_create_board = async (
  connection: CApi.IConnection,
) => {
  const authRes = await CApi.functional.connector.miro.refresh(connection, {
    refresh_token: ConnectorGlobal.env.TEST_MIRO_REFRESH_TOKEN,
  });

  // typia.assertEquals(authRes);

  console.log("refresh auth res : ", authRes);

  const createRes = await CApi.functional.connector.miro.createBoard(
    connection,
    {
      name: "create-board-00",
      description: "test board create",

      secretKey: authRes.access_token,
    },
  );

  console.log("create board res : ", createRes);

  const copyRes = await CApi.functional.connector.miro.copyBoard(connection, {
    name: "copy-board-00",
    description: "test board copy",

    secretKey: authRes.access_token,
    copy_from: createRes.id,
  });

  console.log("copy board res : ", copyRes);
};
