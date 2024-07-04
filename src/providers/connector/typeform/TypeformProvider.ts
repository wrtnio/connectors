import { HttpException, HttpStatus } from "@nestjs/common";
import axios from "axios";

import { ITypeform } from "@wrtn/connector-api/lib/structures/connector/typeform/ITypeform";

import { ConnectorGlobal } from "../../../ConnectorGlobal";

export namespace TypeformProvider {
  const apiKey = ConnectorGlobal.env.TYPEFORM_PERSONAL_ACCESS_KEY;
  const headers = () => ({
    Authorization: `Bearer ${apiKey}`,
  });

  export async function createWorkspace(
    input: ITypeform.ICreateWorkspaceInput,
  ): Promise<ITypeform.ICreateWorkspaceOutput> {
    const res = await axios.post(
      "https://api.typeform.com/workspaces",
      {
        name: input.name,
      },
      {
        headers: headers(),
      },
    );

    if (!res) {
      throw new HttpException("Failed to create Workspaces", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const workspace = res.data;
    const createdResult: ITypeform.ICreateWorkspaceOutput = {
      id: workspace.id,
      name: workspace.name,
      link: workspace.self.href,
    };
    return createdResult;
  }

  export async function getWorkspaces(): Promise<ITypeform.IFindWorkspaceOutput[]> {
    const res = await axios.get("https://api.typeform.com/workspaces", {
      headers: headers(),
    });
    if (!res) {
      throw new HttpException("Failed to get Workspaces", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const workspaceList = res.data.items;
    const workspaceListInfo: ITypeform.IFindWorkspaceOutput[] = [];

    for (const workspace of workspaceList) {
      const workspaceInfo: ITypeform.IFindWorkspaceOutput = {
        workspace_id: workspace.id,
        name: workspace.name,
        link: workspace.self.href,
      };
      workspaceListInfo.push(workspaceInfo);
    }

    return workspaceListInfo;
  }

  export async function createEmptyForm(input: ITypeform.ICreateEmptyFormInput): Promise<ITypeform.ICreateFormOutput> {
    const res = await axios.post(
      "https://api.typeform.com/forms",
      {
        title: input.name,
      },
      { headers: headers() },
    );

    if (!res) {
      throw new HttpException("Failed to create an empty form", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const result = res.data;

    const createEmptyFormResult: ITypeform.ICreateFormOutput = {
      id: result.id,
      name: result.title,
      type: result.type,
    };
    return createEmptyFormResult;
  }

  export async function getForms(): Promise<ITypeform.IFindFormOutput[]> {
    const res = await axios.get("https://api.typeform.com/forms", {
      headers: headers(),
    });

    if (!res) {
      throw new HttpException("Failed to get forms", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const formList = res.data.items;

    const formListInfo: ITypeform.IFindFormOutput[] = [];
    for (const form of formList) {
      const formInfo: ITypeform.IFindFormOutput = {
        formId: form.id,
        name: form.title,
      };
      formListInfo.push(formInfo);
    }
    return formListInfo;
  }

  export async function duplicateExistingForm(
    input: ITypeform.IDuplicateExistingFormInput,
  ): Promise<ITypeform.ICreateFormOutput> {
    const existingFormInfo = await getFormInfo(input.formId);

    if (!existingFormInfo) {
      throw new HttpException("Cannot find form", HttpStatus.NOT_FOUND);
    }
    const { settings, fields } = existingFormInfo;

    /**
     * id 필드 제거해야 함.
     * https://www.typeform.com/developers/create/walkthroughs/
     * Duplicates an existing form 참고
     */
    const fieldsWithoutId = fields.map(({ id, ...field }: ITypeform.IFormFieldOutput) => {
      const choices = field.properties.choices.map(({ id, ...choice }: ITypeform.IChoice) => choice);
      return {
        ...field,
        properties: {
          ...field.properties,
          choices,
        },
      };
    });

    const res = await axios.post(
      "https://api.typeform.com/forms",
      {
        workspace: {
          href: input.workspaceLink,
        },
        title: input.name,
        settings: settings,
        fields: fieldsWithoutId,
      },
      { headers: headers() },
    );

    if (!res) {
      throw new HttpException("Failed to duplicate form", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const result = res.data;
    const duplicatedFormInfo: ITypeform.ICreateFormOutput = {
      id: result.id,
      name: result.title,
      type: result.type,
    };

    return duplicatedFormInfo;
  }

  export async function getFieldsForUpdateFieldValue(
    formId: string,
  ): Promise<ITypeform.IFieldInfoForUpdateFieldValueOutput[]> {
    const formInfo = await getFormInfo(formId);

    if (!formInfo) {
      throw new HttpException("Cannot find Form", HttpStatus.NOT_FOUND);
    }

    /**
     * 랭킹, 드롭다운, 다중선택 필드만 제공
     */
    const fields: ITypeform.IFormFieldOutput[] = formInfo.fields.filter(
      (field: ITypeform.IFormFieldOutput) =>
        field.type === "ranking" || field.type === "dropdown" || field.type === "multiple_choice",
    );
    const fieldInfoList: ITypeform.IFieldInfoForUpdateFieldValueOutput[] = [];

    for (const field of fields) {
      const fieldInfo = {
        id: field.id,
        name: `${field.title}(${field.type})`,
      };
      fieldInfoList.push(fieldInfo);
    }

    return fieldInfoList;
  }

  export async function updateFormFieldValue(
    formId: string,
    input: ITypeform.IUpdateFormFieldValueInput,
  ): Promise<ITypeform.IUpdateFormFieldValueOutput> {
    const formInfo = await getFormInfo(formId);
    if (!formInfo) throw new HttpException("Cannot get form info", HttpStatus.NOT_FOUND);

    const updatedFormInfo = updateFormInfo(formInfo, input);
    const updatedForm = await updateForm(formId, updatedFormInfo);
    const fieldInfoList = getFieldInfoList(updatedForm.fields);

    const updatedFieldResult: ITypeform.IUpdateFormFieldValueOutput = {
      formId: updatedForm.id,
      name: updatedForm.title,
      fields: fieldInfoList,
    };

    return updatedFieldResult;
  }

  async function updateForm(formId: string, updatedFormInfo: any): Promise<ITypeform.IFormOutput> {
    const res = await axios.put(`https://api.typeform.com/forms/${formId}`, updatedFormInfo, { headers: headers() });

    if (!res) {
      throw new HttpException("Failed to Update field", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return res.data;
  }

  export async function deleteWorkspace(workspaceId: string): Promise<void> {
    await axios.delete(`https://api.typeform.com/workspaces/${workspaceId}`, {
      headers: headers(),
    });
  }

  export async function deleteForm(formId: string): Promise<void> {
    await axios.delete(`https://api.typeform.com/forms/${formId}`, {
      headers: headers(),
    });
  }

  async function getFormInfo(formId: string): Promise<ITypeform.IFormOutput> {
    const formInfo = await axios.get(`https://api.typeform.com/forms/${formId}`, { headers: headers() });
    return formInfo.data;
  }

  function updateFormInfo(formInfo: ITypeform.IFormOutput, input: ITypeform.IUpdateFormFieldValueInput) {
    return {
      ...formInfo,
      fields: formInfo.fields.map((field: ITypeform.IFormFieldOutput) => {
        if (field.id !== input.fieldId) return field;
        const updatedChoices = input.value.map((value: string) => ({
          label: value,
        }));
        return {
          ...field,
          properties: {
            ...field.properties,
            choices: updatedChoices,
          },
        };
      }),
    };
  }

  function getFieldInfoList(updatedFields: ITypeform.IFormFieldOutput[]) {
    const fieldInfoList: ITypeform.IFieldInformation[] = [];
    for (const field of updatedFields) {
      const labels: string[] = field.properties.choices.map((choice: ITypeform.IChoice) => choice.label);
      for (const label of labels) {
        const fieldInfo = {
          id: field.id,
          name: field.title,
          value: label,
        };
        fieldInfoList.push(fieldInfo);
      }
    }
    return fieldInfoList;
  }
}
