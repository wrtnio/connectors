import typia from "typia";

import api from "../../../../src/api";

export const test_api_connector_airport_information_save_database_saveDatabase =
  async (connection: api.IConnection) => {
    const output =
      await api.functional.connector.airport_information.save_database.saveDatabase(
        connection,
      );
    typia.assert(output);
  };
