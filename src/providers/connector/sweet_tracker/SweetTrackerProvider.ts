import axios from "axios";

import { ISweetTracker } from "@wrtn/connector-api/lib/structures/connector/sweet_tracker/ISweetTacker";

export namespace SweetTrackerProvider {
  export async function getRecommendedCompanyList(
    input: ISweetTracker.IGetRecommendedCompanyListInput,
  ): Promise<ISweetTracker.IGetRecommendedCompanyListOutput> {
    const queryParams =
      Object.entries(input)
        .map(([key, value]) => `${key}=${value}`)
        .join("&") ?? "";

    try {
      const res = await axios.get(
        `https://info.sweettracker.co.kr/api/v1/recommend?${queryParams}`,
      );

      return res.data;
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  }

  export async function getCompanyList(): Promise<ISweetTracker.IGetCompanyListOutput> {
    try {
      const res = await axios.get(
        "https://info.sweettracker.co.kr/api/v1/companylist/refresh",
      );
      return res.data;
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  }

  export async function getTrackingInfo(
    input: ISweetTracker.IGetTrackingInfoInput,
  ): Promise<ISweetTracker.IGetTrackingInfoOutput> {
    const queryParams =
      Object.entries(input)
        .map(([key, value]) => `${key}=${value}`)
        .join("&") ?? "";

    try {
      const res = await axios.get(
        `https://info.sweettracker.co.kr/api/v1/trackingInfo?${queryParams}`,
      );
      return res.data;
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  }
}
