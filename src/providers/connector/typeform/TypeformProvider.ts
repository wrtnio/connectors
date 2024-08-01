import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import axios from "axios";

import { ITypeform } from "@wrtn/connector-api/lib/structures/connector/typeform/ITypeform";

import { ConnectorGlobal } from "../../../ConnectorGlobal";

@Injectable()
export class TypeformProvider {
  async createWorkspace(
    input: ITypeform.ICreateWorkspaceInput,
  ): Promise<ITypeform.ICreateWorkspaceOutput> {
    const accessToken = await this.refresh(input.secretKey);
    const res = await axios.post(
      "https://api.typeform.com/workspaces",
      {
        name: input.name,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!res) {
      throw new HttpException(
        "Failed to create Workspaces",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const workspace = res.data;
    const createdResult: ITypeform.ICreateWorkspaceOutput = {
      id: workspace.id,
      name: workspace.name,
      link: workspace.self.href,
    };
    return createdResult;
  }

  async getWorkspaces(
    input: ITypeform.ISecret,
  ): Promise<ITypeform.IFindWorkspaceOutput[]> {
    const accessToken = await this.refresh(input.secretKey);
    const res = await axios.get("https://api.typeform.com/workspaces", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res) {
      throw new HttpException(
        "Failed to get Workspaces",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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

  async createEmptyForm(
    input: ITypeform.ICreateEmptyFormInput,
  ): Promise<ITypeform.ICreateFormOutput> {
    const accessToken = await this.refresh(input.secretKey);
    const res = await axios.post(
      "https://api.typeform.com/forms",
      {
        title: input.name,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!res) {
      throw new HttpException(
        "Failed to create an empty form",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const result = res.data;

    const createEmptyFormResult: ITypeform.ICreateFormOutput = {
      id: result.id,
      name: result.title,
      type: result.type,
    };
    return createEmptyFormResult;
  }

  async getForms(
    input: ITypeform.ISecret,
  ): Promise<ITypeform.IFindFormOutput[]> {
    const accessToken = await this.refresh(input.secretKey);
    const res = await axios.get("https://api.typeform.com/forms", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res) {
      throw new HttpException(
        "Failed to get forms",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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

  async duplicateExistingForm(
    input: ITypeform.IDuplicateExistingFormInput,
  ): Promise<ITypeform.ICreateFormOutput> {
    const existingFormInfo = await this.getFormInfo(
      input.secretKey,
      input.formId,
    );
    if (!existingFormInfo) {
      throw new HttpException("Cannot find form", HttpStatus.NOT_FOUND);
    }
    const { settings, fields } = existingFormInfo;

    /**
     * id 필드 제거해야 함.
     * https://www.typeform.com/developers/create/walkthroughs/
     * Duplicates an existing form 참고
     */
    const fieldsWithoutId = fields.map(
      ({ id, ...field }: ITypeform.IFormFieldOutput) => {
        const choices = field.properties.choices.map(
          ({ id, ...choice }: ITypeform.IChoice) => choice,
        );
        return {
          ...field,
          properties: {
            ...field.properties,
            choices,
          },
        };
      },
    );

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
      {
        headers: {
          Authorization: `Bearer ${input.secretKey}`,
        },
      },
    );

    if (!res) {
      throw new HttpException(
        "Failed to duplicate form",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const result = res.data;
    const duplicatedFormInfo: ITypeform.ICreateFormOutput = {
      id: result.id,
      name: result.title,
      type: result.type,
    };

    return duplicatedFormInfo;
  }

  async getFieldsForUpdateFieldValue(
    input: ITypeform.IGetFieldForUpdateFieldValueInput,
  ): Promise<ITypeform.IFieldInfoForUpdateFieldValueOutput[]> {
    const formInfo = await this.getFormInfo(input.secretKey, input.formId);

    if (!formInfo) {
      throw new HttpException("Cannot find Form", HttpStatus.NOT_FOUND);
    }

    /**
     * 랭킹, 드롭다운, 다중선택 필드만 제공
     */
    const fields: ITypeform.IFormFieldOutput[] = formInfo.fields.filter(
      (field: ITypeform.IFormFieldOutput) =>
        field.type === "ranking" ||
        field.type === "dropdown" ||
        field.type === "multiple_choice",
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

  async updateFormFieldValue(
    input: ITypeform.IUpdateFormFieldValueInput,
  ): Promise<ITypeform.IUpdateFormFieldValueOutput> {
    const formInfo = await this.getFormInfo(input.secretKey, input.formId);
    if (!formInfo)
      throw new HttpException("Cannot get form info", HttpStatus.NOT_FOUND);

    const updatedFormInfo = this.updateFormInfo(formInfo, input);
    const updatedForm = await this.updateForm(
      input,
      input.formId,
      updatedFormInfo,
    );
    const fieldInfoList = this.getFieldInfoList(updatedForm.fields);

    const updatedFieldResult: ITypeform.IUpdateFormFieldValueOutput = {
      formId: updatedForm.id,
      name: updatedForm.title,
      fields: fieldInfoList,
    };

    return updatedFieldResult;
  }

  async updateForm(
    input: ITypeform.ISecret,
    formId: string,
    updatedFormInfo: any,
  ): Promise<ITypeform.IFormOutput> {
    const accessToken = await this.refresh(input.secretKey);
    const res = await axios.put(
      `https://api.typeform.com/forms/${formId}`,
      updatedFormInfo,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!res) {
      throw new HttpException(
        "Failed to Update field",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return res.data;
  }

  async deleteWorkspace(
    input: ITypeform.ISecret,
    workspaceId: string,
  ): Promise<void> {
    const accessToken = await this.refresh(input.secretKey);
    await axios.delete(`https://api.typeform.com/workspaces/${workspaceId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async deleteForm(input: ITypeform.ISecret, formId: string): Promise<void> {
    const accessToken = await this.refresh(input.secretKey);
    await axios.delete(`https://api.typeform.com/forms/${formId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async getFormInfo(
    secretKey: string,
    formId?: string,
  ): Promise<ITypeform.IFormOutput> {
    const accessToken = await this.refresh(secretKey);
    const formInfo = await axios.get(
      `https://api.typeform.com/forms/${formId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return formInfo.data;
  }

  private updateFormInfo(
    formInfo: ITypeform.IFormOutput,
    input: ITypeform.IUpdateFormFieldValueInput,
  ) {
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

  private getFieldInfoList(updatedFields: ITypeform.IFormFieldOutput[]) {
    const fieldInfoList: ITypeform.IFieldInformation[] = [];
    for (const field of updatedFields) {
      const labels: string[] = field.properties.choices.map(
        (choice: ITypeform.IChoice) => choice.label,
      );
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

  private async refresh(refreshToken: string): Promise<string> {
    const res = await axios.post("https://api.typeform.com/oauth/token", {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: ConnectorGlobal.env.TYPEFORM_CLIENT_ID,
      client_secret: ConnectorGlobal.env.TYPEFORM_CLIENT_SECRET,
    });

    if (!res) {
      throw new HttpException(
        "Failed to refresh token",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return res.data.access_token;
  }
}
