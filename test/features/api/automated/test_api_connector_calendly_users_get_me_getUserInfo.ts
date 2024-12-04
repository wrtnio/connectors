import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ICalendly } from "../../../../src/api/structures/connector/calendly/ICalendly";

export const test_api_connector_calendly_users_get_me_getUserInfo = async (
  connection: api.IConnection,
) => {
  const output: Primitive<ICalendly.IGetUserInfoOutput> =
    await api.functional.connector.calendly.users.get_me.getUserInfo(
      connection,
      typia.random<ICalendly.Secret>(),
    );
  typia.assert(output);
};
