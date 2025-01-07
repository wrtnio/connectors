import core, { HumanRoute, TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { ISweetTracker } from "@wrtn/connector-api/lib/structures/connector/sweet_tracker/ISweetTacker";

import { SweetTrackerProvider } from "../../../providers/connector/sweet_tracker/SweetTrackerProvider";
import { retry } from "../../../utils/retry";
import typia from "typia";
import { ApiTags } from "@nestjs/swagger";

@Controller("connector/sweet-tacker")
export class SweetTrackerController {
  /**
   * Search for a list of couriers matching the invoice number
   *
   * A courier code is essential to search for an invoice.
   * Therefore, if a user knows the invoice number but does not know which courier will deliver his or her parcel, he or she cannot search for the invoice.
   * To solve this problem, this connector provides a function that infers the courier matching the invoice number.
   * However, even if this function is called, multiple couriers that may be couriers may appear, so it is impossible to know which company will transport this parcel.
   *
   * Of course, if there is only one target in the list, the probability that it will be that courier is almost 100%.
   *
   * @summary Search for a list of couriers matching the invoice number
   * @returns List of couriers
   * @param input Conditions for courier search
   *
   * @internal
   */
  @HumanRoute()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/delivery_full.svg",
  )
  @ApiTags("SweetTracker")
  @Standalone()
  @core.TypedRoute.Patch("get-companies/recommended")
  async getRecommendedCompanyList(
    @TypedBody() input: ISweetTracker.IGetRecommendedCompanyListInput,
  ): Promise<ISweetTracker.IGetRecommendedCompanyListOutput> {
    return retry(() => SweetTrackerProvider.getRecommendedCompanyList(input))();
  }

  /**
   * Search for the courier list
   *
   * Search for all domestic and international courier companies in Korea.
   * When searching for delivery through the invoice number later, you will need the courier code, so you must search for the courier list first.
   * After searching for the courier list, find your courier and provide the courier code when searching for the invoice.
   *
   * @summary Search for courier list
   * @returns List of couriers
   *
   * @internal
   */
  @HumanRoute()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/delivery_full.svg",
  )
  @ApiTags("SweetTracker")
  @Standalone()
  @core.TypedRoute.Patch("get-companies")
  async getCompanyList(): Promise<ISweetTracker.IGetCompanyListOutput> {
    return retry(() => SweetTrackerProvider.getCompanyList())();
  }

  /**
   * Search for the invoice number
   *
   * To search for an invoice, you need the courier code in addition to the invoice number you want to search for.
   * If you know which courier will transport your package, you can search for the courier and get the courier code from the courier whose name matches the courier code.
   * If you know the invoice number but do not know the courier code, you can use 'Search for a list of couriers matching the invoice number' to infer the courier that will transport your package.
   * When you search for a package, you can find out the current location and time of the package, as well as who is transporting the package.
   * In some cases, there may be a phone number, but it is not absolute.
   * In addition, in cases where the product is delivered directly by an commerce company such as Coupang, there are cases where you cannot search even if you have the invoice number.
   *
   * @summary Invoice search
   * @param input Conditions for searching the invoice number
   * @returns The movement path of the package
   *
   * @internal
   */
  @HumanRoute()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/delivery_full.svg",
  )
  @ApiTags("SweetTracker")
  @core.TypedRoute.Patch("tracking-info")
  async getTrackingInfo(
    @TypedBody() input: ISweetTracker.IGetTrackingInfoInput,
  ): Promise<ISweetTracker.IGetTrackingInfoOutput> {
    const data = await SweetTrackerProvider.getTrackingInfo(input);

    // 안정화되기 전까지 typia.validateEquals 에러를 무조건 찍게 한다.
    console.log(JSON.stringify(typia.validate(data)));
    return data;
  }
}
