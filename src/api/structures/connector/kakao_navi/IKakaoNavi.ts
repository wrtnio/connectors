import { Placeholder } from "@wrtn/decorators";

export namespace IKakaoNavi {
  /**
   * @title 요청 조건
   */
  export interface IGetFutureDirectionsInput {
    /**
     * @title 출발 시간
     * @description YYYYMMDDHHMM 형식으로 현재 시간 이후 시간 설정
     */
    departure_time: string & Placeholder<`202406202000`>;

    /**
     * @title 출발지
     * @description X좌표,Y좌표 형식의 경도, 위도 값
     */
    origin: `${number},${number}` & Placeholder<"127.111202,37.394912">;

    /**
     * @title 목적지
     * @description X좌표,Y좌표 형식의 경도, 위도 값
     */
    destination: `${number},${number}` & Placeholder<"127.111202,37.394912">;
  }

  /**
   * @title 응답 결과
   */
  export type IGetFutureDirectionsOutput = ErrorCase | SuccessCase;

  /**
   * @title 실패 케이스
   */
  export type ErrorCase = {
    trans_id: string;
    routes: {
      result_code: number;
      result_msg: string;
    }[];
  };

  export interface SuccessCase {
    trans_id: string;
    routes: Route[];
  }

  export interface Route {
    result_code: number;
    result_msg: string;
    summary: Summary;
    sections: Section[];
  }

  export interface Summary {
    origin: Origin;
    destination: Destination;
    waypoints: any[];
    priority: string;
    bound: Bound;
    fare: Fare;
    distance: number;
    duration: number;
  }

  export interface Origin {
    name: string;
    x: number;
    y: number;
  }

  export interface Destination {
    name: string;
    x: number;
    y: number;
  }

  export interface Bound {
    min_x: number;
    min_y: number;
    max_x: number;
    max_y: number;
  }

  export interface Fare {
    taxi: number;
    toll: number;
  }

  export interface Section {
    distance: number;
    duration: number;
    bound: Bound2;
    roads: Road[];
    guides: Guide[];
  }

  export interface Bound2 {
    min_x: number;
    min_y: number;
    max_x: number;
    max_y: number;
  }

  export interface Road {
    name: string;
    distance: number;
    duration: number;
    traffic_speed: number;
    traffic_state: number;
    vertexes: number[];
  }

  export interface Guide {
    name: string;
    x: number;
    y: number;
    distance: number;
    duration: number;
    type: number;
    guidance: string;
    road_index: number;
  }
}
