import { Injectable } from "@nestjs/common";
import { IGoogleHotel } from "@wrtn/connector-api/lib/structures/connector/google_hotel/IGoogleHotel";
import { getJson } from "serpapi";

const defaultParams = {
  engine: "google_hotels",
  api_key: process.env.SERP_API_KEY,
  hl: "ko",
  gl: "kr",
  currency: "KRW",
};

@Injectable()
export class GoogleHotelProvider {
  async search(
    input: IGoogleHotel.IRequest,
  ): Promise<IGoogleHotel.IResponse[]> {
    try {
      const output: IGoogleHotel.IResponse[] = [];

      let hotel_class = "";
      let type = "";
      if (input.hotel_class && input.hotel_class.length > 0) {
        hotel_class = input.hotel_class.join(",");
      }

      if (input.type && input.type.length > 0) {
        type = input.type.join(",");
      }

      let params: any = {
        ...defaultParams,
        q: input.keyword,
        check_in_date: input.check_in_date,
        check_out_date: input.check_out_date,
        ...(input.adults && { adults: input.adults }),
        ...(input.children && { children: input.children }),
        ...(input.rating && { rating: input.rating }),
        ...(input.sort_by && { sort_by: input.sort_by }),
        ...(input.min_price && { min_price: input.min_price }),
        ...(input.type && { property_types: type }),
        ...(input.hotel_class && { hotel_class: hotel_class }),
        ...(input.free_cancellation && {
          free_cancellation: input.free_cancellation,
        }),
      };
      while (output.length < input.max_results) {
        const res = await getJson(params);
        const results = res["properties"];

        if (!res.serpapi_pagination) {
          return output;
        }

        if (!results || results.length === 0) {
          return [];
        }

        for (const result of results) {
          if (output.length === input.max_results) {
            break;
          }

          const data: IGoogleHotel.IResponse = {
            name: result.name,
            description: result.description ?? "숙소 설명 정보가 없습니다.",
            link: result.link ?? "숙소 링크 정보가 없습니다.",
            check_in_time:
              result.check_in_time ?? "체크인 시간 정보가 없습니다.",
            check_out_time:
              result.check_out_time ?? "체크아웃 정보가 없습니다.",
            price: result.rate_per_night?.lowest ?? "가격 정보가 없습니다.",
            nearby_place: result.nearby_places?.map(
              (place: IGoogleHotel.INearbyPlace) => {
                return {
                  name: place.name,
                  transportations: place.transportations,
                };
              },
            ),
            hotel_class: result?.hotel_class,
            thumbnails: result.images.map(
              (image: { thumbnail: string; original_image: string }) =>
                image.thumbnail,
            ),
            rating: `${result.overall_rating}점` ?? "평점 정보가 없습니다.",
            review_count: `${result.reviews}개`,
            amenities: result.amenities ?? "편의시설 정보가 없습니다.",
            excluded_amenities: result?.excluded_amenities,
          };
          output.push(data);
        }

        if (!res.serpapi_pagination.next) {
          break;
        }

        params = {
          ...params,
          next_page_token: res.serpapi_pagination.next_page_token,
        };
      }

      return output;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }
}
