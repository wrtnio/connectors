import { Placeholder } from "@wrtnio/decorators";
import { tags } from "typia";

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
    origin: string &
      tags.Pattern<"([+-]?\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?,[+-]?\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?)"> &
      Placeholder<"127.111202,37.394912">;

    /**
     * @title 목적지
     * @description X좌표,Y좌표 형식의 경도, 위도 값
     */
    destination: string &
      tags.Pattern<"([+-]?\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?,[+-]?\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?)"> &
      Placeholder<"127.111202,37.394912">;
  }

  /**
   * @title 응답 결과
   */
  export type IGetFutureDirectionsOutput = SuccessCase;

  /**
   * @title 성공 응답
   */
  export interface SuccessCase {
    /**
     * @title 경로 요청 ID
     */
    trans_id: string;

    /**
     * @title 경로 정보
     */
    routes: Route[];
  }

  export interface Route {
    /**
     * @title 경로 탐색 결과 코드
     */
    result_code: Route.Code;

    /**
     * @title 경로 탐색 결과 메시지
     */
    result_msg: string;

    /**
     * @title 경로 요약 정보
     */
    summary?: Summary;

    /**
     * @title 구간 별 경로 정보
     */
    sections?: Section[];
  }

  export namespace Route {
    export type Code =
      | tags.Constant<0, { title: "길찾기 성공" }>
      | tags.Constant<1, { title: "길찾기 결과를 찾을 수 없음" }>
      | tags.Constant<
          101,
          { title: "경유지 지점 주변의 도로를 탐색할 수 없음" }
        >
      | tags.Constant<102, { title: "시작 지점 주변의 도로를 탐색할 수 없음" }>
      | tags.Constant<103, { title: "도착 지점 주변의 도로를 탐색할 수 없음" }>
      | tags.Constant<
          104,
          {
            title: "출발지와 도착지가 5 m 이내로 설정된 경우 경로를 탐색할 수 없음";
          }
        >
      | tags.Constant<
          105,
          { title: "시작 지점 주변의 도로에 유고 정보(교통 장애)가 있음" }
        >
      | tags.Constant<
          106,
          { title: "도착 지점 주변의 도로에 유고 정보(교통 장애)가 있음" }
        >
      | tags.Constant<
          107,
          { title: "경유지 주변의 도로에 유고 정보(교통 장애)가 있음." }
        >
      | tags.Constant<
          201,
          { title: "다중 출발지: 출발지가 탐색 영역에 포함되지 않음" }
        >
      | tags.Constant<
          202,
          { title: "다중 출발지: 출발지 최대 개수 초과 도로 선택 실패" }
        >
      | tags.Constant<203, { title: "다중 출발지: 목적지 도로 선택 실패" }>
      | tags.Constant<204, { title: "다중 출발지: 경로 탐색 처리 시간 제한" }>
      | tags.Constant<
          205,
          {
            title: "다중 출발지: 출발지 주변의 유고 정보(교통 장애)로 인한 통행 불가";
          }
        >
      | tags.Constant<
          206,
          {
            title: "다중 출발지: 목적지 주변의 유고 정보(교통 장애)로 인한 통행 불가";
          }
        >
      | tags.Constant<
          207,
          { title: "다중 출발지: 출발지가 설정한 길찾기 반경 범위를 벗어남" }
        >
      | tags.Constant<301, { title: "다중 목적지: 출발지 도로 선택 실패" }>
      | tags.Constant<302, { title: "다중 목적지: 목적지 도로 선택 실패" }>
      | tags.Constant<
          303,
          { title: "다중 목적지: 목적지 최대 개수 초과로 인해 경로 탐색 실패" }
        >
      | tags.Constant<
          304,
          { title: "다중 목적지: 목적지가 설정한 길찾기 반경 범위를 벗어남" }
        >;
  }

  export interface Summary
    extends Pick<Section, "bound" | "distance" | "duration"> {
    /**
     * @title 출발지 정보
     */
    origin: Place;

    /**
     * @title 목적지 정보
     */
    destination: Place;

    /**
     * @title 경유지 정보
     */
    waypoints: Place[];

    /**
     * @title 경로 탐색 우선순위 옵션
     */
    priority: string;

    /**
     * @title 요금 정보
     */
    fare: Fare;
  }

  export interface Place {
    /**
     * @title 장소 이름
     */
    name: string;

    /**
     * @title X 좌표 (경도)
     */
    x: number;

    /**
     * @title Y 좌표 (위도)
     */
    y: number;
  }

  /**
   * @title 모든 경로를 포함하는 사각형의 바운딩 박스(Bounding box)
   */
  export interface Bound {
    /**
     * @title 바운딩 박스 왼쪽 하단의 X 좌표
     */
    min_x: number;

    /**
     * @title 바운딩 박스 왼쪽 하단의 Y 좌표
     */
    min_y: number;

    /**
     * @title 바운딩 박스 오른쪽 상단의 X 좌표
     */
    max_x: number;

    /**
     * @title 바운딩 박스 오른쪽 상단의 Y 좌표
     */
    max_y: number;
  }

  /**
   * @title 요금 정보
   */
  export interface Fare {
    /**
     * @title 택시 요금(원)
     */
    taxi: number;

    /**
     * @title 통행 요금(원)
     */
    toll: number;
  }

  /**
   * @title 구간 별 경로 정보
   * @description 경유지가 존재할 경우 경유지 수에 1을 더한 값만큼의 섹션이 생성된다.
   */
  export interface Section {
    /**
     * @title 섹션 거리(미터)
     */
    distance: number & tags.Type<"int32">;

    /**
     * @title 전체 검색 결과 이동 시간(초)
     */
    duration: number & tags.Type<"int32">;

    /**
     * @title 모든 경로를 포함하는 사각형의 바운딩 박스
     */
    bound: Bound;

    /**
     * @title 도로 정보
     */
    roads?: Road[];

    /**
     * @title 안내 정보
     */
    guides?: Guide[];
  }

  /**
   * @title 도로 정보
   */
  export interface Road {
    /**
     * @title 도로 명
     */
    name: string;

    /**
     * @title 도로 길이(미터)
     */
    distance: number & tags.Type<"int32">;

    /**
     * @title 예상 이동 시간(초)
     * @description 현재 예상 이동 시간 및 실제 이동 시간은 동일한 값으로 설정
     */
    duration: number & tags.Type<"int32">;

    /**
     * @title 현재 교통 정보 속도(km/h)
     */
    traffic_speed: number;

    /**
     * @title 현재 교통 정보 상태
     */
    traffic_state: TrafficState;

    /**
     * @title X, Y 좌표로 구성된 1차원 배열
     */
    vertexes: number[];
  }

  /**
   * @title 현재 교통 정보 상태
   */
  export type TrafficState =
    | tags.Constant<0, { title: "교통 상태 정보 없음" }>
    | tags.Constant<1, { title: "교통 정체" }>
    | tags.Constant<2, { title: "교통 지체" }>
    | tags.Constant<3, { title: "교통 서행" }>
    | tags.Constant<4, { title: "교통 원활" }>
    | tags.Constant<6, { title: "교통사고(통행 불가)" }>;

  /**
   * @title 안내 정보
   */
  export interface Guide extends Place, Pick<Section, "distance" | "duration"> {
    /**
     * @title 안내 타입
     */
    type: GuideType;

    /**
     * @title 안내 문구
     */
    guidance: string;

    /**
     * @title 현재 가이드에 대한 링크 인덱스
     */
    road_index: number & tags.Type<"int32">;
  }

  /**
   * @title 안내 문구
   */
  export type GuideType =
    | tags.Constant<0, { title: "직진" }>
    | tags.Constant<1, { title: "좌회전" }>
    | tags.Constant<2, { title: "우회전" }>
    | tags.Constant<3, { title: "유턴" }>
    | tags.Constant<5, { title: "왼쪽 방향" }>
    | tags.Constant<6, { title: "오른쪽 방향" }>
    | tags.Constant<7, { title: "고속 도로 출구" }>
    | tags.Constant<8, { title: "왼쪽에 고속 도로 출구" }>
    | tags.Constant<9, { title: "오른쪽에 고속 도로 출구" }>
    | tags.Constant<10, { title: "고속 도로 입구" }>
    | tags.Constant<11, { title: "왼쪽에 고속 도로 입구" }>
    | tags.Constant<12, { title: "오른쪽에 고속 도로 입구" }>
    | tags.Constant<14, { title: "고가 도로 진입" }>
    | tags.Constant<15, { title: "지하 차도 진입" }>
    | tags.Constant<16, { title: "고가 도로 옆길" }>
    | tags.Constant<17, { title: "지하 차도 옆길" }>
    | tags.Constant<18, { title: "오른쪽 1시 방향" }>
    | tags.Constant<19, { title: "오른쪽 2시 방향" }>
    | tags.Constant<20, { title: "오른쪽 3시 방향" }>
    | tags.Constant<21, { title: "오른쪽 4시 방향" }>
    | tags.Constant<22, { title: "오른쪽 5시 방향" }>
    | tags.Constant<23, { title: "6시 방향" }>
    | tags.Constant<24, { title: "왼쪽 7시 방향" }>
    | tags.Constant<25, { title: "왼쪽 8시 방향" }>
    | tags.Constant<26, { title: "왼쪽 9시 방향" }>
    | tags.Constant<27, { title: "왼쪽 10시 방향" }>
    | tags.Constant<28, { title: "왼쪽 11시 방향" }>
    | tags.Constant<29, { title: "12시 방향" }>
    | tags.Constant<30, { title: "로터리에서 오른쪽 1시 방향" }>
    | tags.Constant<31, { title: "로터리에서 오른쪽 2시 방향" }>
    | tags.Constant<32, { title: "로터리에서 오른쪽 3시 방향" }>
    | tags.Constant<33, { title: "로터리에서 오른쪽 4시 방향" }>
    | tags.Constant<34, { title: "로터리에서 오른쪽 5시 방향" }>
    | tags.Constant<35, { title: "로터리에서 6시 방향" }>
    | tags.Constant<36, { title: "로터리에서 왼쪽 7시 방향" }>
    | tags.Constant<37, { title: "로터리에서 왼쪽 8시 방향" }>
    | tags.Constant<38, { title: "로터리에서 왼쪽 9시 방향" }>
    | tags.Constant<39, { title: "로터리에서 왼쪽 10시 방향" }>
    | tags.Constant<40, { title: "로터리에서 왼쪽 11시 방향" }>
    | tags.Constant<41, { title: "로터리에서 12시 방향" }>
    | tags.Constant<42, { title: "도시 고속 도로 출구" }>
    | tags.Constant<43, { title: "왼쪽에 도시 고속 도로 출구" }>
    | tags.Constant<44, { title: "오른쪽에 도시 고속 도로 출구" }>
    | tags.Constant<45, { title: "도시 고속 도로 입구" }>
    | tags.Constant<46, { title: "왼쪽에 도시 고속 도로 입구" }>
    | tags.Constant<47, { title: "오른쪽에 도시 고속 도로 입구" }>
    | tags.Constant<48, { title: "왼쪽 고속 도로 진입" }>
    | tags.Constant<49, { title: "오른쪽 고속 도로 진입" }>
    | tags.Constant<61, { title: "페리 항로 진입" }>
    | tags.Constant<62, { title: "페리 항로 진출" }>
    | tags.Constant<70, { title: "회전 교차로에서 오른쪽 1시 방향" }>
    | tags.Constant<71, { title: "회전 교차로에서 오른쪽 2시 방향" }>
    | tags.Constant<72, { title: "회전 교차로에서 오른쪽 3시 방향" }>
    | tags.Constant<73, { title: "회전 교차로에서 오른쪽 4시 방향" }>
    | tags.Constant<74, { title: "회전 교차로에서 오른쪽 5시 방향" }>
    | tags.Constant<75, { title: "회전 교차로에서 6시 방향" }>
    | tags.Constant<76, { title: "회전 교차로에서 왼쪽 7시 방향" }>
    | tags.Constant<77, { title: "회전 교차로에서 왼쪽 8시 방향" }>
    | tags.Constant<78, { title: "회전 교차로에서 왼쪽 9시 방향" }>
    | tags.Constant<79, { title: "회전 교차로에서 왼쪽 10시 방향" }>
    | tags.Constant<80, { title: "회전 교차로에서 왼쪽 11시 방향" }>
    | tags.Constant<81, { title: "회전 교차로에서 12시 방향" }>
    | tags.Constant<82, { title: "왼쪽 직진" }>
    | tags.Constant<83, { title: "오른쪽 직진" }>
    | tags.Constant<84, { title: "톨게이트 진입" }>
    | tags.Constant<85, { title: "원톨링 진입" }>
    | tags.Constant<86, { title: "분기 후 합류 구간 진입" }>
    | tags.Constant<100, { title: "출발지" }>
    | tags.Constant<101, { title: "목적지" }>
    | tags.Constant<1000, { title: "경유지" }>
    | tags.Constant<300, { title: "톨게이트" }>
    | tags.Constant<301, { title: "휴게소" }>;
}
