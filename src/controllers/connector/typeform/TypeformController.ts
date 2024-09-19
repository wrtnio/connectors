import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { ITypeform } from "@wrtn/connector-api/lib/structures/connector/typeform/ITypeform";

import { TypeformProvider } from "../../../providers/connector/typeform/TypeformProvider";
import { retry } from "../../../utils/retry";
import { Prerequisite, RouteIcon } from "@wrtnio/decorators";

@Controller("connector/typeform")
export class TypeformController {
  constructor(private readonly typeformProvider: TypeformProvider) {}
  /**
   * Create a workspace.
   *
   * @summary Create a Typeform workspace.
   *
   * @param input Title of the workspace to create.
   *
   * @returns The created workspace ID, title, and URL.
   *
   * @tag Typeform
   * @tag Typeform
   * @tag Survey
   * @tag Online Form
   * @tag Questionnaire
   * @tag Customer Satisfaction Survey
   * @tag Survey Form
   * @tag Quiz
   * @tag Survey
   * @tag Check Response
   * @tag Response Management
   * @tag Respondent Management
   * @tag Survey Analysis
   * @tag Response Data
   * @tag Survey Template
   * @tag Survey Response
   * @tag Share Survey
   * @tag Survey Results
   * @tag Create Questionnaire
   * @tag Interview Request
   * @tag Response Collection
   * @tag Event
   * @tag Feedback
   * @tag User Survey
   * @tag Event Feedback
   * @tag Event Feedback
   * @tag Typeform
   * @tag Survey
   * @tag Online Form
   * @tag Questionnaire
   * @tag Customer Satisfaction Survey
   * @tag Survey Form
   * @tag Quiz
   * @tag Survey Responses
   * @tag Manage Responses
   * @tag Manage Respondents
   * @tag Survey Analysis
   * @tag Response Data
   * @tag Survey Template
   * @tag Survey Answers
   * @tag Share Survey
   * @tag Survey Results
   * @tag Create Questionnaire
   * @tag Interview Application
   * @tag Collect Responses @tag Event @tag Feedback @tag User Survey @tag Event Feedback
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/typeform.svg",
  )
  @core.TypedRoute.Post("/workspace")
  async createWorkspace(
    @core.TypedBody() input: ITypeform.ICreateWorkspaceInput,
  ): Promise<ITypeform.ICreateWorkspaceOutput> {
    return retry(() => this.typeformProvider.createWorkspace(input))();
  }

  /**
   * Delete a workspace.
   *
   * @summary Delete a Typeform workspace.
   *
   * @param workspaceId The workspace ID to delete.
   *
   * @tag Typeform
   * @tag Typeform
   * @tag Survey
   * @tag Online Form
   * @tag Questionnaire
   * @tag Customer Satisfaction Survey
   * @tag Survey Form
   * @tag Quiz
   * @tag Survey
   * @tag Check Response
   * @tag Response Management
   * @tag Respondent Management
   * @tag Survey Analysis
   * @tag Response Data
   * @tag Survey Template
   * @tag Survey Response
   * @tag Share Survey
   * @tag Survey Results
   * @tag Create Questionnaire
   * @tag Interview Request
   * @tag Response Collection
   * @tag Event
   * @tag Feedback
   * @tag User Survey
   * @tag Event Feedback
   * @tag Event Feedback
   * @tag Typeform
   * @tag Survey
   * @tag Online Form
   * @tag Questionnaire
   * @tag Customer Satisfaction Survey
   * @tag Survey Form
   * @tag Quiz
   * @tag Survey Responses
   * @tag Manage Responses
   * @tag Manage Respondents
   * @tag Survey Analysis
   * @tag Response Data
   * @tag Survey Template
   * @tag Survey Answers
   * @tag Share Survey
   * @tag Survey Results
   * @tag Create Questionnaire
   * @tag Interview Application
   * @tag Collect Responses @tag Event @tag Feedback @tag User Survey @tag Event Feedback
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/typeform.svg",
  )
  @core.TypedRoute.Delete("/workspace/:workspaceId")
  async deleteWorkspace(
    @core.TypedBody() input: ITypeform.ISecret,
    /**
     * @title Workspace to delete
     * @description Please select the workspace to delete.
     */
    @Prerequisite({
      neighbor: () => TypeformController.prototype.getWorkspaces,
      jmesPath: "[].{value:workspace_id, label:name || '워크스페이스 이름'}",
    })
    @core.TypedParam("workspaceId")
    workspaceId: string,
  ): Promise<void> {
    return retry(() =>
      this.typeformProvider.deleteWorkspace(input, workspaceId),
    )();
  }

  /**
   * Get workspace information.
   *
   * @summary Get Typeform workspace information.
   *
   * @returns Workspace ID, Title, URL.
   *
   * @tag Typeform
   * @tag Typeform
   * @tag Survey
   * @tag Online Form
   * @tag Questionnaire
   * @tag Customer Satisfaction Survey
   * @tag Survey Form
   * @tag Quiz
   * @tag Survey
   * @tag Check Response
   * @tag Response Management
   * @tag Respondent Management
   * @tag Survey Analysis
   * @tag Response Data
   * @tag Survey Template
   * @tag Survey Response
   * @tag Share Survey
   * @tag Survey Results
   * @tag Create Questionnaire
   * @tag Interview Request
   * @tag Response Collection
   * @tag Event
   * @tag Feedback
   * @tag User Survey
   * @tag Event Feedback
   * @tag Event Feedback
   * @tag Typeform
   * @tag Survey
   * @tag Online Form
   * @tag Questionnaire
   * @tag Customer Satisfaction Survey
   * @tag Survey Form
   * @tag Quiz
   * @tag Survey Responses
   * @tag Manage Responses
   * @tag Manage Respondents
   * @tag Survey Analysis
   * @tag Response Data
   * @tag Survey Template
   * @tag Survey Answers
   * @tag Share Survey
   * @tag Survey Results
   * @tag Create Questionnaire
   * @tag Interview Application
   * @tag Collect Responses @tag Event @tag Feedback @tag User Survey @tag Event Feedback
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/typeform.svg",
  )
  @core.TypedRoute.Post("/get-workspaces")
  async getWorkspaces(
    @core.TypedBody() input: ITypeform.ISecret,
  ): Promise<ITypeform.IFindWorkspaceOutput[]> {
    return retry(() => this.typeformProvider.getWorkspaces(input))();
  }

  /**
   * Create an empty form in the workspace.
   *
   * @summary Typeform Create an empty form.
   *
   * @param input The title of the form to be created.
   *
   * @returns The ID, title, and type of the generated form.
   *
   * @tag Typeform
   * @tag Typeform
   * @tag Survey
   * @tag Online Form
   * @tag Questionnaire
   * @tag Customer Satisfaction Survey
   * @tag Survey Form
   * @tag Quiz
   * @tag Survey
   * @tag Check Response
   * @tag Response Management
   * @tag Respondent Management
   * @tag Survey Analysis
   * @tag Response Data
   * @tag Survey Template
   * @tag Survey Response
   * @tag Share Survey
   * @tag Survey Results
   * @tag Create Questionnaire
   * @tag Interview Request
   * @tag Response Collection
   * @tag Event
   * @tag Feedback
   * @tag User Survey
   * @tag Event Feedback
   * @tag Event Feedback
   * @tag Typeform
   * @tag Survey
   * @tag Online Form
   * @tag Questionnaire
   * @tag Customer Satisfaction Survey
   * @tag Survey Form
   * @tag Quiz
   * @tag Survey Responses
   * @tag Manage Responses
   * @tag Manage Respondents
   * @tag Survey Analysis
   * @tag Response Data
   * @tag Survey Template
   * @tag Survey Answers
   * @tag Share Survey
   * @tag Survey Results
   * @tag Create Questionnaire
   * @tag Interview Application
   * @tag Collect Responses @tag Event @tag Feedback @tag User Survey @tag Event Feedback
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/typeform.svg",
  )
  @core.TypedRoute.Post("/empty-form")
  async createEmptyForm(
    @core.TypedBody() input: ITypeform.ICreateEmptyFormInput,
  ): Promise<ITypeform.ICreateFormOutput> {
    return retry(() => this.typeformProvider.createEmptyForm(input))();
  }

  /**
   * Get a list of forms that exist in the workspace.
   *
   * @summary Get a list of Typeform forms.
   *
   * @returns form ID, title.
   *
   * @tag Typeform
   * @tag Typeform
   * @tag Survey
   * @tag Online Form
   * @tag Questionnaire
   * @tag Customer Satisfaction Survey
   * @tag Survey Form
   * @tag Quiz
   * @tag Survey
   * @tag Check Response
   * @tag Response Management
   * @tag Respondent Management
   * @tag Survey Analysis
   * @tag Response Data
   * @tag Survey Template
   * @tag Survey Response
   * @tag Share Survey
   * @tag Survey Results
   * @tag Create Questionnaire
   * @tag Interview Request
   * @tag Response Collection
   * @tag Event
   * @tag Feedback
   * @tag User Survey
   * @tag Event Feedback
   * @tag Event Feedback
   * @tag Typeform
   * @tag Survey
   * @tag Online Form
   * @tag Questionnaire
   * @tag Customer Satisfaction Survey
   * @tag Survey Form
   * @tag Quiz
   * @tag Survey Responses
   * @tag Manage Responses
   * @tag Manage Respondents
   * @tag Survey Analysis
   * @tag Response Data
   * @tag Survey Template
   * @tag Survey Answers
   * @tag Share Survey
   * @tag Survey Results
   * @tag Create Questionnaire
   * @tag Interview Application
   * @tag Collect Responses @tag Event @tag Feedback @tag User Survey @tag Event Feedback
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/typeform.svg",
  )
  @core.TypedRoute.Post("/get-forms")
  async getForms(
    @core.TypedBody() input: ITypeform.ISecret,
  ): Promise<ITypeform.IFindFormOutput[]> {
    return retry(() => this.typeformProvider.getForms(input))();
  }

  /**
   * Copy a form that exists in the workspace.
   *
   * @summary Copy a Typeform form.
   *
   * @param input The name of the form to copy and create.
   *
   * @returns The generated form ID, title, and type.
   *
   * @tag Typeform
   * @tag Typeform
   * @tag Survey
   * @tag Online Form
   * @tag Questionnaire
   * @tag Customer Satisfaction Survey
   * @tag Survey Form
   * @tag Quiz
   * @tag Survey
   * @tag Check Response
   * @tag Response Management
   * @tag Respondent Management
   * @tag Survey Analysis
   * @tag Response Data
   * @tag Survey Template
   * @tag Survey Response
   * @tag Share Survey
   * @tag Survey Results
   * @tag Create Questionnaire
   * @tag Interview Request
   * @tag Response Collection
   * @tag Event
   * @tag Feedback
   * @tag User Survey
   * @tag Event Feedback
   * @tag Event Feedback
   * @tag Typeform
   * @tag Survey
   * @tag Online Form
   * @tag Questionnaire
   * @tag Customer Satisfaction Survey
   * @tag Survey Form
   * @tag Quiz
   * @tag Survey Responses
   * @tag Manage Responses
   * @tag Manage Respondents
   * @tag Survey Analysis
   * @tag Response Data
   * @tag Survey Template
   * @tag Survey Answers
   * @tag Share Survey
   * @tag Survey Results
   * @tag Create Questionnaire
   * @tag Interview Application
   * @tag Collect Responses @tag Event @tag Feedback @tag User Survey @tag Event Feedback
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/typeform.svg",
  )
  @core.TypedRoute.Post("/duplicate-form")
  async duplicateExistingForm(
    @core.TypedBody() input: ITypeform.IDuplicateExistingFormInput,
  ): Promise<ITypeform.ICreateFormOutput> {
    return retry(() => this.typeformProvider.duplicateExistingForm(input))();
  }

  /**
   * Get the field information of the form to update the options of the ranking, dropdown, and multiple choice questions.
   *
   * @summary Get the field information of the form to update Typeform.
   *
   * @returns The field ID and field name of the form.
   *
   * @tag Typeform
   * @tag Typeform
   * @tag Survey
   * @tag Online Form
   * @tag Questionnaire
   * @tag Customer Satisfaction Survey
   * @tag Survey Form
   * @tag Quiz
   * @tag Survey
   * @tag Check Response
   * @tag Response Management
   * @tag Respondent Management
   * @tag Survey Analysis
   * @tag Response Data
   * @tag Survey Template
   * @tag Survey Response
   * @tag Share Survey
   * @tag Survey Results
   * @tag Create Questionnaire
   * @tag Interview Request
   * @tag Response Collection
   * @tag Event
   * @tag Feedback
   * @tag User Survey
   * @tag Event Feedback
   * @tag Event Feedback
   * @tag Typeform
   * @tag Survey
   * @tag Online Form
   * @tag Questionnaire
   * @tag Customer Satisfaction Survey
   * @tag Survey Form
   * @tag Quiz
   * @tag Survey Responses
   * @tag Manage Responses
   * @tag Manage Respondents
   * @tag Survey Analysis
   * @tag Response Data
   * @tag Survey Template
   * @tag Survey Answers
   * @tag Share Survey
   * @tag Survey Results
   * @tag Create Questionnaire
   * @tag Interview Application
   * @tag Collect Responses @tag Event @tag Feedback @tag User Survey @tag Event Feedback
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/typeform.svg",
  )
  @core.TypedRoute.Post("/forms/get-update-form-fields")
  async getFieldsForUpdateFieldValue(
    @core.TypedBody() input: ITypeform.IGetFieldForUpdateFieldValueInput,
  ): Promise<ITypeform.IFieldInfoForUpdateFieldValueOutput[]> {
    return retry(() =>
      this.typeformProvider.getFieldsForUpdateFieldValue(input),
    )();
  }

  /**
   * Updates options for ranking, dropdown, and multiple choice questions.
   *
   * @summary Updates Typeform form field options.
   *
   * @param input The name of the form field to update and the value to update.
   *
   * @tag Typeform
   * @tag Typeform
   * @tag Survey
   * @tag Online Form
   * @tag Questionnaire
   * @tag Customer Satisfaction Survey
   * @tag Survey Form
   * @tag Quiz
   * @tag Survey
   * @tag Check Response
   * @tag Response Management
   * @tag Respondent Management
   * @tag Survey Analysis
   * @tag Response Data
   * @tag Survey Template
   * @tag Survey Response
   * @tag Share Survey
   * @tag Survey Results
   * @tag Create Questionnaire
   * @tag Interview Request
   * @tag Response Collection
   * @tag Event
   * @tag Feedback
   * @tag User Survey
   * @tag Event Feedback
   * @tag Event Feedback
   * @tag Typeform
   * @tag Survey
   * @tag Online Form
   * @tag Questionnaire
   * @tag Customer Satisfaction Survey
   * @tag Survey Form
   * @tag Quiz
   * @tag Survey Responses
   * @tag Manage Responses
   * @tag Manage Respondents
   * @tag Survey Analysis
   * @tag Response Data
   * @tag Survey Template
   * @tag Survey Answers
   * @tag Share Survey
   * @tag Survey Results
   * @tag Create Questionnaire
   * @tag Interview Application
   * @tag Collect Responses @tag Event @tag Feedback @tag User Survey @tag Event Feedback
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/typeform.svg",
  )
  @core.TypedRoute.Post("/form-field-value-update")
  async updateFormFieldValue(
    @core.TypedBody() input: ITypeform.IUpdateFormFieldValueInput,
  ): Promise<ITypeform.IUpdateFormFieldValueOutput> {
    return retry(() => this.typeformProvider.updateFormFieldValue(input))();
  }

  /**
   * Delete a form.
   *
   * @summary Delete a typeform form.
   *
   * @param formId The ID of the form to delete.
   *
   * @tag Typeform
   * @tag Typeform
   * @tag Survey
   * @tag Online Form
   * @tag Questionnaire
   * @tag Customer Satisfaction Survey
   * @tag Survey Form
   * @tag Quiz
   * @tag Survey
   * @tag Check Response
   * @tag Response Management
   * @tag Respondent Management
   * @tag Survey Analysis
   * @tag Response Data
   * @tag Survey Template
   * @tag Survey Response
   * @tag Share Survey
   * @tag Survey Results
   * @tag Create Questionnaire
   * @tag Interview Request
   * @tag Response Collection
   * @tag Event
   * @tag Feedback
   * @tag User Survey
   * @tag Event Feedback
   * @tag Event Feedback
   * @tag Typeform
   * @tag Survey
   * @tag Online Form
   * @tag Questionnaire
   * @tag Customer Satisfaction Survey
   * @tag Survey Form
   * @tag Quiz
   * @tag Survey Responses
   * @tag Manage Responses
   * @tag Manage Respondents
   * @tag Survey Analysis
   * @tag Response Data
   * @tag Survey Template
   * @tag Survey Answers
   * @tag Share Survey
   * @tag Survey Results
   * @tag Create Questionnaire
   * @tag Interview Application
   * @tag Collect Responses @tag Event @tag Feedback @tag User Survey @tag Event Feedback
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/typeform.svg",
  )
  @core.TypedRoute.Delete("/forms/:formId")
  async deleteForm(
    @core.TypedBody() input: ITypeform.ISecret,
    /**
     * @title Form to delete
     * @description Please select the form to delete.
     */
    @Prerequisite({
      neighbor: () => TypeformController.prototype.getForms,
      jmesPath: "[].{value:formId, label:name || '폼 이름'}",
    })
    @core.TypedParam("formId")
    formId: string,
  ): Promise<void> {
    return retry(() => this.typeformProvider.deleteForm(input, formId))();
  }
}
