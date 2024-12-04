import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ISimilarweb } from "../../../../src/api/structures/connector/similarweb/ISimilarweb";

export const test_api_connector_similarweb_get_domain_info_getDomainInfo =
  async (connection: api.IConnection) => {
    const output: Primitive<ISimilarweb.IGetDomainInfoOutput> =
      await api.functional.connector.similarweb.get_domain_info.getDomainInfo(
        connection,
        typia.random<ISimilarweb.IGetDomainInfoInput>(),
      );
    typia.assert(output);
  };
