import { Prerequisite } from "@wrtnio/decorators";
import { tags } from "typia";

export namespace ISweetTracker {
  export interface IGetRecommendedCompanyListInput {
    /**
     * @title Invoice number
     */
    t_invoice: string;
  }

  /**
   * @title DTO List of couriers matching the invoice number
   */
  export interface IGetRecommendedCompanyListOutput {
    /**
     * @title Courier list
     */
    Recommend: Omit<ISweetTracker.Company, "International">[];
  }

  /**
   * @title Courier inquiry response DTO
   */
  export interface IGetCompanyListOutput {
    /**
     * @title Courier list
     */
    Company: ISweetTracker.Company[];
  }

  export interface IGetTrackingInfoInput {
    /**
     * @title Invoice number
     */
    t_invoice: string;

    /**
     * The courier code must be entered as the `Code` value that appears when searching for a courier company.
     * Note that this is an arbitrary code value, not the name of the courier company.
     *
     * @title Courier Code
     */
    t_code: string &
      (
        | Prerequisite<{
            path: "/connector/sweet-tracker/get-companies";
            method: "post";
            jmesPath: "Company[].{value:Code, label:Name}";
          }>
        | Prerequisite<{
            path: "/connector/sweet-tracker/get-companies/recommended";
            method: "post";
            jmesPath: "Recommend[].{value:Code, label:Name}";
          }>
      );
  }

  export interface IGetTrackingInfoOutput {
    /**
     * @title Sender's name
     */
    senderName?: string;

    /**
     * @title Recipient Address
     */
    receiverAddr?: string;

    /**
     * It means the first path among the paths, and corresponds to the 0th index of the `trackingDetails` array.
     */
    firstDetail: TrackingDetail;

    /**
     * @title Progress stage
     */
    level: ISweetTracker.Level;

    /**
     * It means the last path among the paths, and corresponds to the last index of the `trackingDetails` array.
     */
    lastDetail: TrackingDetail;

    /**
     * Text in the format '15:00~17:00'
     *
     * @title Expected delivery time
     */
    estimate: string | null;

    /**
     * @title Product Image URL
     */
    itemImage: string;

    /**
     * @title Address used by courier companies for advertising purposes
     */
    adUrl: string;

    /**
     * @title lastStateDetail
     */
    lastStateDetail: ISweetTracker.TrackingDetail;

    /**
     * @title Postal address
     */
    zipCode: string | null;

    /**
     * @title tracking number
     */
    invoiceNo: string;

    /**
     * @title Delivery Completed
     */
    completeYN:
      | tags.Constant<
          "Y",
          {
            title: "배송 완료";
            description: "배송이 완료된 경우에는 Y로 표기된다.";
          }
        >
      | tags.Constant<
          "N",
          {
            title: "배송 중";
            description: "배송이 완료되지 않은 경우에는 N으로 표기된다.";
          }
        >;

    /**
     * @title Order Number
     */
    orderNumber: string | null;

    /**
     * @title Delivery Completed
     */
    complete: boolean;

    /**
     * @title Recipient Information
     */
    recipient: string;

    /**
     * @title Recipient
     */
    receiverName: string;

    /**
     * @title Search Results
     */
    result: string;

    /**
     * @title Product Information
     */
    productInfo: string | null;

    /**
     * @title Product Name
     */
    itemName: string;
  }

  export interface Company {
    /**
     * @title Unique code value of the courier company
     */
    Code: `${number}`;

    /**
     * @title International Shipping
     */
    International: `${boolean}`;

    /**
     * @title Courier name
     */
    Name: string;
  }

  export interface TrackingDetail {
    /**
     * @title Delivery Status Code
     */
    code: string | null;

    /**
     * @title Progress status
     */
    kind: string;

    /**
     * @title Progress stage
     */
    level: ISweetTracker.Level;

    /**
     * @title Delivery driver name
     */
    manName: string;

    /**
     * @title Delivery driver phone number
     */
    manPic: string;

    /**
     * @title Note
     */
    remark: string | null;

    /**
     * @title Delivery driver phone number
     */
    telno: string;

    /**
     * @title Delivery driver phone number
     */
    telno2: string;

    /**
     * @title Progress time
     */
    time: number;

    /**
     * @title Progress time
     */
    timeString: string;

    /**
     * @title Progress location
     */
    where: string;
  }

  /**
   * @title Progress stage
   */
  export type Level =
    | tags.Constant<
        1,
        {
          title: "배송 준비 중";
          description: "배송 준비 중";
        }
      >
    | tags.Constant<
        2,
        {
          title: "집화 완료";
          description: "집화 완료";
        }
      >
    | tags.Constant<
        3,
        {
          title: "배송 중";
          description: "배송 중";
        }
      >
    | tags.Constant<
        4,
        {
          title: "지점 도착";
          description: "지점 도착";
        }
      >
    | tags.Constant<
        5,
        {
          title: "배송 출발";
          description: "배송 출발";
        }
      >
    | tags.Constant<
        6,
        {
          title: "배송 완료";
          description: "배송 완료";
        }
      >;
}
