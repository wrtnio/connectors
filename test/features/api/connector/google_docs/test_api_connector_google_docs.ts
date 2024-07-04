import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IGoogleDocs } from "@wrtn/connector-api/lib/structures/connector/google_docs/IGoogleDocs";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { Try } from "../../../../../src/utils/createResponseForm";

export const test_api_connector_google_docs = async (connection: CApi.IConnection) => {
  /**
   * create a new Google Docs
   */
  const createGoogleDocsInput: IGoogleDocs.ICreateGoogleDocsInput = {
    title: "connector_test",
    secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
  };
  const createGoogleDocsOutput: Try<IGoogleDocs.ICreateGoogleDocsOutput> =
    await CApi.functional.connector.google_docs.createDocs(connection, createGoogleDocsInput);
  typia.assertEquals(createGoogleDocsOutput);

  const docId = createGoogleDocsOutput.data.id;
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
  const permissionGoogleDocsOutput = await CApi.functional.connector.google_docs.permission(
    connection,
    permissionGoogleDocsInput,
  );
  typia.assertEquals(permissionGoogleDocsOutput);

  /**
   * Append text to docs
   */
  const appendTextToDocsInput: IGoogleDocs.IAppendTextGoogleDocsInput = {
    secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
    documentId: docId,
    text: "Hello World",
  };
  const appendTextToDocsOutput = await CApi.functional.connector.google_docs.append(connection, appendTextToDocsInput);
  typia.assertEquals(appendTextToDocsOutput);

  /**
   * Read docs contents
   */
  const readDocsOutput = await CApi.functional.connector.google_docs.get.readDocs(connection, docId, {
    secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
  });
  typia.assertEquals(readDocsOutput);
  typia.assertEquals<"Hello World\n">(readDocsOutput.data.data.text);

  /**
   * Create docs by template
   */
  const createDocByTemplateInput: IGoogleDocs.ICreateDocByTemplateInput = {
    title: "connector_test_2",
    templateId: docId,
    secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
  };
  const createDocByTemplateOutput = await CApi.functional.connector.google_docs.template.createDocByTemplate(
    connection,
    createDocByTemplateInput,
  );
  typia.assertEquals(createDocByTemplateOutput);

  /**
   * Read docs list
   */
  const readDocsListOutput = await CApi.functional.connector.google_docs.get_list.list(connection, {
    secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
  });
  typia.assertEquals(readDocsListOutput);

  /**
   * Delete docs
   */
  const ids = [docId, createDocByTemplateOutput.data.id];
  for (const id of ids) {
    const res = await CApi.functional.connector.google_docs.deleteById(connection, id, {
      secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
    });
    typia.assertEquals(res);
  }
};
