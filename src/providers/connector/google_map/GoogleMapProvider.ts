import { Injectable } from "@nestjs/common";
import { IGoogleMap } from "@wrtn/connector-api/lib/structures/connector/google_map/IGoogleMap";
import { getJson } from "serpapi";
import { ConnectorGlobal } from "../../../ConnectorGlobal";

@Injectable()
export class GoogleMapProvider {
  async search(input: IGoogleMap.IRequest): Promise<IGoogleMap.IResponse[]> {
    try {
      const params = {
        engine: "google_maps",
        type: "search",
        q: input.keyword,
        google_domain: "google.com",
        hl: "ko",
        api_key: ConnectorGlobal.env.SERP_API_KEY,
      };

      const res = await getJson(params);
      const results = res["local_results"] ?? [res.place_results];

      const output: IGoogleMap.IResponse[] = [];
      for (const result of results) {
        const data: IGoogleMap.IResponse = {
          title: result.title,
          place_id: result.place_id,
          gps_coordinate: result.gps_coordinates,
          rating: result?.rating ?? 0,
          reviews: result?.reviews,
          address: result.address,
          open_state: result?.open_state,
          operating_hours: result?.operating_hours,
          phone_number: result?.phone,
          service_options: result?.service_options,
          user_review: result?.user_review,
          thumbnail: result.thumbnail,
        };
        output.push(data);
      }
      // rating이 undefined일 경우 0으로 처리
      output.sort((a, b) => b.rating! - a.rating!);
      return output;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async review(
    input: IGoogleMap.IReviewRequest,
  ): Promise<IGoogleMap.IReviewResponse[]> {
    try {
      const params = {
        engine: "google_maps",
        type: "search",
        google_domain: "google.com",
        hl: "ko",
        place_id: input.place_id,
        api_key: ConnectorGlobal.env.SERP_API_KEY,
      };

      const res = await getJson(params);
      const results = res["place_results"].user_reviews.most_relevant;

      const output: IGoogleMap.IReviewResponse[] = [];
      for (const result of results) {
        const data: IGoogleMap.IReviewResponse = {
          username: result.username,
          rating: result.rating,
          description: result.description,
          link: result.link,
          images: result.images?.map((image: any) => image.thumbnail) ?? [],
          date: result.date,
        };
        output.push(data);
      }
      return output;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }
}
