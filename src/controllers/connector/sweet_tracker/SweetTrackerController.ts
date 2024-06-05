import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";

import { ISweetTracker } from "@wrtn/connector-api/lib/structures/connector/sweet_tracker/ISweetTacker";

import { SweetTrackerProvider } from "../../../providers/connector/sweet_tracker/SweetTrackerProvider";

@Controller("connector/sweet-tacker")
export class SweetTrackerController {
  /**
   * 송장번호에 매칭되는 택배사 목록을 조회합니다.
   *
   * @summary 송장 번호에 매칭되는 택배사 목록.
   * @returns 택배사 목록.
   * @param input 택배사 조회를 위한 조건 DTO.
   * @tag sweet-tracker
   */
  @core.TypedRoute.Post("get-companies/recommended")
  async getRecommendedCompanyList(
    @TypedBody() input: ISweetTracker.IGetRecommendedCompanyListInput,
  ): Promise<ISweetTracker.IGetRecommendedCompanyListOutput> {
    return SweetTrackerProvider.getRecommendedCompanyList(input);
  }

  /**
   * 택배사 목록을 조회합니다.
   *
   * @summary 택배사 목록 조회.
   * @returns 택배사 목록.
   * @tag sweet-tracker
   */
  @core.TypedRoute.Post("get-companies")
  async getCompanyList(): Promise<ISweetTracker.IGetCompanyListOutput> {
    return SweetTrackerProvider.getCompanyList();
  }

  /**
   *
   * @param input
   * @returns
   */
  @core.TypedRoute.Post("tracking-info")
  async getTrackingInfo(
    @TypedBody() input: ISweetTracker.IGetTrackingInfoInput,
  ): Promise<ISweetTracker.IGetTrackingInfoOutput> {
    return SweetTrackerProvider.getTrackingInfo(input);
  }
}
