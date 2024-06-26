import typia from "typia";

import CApi from "@wrtn/connector-api";
import { IIconAndLogo } from "@wrtn/connector-api/lib/structures/connector/icon_and_logo/IIconAndLogo";

export const test_api_connector_icon_and_logo = async (
  connection: CApi.IConnection,
) => {
  const requestBody: IIconAndLogo.IRequest = {
    prompt: "하늘을 날고 있는 고양이",
    style_preset: "anime",
  };
  const output =
    await CApi.functional.connector.icon_and_logo.generate.generateIconAndLogo(
      connection,
      requestBody,
    );
  typia.assertEquals<IIconAndLogo.IResponse>(output);
};
