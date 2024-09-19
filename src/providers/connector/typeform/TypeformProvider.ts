import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import axios from "axios";

import { ITypeform } from "@wrtn/connector-api/lib/structures/connector/typeform/ITypeform";

import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { OAuthSecretProvider } from "../../internal/oauth_secret/OAuthSecretProvider";
import { IOAuthSecret } from "../../internal/oauth_secret/structures/IOAuthSecret";
import qs from "qs";
import typia, { tags } from "typia";

@Injectable()
export class TypeformProvider {
  async createWorkspace(
    input: ITypeform.ICreateWorkspaceInput,
  ): Promise<ITypeform.ICreateWorkspaceOutput> {
    try {
      const accessToken = await this.refresh(input);
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
      const workspace = res.data;
      const createdResult: ITypeform.ICreateWorkspaceOutput = {
        id: workspace.id,
        name: workspace.name,
        link: workspace.self.href,
      };
      return createdResult;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getWorkspaces(
    input: ITypeform.ISecret,
  ): Promise<ITypeform.IFindWorkspaceOutput[]> {
    try {
      const accessToken = await this.refresh(input);
      const res = await axios.get("https://api.typeform.com/workspaces", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

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
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async createEmptyForm(
    input: ITypeform.ICreateEmptyFormInput,
  ): Promise<ITypeform.ICreateFormOutput> {
    try {
      const accessToken = await this.refresh(input);
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

      const result = res.data;

      const createEmptyFormResult: ITypeform.ICreateFormOutput = {
        id: result.id,
        name: result.title,
        type: result.type,
      };
      return createEmptyFormResult;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getForms(
    input: ITypeform.ISecret,
  ): Promise<ITypeform.IFindFormOutput[]> {
    try {
      const accessToken = await this.refresh(input);
      const res = await axios.get("https://api.typeform.com/forms", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

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
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async duplicateExistingForm(
    input: ITypeform.IDuplicateExistingFormInput,
  ): Promise<ITypeform.ICreateFormOutput> {
    try {
      const existingFormInfo = await this.getFormInfo(input, input.formId);
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
      const result = res.data;
      const duplicatedFormInfo: ITypeform.ICreateFormOutput = {
        id: result.id,
        name: result.title,
        type: result.type,
      };

      return duplicatedFormInfo;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getFieldsForUpdateFieldValue(
    input: ITypeform.IGetFieldForUpdateFieldValueInput,
  ): Promise<ITypeform.IFieldInfoForUpdateFieldValueOutput[]> {
    try {
      const formInfo = await this.getFormInfo(input, input.formId);

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
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async updateFormFieldValue(
    input: ITypeform.IUpdateFormFieldValueInput,
  ): Promise<ITypeform.IUpdateFormFieldValueOutput> {
    try {
      const formInfo = await this.getFormInfo(input, input.formId);

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
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async updateForm(
    input: ITypeform.ISecret,
    formId: string,
    updatedFormInfo: any,
  ): Promise<ITypeform.IFormOutput> {
    try {
      const accessToken = await this.refresh(input);
      const res = await axios.put(
        `https://api.typeform.com/forms/${formId}`,
        updatedFormInfo,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async deleteWorkspace(
    input: ITypeform.ISecret,
    workspaceId: string,
  ): Promise<void> {
    try {
      const accessToken = await this.refresh(input);
      await axios.delete(`https://api.typeform.com/workspaces/${workspaceId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async deleteForm(input: ITypeform.ISecret, formId: string): Promise<void> {
    try {
      const accessToken = await this.refresh(input);
      await axios.delete(`https://api.typeform.com/forms/${formId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getFormInfo(
    secretKey: ITypeform.ISecret,
    formId?: string,
  ): Promise<ITypeform.IFormOutput> {
    try {
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
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
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

  private async refresh({ secretKey }: ITypeform.ISecret): Promise<string> {
    try {
      const secret = await OAuthSecretProvider.getSecretValue(secretKey);
      const refreshToken =
        typeof secret === "string"
          ? secret
          : (secret as IOAuthSecret.ISecretValue).value;
      const res = await axios.post(
        "https://api.typeform.com/oauth/token",
        qs.stringify({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
          client_id: ConnectorGlobal.env.TYPEFORM_CLIENT_ID,
          client_secret: ConnectorGlobal.env.TYPEFORM_CLIENT_SECRET,
          scope:
            "accounts:read forms:read forms:write images:read images:write responses:read responses:write themes:read themes:write workspaces:read workspaces:write",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      /**
       * Refresh Token이 일회용이므로 값 업데이트
       */
      if (typia.is<string & tags.Format<"uuid">>(secretKey)) {
        await OAuthSecretProvider.updateSecretValue(secretKey, {
          value: res.data.refresh_token,
        });
      }

      /**
       * 테스트 환경에서만 사용
       */
      if (process.env.NODE_ENV === "test") {
        await ConnectorGlobal.write({
          TYPEFORM_TEST_SECRET: res.data.refresh_token,
        });
      }

      return res.data.access_token;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }
}
