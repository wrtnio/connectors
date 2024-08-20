import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { ISweetTracker } from "@wrtn/connector-api/lib/structures/connector/sweet_tracker/ISweetTacker";

import { SweetTrackerProvider } from "../../../providers/connector/sweet_tracker/SweetTrackerProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/sweet-tacker")
export class SweetTrackerController {
  /**
   * 송장번호에 매칭되는 택배사 목록을 조회합니다
   *
   * 송장 조회를 하기 위해서는 택배사 코드가 필수적입니다.
   * 따라서 유저가 송장번호는 알고 자신의 택배를 전달해줄 택배사가 어딘지 모르면 송장 조회를 할 수 없습니다.
   * 이 커넥터는 이러한 문제를 해결하기 위해 송장번호에 맞는 택배사를 추론해주는 기능을 제공합니다.
   * 다만 이 기능을 호출해도 택배사일 가능성이 있는 여러 개의 택배사로 나올 수도 있기 때문에 어느 회사가 이 택배를 운송해줄지는 알 수 없습니다.
   *
   * 물론, 리스트에 대상이 1개라면 그 택배사일 가능성이 거의 100% 일 것입니다.
   *
   * @summary 송장 번호에 매칭되는 택배사 목록 조회
   * @returns 택배사 목록
   * @param input 택배사 조회를 위한 조건
   * @tag sweet-tracker
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/delivery_full.svg",
  )
  @Standalone()
  @core.TypedRoute.Post("get-companies/recommended")
  async getRecommendedCompanyList(
    @TypedBody() input: ISweetTracker.IGetRecommendedCompanyListInput,
  ): Promise<ISweetTracker.IGetRecommendedCompanyListOutput> {
    return retry(() => SweetTrackerProvider.getRecommendedCompanyList(input))();
  }

  /**
   * 택배사 목록을 조회합니다
   *
   * 대한민국 국내, 국외의 택배사들을 모두 조회합니다.
   * 추후 송장번호를 통한 배송 조회를 할 때에는 택배사 코드가 함께 필요하기 때문에 먼저 택배사 목록부터 조회해야 합니다.
   * 택배사 목록을 조회한 후 자신의 택배사를 찾아서 해당 택배사의 코드를 송장 조회 시에 제공해주면 됩니다.
   *
   * @summary 택배사 목록 조회
   * @returns 택배사 목록
   * @tag sweet-tracker
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/delivery_full.svg",
  )
  @Standalone()
  @core.TypedRoute.Post("get-companies")
  async getCompanyList(): Promise<ISweetTracker.IGetCompanyListOutput> {
    return retry(() => SweetTrackerProvider.getCompanyList())();
  }

  /**
   * 송장 번호를 조회합니다
   *
   * 송장을 조회하기 위해서는 자신이 조회하고자 하는 송장 번호 외에도 택배사 코드가 필요합니다.
   * 내 택배를 운송해줄 택배사가 어딘지 안다면 택배사를 조회하여 택배사 이름이 일치하는 택배사로부터 택배사 코드를 가져오면 됩니다.
   * 만약 송장 번호는 알지만 택배사 코드는 모르는 상태라면 '송장 번호에 매칭되는 택배사 목록 조회' 를 사용하여 자신의 택배를 운송해줄 택배사를 유추해볼 수 있습니다.
   * 택배를 조회하면 현재 택배가 어디까지 도달하였는지 그 위치와 시간, 그리고 그 택배를 운송해주는 담당자가 누군지를 알 수 있습니다.
   * 경우에 따라 전화번호가 있을 수도 있지만 절대적인 것은 아닙니다.
   * 또한, 쿠팡과 같이 커머스 업체에서 직배송하는 경우에는 송장 번호가 있어도 조회할 수 없는 경우도 있습니다.
   *
   * @summary 송장 조회
   * @param input 송장 번호를 조회하기 위한 조건
   * @returns 택배의 이동 경로
   * @tag sweet-tracker
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/delivery_full.svg",
  )
  @core.TypedRoute.Post("tracking-info")
  async getTrackingInfo(
    @TypedBody() input: ISweetTracker.IGetTrackingInfoInput,
  ): Promise<ISweetTracker.IGetTrackingInfoOutput> {
    return retry(() => SweetTrackerProvider.getTrackingInfo(input))();
  }
}
