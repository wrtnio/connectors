import CApi from "@wrtn/connector-api/lib/index";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_miro_create_board = async (
  connection: CApi.IConnection,
) => {
  const authRes = await CApi.functional.connector.miro.refresh(connection, {
    refresh_token: ConnectorGlobal.env.TEST_MIRO_REFRESH_TOKEN,
  });

  // typia.assertEquals(authRes);

  console.log("authRes : ", authRes);

  const res = await CApi.functional.connector.miro.createBoard(connection, {
    name: "create-board-00",
    description: "test board",

    teamId: "",
    projectId: "",
    secretKey: authRes.access_token,
  });

  console.log("res : ", res);
};
