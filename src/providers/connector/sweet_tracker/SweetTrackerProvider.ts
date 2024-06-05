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

    const res = await axios.get(
      `https://info.sweettracker.co.kr/api/v1/recommend?${queryParams}`,
    );

    return res.data;
  }

  export async function getCompanyList(): Promise<ISweetTracker.IGetCompanyListOutput> {
    const res = await axios.get(
      "https://info.sweettracker.co.kr/api/v1/companylist/refresh",
    );
    return res.data;
  }
}
