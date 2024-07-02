import { IOpenData } from "./IOpenData";

/**
 * 한국지능정보사회진흥원 타입
 */
export namespace INIA {
  /**
   * @title 주차장 조회 조건
   * @description 도로명주소 혹은 지번주소를 완전히 일치해야 검색 가능
   */
  export type IGetParkingLotInput = IOpenData.ICommon.IPaginationInput &
    (Pick<ParkingLot, "rdnmadr"> | Pick<ParkingLot, "lnmadr">);

  export type ParkingLot = {
    /**
     * @title 주차장관리번호
     */
    prkplceNo?: string;

    /**
     * @title 주차장명
     */
    prkplceNm?: string;

    /**
     * @title 주차장구분
     */
    prkplceSe?: string;

    /**
     * @title 주차장유형
     */
    prkplceType?: string;

    /**
     * @title 소재지도로명주소
     */
    rdnmadr?: string;

    /**
     * @title 소재지지번주소
     */
    lnmadr?: string;

    /**
     * @title 주차구획수
     */
    prkcmprt?: string;

    /**
     * @title 급지구분
     */
    feedingSe?: string;

    /**
     * @title 부제시행구분
     */
    enforceSe?: string;

    /**
     * @title 운영요일
     */
    operDay?: string;

    /**
     * @title 평일운영시작시각
     */
    weekdayOperOpenHhmm?: string;

    /**
     * @title 평일운영종료시각
     */
    weekdayOperColseHhmm?: string;

    /**
     * @title 토요일운영시작시각
     */
    satOperOperOpenHhmm?: string;

    /**
     * @title 토요일운영종료시각
     */
    satOperCloseHhmm?: string;

    /**
     * @title 공휴일운영시작시각
     */
    holidayOperOpenHhmm?: string;

    /**
     * @title 공휴일운영종료시각
     */
    holidayCloseOpenHhmm?: string;

    /**
     * @title 요금정보
     */
    parkingchrgeInfo?: string;

    /**
     * @title 주차기본시간
     */
    basicTime?: string;

    /**
     * @title 주차기본요금
     */
    basicCharge?: string;

    /**
     * @title 추가단위시간
     */
    addUnitTime?: string;

    /**
     * @title 추가단위요금
     */
    addUnitCharge?: string;

    /**
     * @title 1일주차권요금적용시간
     */
    dayCmmtktAdjTime?: string;

    /**
     * @title 1일주차권요금
     */
    dayCmmtkt?: string;

    /**
     * @title 월정기권요금
     */
    monthCmmtkt?: string;

    /**
     * @title 결제방법
     */
    metpay?: string;

    /**
     * @title 특기사항
     */
    spcmnt?: string;

    /**
     * @title 관리기관명
     */
    institutionNm?: string;

    /**
     * @title 전화번호
     */
    phoneNumber?: string;

    /**
     * @title 위도
     */
    latitude?: string;

    /**
     * @title 경도
     */
    longitude?: string;

    /**
     * @title 장애인전용주차구역보유여부
     */
    pwdbsPpkZoneYn?: string;

    /**
     * @title 데이터기준일자
     */
    referenceDate?: string;

    /**
     * @title 제공기관코드
     */
    instt_code?: string;

    /**
     * @title 제공기관기관명
     */
    instt_nm?: string;
  };

  /**
   * @title 주차장 조회 응답
   */
  export interface IGetParkingLotOutput
    extends IOpenData.ICommon.IPaginationOutput {
    /**
     * @title 주차장 정보
     */
    parkingLots: ParkingLot[];
  }
}
