import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { Prerequisite, RouteIcon, Standalone } from "@wrtnio/decorators";

import { IGmail } from "@wrtn/connector-api/lib/structures/connector/gmail/IGmail";

import { GmailProvider } from "../../../providers/connector/gmail/GmailProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/gmail")
export class GmailController {
  constructor(private readonly gmailProvider: GmailProvider) {}
  /**
   * 메일을 전송합니다
   *
   * 지메일(gmail)은 Google에서 제공하는 무료 웹 기반 이메일 서비스입니다.
   *
   * 이 커넥터는 이메일 보내는 용도이며,
   * 단순 텍스트로 보낼 경우에는 문장이 한 줄로 길게 보여지기 때문에 줄바꿈 문자를 넣어주셔야 합니다.
   * 현재 형식은 content-type으로 `text/html; charset=utf-8`을 사용하고 있습니다.
   * 경우에 따라 html 형식을 사용할 수도 있습니다.
   *
   * @summary GMAIL 전송
   * @param input 메일을 보내기 위해 필요한 정보.
   * @returns 전송된 메일의 ID.
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleMail_full.svg",
  )
  @core.TypedRoute.Post("send")
  async send(
    @core.TypedBody() input: IGmail.ICreateMailInput,
  ): Promise<IGmail.ISendMailOutput> {
    return retry(() => this.gmailProvider.sendEmail(input))();
  }

  /**
   * 메일 초안을 생성 합니다
   *
   * 지메일(gmail)은 Google에서 제공하는 무료 웹 기반 이메일 서비스입니다.
   *
   * 이 커넥터는 이메일 보내는 용도이며,
   * 단순 텍스트로 보낼 경우에는 문장이 한 줄로 길게 보여지기 때문에 줄바꿈 문자를 넣어주셔야 합니다.
   * 현재 형식은 content-type으로 `text/html; charset=utf-8`을 사용하고 있습니다.
   * 경우에 따라 html 형식을 사용할 수도 있습니다.
   *
   * @summary GMAIL 초안 생성
   * @param input 메일 초안을 생성하기 위한 정보.
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleMail_full.svg",
  )
  @core.TypedRoute.Post("draft")
  async draft(@core.TypedBody() input: IGmail.ICreateMailInput): Promise<void> {
    return retry(() => this.gmailProvider.createDraft(input))();
  }

  /**
   * 수신된 메일에 답장을 보냅니다
   *
   * 지메일(gmail)은 Google에서 제공하는 무료 웹 기반 이메일 서비스입니다.
   *
   * 이 커넥터는 이메일 보내는 용도이며,
   * 단순 텍스트로 보낼 경우에는 문장이 한 줄로 길게 보여지기 때문에 줄바꿈 문자를 넣어주셔야 합니다.
   * 현재 형식은 content-type으로 `text/html; charset=utf-8`을 사용하고 있습니다.
   * 경우에 따라 html 형식을 사용할 수도 있습니다.
   *
   * @summary GMAIL 답장
   * @param input 메일 답장에 필요한 정보.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleMail_full.svg",
  )
  @core.TypedRoute.Post("reply/:id")
  async reply(
    /**
     * @title 답장할 메일
     * @description 답장할 메일을 선택해주세요.
     */
    @Prerequisite({
      neighbor: () => GmailController.prototype.findEmails,
      jmesPath: "data[].{value: id, label: subject || ''}",
    })
    @core.TypedParam("id")
    id: string,
    @core.TypedBody()
    input: IGmail.IReplyInput,
  ): Promise<void> {
    return retry(() => this.gmailProvider.reply(id, input))();
  }

  /**
   * 메일의 정보를 가져옵니다
   *
   * 지메일(gmail)은 Google에서 제공하는 무료 웹 기반 이메일 서비스입니다.
   *
   * @summary GMAIL 정보 가져오기
   * @param id 해당 메일의 고유 ID.
   * @returns 해당 메일의 정보.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleMail_full.svg",
  )
  @core.TypedRoute.Post("get/:id")
  async findEmail(
    /**
     * @title 가져올 메일
     * @description 가져올 메일을 선택해주세요.
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
   * 메일 리스트를 가져옵니다
   *
   * 지메일(gmail)은 Google에서 제공하는 무료 웹 기반 이메일 서비스입니다.
   *
   * @summary GMAIL 리스트 가져오기
   * @param input 메일 리스트를 가져오기 위한 정보.
   * @returns 메일 리스트.
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleMail_full.svg",
  )
  @core.TypedRoute.Post("read-list")
  async findEmails(
    @core.TypedBody() input: IGmail.IFindEmailListInput,
  ): Promise<IGmail.IFindGmailListOutput> {
    return retry(() => this.gmailProvider.findEmails(input))();
  }

  @core.TypedRoute.Delete(":id/hardDelete")
  async hardDelete(
    /**
     * @title 삭제할 메일
     * @description 삭제할 메일을 선택해주세요.
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
   * 메일을 삭제합니다
   *
   * 지메일(gmail)은 Google에서 제공하는 무료 웹 기반 이메일 서비스입니다.
   *
   * @summary GMAIL 삭제
   * @param id 삭제할 메일의 고유 ID.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleMail_full.svg",
  )
  @core.TypedRoute.Delete(":id")
  async removeMail(
    /**
     * @title 삭제할 메일
     * @description 삭제할 메일을 선택해주세요.
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
   * 라벨을 생성합니다
   *
   * 지메일(gmail)은 Google에서 제공하는 무료 웹 기반 이메일 서비스입니다.
   *
   * @summary GMAIL 라벨 생성
   * @param input 라벨 생성을 위한 정보.
   * @returns 생성된 라벨의 고유 ID.
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleMail_full.svg",
  )
  @core.TypedRoute.Post("label")
  async createLabel(
    @core.TypedBody() input: IGmail.ILabelInput,
  ): Promise<IGmail.ILabelOutput> {
    return retry(() => this.gmailProvider.createLabel(input))();
  }

  /**
   * 메일에 라벨을 부여합니다
   *
   * 지메일(gmail)은 Google에서 제공하는 무료 웹 기반 이메일 서비스입니다.
   *
   * @summary GMAIL 라벨 부여
   * @param mailId 라벨을 부여할 메일의 고유 ID.
   * @param input 부여할 라벨의 고유 ID 목록.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleMail_full.svg",
  )
  @core.TypedRoute.Post("label/:mailId")
  async addLabelToMail(
    /**
     * @title 라벨을 부여할 메일
     * @description 라벨을 부여할 메일을 선택해주세요.
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
   * 메일에 부여된 라벨을 제거합니다
   *
   * 지메일(gmail)은 Google에서 제공하는 무료 웹 기반 이메일 서비스입니다.
   *
   * @summary GMAIL 라벨 제거
   * @param mailId 라벨을 제거할 메일의 고유 ID.
   * @param input 제거할 라벨의 고유 ID 목록.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleMail_full.svg",
  )
  @core.TypedRoute.Delete("label/:mailId")
  async removeLabelFromMail(
    /**
     * @title 라벨을 제거할 메일
     * @description 라벨을 제거할 메일을 선택해주세요.
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
