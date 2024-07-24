import { tags } from "typia";

import { ICommon } from "@wrtn/connector-api/lib/structures/connector/common/ISecretValue";

export namespace IGmail {
  /**
   * @title 메일을 보내기 위해 필요한 정보
   */
  export interface ICreateMailInput
    extends ICommon.ISecret<"google", ["https://mail.google.com/"]> {
    /**
     * 메일을 받는 사람의 이메일 주소.
     *
     * @title 받는 사람 이메일 주소.
     */
    to: string[];

    /**
     * 보낼 메일의 제목.
     *
     * @title 이메일 제목.
     */
    subject: string;

    /**
     * 보낼 메일의 본문.
     *
     * @title 이메일 본문.
     */
    body: string;

    /**
     * 참조할 사람 이메일 주소.
     *
     * @title 참조할 사람 이메일.
     */
    cc?: string[];

    /**
     * 숨은참조할 사람 이메일 주소.
     *
     * @title 숨은참조할 사람 이메일.
     */
    Bcc?: string[];
  }

  /**
   * @title 메일 전송 결과
   */
  export interface ISendMailOutput {
    /**
     * 보낸 메일의 id.
     *
     * @title 보낸 메일의 id.
     */
    id: string;
  }

  /**
   * @title 메일 답장에 필요한 정보
   */
  export interface IReplyInput
    extends ICommon.ISecret<"google", ["https://mail.google.com/"]> {
    /**
     * 답장할 문구.
     *
     * @title 답장할 문구.
     */
    replyText: string;
  }

  /**
   * @title 라벨 색상
   */
  export interface ILabelColor {
    /**
     * 라벨 글씨 색상.
     *
     * @title 라벨 글씨 색.
     */
    textColor: string;

    /**
     * 라벨 배경 색상.
     *
     * @title 라벨 배경 색.
     */
    backgroundColor: string;
  }

  /**
   * @title 라벨 생성에 필요한 정보
   */
  export interface ILabelInput
    extends ICommon.ISecret<"google", ["https://mail.google.com/"]> {
    /**
     * 생성할 라벨의 이름.
     *
     * @title 라벨 이름.
     */
    labelName: string;

    /**
     * 생성할 라벨의 공개 상태.
     * 숨김 / 보임 / 안읽었을 때 보임
     *
     * @title 라벨의 공개 상태.
     */
    labelListVisibility?: labelListVisibility;

    /**
     * 생성된 라벨이 지정된 메일의 공개 상태.
     * 숨김 / 보임
     *
     * @title 라벨이 지정된 메일의 공개 상태.
     */
    messageListVisibility?: messageListVisibility;

    /**
     * 생성할 메일 라벨의 색깔
     *
     * @title 라벨 색깔.
     */
    color?: ILabelColor;
  }

  /**
   * - labelHide: 숨김
   * - labelShow: 보임
   * - labelShowIfUnread: 안읽었을 때 보임
   *
   * @title 라벨의 공개 상태.
   */
  type labelListVisibility = "labelHide" | "labelShow" | "labelShowIfUnread";

  /**
   * - hide: 숨김
   * - show: 보임
   *
   * @title 라벨이 지정된 메일의 공개 상태.
   */
  type messageListVisibility = "hide" | "show";

  /**
   * @title 라벨 생성 결과
   */
  export interface ILabelOutput {
    /**
     * 생성된 라벨의 id.
     *
     * @title 생성된 라벨 id.
     */
    id: string;
  }

  /**
   * @title 라벨 부여에 필요한 정보
   */
  export interface IMailLabelOperationInput
    extends ICommon.ISecret<"google", ["https://mail.google.com/"]> {
    /**
     * 부여하거나 삭제할 라벨 목록들.
     *
     * @title 라벨 목록.
     */
    labelIds: string[];
  }

