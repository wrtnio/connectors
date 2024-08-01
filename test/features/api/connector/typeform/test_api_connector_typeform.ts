import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_typeform = async (
  connection: CApi.IConnection,
) => {
  /**
   * Create Workspace
   */
  const workspace =
    await CApi.functional.connector.typeform.workspace.createWorkspace(
      connection,
      {
        name: "create-workspace-test",
        secretKey: ConnectorGlobal.env.TYPEFORM_TEST_SECRET,
      },
    );
  const workspaceId = workspace.id;

  /**
   * Get Workspaces
   */
  const workspaceListInfo =
    await CApi.functional.connector.typeform.get_workspaces.getWorkspaces(
      connection,
      {
        secretKey: ConnectorGlobal.env.TYPEFORM_TEST_SECRET,
      },
    );
  typia.assert(workspaceListInfo);

  /**
   * Create Empty form
   */
  const form =
    await CApi.functional.connector.typeform.empty_form.createEmptyForm(
      connection,
      {
        name: "create-empty-form-test",
        secretKey: ConnectorGlobal.env.TYPEFORM_TEST_SECRET,
      },
    );
  typia.assert(form);

  const formId = form.id;

  /**
   * Get Forms
   */
  const formsInfo = await CApi.functional.connector.typeform.get_forms.getForms(
    connection,
    {
      secretKey: ConnectorGlobal.env.TYPEFORM_TEST_SECRET,
    },
  );
  typia.assert(formsInfo);

  /**
   * Duplicate Existing Form
   */
  const duplicatedForm =
    await CApi.functional.connector.typeform.duplicate_form.duplicateExistingForm(
      connection,
      {
        workspaceLink: "https://api.typeform.com/workspaces/tUHBPc",
        formId: formsInfo[0].formId,
        name: "duplicate-form-test",
        secretKey: ConnectorGlobal.env.TYPEFORM_TEST_SECRET,
      },
    );
  typia.assert(duplicatedForm);

  const duplicatedFormId = duplicatedForm.id;

  /**
   * getPropertiesForUpdateFieldValue
   */
  const fields =
    await CApi.functional.connector.typeform.forms.get_update_form_fields.getFieldsForUpdateFieldValue(
      connection,
      {
        formId: formsInfo[0].formId,
        secretKey: ConnectorGlobal.env.TYPEFORM_TEST_SECRET,
      },
    );
  typia.assert(fields);
  const fieldId = fields[0].id;

  /**
   * Update Dropdown, Multiple Choice or Ranking Question Options in Typeform.
   */
  const updatedForm =
    await CApi.functional.connector.typeform.form_field_value_update.updateFormFieldValue(
      connection,
      {
        formId: formsInfo[0].formId,
        fieldId: fieldId,
        value: ["가", "나", "다", "라", "마"],
        secretKey: ConnectorGlobal.env.TYPEFORM_TEST_SECRET,
      },
    );
  typia.assert(updatedForm);

  /**
   * Delete Workspace
   */
  await CApi.functional.connector.typeform.workspace.deleteWorkspace(
    connection,
    {
      secretKey: ConnectorGlobal.env.TYPEFORM_TEST_SECRET,
    },
    workspaceId,
  );

  /**
   * Delete Create Form
   */
  await CApi.functional.connector.typeform.forms.deleteForm(
    connection,
    {
      secretKey: ConnectorGlobal.env.TYPEFORM_TEST_SECRET,
    },
    formId,
  );

  /**
   * Delete Duplicated Form
   */
  await CApi.functional.connector.typeform.forms.deleteForm(
    connection,
    {
      secretKey: ConnectorGlobal.env.TYPEFORM_TEST_SECRET,
    },
    duplicatedFormId,
  );
};
