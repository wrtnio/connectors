import { Injectable } from "@nestjs/common";
import { IGoogleFlight } from "@wrtn/connector-api/lib/structures/connector/google_flight/IGoogleFlight";
import { getJson } from "serpapi";

const defaultParams = {
  engine: "google_flights",
  api_key: process.env.SERP_API_KEY,
  hl: "ko",
  gl: "kr",
  currency: "KRW",
};

@Injectable()
export class GoogleFlightProvider {
  async searchForDeparture(
    input: IGoogleFlight.IRequest,
  ): Promise<IGoogleFlight.IResponse> {
    return await this.search(input);
  }

  async searchForArrival(
    input: IGoogleFlight.IRequest,
    departure_token: string,
  ): Promise<IGoogleFlight.IResponse> {
    return await this.search(input, departure_token);
  }

  async searchForFinal(
    input: IGoogleFlight.IRequest,
    booking_token: string,
  ): Promise<IGoogleFlight.IFinalResponse> {
    try {
      const params: any = {
        ...defaultParams,
        departure_id: input.departure_id,
        arrival_id: input.arrival_id,
        type: input.type,
        outbound_date: input.outbound_date,
        ...(input.return_date && { return_date: input.return_date }),
        travel_class: Number(input.travel_class),
        adults: input.adults,
        ...(input.children && { children: input.children }),
        stops: Number(input.stop),
        ...(input.max_price && { max_price: input.max_price }),
        ...(booking_token && { booking_token: booking_token }),
      };

      const res = await getJson(params);

      /**
       * 검색 결과가 없을 경우 빈배열 return
       */
      if (!res["selected_flights"] || res["selected_flights"].length === 0) {
        return { flight: [], booking_options: [] };
      }
      const output: IGoogleFlight.IFinalResponse = {
        flight: this.transformResults(res["selected_flights"]),
        booking_options: this.transformBookingOption(res["booking_options"]),
      };

      return output;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  private async search(
    input: IGoogleFlight.IRequest,
    departure_token?: string,
    booking_token?: string,
  ): Promise<IGoogleFlight.IResponse> {
    try {
      const params: any = {
        ...defaultParams,
        departure_id: input.departure_id,
        arrival_id: input.arrival_id,
        type: input.type,
        outbound_date: input.outbound_date,
        ...(input.return_date && { return_date: input.return_date }),
        travel_class: Number(input.travel_class),
        adults: input.adults,
        ...(input.children && { children: input.children }),
        stops: Number(input.stop),
        ...(input.max_price && { max_price: input.max_price }),
        ...(departure_token && { departure_token: departure_token }),
        ...(booking_token && { booking_token: booking_token }),
      };

      const res = await getJson(params);
      const bestResults = res["best_flights"];
      const otherResults = res["other_flights"];

      /**
       * 검색 결과가 없을 경우 빈배열 return
       */
      if (
        (!bestResults || bestResults.length === 0) &&
        (!otherResults || otherResults.length === 0)
      ) {
        return { best_flights: [], other_flights: [] };
      }
      const output: IGoogleFlight.IResponse = {
        best_flights: this.transformResults(bestResults),
        other_flights: this.transformResults(otherResults),
      };

      return output;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  private transformResults(results: any[]): IGoogleFlight.ISearchOutput[] {
    return results.map((result) => ({
      flight: result.flights.map((flight: any) => ({
        departure_airport: {
          name: flight.departure_airport.name,
          code: flight.departure_airport.id,
          time: flight.departure_airport.time,
        },
        arrival_airport: {
          name: flight.arrival_airport.name,
          code: flight.arrival_airport.id,
          time: flight.arrival_airport.time,
        },
        duration: this.transformDuration(flight.duration),
        airplane:
          flight.airplane === undefined
            ? "비행기 기종 정보가 없습니다."
            : flight.airplane,
        airline: flight.airline,
        airline_logo: flight.airline_logo,
        travel_class: flight.travel_class,
        flight_number: flight.flight_number,
      })),
      total_duration: this.transformDuration(result.total_duration),
      price:
        result.price === undefined
          ? "가격 정보가 없습니다."
          : `${result.price}원`,
      layover: result.layover?.map((layover: any) => ({
        name: layover.name,
        code: layover.id,
        duration: layover.duration,
      })),
      departure_token: result.departure_token,
      booking_token: result.booking_token,
    }));
  }

  private transformDuration(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}시간 ${minutes}분`;
  }

  private transformBookingOption(
    bookingOptions: any[],
  ): IGoogleFlight.IBookingOption[] {
    return bookingOptions.map((bookingOption) => ({
      book_with: bookingOption.together.book_with,
      price:
        bookingOption.together.price === undefined
          ? "가격 정보가 없습니다."
          : `${bookingOption.together.price}원`,
      book_link: `${bookingOption.together.booking_request.url}?${bookingOption.together.booking_request.post_data}`,
    }));
  }
}
