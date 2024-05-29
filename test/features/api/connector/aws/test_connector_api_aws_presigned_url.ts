import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IAws } from "@wrtn/connector-api/lib/structures/connector/aws/IAws";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_connector_api_aws_presigned_url = async (
  connection: CApi.IConnection,
) => {
  /**
   * Get Presigned URL for file upload.
   */
  const getUploadUrlOutput =
    await CApi.functional.connector.aws.file.upload_url.getUploadUrl(
      connection,
      { extension: "pdf" },
    );

  typia.assertEquals<IAws.IGetPutObjectUrlOutput>(getUploadUrlOutput);
};
