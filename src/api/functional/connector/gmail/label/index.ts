/**
 * @packageDocumentation
 * @module api.functional.connector.gmail.label
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, Primitive, Resolved } from "@nestia/fetcher";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";

import type { IGmail } from "../../../../structures/connector/gmail/IGmail";

/**
 * 라벨을 생성합니다.
 *
 * @summary GMAIL 라벨 생성.
 * @param input 라벨 생성을 위한 정보.
 * @returns 생성된 라벨의 고유 ID.
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
 *
 * @controller GmailController.createLabel
 * @path POST /connector/gmail/label
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function createLabel(
  connection: IConnection,
  input: createLabel.Input,
): Promise<createLabel.Output> {
  return !!connection.simulate
    ? createLabel.simulate(connection, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...createLabel.METADATA,
          path: createLabel.path(),
        },
        input,
      );
}
export namespace createLabel {
  export type Input = Primitive<IGmail.ILabelInput>;
  export type Output = Primitive<IGmail.ILabelOutput>;

  export const METADATA = {
    method: "POST",
    path: "/connector/gmail/label",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: null,
  } as const;

  export const path = () => "/connector/gmail/label";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<IGmail.ILabelOutput>> =>
    typia.random<Primitive<IGmail.ILabelOutput>>(g);
  export const simulate = (
    connection: IConnection,
    input: createLabel.Input,
  ): Output => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: path(),
      contentType: "application/json",
    });
    assert.body(() => typia.assert(input));
    return random(
      "object" === typeof connection.simulate && null !== connection.simulate
        ? connection.simulate
        : undefined,
    );
  };
}

/**
 * 메일에 라벨을 부여합니다.
 *
 * @summary GMAIL 라벨 부여.
 * @param mailId 라벨을 부여할 메일의 고유 ID.
 * @param input 부여할 라벨의 고유 ID 목록.
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
 *
 * @controller GmailController.addLabelToMail
 * @path POST /connector/gmail/label/:mailId
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function addLabelToMail(
  connection: IConnection,
  mailId: string,
  input: addLabelToMail.Input,
): Promise<void> {
  return !!connection.simulate
    ? addLabelToMail.simulate(connection, mailId, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...addLabelToMail.METADATA,
          path: addLabelToMail.path(mailId),
        },
        input,
      );
}
export namespace addLabelToMail {
  export type Input = Primitive<IGmail.IMailLabelOperationInput>;

  export const METADATA = {
    method: "POST",
    path: "/connector/gmail/label/:mailId",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: null,
  } as const;

  export const path = (mailId: string) =>
    `/connector/gmail/label/${encodeURIComponent(mailId ?? "null")}`;
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<void>> => typia.random<Primitive<void>>(g);
  export const simulate = (
    connection: IConnection,
    mailId: string,
    input: addLabelToMail.Input,
  ): void => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: path(mailId),
      contentType: "application/json",
    });
    assert.param("mailId")(() => typia.assert(mailId));
    assert.body(() => typia.assert(input));
    return random(
      "object" === typeof connection.simulate && null !== connection.simulate
        ? connection.simulate
        : undefined,
    );
  };
}

/**
 * 메일에 부여된 라벨을 제거합니다.
 *
 * @summary GMAIL 라벨 제거.
 * @param mailId 라벨을 제거할 메일의 고유 ID.
 * @param input 제거할 라벨의 고유 ID 목록.
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
 *
 * @controller GmailController.removeLabelFromMail
 * @path DELETE /connector/gmail/label/:mailId
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function removeLabelFromMail(
  connection: IConnection,
  mailId: string,
  input: removeLabelFromMail.Input,
): Promise<void> {
  return !!connection.simulate
    ? removeLabelFromMail.simulate(connection, mailId, input)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...removeLabelFromMail.METADATA,
          path: removeLabelFromMail.path(mailId),
        },
        input,
      );
}
export namespace removeLabelFromMail {
  export type Input = Primitive<IGmail.IMailLabelOperationInput>;

  export const METADATA = {
    method: "DELETE",
    path: "/connector/gmail/label/:mailId",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: null,
  } as const;

  export const path = (mailId: string) =>
    `/connector/gmail/label/${encodeURIComponent(mailId ?? "null")}`;
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<Primitive<void>> => typia.random<Primitive<void>>(g);
  export const simulate = (
    connection: IConnection,
    mailId: string,
    input: removeLabelFromMail.Input,
  ): void => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: path(mailId),
      contentType: "application/json",
    });
    assert.param("mailId")(() => typia.assert(mailId));
    assert.body(() => typia.assert(input));
    return random(
      "object" === typeof connection.simulate && null !== connection.simulate
        ? connection.simulate
        : undefined,
    );
  };
}
