import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { ICrunchbase } from "../../../../src/api/structures/connector/crunchbase/ICrunchbase";

export const test_api_connector_crunchbase_auto_complete_autocomplete = async (
  connection: api.IConnection,
) => {
  const output: Primitive<ICrunchbase.IAutocompleteOutput> =
    await api.functional.connector.crunchbase.auto_complete.autocomplete(
      connection,
      typia.random<ICrunchbase.IAutocompleteInput>(),
    );
  typia.assert(output);
};
