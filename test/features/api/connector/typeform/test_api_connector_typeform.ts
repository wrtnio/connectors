import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

export const test_api_connector_typeform = async (connection: CApi.IConnection) => {
  /**
   * Create Workspace
   */
  const workspace = await CApi.functional.connector.typeform.workspace.createWorkspace(connection, {
    name: "create-workspace-test",
  });
  const workspaceId = workspace.data.id;

  /**
   * Get Workspaces
   */
  const workspaceListInfo = await CApi.functional.connector.typeform.get_workspaces.getWorkspaces(connection);
  typia.assert(workspaceListInfo);

  /**
   * Create Empty form
   */
  const form = await CApi.functional.connector.typeform.empty_form.createEmptyForm(connection, {
    name: "create-empty-form-test",
  });
  typia.assert(form);

  const formId = form.data.id;

  /**
   * Get Forms
   */
  const formsInfo = await CApi.functional.connector.typeform.get_forms.getForms(connection);
  typia.assert(formsInfo);

  /**
   * Duplicate Existing Form
   */
  const duplicatedForm = await CApi.functional.connector.typeform.duplicate_form.duplicateExistingForm(connection, {
    workspaceLink: "https://api.typeform.com/workspaces/tUHBPc",
    formId: "CpXFu4Y3",
    name: "duplicate-form-test",
  });
  typia.assert(duplicatedForm);

  const duplicatedFormId = duplicatedForm.data.id;

  /**
   * getPropertiesForUpdateFieldValue
   */
  const fields = await CApi.functional.connector.typeform.forms.fields.getFieldsForUpdateFieldValue(
    connection,
    "CpXFu4Y3",
  );
  typia.assert(fields);
  const fieldId = fields.data[0].id;

  /**
   * Update Dropdown, Multiple Choice or Ranking Question Options in Typeform.
   */
  const updatedForm = await CApi.functional.connector.typeform.forms.updateFormFieldValue(connection, "CpXFu4Y3", {
    fieldId: fieldId,
    value: ["가", "나", "다", "라", "마"],
  });
  typia.assert(updatedForm);

  /**
   * Delete Workspace
   */
  await CApi.functional.connector.typeform.workspace.deleteWorkspace(connection, workspaceId);

  /**
   * Delete Create Form
   */
  await CApi.functional.connector.typeform.forms.deleteForm(connection, formId);

  /**
   * Delete Duplicated Form
   */
  await CApi.functional.connector.typeform.forms.deleteForm(connection, duplicatedFormId);
};
