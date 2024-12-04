import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ICrunchbase } from "../../../../src/api/structures/connector/crunchbase/ICrunchbase";

export const test_api_connector_crunchbase_get_organization_data_getOrganizationData =
  async (connection: api.IConnection) => {
    const output: Primitive<ICrunchbase.CrunchbaseResponse> =
      await api.functional.connector.crunchbase.get_organization_data.getOrganizationData(
        connection,
        typia.random<ICrunchbase.IGetOrganizationDataInput>(),
      );
    typia.assert(output);
  };
