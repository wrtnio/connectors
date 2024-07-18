import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { Standalone } from "@wrtnio/decorators";

import { ISweetTracker } from "@wrtn/connector-api/lib/structures/connector/sweet_tracker/ISweetTacker";

import { SweetTrackerProvider } from "../../../providers/connector/sweet_tracker/SweetTrackerProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/sweet-tacker")
export class SweetTrackerController {
  /**
   * 송장번호에 매칭되는 택배사 목록을 조회합니다.
   *
   * @summary 송장 번호에 매칭되는 택배사 목록
   * @returns 택배사 목록
   * @param input 택배사 조회를 위한 조건
   * @tag sweet-tracker
   */
  @Standalone()
  @core.TypedRoute.Post("get-companies/recommended")
  async getRecommendedCompanyList(
    @TypedBody() input: ISweetTracker.IGetRecommendedCompanyListInput,
  ): Promise<ISweetTracker.IGetRecommendedCompanyListOutput> {
    return retry(() => SweetTrackerProvider.getRecommendedCompanyList(input))();
  }

  /**
   * 택배사 목록을 조회합니다.
   *
   * @summary 택배사 목록 조회
   * @returns 택배사 목록
   * @tag sweet-tracker
   */
  @Standalone()
  @core.TypedRoute.Post("get-companies")
  async getCompanyList(): Promise<ISweetTracker.IGetCompanyListOutput> {
    return retry(() => SweetTrackerProvider.getCompanyList())();
  }

  /**
   * 송장 번호를 조회합니다.
   *
   * @summary 송장 조회
   * @param input 송장 번호를 조회하기 위한 조건
   * @returns 택배의 이동 경로
   * @tag sweet-tracker
   */
  @core.TypedRoute.Post("tracking-info")
  async getTrackingInfo(
    @TypedBody() input: ISweetTracker.IGetTrackingInfoInput,
  ): Promise<ISweetTracker.IGetTrackingInfoOutput> {
    return retry(() => SweetTrackerProvider.getTrackingInfo(input))();
  }
}
