import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { Prerequisite, RouteIcon, Standalone } from "@wrtnio/decorators";

import { IGmail } from "@wrtn/connector-api/lib/structures/connector/gmail/IGmail";

import { ApiTags } from "@nestjs/swagger";
import { GmailProvider } from "../../../providers/connector/gmail/GmailProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/gmail")
export class GmailController {
  constructor(private readonly gmailProvider: GmailProvider) {}
  /**
   * Sending mail
   *
   * Gmail is a free web-based email service provided by Google.
   *
   * This connector is for sending emails,
   * and if you send it as simple text, the sentences will be displayed as one long line, so you need to insert a line break character.
   * The current format uses `text/html; charset=utf-8` as content-type.
   * In some cases, you can use the HTML format.
   *
   * If you want to attach a file, you must specify the name of the file and the address at which it is stored.
   * The saved file is read as a GET request inside the function, encoded, and processed.
   *
   * @summary GMAIL Send
   * @param input Information needed to send an email.
   * @returns ID of the sent email.
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleMail_full.svg",
  )
  @ApiTags("Gmail")
  @core.TypedRoute.Post("send")
  async send(
    @core.TypedBody() input: IGmail.ICreateMailInput,
  ): Promise<IGmail.ISendMailOutput> {
    return retry(() => this.gmailProvider.sendEmail(input))();
  }

  /**
   * Create a mail draft
   *
   * Gmail is a free web-based email service provided by Google.
   *
   * This connector is for sending emails,
   * and if you send it as simple text, the sentences will be displayed as one long line, so you need to insert a line break character.
   * The current format uses `text/html; charset=utf-8` as content-type.
   * In some cases, you can use the html format.
   *
   * If you want to attach a file, you must specify the name of the file and the address at which it is stored.
   * The saved file is read as a GET request inside the function, encoded, and processed.
   *
   * @summary Create GMAIL Draft
   * @param input Information for creating a mail draft.
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleMail_full.svg",
  )
  @ApiTags("Gmail")
  @core.TypedRoute.Post("draft")
  async draft(@core.TypedBody() input: IGmail.ICreateMailInput): Promise<void> {
    return retry(() => this.gmailProvider.createDraft(input))();
  }

  /**
   * Reply to received email
   *
   * Gmail is a free web-based email service provided by Google.
   *
   * This connector is for sending emails,
   * and if you send it as simple text, the sentences will be displayed as one long line, so you need to insert a line break character.
   * The current format uses `text/html; charset=utf-8` as content-type.
   * In some cases, you can also use the HTML format.
   *
   * @summary GMAIL Reply
   * @param input Information required for replying to emails.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleMail_full.svg",
  )
  @ApiTags("Gmail")
  @core.TypedRoute.Post("reply/:id")
  async reply(
    /**
     * @title Email to reply to
     * @description Please select an email to reply to.
     */
    @Prerequisite({
      neighbor: () => GmailController.prototype.findEmails,
      jmesPath: "data[].{value: id, label: subject || ''}",
    })
    @core.TypedParam("id")
    id: string,
    @core.TypedBody()
    input: IGmail.IReplyInput,
  ): Promise<IGmail.ISendMailOutput> {
    return retry(() => this.gmailProvider.reply(id, input))();
  }

  /**
   * Get information about a mail
   *
   * Gmail is a free web-based email service provided by Google.
   *
   * @summary Get GMAIL information
   * @param id Unique ID of the email.
   * @returns Information about the email.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleMail_full.svg",
  )
  @ApiTags("Gmail")
  @core.TypedRoute.Post("get/:id")
  async findEmail(
    /**
     * @title Email to retrieve
     * @description Please select the email to retrieve
     */
    @Prerequisite({
      neighbor: () => GmailController.prototype.findEmails,
      jmesPath: "data[].{value: id, label: subject || ''}",
    })
    @core.TypedParam("id")
    id: string,
    @core.TypedBody()
    input: IGmail.ISecret,
  ): Promise<IGmail.IFindGmailOutput> {
    return retry(() => this.gmailProvider.findEmail(id, input))();
  }

  /**
   * Get mailing list
   *
   * Gmail is a free web-based email service provided by Google.
   *
   * @summary Get GMAIL list
   * @param input Information for getting mailing list
   * @returns Mailing list
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleMail_full.svg",
  )
  @ApiTags("Gmail")
  @core.TypedRoute.Post("read-list")
  async findEmails(
    @core.TypedBody() input: IGmail.IFindEmailListInput,
  ): Promise<IGmail.IFindGmailListOutput> {
    return retry(() => this.gmailProvider.findEmails(input))();
  }

  /**
   * Delete mail
   *
   * Gmail is a free web-based email service provided by Google.
   *
   * This function requires special attention because it permanently deletes mail instead of moving it to the trash.
   *
   * Most users will want to delete mail that is already in the trash.
   *
   * Therefore, if the user wants to delete it, it is better to guide them to move the mail to the trash, but if they still want to delete it, it is right to target the trash.
   *
   * @summary Delete mail
   * @param id
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleMail_full.svg",
  )
  @ApiTags("Gmail")
  @core.TypedRoute.Delete(":id/hardDelete")
  async hardDelete(
    /**
     * @title Email to delete
     * @description Please select the email to delete.
     */
    @Prerequisite({
      neighbor: () => GmailController.prototype.findEmails,
      jmesPath: "data[].{value: id, label: subject || ''}",
    })
    @core.TypedParam("id")
    id: string,
    @core.TypedBody()
    input: IGmail.ISecret,
  ): Promise<void> {
    return retry(() => this.gmailProvider.hardDelete(id, input))();
  }

  /**
   * Move mail to trash
   *
   * Gmail is a free web-based email service provided by Google.
   *
   * @summary Delete GMAIL
   * @param id The unique ID of the email to be deleted
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleMail_full.svg",
  )
  @ApiTags("Gmail")
  @core.TypedRoute.Delete(":id")
  async removeMail(
    /**
     * @title Email to delete
     * @description Please select the email to delete.
     */
    @Prerequisite({
      neighbor: () => GmailController.prototype.findEmails,
      jmesPath: "data[].{value: id, label: subject || ''}",
    })
    @core.TypedParam("id")
    id: string,
    @core.TypedBody()
    input: IGmail.ISecret,
  ): Promise<void> {
    return retry(() => this.gmailProvider.removeEmail(id, input))();
  }

  /**
   * Create a label
   *
   * Gmail is a free web-based email service provided by Google.
   *
   * @summary Create GMAIL label
   * @param input Information for creating a label
   * @returns Unique ID of the created label
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleMail_full.svg",
  )
  @ApiTags("Gmail")
  @core.TypedRoute.Post("label")
  async createLabel(
    @core.TypedBody() input: IGmail.ILabelInput,
  ): Promise<IGmail.ILabelOutput> {
    return retry(() => this.gmailProvider.createLabel(input))();
  }

  /**
   * Assign a label to a mail
   *
   * Gmail is a free web-based email service provided by Google.
   *
   * @summary GMAIL Label Assignment
   * @param mailId Unique ID of the mail to assign a label to
   * @param input A list of unique IDs of labels to assign
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleMail_full.svg",
  )
  @ApiTags("Gmail")
  @core.TypedRoute.Post("label/:mailId")
  async addLabelToMail(
    /**
     * @title Select the email to which you want to assign the label
     * @description Select the email to which you want to assign the label
     */
    @Prerequisite({
      neighbor: () => GmailController.prototype.findEmails,
      jmesPath: "data[].{value: id, label: subject || ''}",
    })
    @core.TypedParam("mailId")
    mailId: string,
    @core.TypedBody() input: IGmail.IMailLabelOperationInput,
  ): Promise<void> {
    return retry(() => this.gmailProvider.addLabelToMail(mailId, input))();
  }

  /**
   * Remove labels assigned to mail
   *
   * Gmail is a free web-based email service provided by Google.
   *
   * @summary Remove GMAIL labels
   * @param mailId Unique ID of the mail from which to remove labels.
   * @param input A list of unique IDs of labels to remove.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleMail_full.svg",
  )
  @ApiTags("Gmail")
  @core.TypedRoute.Delete("label/:mailId")
  async removeLabelFromMail(
    /**
     * @title Select the email from which you want to remove the label
     * @description Select the email from which you want to remove the label
     */
    @Prerequisite({
      neighbor: () => GmailController.prototype.findEmails,
      jmesPath: "data[].{value: id, label: subject || ''}",
    })
    @core.TypedParam("mailId")
    mailId: string,
    @core.TypedBody() input: IGmail.IMailLabelOperationInput,
  ): Promise<void> {
    return retry(() => this.gmailProvider.removeLabelFromMail(mailId, input))();
  }
}
