import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IGoogleDocs } from "../../../../src/api/structures/connector/google_docs/IGoogleDocs";

export const test_api_connector_google_docs_template_createDocByTemplate =
  async (connection: api.IConnection) => {
    const output: Primitive<IGoogleDocs.ICreateDocByTemplateOutput> =
      await api.functional.connector.google_docs.template.createDocByTemplate(
        connection,
        typia.random<IGoogleDocs.ICreateDocByTemplateInput>(),
      );
    typia.assert(output);
  };
