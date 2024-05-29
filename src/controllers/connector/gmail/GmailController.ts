import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { ICommon } from "@wrtn/connector-api/lib/structures/connector/common/ISecretValue";
import { IGmail } from "@wrtn/connector-api/lib/structures/connector/gmail/IGmail";

import { GmailProvider } from "../../../providers/connector/gmail/GmailProvider";

@Controller("connector/gmail")
export class GmailController {
  constructor(private readonly gmailProvider: GmailProvider) {}
  /**
   * 메일을 전송합니다.
   *
   * @summary GMAIL 전송.
   *
   * @param input 메일을 보내기 위해 필요한 정보.
   *
   * @returns 전송된 메일의 ID.
   *
   * @tag Gmail
   *
   * @internal
   */
  @core.TypedRoute.Post("send")
  async send(
    @core.TypedBody() input: IGmail.ICreateMailInput,
  ): Promise<IGmail.ISendMailOutput> {
    return this.gmailProvider.sendEmail(input);
  }

  /**
   * 메일 초안을 생성 합니다.
   *
   * @summary GMAIL 초안 생성.
   *
   * @param input 메일 초안을 생성하기 위한 정보.
   *
   * @tag Gmail
   *
   * @internal
   */
  @core.TypedRoute.Post("draft")
  async draft(@core.TypedBody() input: IGmail.ICreateMailInput): Promise<void> {
    return this.gmailProvider.createDraft(input);
  }

  /**
   * 수신된 메일에 답장을 보냅니다.
   *
   * @summary GMAIL 답장.
   *
   * @param input 메일 답장에 필요한 정보.
   *
   * @tag Gmail
   *
   * @internal
   */
  @core.TypedRoute.Post("reply")
  async reply(@core.TypedBody() input: IGmail.IReplyInput): Promise<void> {
    return this.gmailProvider.reply(input);
  }

  /**
   * 메일의 정보를 가져옵니다.
   *
   * @summary GMAIL 정보 가져오기.
   *
   * @param id 해당 메일의 고유 ID.
   *
   * @returns 해당 메일의 정보.
   *
   * @tag Gmail
   *
   * @internal
   */
  @core.TypedRoute.Post("get/:id")
  async findEmail(
    @core.TypedParam("id") id: string,
    @core.TypedBody() input: ICommon.ISecret<"Google">,
  ): Promise<IGmail.IFindGmailOutput> {
    return this.gmailProvider.findEmail(id, input);
  }

  /**
   * 메일 리스트를 가져옵니다.
   *
   * @summary GMAIL 리스트 가져오기.
   *
   * @param input 메일 리스트를 가져오기 위한 정보.
   *
   * @returns 메일 리스트.
   *
   * @tag Gmail
   *
   * @internal
   */
  @core.TypedRoute.Post("read-list")
  async findEmails(
    @core.TypedBody() input: IGmail.IFindEmailListInput,
  ): Promise<IGmail.IFindGmailListOutput> {
    return this.gmailProvider.findEmails(input);
  }

  /**
   * 메일을 삭제합니다.
   *
   * @summary GMAIL 삭제.
   *
   * @param id 삭제할 메일의 고유 ID.
   *
   * @tag Gmail
   *
   * @internal
   */
  @core.TypedRoute.Delete(":id")
  async removeMail(
    @core.TypedParam("id") id: string,
    @core.TypedBody() input: ICommon.ISecret<"Google">,
  ): Promise<void> {
    return this.gmailProvider.removeEmail(id, input);
  }

  /**
   * 라벨을 생성합니다.
   *
   * @summary GMAIL 라벨 생성.
   *
   * @param input 라벨 생성을 위한 정보.
   *
   * @returns 생성된 라벨의 고유 ID.
   *
   * @tag Gmail
   *
   * @internal
   */
  @core.TypedRoute.Post("label")
  async createLabel(
    @core.TypedBody() input: IGmail.ILabelInput,
  ): Promise<IGmail.ILabelOutput> {
    return this.gmailProvider.createLabel(input);
  }

  /**
   * 메일에 라벨을 부여합니다.
   *
   * @summary GMAIL 라벨 부여.
   *
   * @param mailId 라벨을 부여할 메일의 고유 ID.
   *
   * @param input 부여할 라벨의 고유 ID 목록.
   *
   * @tag Gmail
   *
   * @internal
   */
  @core.TypedRoute.Post("label/:mailId")
  async addLabelToMail(
    @core.TypedParam("mailId") mailId: string,
    @core.TypedBody() input: IGmail.IMailLabelOperationInput,
  ): Promise<void> {
    return this.gmailProvider.addLabelToMail(mailId, input);
  }

  /**
   * 메일에 부여된 라벨을 제거합니다.
   *
   * @summary GMAIL 라벨 제거.
   *
   * @param mailId 라벨을 제거할 메일의 고유 ID.
   *
   * @param input 제거할 라벨의 고유 ID 목록.
   *
   * @tag Gmail
   *
   * @internal
   */
  @core.TypedRoute.Delete("label/:mailId")
  async removeLabelFromMail(
    @core.TypedParam("mailId") mailId: string,
    @core.TypedBody() input: IGmail.IMailLabelOperationInput,
  ): Promise<void> {
    return this.gmailProvider.removeLabelFromMail(mailId, input);
  }
}