  /**
   * @title 이메일 리스트 검색에 필요한 정보
   */
  export interface IFindEmailListInput
    extends ICommon.ISecret<"google", ["https://mail.google.com/"]> {
    /**
     * 이메일을 보낸 사람의 이메일 주소.
     *
     * @title 보낸 사람의 이메일.
     */
    from?: string;

    /**
     * 이메일을 받는 사람의 이메일 주소.
     *
     * @title 받는 사람의 이메일.
     */
    to?: string;

    /**
     * 이메일 제목.
     *
     * @title 이메일 제목.
     */
    subject?: string;

    /**
     * 해당 날짜 이후의 이메일만 반환.
     *
     * @title 특정 날짜 이후.
     */
    after?: string;

    /**
     * 해당 날짜 이전의 이메일만 반환.
     *
     * @title 특정 날짜 이전.
     */
    before?: string; // 특정 날짜 이전

    /**
     * 메일에 부여된 라벨.
     *
     * @title 메일에 부여된 라벨.
     */
    label?: string;

    /**
     * 메일의 반환 갯수.
     *
     * @title 최대 반환 갯수.
     */
    maxResults?: number & tags.Maximum<500> & tags.Minimum<1>;

    /**
     * 지정된 라벨 ID와 모두 일치하는 라벨이 있는 메일만 반환하기 위한 라벨 목록들.
     *
     * @title 필터링할 라벨 목록.
     */
    labelIds?: string[];
  }

  /**
   * @title 이메일 리스트 검색 결과
   */
  export interface IFindGmailListOutput {
    /**
     * 검색된 gmail 데이터 정보.
     *
     * @title gmail 검색 데이터 정보.
     */
    data: IFindGmailOutput[];
  }

  /**
   * @title 이메일 검색 결과
   */
  export interface IFindGmailOutput {
    /**
     * 이메일의 고유 id.
     *
     * @title 이메일 id.
     */
    id?: string | null;

    /**
     * 이메일에 부여된 라벨 id.
     *
     * @title 이메일 라벨 id.
     */
    labelIds?: string[] | null;

    /**
     * 이메일을 보낸 사람의 이메일 주소.
     *
     * @title 발신자 이메일.
     */
    from?: string | null;

    /**
     * 이메일의 제목.
     *
     * @title 제목.
     */
    subject?: string | null;

    /**
     * 이메일의 본문 요약.
     *
     * @title 본문 요약.
     */
    body?: string | null;

    /**
     * 이메일에 첨부된 파일 목록.
     *
     * @title 첨부파일.
     */
    attachments?: IAttachmentOutput[] | null;
  }

  /**
   * @title 첨부파일 정보
   */

  export interface IAttachmentOutput {
    /**
     * 메시지 부분의 변경할 수 없는 ID.
     *
     * @title 메시지 부분의 변경할 수 없는 ID.
     */
    partId?: string | null;

    /**
     * 메세지의 MIME 유형입니다.
     *
     * @title 메시지 부분의 MIME 유형.
     */
    mimeType?: string | null;

    /**
     * 이 메시지 부분이 첨부파일을 나타내는 경우에만 표시됩니다.
     *
     * @title 첨부파일 명.
     */
    filename?: string | null;

    /**
     * 전체 메시지 페이로드를 나타내는 최상위 메시지 부분에는 To, From, Subject와 같은 표준 RFC 2822 이메일 헤더가 포함됩니다.
     *
     * @title 첨부파일 헤더 정보.
     */
    headers?: IAttachmentHeader[] | null;

    /**
     * 이 부분의 메시지 부분 본문으로, 컨테이너 MIME 메시지 부분의 경우 비어 있을 수 있습니다.
     *
     * @title 첨부파일 헤더 body 정보.
     */
    body?: IAttachmentBody | null;
  }

  /**
   * @title 첨부파일 헤더 정보
   */
  export interface IAttachmentHeader {
    /**
     * 첨부파일 헤더 타입.
     *
     * @title 첨부파일 헤더 타입.
     */
    name?: string | null;

    /**
     * 첨부파일 헤더 값.
     *
     * @title 첨부파일 헤더 값.
     */
    value?: string | null;
  }

  /**
   * @title 첨부파일 body 정보
   */
  export interface IAttachmentBody {
    /**
     * 첨부파일 고유 id입니다.
     *
     * @title 첨부파일 id.
     */
    attachmentId?: string | null;

    /**
     * 첨부파일 데이터의 바이트 수입니다.
     *
     * @title 첨부파일 데이터의 바이트 수.
     */
    size?: (number & tags.Type<"int32">) | null;
  }

  /**
   * @title 인증 정보
   */
  export type ISecret = ICommon.ISecret<"google", ["https://mail.google.com/"]>;
}
