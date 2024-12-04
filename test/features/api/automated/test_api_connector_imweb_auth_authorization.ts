import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IImweb } from "../../../../src/api/structures/connector/imweb/IImweb";

export const test_api_connector_imweb_auth_authorization = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IImweb.IGetAccessTokenOutput> =
    await api.functional.connector.imweb.auth.authorization(
      connection,
      typia.random<IImweb.Credential>(),
    );
  typia.assert(output);
};
