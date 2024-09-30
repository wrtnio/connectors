import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IShortLink } from "@wrtn/connector-api/lib/structures/connector/short_link/IShortLink";

export const test_api_connector_short_link = async (
  connection: CApi.IConnection,
) => {
  const shortLinkInput: IShortLink.IRequest = {
    url: "https://www.google.com",
  };
  const shortLinkOutput =
    await CApi.functional.connector.short_link.create.createShortLink(
      connection,
      shortLinkInput,
    );
  typia.assert(shortLinkOutput);
};
