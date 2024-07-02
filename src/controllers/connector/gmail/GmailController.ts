import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { Prerequisite, Standalone } from "@wrtn/decorators";
import { RouteIcon } from "@wrtn/decorators";

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
   * @tag 지메일
   * @tag 이메일
   * @tag 메일
   * @tag 이메일 보내기
   * @tag 이메일 확인
   * @tag 메일 관리
   * @tag 스팸 메일 관리
   * @tag 이메일 검색
   * @tag 첨부파일
   * @tag 필터 설정
   * @tag 이메일 관리
   * @tag 이메일 알림
   * @tag 자동 회신
   * @tag 답장
   * @tag 이메일 아카이브
   * @tag 이메일 스레드
   * @tag 중요 표시
   * @tag 이메일 삭제
   * @tag 구글 메일
   * @tag 이메일 주소
   * @tag 메일함 용량
   * @tag 메일 전송 예약
   * @tag 메일 읽음 확인
   * @tag 중요 메일 표시
   * @tag 일정 예약
   * @tag 비즈니스 이메일
   * @tag Gmail
   * @tag Email
   * @tag Mail
   * @tag Send Email
   * @tag Check Email
   * @tag Manage Mail
   * @tag Manage Spam Mail
   * @tag Search Email
   * @tag Attachment
   * @tag Set Filter
   * @tag Manage Email
   * @tag Email Notification
   * @tag Auto Reply
   * @tag Reply
   * @tag Archive Email
   * @tag Email Thread
   * @tag Mark as Important
   * @tag Delete Email
   * @tag Google Mail
   * @tag Email Address
   * @tag Mailbox Storage
   * @tag Schedule Email Sending
   * @tag Email Read Receipt
   * @tag Mark Important Emails
   * @tag Schedule Appointments
   * @tag Business Email
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/gmail.svg",
  )
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
   * @tag 지메일
   * @tag 이메일
   * @tag 메일
   * @tag 이메일 보내기
   * @tag 이메일 확인
   * @tag 메일 관리
   * @tag 스팸 메일 관리
   * @tag 이메일 검색
   * @tag 첨부파일
   * @tag 필터 설정
   * @tag 이메일 관리
   * @tag 이메일 알림
   * @tag 자동 회신
   * @tag 답장
   * @tag 이메일 아카이브
   * @tag 이메일 스레드
   * @tag 중요 표시
   * @tag 이메일 삭제
   * @tag 구글 메일
   * @tag 이메일 주소
   * @tag 메일함 용량
   * @tag 메일 전송 예약
   * @tag 메일 읽음 확인
   * @tag 중요 메일 표시
   * @tag 일정 예약
   * @tag 비즈니스 이메일
   * @tag Gmail
   * @tag Email
   * @tag Mail
   * @tag Send Email
   * @tag Check Email
   * @tag Manage Mail
   * @tag Manage Spam Mail
   * @tag Search Email
   * @tag Attachment
   * @tag Set Filter
   * @tag Manage Email
   * @tag Email Notification
   * @tag Auto Reply
   * @tag Reply
   * @tag Archive Email
   * @tag Email Thread
   * @tag Mark as Important
   * @tag Delete Email
   * @tag Google Mail
   * @tag Email Address
   * @tag Mailbox Storage
   * @tag Schedule Email Sending
   * @tag Email Read Receipt
   * @tag Mark Important Emails
   * @tag Schedule Appointments
   * @tag Business Email
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/gmail.svg",
  )
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
   * @tag 지메일
   * @tag 이메일
   * @tag 메일
   * @tag 이메일 보내기
   * @tag 이메일 확인
   * @tag 메일 관리
   * @tag 스팸 메일 관리
   * @tag 이메일 검색
   * @tag 첨부파일
   * @tag 필터 설정
   * @tag 이메일 관리
   * @tag 이메일 알림
   * @tag 자동 회신
   * @tag 답장
   * @tag 이메일 아카이브
   * @tag 이메일 스레드
   * @tag 중요 표시
   * @tag 이메일 삭제
   * @tag 구글 메일
   * @tag 이메일 주소
   * @tag 메일함 용량
   * @tag 메일 전송 예약
   * @tag 메일 읽음 확인
   * @tag 중요 메일 표시
   * @tag 일정 예약
   * @tag 비즈니스 이메일
   * @tag Gmail
   * @tag Email
   * @tag Mail
   * @tag Send Email
   * @tag Check Email
   * @tag Manage Mail
   * @tag Manage Spam Mail
   * @tag Search Email
   * @tag Attachment
   * @tag Set Filter
   * @tag Manage Email
   * @tag Email Notification
   * @tag Auto Reply
   * @tag Reply
   * @tag Archive Email
   * @tag Email Thread
   * @tag Mark as Important
   * @tag Delete Email
   * @tag Google Mail
   * @tag Email Address
   * @tag Mailbox Storage
   * @tag Schedule Email Sending
   * @tag Email Read Receipt
   * @tag Mark Important Emails
   * @tag Schedule Appointments
   * @tag Business Email
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/gmail.svg",
  )
  @core.TypedRoute.Post("reply/:id")
  async reply(
    @Prerequisite({
      neighbor: () => GmailController.prototype.findEmails,
      array: (response): IGmail.IFindGmailOutput[] => response.data,
      value: (elem) => elem.id,
      label: (elem) => elem.subject ?? "",
    })
    @core.TypedParam("id")
    id: string,
    @core.TypedBody()
    input: IGmail.IReplyInput,
  ): Promise<void> {
    return this.gmailProvider.reply(id, input);
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
   * @tag 지메일
   * @tag 이메일
   * @tag 메일
   * @tag 이메일 보내기
   * @tag 이메일 확인
   * @tag 메일 관리
   * @tag 스팸 메일 관리
   * @tag 이메일 검색
   * @tag 첨부파일
   * @tag 필터 설정
   * @tag 이메일 관리
   * @tag 이메일 알림
   * @tag 자동 회신
   * @tag 답장
   * @tag 이메일 아카이브
   * @tag 이메일 스레드
   * @tag 중요 표시
   * @tag 이메일 삭제
   * @tag 구글 메일
   * @tag 이메일 주소
   * @tag 메일함 용량
   * @tag 메일 전송 예약
   * @tag 메일 읽음 확인
   * @tag 중요 메일 표시
   * @tag 일정 예약
   * @tag 비즈니스 이메일
   * @tag Gmail
   * @tag Email
   * @tag Mail
   * @tag Send Email
   * @tag Check Email
   * @tag Manage Mail
   * @tag Manage Spam Mail
   * @tag Search Email
   * @tag Attachment
   * @tag Set Filter
   * @tag Manage Email
   * @tag Email Notification
   * @tag Auto Reply
   * @tag Reply
   * @tag Archive Email
   * @tag Email Thread
   * @tag Mark as Important
   * @tag Delete Email
   * @tag Google Mail
   * @tag Email Address
   * @tag Mailbox Storage
   * @tag Schedule Email Sending
   * @tag Email Read Receipt
   * @tag Mark Important Emails
   * @tag Schedule Appointments
   * @tag Business Email
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/gmail.svg",
  )
  @core.TypedRoute.Post("get/:id")
  async findEmail(
    @Prerequisite({
      neighbor: () => GmailController.prototype.findEmails,
      array: (response): IGmail.IFindGmailOutput[] => response.data,
      value: (elem) => elem.id,
      label: (elem) => elem.subject ?? "",
    })
    @core.TypedParam("id")
    id: string,
    @core.TypedBody()
    input: ICommon.ISecret<"google", ["https://mail.google.com/"]>,
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
   * @tag 지메일
   * @tag 이메일
   * @tag 메일
   * @tag 이메일 보내기
   * @tag 이메일 확인
   * @tag 메일 관리
   * @tag 스팸 메일 관리
   * @tag 이메일 검색
   * @tag 첨부파일
   * @tag 필터 설정
   * @tag 이메일 관리
   * @tag 이메일 알림
   * @tag 자동 회신
   * @tag 답장
   * @tag 이메일 아카이브
   * @tag 이메일 스레드
   * @tag 중요 표시
   * @tag 이메일 삭제
   * @tag 구글 메일
   * @tag 이메일 주소
   * @tag 메일함 용량
   * @tag 메일 전송 예약
   * @tag 메일 읽음 확인
   * @tag 중요 메일 표시
   * @tag 일정 예약
   * @tag 비즈니스 이메일
   * @tag Gmail
   * @tag Email
   * @tag Mail
   * @tag Send Email
   * @tag Check Email
   * @tag Manage Mail
   * @tag Manage Spam Mail
   * @tag Search Email
   * @tag Attachment
   * @tag Set Filter
   * @tag Manage Email
   * @tag Email Notification
   * @tag Auto Reply
   * @tag Reply
   * @tag Archive Email
   * @tag Email Thread
   * @tag Mark as Important
   * @tag Delete Email
   * @tag Google Mail
   * @tag Email Address
   * @tag Mailbox Storage
   * @tag Schedule Email Sending
   * @tag Email Read Receipt
   * @tag Mark Important Emails
   * @tag Schedule Appointments
   * @tag Business Email
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/gmail.svg",
  )
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
   * @tag 지메일
   * @tag 이메일
   * @tag 메일
   * @tag 이메일 보내기
   * @tag 이메일 확인
   * @tag 메일 관리
   * @tag 스팸 메일 관리
   * @tag 이메일 검색
   * @tag 첨부파일
   * @tag 필터 설정
   * @tag 이메일 관리
   * @tag 이메일 알림
   * @tag 자동 회신
   * @tag 답장
   * @tag 이메일 아카이브
   * @tag 이메일 스레드
   * @tag 중요 표시
   * @tag 이메일 삭제
   * @tag 구글 메일
   * @tag 이메일 주소
   * @tag 메일함 용량
   * @tag 메일 전송 예약
   * @tag 메일 읽음 확인
   * @tag 중요 메일 표시
   * @tag 일정 예약
   * @tag 비즈니스 이메일
   * @tag Gmail
   * @tag Email
   * @tag Mail
   * @tag Send Email
   * @tag Check Email
   * @tag Manage Mail
   * @tag Manage Spam Mail
   * @tag Search Email
   * @tag Attachment
   * @tag Set Filter
   * @tag Manage Email
   * @tag Email Notification
   * @tag Auto Reply
   * @tag Reply
   * @tag Archive Email
   * @tag Email Thread
   * @tag Mark as Important
   * @tag Delete Email
   * @tag Google Mail
   * @tag Email Address
   * @tag Mailbox Storage
   * @tag Schedule Email Sending
   * @tag Email Read Receipt
   * @tag Mark Important Emails
   * @tag Schedule Appointments
   * @tag Business Email
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/gmail.svg",
  )
  @core.TypedRoute.Delete(":id")
  async removeMail(
    @Prerequisite({
      neighbor: () => GmailController.prototype.findEmails,
      array: (response): IGmail.IFindGmailOutput[] => response.data,
      value: (elem) => elem.id,
      label: (elem) => elem.subject ?? "",
    })
    @core.TypedParam("id")
    id: string,
    @core.TypedBody()
    input: ICommon.ISecret<"google", ["https://mail.google.com/"]>,
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
   * @tag 지메일
   * @tag 이메일
   * @tag 메일
   * @tag 이메일 보내기
   * @tag 이메일 확인
   * @tag 메일 관리
   * @tag 스팸 메일 관리
   * @tag 이메일 검색
   * @tag 첨부파일
   * @tag 필터 설정
   * @tag 이메일 관리
   * @tag 이메일 알림
   * @tag 자동 회신
   * @tag 답장
   * @tag 이메일 아카이브
   * @tag 이메일 스레드
   * @tag 중요 표시
   * @tag 이메일 삭제
   * @tag 구글 메일
   * @tag 이메일 주소
   * @tag 메일함 용량
   * @tag 메일 전송 예약
   * @tag 메일 읽음 확인
   * @tag 중요 메일 표시
   * @tag 일정 예약
   * @tag 비즈니스 이메일
   * @tag Gmail
   * @tag Email
   * @tag Mail
   * @tag Send Email
   * @tag Check Email
   * @tag Manage Mail
   * @tag Manage Spam Mail
   * @tag Search Email
   * @tag Attachment
   * @tag Set Filter
   * @tag Manage Email
   * @tag Email Notification
   * @tag Auto Reply
   * @tag Reply
   * @tag Archive Email
   * @tag Email Thread
   * @tag Mark as Important
   * @tag Delete Email
   * @tag Google Mail
   * @tag Email Address
   * @tag Mailbox Storage
   * @tag Schedule Email Sending
   * @tag Email Read Receipt
   * @tag Mark Important Emails
   * @tag Schedule Appointments
   * @tag Business Email
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/gmail.svg",
  )
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
   * @tag 지메일
   * @tag 이메일
   * @tag 메일
   * @tag 이메일 보내기
   * @tag 이메일 확인
   * @tag 메일 관리
   * @tag 스팸 메일 관리
   * @tag 이메일 검색
   * @tag 첨부파일
   * @tag 필터 설정
   * @tag 이메일 관리
   * @tag 이메일 알림
   * @tag 자동 회신
   * @tag 답장
   * @tag 이메일 아카이브
   * @tag 이메일 스레드
   * @tag 중요 표시
   * @tag 이메일 삭제
   * @tag 구글 메일
   * @tag 이메일 주소
   * @tag 메일함 용량
   * @tag 메일 전송 예약
   * @tag 메일 읽음 확인
   * @tag 중요 메일 표시
   * @tag 일정 예약
   * @tag 비즈니스 이메일
   * @tag Gmail
   * @tag Email
   * @tag Mail
   * @tag Send Email
   * @tag Check Email
   * @tag Manage Mail
   * @tag Manage Spam Mail
   * @tag Search Email
   * @tag Attachment
   * @tag Set Filter
   * @tag Manage Email
   * @tag Email Notification
   * @tag Auto Reply
   * @tag Reply
   * @tag Archive Email
   * @tag Email Thread
   * @tag Mark as Important
   * @tag Delete Email
   * @tag Google Mail
   * @tag Email Address
   * @tag Mailbox Storage
   * @tag Schedule Email Sending
   * @tag Email Read Receipt
   * @tag Mark Important Emails
   * @tag Schedule Appointments
   * @tag Business Email
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/gmail.svg",
  )
  @core.TypedRoute.Post("label/:mailId")
  async addLabelToMail(
    @Prerequisite({
      neighbor: () => GmailController.prototype.findEmails,
      array: (response): IGmail.IFindGmailOutput[] => response.data,
      value: (elem) => elem.id,
      label: (elem) => elem.subject ?? "",
    })
    @core.TypedParam("mailId")
    mailId: string,
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
   * @tag 지메일
   * @tag 이메일
   * @tag 메일
   * @tag 이메일 보내기
   * @tag 이메일 확인
   * @tag 메일 관리
   * @tag 스팸 메일 관리
   * @tag 이메일 검색
   * @tag 첨부파일
   * @tag 필터 설정
   * @tag 이메일 관리
   * @tag 이메일 알림
   * @tag 자동 회신
   * @tag 답장
   * @tag 이메일 아카이브
   * @tag 이메일 스레드
   * @tag 중요 표시
   * @tag 이메일 삭제
   * @tag 구글 메일
   * @tag 이메일 주소
   * @tag 메일함 용량
   * @tag 메일 전송 예약
   * @tag 메일 읽음 확인
   * @tag 중요 메일 표시
   * @tag 일정 예약
   * @tag 비즈니스 이메일
   * @tag Gmail
   * @tag Email
   * @tag Mail
   * @tag Send Email
   * @tag Check Email
   * @tag Manage Mail
   * @tag Manage Spam Mail
   * @tag Search Email
   * @tag Attachment
   * @tag Set Filter
   * @tag Manage Email
   * @tag Email Notification
   * @tag Auto Reply
   * @tag Reply
   * @tag Archive Email
   * @tag Email Thread
   * @tag Mark as Important
   * @tag Delete Email
   * @tag Google Mail
   * @tag Email Address
   * @tag Mailbox Storage
   * @tag Schedule Email Sending
   * @tag Email Read Receipt
   * @tag Mark Important Emails
   * @tag Schedule Appointments
   * @tag Business Email
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/gmail.svg",
  )
  @core.TypedRoute.Delete("label/:mailId")
  async removeLabelFromMail(
    @Prerequisite({
      neighbor: () => GmailController.prototype.findEmails,
      array: (response): IGmail.IFindGmailOutput[] => response.data,
      value: (elem) => elem.id,
      label: (elem) => elem.subject ?? "",
    })
    @core.TypedParam("mailId")
    mailId: string,
    @core.TypedBody() input: IGmail.IMailLabelOperationInput,
  ): Promise<void> {
    return this.gmailProvider.removeLabelFromMail(mailId, input);
  }
}
