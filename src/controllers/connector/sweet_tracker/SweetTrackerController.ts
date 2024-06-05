import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";

import { ISweetTracker } from "@wrtn/connector-api/lib/structures/connector/sweet_tracker/ISweetTacker";

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
   *
   * @param input
   * @returns
   */
  @core.TypedRoute.Post("get-companies")
  async getCompanyList(): Promise<ISweetTracker.IGetCompanyListOutput> {
    return null!;
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
