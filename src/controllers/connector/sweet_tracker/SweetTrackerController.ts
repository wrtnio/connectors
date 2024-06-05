import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";

import { ISweetTracker } from "@wrtn/connector-api/lib/structures/connector/sweet_tracker/ISweetTacker";

import { SweetTrackerProvider } from "../../../providers/connector/sweet_tracker/SweetTrackerProvider";

@Controller("connector/sweet-tacker")
export class SweetTrackerController {
  /**
   *
   * @param input
   * @returns
   */
  @core.TypedRoute.Post("get-companies/recommended")
  async getRecommendedCompanyList(
    @TypedBody() input: ISweetTracker.IGetRecommendedCompanyListInput,
  ): Promise<ISweetTracker.IGetCompanyListOutput> {
    return null!;
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
    return null!;
  }
}
