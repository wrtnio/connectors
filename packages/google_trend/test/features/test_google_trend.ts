import {
  GoogleTrendService,
  IGoogleTrendService,
} from "@wrtnlabs/connector-google-trend";
import typia from "typia";
import { TestGlobal } from "../TestGlobal";

export const test_api_connector_google_trend = async () => {
  const googleTrendService = new GoogleTrendService({
    apiKey: TestGlobal.env.SERP_API_KEY,
  });
  const results = await googleTrendService.dailyTrend({});
  typia.assert<IGoogleTrendService.IResponse[]>(results);
};
