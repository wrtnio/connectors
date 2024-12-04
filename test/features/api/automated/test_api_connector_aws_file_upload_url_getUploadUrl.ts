import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IAws } from "../../../../src/api/structures/connector/aws/IAws";

export const test_api_connector_aws_file_upload_url_getUploadUrl = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IAws.IGetPutObjectUrlOutput> =
    await api.functional.connector.aws.file.upload_url.getUploadUrl(
      connection,
      typia.random<IAws.IGetPutObjectUrlInput>(),
    );
  typia.assert(output);
};
