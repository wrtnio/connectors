import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IGoogleDocs } from "@wrtn/connector-api/lib/structures/connector/google_docs/IGoogleDocs";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_google_docs = async (
  connection: CApi.IConnection,
) => {
  /**
   * create a new Google Docs
   */
  const createGoogleDocsInput: IGoogleDocs.ICreateGoogleDocsInput = {
    title: "connector_test",
    secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
  };
  const createGoogleDocsOutput: IGoogleDocs.ICreateGoogleDocsOutput =
    await CApi.functional.connector.google_docs.createDocs(
      connection,
      createGoogleDocsInput,
    );
  typia.assert<IGoogleDocs.ICreateGoogleDocsOutput>(createGoogleDocsOutput);

  const docId = createGoogleDocsOutput.id;
  /**
   * Permission Google Docs
   */
  const permissionGoogleDocsInput: IGoogleDocs.IPermissionGoogleDocsInput = {
    secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
    documentId: docId,
    permissions: [
      {
        email: "jake@wrtn.io",
        role: "writer",
        type: "user",
      },
    ],
  };
  const permissionGoogleDocsOutput =
    await CApi.functional.connector.google_docs.permission(
      connection,
      permissionGoogleDocsInput,
    );
  typia.assert(permissionGoogleDocsOutput);

  /**
   * Append text to docs
   */
  const appendTextToDocsInput: IGoogleDocs.IAppendTextGoogleDocsInput = {
    secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
    documentId: docId,
    text: "Hello World",
  };
  const appendTextToDocsOutput =
    await CApi.functional.connector.google_docs.append(
      connection,
      appendTextToDocsInput,
    );
  typia.assert(appendTextToDocsOutput);

  /**
   * Read docs contents
   */
  const readDocsOutput =
    await CApi.functional.connector.google_docs.get.readDocs(
      connection,
      docId,
      {
        secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
      },
    );
  typia.assert<"Hello World\n">(readDocsOutput.data.text);
  typia.assert<IGoogleDocs.IReadGoogleDocsOutput>(readDocsOutput);

  /**
   * Create docs by template
   */
  const createDocByTemplateInput: IGoogleDocs.ICreateDocByTemplateInput = {
    title: "connector_test_2",
    templateId: docId,
    secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
  };
  const createDocByTemplateOutput =
    await CApi.functional.connector.google_docs.template.createDocByTemplate(
      connection,
      createDocByTemplateInput,
    );
  typia.assert<IGoogleDocs.ICreateDocByTemplateOutput>(
    createDocByTemplateOutput,
  );

  /**
   * Read docs list
   */
  const readDocsListOutput =
    await CApi.functional.connector.google_docs.get_list.list(connection, {
      secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
    });
  typia.assert<IGoogleDocs.IListGoogleDocsOutput>(readDocsListOutput);

  /**
   * Delete docs
   */
  const ids = [docId, createDocByTemplateOutput.id];
  for (const id of ids) {
    const res = await CApi.functional.connector.google_docs.deleteById(
      connection,
      id,
      {
        secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
      },
    );
    typia.assert(res);
  }
};
