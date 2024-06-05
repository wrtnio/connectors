import { tags } from "typia";

export namespace ISweetTracker {
  export interface IGetRecommendedCompanyListInput {
    /**
     * @title 송장번호.
     */
    t_invoice: string;

    /**
     * @title sweet-tracker로부터 발급받은 키.
     */
    t_key: string;
  }

  /**
   * @title 택배사 조회 응답 DTO.
   */
  export interface IGetCompanyListOutput {
    /**
     * @title 택배사 목록.
     */
    Company: ISweetTracker.Company[];
  }

  export interface IGetTrackingInfoInput {
    /**
     * @title 송장번호.
     */
    t_invoice: string;

    /**
     * @title sweet-tracker로부터 발급받은 키.
     */
    t_key: string;

    /**
     * 택배사 코드는 택배사 조회를 할 때 나오는 `Code` 값을 대입해야 한다.
     *
     * @title 택배사 코드.
     */
    t_code: string;
  }

  export interface IGetTrackingInfoOutput {
    /**
     * @title 보내는 사람 이름.
     */
    senderName: string;

    /**
     * @title 받는 사람 주소.
     */
    receiverAddr: string;

    /**
     * 경로 중 첫 경로를 의미하며, `trackingDetails` 배열의 0번째 인덱스에 해당한다.
     */
    firstDetail: TrackingDetail;

    /**
     * @title 진행 단계.
     */
    level: ISweetTracker.Level;

    /**
     * 경로 중 마지막 경로를 의미하며, `trackingDetails` 배열의 마지막 인덱스에 해당한다.
     */
    lastDetail: TrackingDetail;

    /**
     * @title 배송 예정 시간.
     */
    estimate: string & tags.Format<"date-time">;

    /**
     * @title 상품 이미지 URL.
     */
    itemImage: string & tags.Format<"url">;

    /**
     * @title 택배사에서 광고용으로 사용하는 주소.
     */
    adUrl: string;

    /**
     * @title lastStateDetail.
     */
    lastStateDetail: string;

    /**
     * @title 우편주소.
     */
    zipCode: string;

    /**
     * @title 운송장 번호.
     */
    invoiceNo: string;

    /**
     * @title 배송 완료 여부.
     */
    completeYN: "Y" | "N";

    /**
     * @title 주문 번호.
     */
    orderNumber: string;

    /**
     * @title 배송 완료 여부.
     */
    complete: boolean;

    /**
     * @title 수령인 정보.
     */
    recipient: string;

    /**
     * @title 받는 사람.
     */
    receiverName: string;

    /**
     * @title 조회 결과.
     */
    result: string;

    /**
     * @title 상품 정보.
     */
    productInfo: string;

    /**
     * @title 상품 이름.
     */
    itemName: string;
  }

  export interface Company {
    /**
     * @title 택배사가 가지는 고유한 코드 값.
     */
    Code: `${number}`;

    /**
     * @title 국제 배송 여부.
     */
    International: `${boolean}`;

    /**
     * @title 택배사 이름.
     */
    Name: string;
  }

  export interface TrackingDetail {
    /**
     * @title 배송 상태 코드
     */
    code: string;

    /**
     * @title 진행 상태.
     */
    kind: string;

    /**
     * @title 진행 단계
     */
    level: ISweetTracker.Level;

    /**
     * @title 배송기사 이름.
     */
    manName: string;

    /**
     * @title 배송기사 전화번호.
     */
    manPic: string;

    /**
     * @title 비고.
     */
    remark: string;

    /**
     * @title 배송기사 전화번호.
     */
    telno: string;

    /**
     * @title 배송기사 전화번호.
     */
    telno2: string;

    /**
     * @title 진행 시간.
     */
    time: number;

    /**
     * @title 진행 시간.
     */
    timeString: string & tags.Format<"date-time">;

    /**
     * @title 진행 위치.
     */
    where: string;
  }

  /**
   * @title 진행 단계
   *
   * - 1 : 배송 준비 중
   * - 2 : 집화 완료
   * - 3 : 배송 중
   * - 4 : 지점 도착
   * - 5 : 배송 출발
   * - 6 : 배송 완료
   */
  export type Level = 1 | 2 | 3 | 4 | 5 | 6;
}
