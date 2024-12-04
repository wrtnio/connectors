import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IShortLink } from "../../../../src/api/structures/connector/short_link/IShortLink";

export const test_api_connector_short_link_create_createShortLink = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IShortLink.IResponse> =
    await api.functional.connector.short_link.create.createShortLink(
      connection,
      typia.random<IShortLink.IRequest>(),
    );
  typia.assert(output);
};
