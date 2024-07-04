import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IHwp } from "@wrtn/connector-api/lib/structures/connector/hwp/IHwp";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_hwp = async (connection: CApi.IConnection) => {
  const parseInput = {
    fileUrl: `https://${ConnectorGlobal.env.AWS_S3_BUCKET}.s3.ap-northeast-2.amazonaws.com/example.hwp`,
  };

  const parseOutput = await CApi.functional.connector.hwp.parse.parseHwp(connection, parseInput);
  typia.assertEquals<IHwp.IParseOutput>(parseOutput);
};
