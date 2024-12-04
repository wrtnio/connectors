import typia from "typia";

import api from "../../../../src/api";

export const test_api_swagger_update_updateSwagger = async (
  connection: api.IConnection,
) => {
  const output = await api.functional.swagger.update.updateSwagger(connection);
  typia.assert(output);
};
