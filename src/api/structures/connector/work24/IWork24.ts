import { tags } from "typia";

export namespace IWork24 {
  // export interface IGetJobOpeningInput {
  //   /**
  //    * @title 인증키
  //    * @description API 인증을 위한 키
  //    */
  //   authKey: string;

  //   /**
  //    * @title 호출할 페이지 타입
  //    * @description 페이지 타입 (L: 목록, D: 상세)
  //    */
  //   callTp:
  //     | tags.Constant<"L", { title: "목록" }>
  //     | tags.Constant<"D", { title: "상세" }>;
  // }

  export type IGetJobOpeningInput = {
    /**
     * @title 반환 타입
     * @description 반환 데이터 형식 (xml)
     */
    returnType: tags.Constant<"xml", { title: "XML 형식" }>;

    /**
     * @title 검색 시작위치
     * @description 검색 시작 위치 (1 ~ 1000)
     */
    startPage: number &
      tags.Type<"int32"> &
      tags.Minimum<1> &
      tags.Maximum<1000> &
      tags.Default<1>;

    /**
     * @title 출력 건수
     * @description 한 페이지에 출력할 데이터 건수 (1 ~ 100)
     */
    display: number &
      tags.Type<"int32"> &
      tags.Minimum<1> &
      tags.Maximum<100> &
      tags.Default<10>;

    /**
     * @title 근무지역코드
     * @description 검색할 근무지역 코드 (다중검색 가능)
     */
    region?: RegionType[];

    /**
     * @title 직종코드
     * @description 검색할 직종 코드 (다중검색 가능)
     */
    occupation?: OccupationType[] & tags.MaxItems<99>;

    /**
     * @title 학력 코드
     * @description 학력 코드 (00: 학력무관, 01: 초졸이하, 02: 중졸, 03: 고졸, 04: 대졸(2~3년), 05: 대졸(4년), 06: 석사, 07: 박사)
     */
    education?:
      | tags.Constant<"00", { title: "학력무관" }>
      | tags.Constant<"01", { title: "초졸이하" }>
      | tags.Constant<"02", { title: "중졸" }>
      | tags.Constant<"03", { title: "고졸" }>
      | tags.Constant<"04", { title: "대졸(2~3년)" }>
      | tags.Constant<"05", { title: "대졸(4년)" }>
      | tags.Constant<"06", { title: "석사" }>
      | tags.Constant<"07", { title: "박사" }>;

    /**
     * @title 임금 형태
     */
    salaryOptions?: {
      /**
       * @title 임금형태
       * @description 임금 형태 (D: 일급, H: 시급, M: 월급, Y: 연봉)
       */
      salTp:
        | tags.Constant<"D", { title: "일급" }>
        | tags.Constant<"H", { title: "시급" }>
        | tags.Constant<"M", { title: "월급" }>
        | tags.Constant<"Y", { title: "연봉" }>;

      /**
       * @title 최소급여
       * @description 검색할 최소 급여 금액
       */
      minPay: number & tags.Type<"int32">;

      /**
       * @title 최대급여
       * @description 검색할 최대 급여 금액
       */
      maxPay: number & tags.Type<"int32">;
    };

    /**
     * @title 경력 조건
     */
    careerOptions?: {
      /**
       * @title 경력 코드
       * @description 경력 코드 (N: 신입, E: 경력, Z: 관계없음)
       */
      career:
        | tags.Constant<"N", { title: "신입" }>
        | tags.Constant<"E", { title: "경력" }>
        | tags.Constant<"Z", { title: "관계없음" }>;

      /**
       * @title 경력 최소개월 수
       * @description 경력의 최소 개월 수
       */
      minCareerM: number & tags.Type<"int32">;

      /**
       * @title 경력 최대개월 수
       * @description 경력의 최대 개월 수
       */
      maxCareerM: number & tags.Type<"int32">;
    };

    /**
     * @title 우대조건
     * @description 우대조건 (Y: 장애인 병행채용, D: 장애인만 채용)
     */
    pref?: (
      | tags.Constant<"Y", { title: "장애인 병행채용" }>
      | tags.Constant<"D", { title: "장애인만 채용" }>
    )[];

    /**
     * @title 역세권 코드
     * @description 역세권 코드 (다중검색 가능)
     */
    subway?: SubwayType[];

    /**
     * @title 고용형태
     * @description 고용형태 (다중검색 가능)
     */
    empTp?: (
      | tags.Constant<"4", { title: "파견근로" }>
      | tags.Constant<"10", { title: "기간의 정함이 없는 근로계약" }>
      | tags.Constant<
          "11",
          { title: "기간의 정함이 없는 근로계약(시간(선택)제)" }
        >
      | tags.Constant<"20", { title: "기간의 정함이 있는 근로계약" }>
      | tags.Constant<
          "21",
          { title: "기간의 정함이 있는 근로계약(시간(선택)제)" }
        >
      | tags.Constant<"Y", { title: "대체인력채용" }>
    )[];

    /**
     * @title 근무기간
     * @description 근무기간 (1: 1~3개월, 3: 3~6개월, 6: 6~12개월, 12: 12개월 이상)
     */
    termContractMmcnt?: (
      | tags.Constant<"1", { title: "1~3개월" }>
      | tags.Constant<"3", { title: "3~6개월" }>
      | tags.Constant<"6", { title: "6~12개월" }>
      | tags.Constant<"12", { title: "12개월 이상" }>
    )[];

    /**
     * @title 근무형태
     * @description 근무형태 (1: 주 5일 근무, 2: 주 6일 근무, 3: 토요 격주 휴무, 9: 기타)
     */
    holidayTp?: (
      | tags.Constant<"1", { title: "주 5일 근무" }>
      | tags.Constant<"2", { title: "주 6일 근무" }>
      | tags.Constant<"3", { title: "토요 격주 휴무" }>
      | tags.Constant<"9", { title: "기타" }>
    )[];

    /**
     * @title 기업형태
     * @description 기업형태 (다중검색 가능)
     */
    coTp?:
      | tags.Constant<"01", { title: "대기업" }>
      | tags.Constant<"03", { title: "벤처기업" }>
      | tags.Constant<"04", { title: "공공기관" }>
      | tags.Constant<"05", { title: "외국계기업" }>
      | tags.Constant<"09", { title: "청년친화강소기업" }>;

    /**
     * @title 사업자등록번호
     * @description 사업자등록번호
     */
    busino?: string;

    /**
     * @title 강소기업 여부
     * @description 강소기업 여부 (Y: 강소기업)
     */
    dtlSmlgntYn?: tags.Constant<"Y", { title: "강소기업 여부" }>;

    /**
     * @title 일학습병행기업 여부
     * @description 일학습병행기업 여부 (Y: 일학습병행기업)
     */
    workStudyJoinYn?: tags.Constant<"Y", { title: "일학습병행기업 여부" }>;

    /**
     * @title 강소기업 분류코드
     * @description 강소기업 분류코드
     */
    smlgntCoClcd?: SmlGntCoClcd;

    /**
     * @title 사원수
     * @description 사원수 (다중검색 가능)
     */
    workerCnt?: (
      | tags.Constant<"W5", { title: "5인 미만" }>
      | tags.Constant<"W9", { title: "5인 ~ 10인" }>
      | tags.Constant<"W10", { title: "10인 ~ 30인" }>
      | tags.Constant<"W30", { title: "30인 ~ 50인" }>
      | tags.Constant<"W50", { title: "50인 ~ 100인" }>
      | tags.Constant<"W100", { title: "100인 이상" }>
    )[];

    /**
     * @title 근무편의
     * @description 근무편의 (다중검색 가능)
     */
    welfare?: (
      | tags.Constant<"01", { title: "기숙사" }>
      | tags.Constant<"02", { title: "통근버스" }>
      | tags.Constant<"04", { title: "중식제공(또는 중식비 지원)" }>
      | tags.Constant<"11", { title: "차량유지비" }>
      | tags.Constant<"12", { title: "교육비 지원" }>
      | tags.Constant<"13", { title: "자녀학자금 지원" }>
      | tags.Constant<"06", { title: "주택자금 지원" }>
      | tags.Constant<"09", { title: "기타" }>
    )[];

    /**
     * @title 자격면허 코드
     * @description 자격면허 코드 (다중검색 가능)
     *
     * 사실 상 사용이 불가능한 수준으로 너무 많은 코드 값들이 존재하여 생략한다.
     */
    certLic?: string[];

    /**
     * @title 등록일
     * @description 등록일 (D-0: 오늘, D-3: 3일, M-1: 한달, W-1: 1주 이내, W-2: 2주 이내)
     */
    regdate?:
      | tags.Constant<"D-0", { title: "오늘" }>
      | tags.Constant<"D-3", { title: "3일" }>
      | tags.Constant<"M-1", { title: "한달" }>
      | tags.Constant<"W-1", { title: "1주 이내" }>
      | tags.Constant<"W-2", { title: "2주 이내" }>;

    /**
     * @title 키워드검색
     * @description 키워드 검색어 (다중검색 가능)
     */
    keyword?: string[];

    /**
     * @title 채용시까지 구인여부
     * @description 채용시까지 구인여부 (Y: 채용시까지, N: 채용시까지 아님)
     */
    untilEmpWantedYn?:
      | tags.Constant<"Y", { title: "채용시까지 구인여부" }>
      | tags.Constant<"N", { title: "채용시까지 구인 아님" }>;

    /**
     * @title 최소 구인인증일자
     * @description 최소 구인인증일자
     */
    minWantedAuthDt?: string & tags.Format<"date-time">;

    /**
     * @title 최대 구인인증일자
     * @description 최대 구인인증일자
     */
    maxWantedAuthDt?: string & tags.Format<"date-time">;

    /**
     * @title 채용구분
     * @description 채용구분 (1: 상용직, 2: 일용직)
     */
    empTpGb?:
      | tags.Constant<"1", { title: "상용직" }>
      | tags.Constant<"2", { title: "일용직" }>;

    /**
     * @title 등록일 기준 정렬방식
     * @description 등록일 기준 정렬방식 (DESC: 등록일 상향정렬, ASC: 등록일 하향정렬)
     */
    sortOrderBy?:
      | tags.Constant<"DESC", { title: "등록일 상향정렬" }>
      | tags.Constant<"ASC", { title: "등록일 하향정렬" }>;

    /**
     * @title 전공코드
     * @description 전공코드 (다중검색 가능)
     */
    major?: string[];

    /**
     * @title 외국어코드
     * @description 외국어코드 (다중검색 가능)
     */
    foreignLanguage?: ForeignLanguage[];

    /**
     * @title 기타 우대조건 (컴퓨터 활용)
     * @description 기타 우대조건 (다중검색 가능)
     */
    comPreferential?: (
      | tags.Constant<"1", { title: "문서작성" }>
      | tags.Constant<"2", { title: "스프레드시트" }>
      | tags.Constant<"4", { title: "프리젠테이션" }>
      | tags.Constant<"6", { title: "회계프로그램" }>
      | tags.Constant<"9", { title: "기타" }>
    )[];

    /**
     * @title 기타 우대조건 (일반)
     * @description 기타 우대조건 (다중검색 가능)
     */
    pfPreferential?: (
      | tags.Constant<"05", { title: "차량소지자" }>
      | tags.Constant<"07", { title: "고용촉진장려금대상자" }>
      | tags.Constant<"08", { title: "보훈취업지원대상자" }>
      | tags.Constant<"09", { title: "장기복무 제대군인" }>
      | tags.Constant<"10", { title: "북한이탈주민" }>
      | tags.Constant<"14", { title: "운전가능자" }>
      | tags.Constant<"S", { title: "장애인" }>
      | tags.Constant<"B", { title: "(준)고령자(50세이상)" }>
    )[];

    /**
     * @title 근무시간
     * @description 근무시간 (다중검색 가능)
     */
    workHrCd?: (
      | tags.Constant<"1", { title: "오전(06:00~12:00)" }>
      | tags.Constant<"2", { title: "오후(12:00~18:00)" }>
      | tags.Constant<"3", { title: "저녁(18:00~24:00)" }>
      | tags.Constant<"4", { title: "새벽(00:00~06:00)" }>
      | tags.Constant<"5", { title: "오전~오후" }>
      | tags.Constant<"6", { title: "오후~저녁" }>
      | tags.Constant<"7", { title: "저녁~새벽" }>
      | tags.Constant<"8", { title: "기타" }>
      | tags.Constant<"9", { title: "기타" }>
      | tags.Constant<"99", { title: "기타" }>
    )[];
  };

  /**
   * @title 직무지역코드
   */
  export type RegionType =
    | tags.Constant<"00000", { title: "지역무관" }>
    | tags.Constant<"11000", { title: "서울" }>
    | tags.Constant<"11110", { title: "서울 종로구" }>
    | tags.Constant<"11140", { title: "서울 중구" }>
    | tags.Constant<"11170", { title: "서울 용산구" }>
    | tags.Constant<"11200", { title: "서울 성동구" }>
    | tags.Constant<"11215", { title: "서울 광진구" }>
    | tags.Constant<"11230", { title: "서울 동대문구" }>
    | tags.Constant<"11260", { title: "서울 중랑구" }>
    | tags.Constant<"11290", { title: "서울 성북구" }>
    | tags.Constant<"11305", { title: "서울 강북구" }>
    | tags.Constant<"11320", { title: "서울 도봉구" }>
    | tags.Constant<"11350", { title: "서울 노원구" }>
    | tags.Constant<"11380", { title: "서울 은평구" }>
    | tags.Constant<"11410", { title: "서울 서대문구" }>
    | tags.Constant<"11440", { title: "서울 마포구" }>
    | tags.Constant<"11470", { title: "서울 양천구" }>
    | tags.Constant<"11500", { title: "서울 강서구" }>
    | tags.Constant<"11530", { title: "서울 구로구" }>
    | tags.Constant<"11545", { title: "서울 금천구" }>
    | tags.Constant<"11560", { title: "서울 영등포구" }>
    | tags.Constant<"11590", { title: "서울 동작구" }>
    | tags.Constant<"11620", { title: "서울 관악구" }>
    | tags.Constant<"11650", { title: "서울 서초구" }>
    | tags.Constant<"11680", { title: "서울 강남구" }>
    | tags.Constant<"11710", { title: "서울 송파구" }>
    | tags.Constant<"11740", { title: "서울 강동구" }>
    | tags.Constant<"26000", { title: "부산" }>
    | tags.Constant<"26110", { title: "부산 중구" }>
    | tags.Constant<"26140", { title: "부산 서구" }>
    | tags.Constant<"26170", { title: "부산 동구" }>
    | tags.Constant<"26200", { title: "부산 영도구" }>
    | tags.Constant<"26230", { title: "부산 부산진구" }>
    | tags.Constant<"26260", { title: "부산 동래구" }>
    | tags.Constant<"26290", { title: "부산 남구" }>
    | tags.Constant<"26320", { title: "부산 북구" }>
    | tags.Constant<"26350", { title: "부산 해운대구" }>
    | tags.Constant<"26380", { title: "부산 사하구" }>
    | tags.Constant<"26410", { title: "부산 금정구" }>
    | tags.Constant<"26440", { title: "부산 강서구" }>
    | tags.Constant<"26470", { title: "부산 연제구" }>
    | tags.Constant<"26500", { title: "부산 수영구" }>
    | tags.Constant<"26530", { title: "부산 사상구" }>
    | tags.Constant<"26710", { title: "부산 기장군" }>
    | tags.Constant<"27000", { title: "대구" }>
    | tags.Constant<"27110", { title: "대구 중구" }>
    | tags.Constant<"27140", { title: "대구 동구" }>
    | tags.Constant<"27170", { title: "대구 서구" }>
    | tags.Constant<"27200", { title: "대구 남구" }>
    | tags.Constant<"27230", { title: "대구 북구" }>
    | tags.Constant<"27260", { title: "대구 수성구" }>
    | tags.Constant<"27290", { title: "대구 달서구" }>
    | tags.Constant<"27710", { title: "대구 달성군" }>
    | tags.Constant<"27720", { title: "대구 군위군" }>
    | tags.Constant<"28000", { title: "인천" }>
    | tags.Constant<"28110", { title: "인천 중구" }>
    | tags.Constant<"28140", { title: "인천 동구" }>
    | tags.Constant<"28177", { title: "인천 미추홀구" }>
    | tags.Constant<"28185", { title: "인천 연수구" }>
    | tags.Constant<"28200", { title: "인천 남동구" }>
    | tags.Constant<"28237", { title: "인천 부평구" }>
    | tags.Constant<"28245", { title: "인천 계양구" }>
    | tags.Constant<"28260", { title: "인천 서구" }>
    | tags.Constant<"28710", { title: "인천 강화군" }>
    | tags.Constant<"28720", { title: "인천 옹진군" }>
    | tags.Constant<"29000", { title: "광주" }>
    | tags.Constant<"29110", { title: "광주 동구" }>
    | tags.Constant<"29140", { title: "광주 서구" }>
    | tags.Constant<"29155", { title: "광주 남구" }>
    | tags.Constant<"29170", { title: "광주 북구" }>
    | tags.Constant<"29200", { title: "광주 광산구" }>
    | tags.Constant<"30000", { title: "대전" }>
    | tags.Constant<"30110", { title: "대전 동구" }>
    | tags.Constant<"30140", { title: "대전 중구" }>
    | tags.Constant<"30170", { title: "대전 서구" }>
    | tags.Constant<"30200", { title: "대전 유성구" }>
    | tags.Constant<"30230", { title: "대전 대덕구" }>
    | tags.Constant<"31000", { title: "울산" }>
    | tags.Constant<"31110", { title: "울산 중구" }>
    | tags.Constant<"31140", { title: "울산 남구" }>
    | tags.Constant<"31170", { title: "울산 동구" }>
    | tags.Constant<"31200", { title: "울산 북구" }>
    | tags.Constant<"31710", { title: "울산 울주군" }>
    | tags.Constant<"36110", { title: "세종" }>
    | tags.Constant<"41000", { title: "경기" }>
    | tags.Constant<"41110", { title: "경기 수원시" }>
    | tags.Constant<"41111", { title: "경기 수원시 장안구" }>
    | tags.Constant<"41113", { title: "경기 수원시 권선구" }>
    | tags.Constant<"41115", { title: "경기 수원시 팔달구" }>
    | tags.Constant<"41117", { title: "경기 수원시 영통구" }>
    | tags.Constant<"41130", { title: "경기 성남시" }>
    | tags.Constant<"41131", { title: "경기 성남시 수정구" }>
    | tags.Constant<"41133", { title: "경기 성남시 중원구" }>
    | tags.Constant<"41135", { title: "경기 성남시 분당구" }>
    | tags.Constant<"41150", { title: "경기 의정부시" }>
    | tags.Constant<"41170", { title: "경기 안양시" }>
    | tags.Constant<"41171", { title: "경기 안양시 만안구" }>
    | tags.Constant<"41173", { title: "경기 안양시 동안구" }>
    | tags.Constant<"41190", { title: "경기 부천시" }>
    | tags.Constant<"41192", { title: "경기 부천시 원미구" }>
    | tags.Constant<"41194", { title: "경기 부천시 소사구" }>
    | tags.Constant<"41196", { title: "경기 부천시 오정구" }>
    | tags.Constant<"41210", { title: "경기 광명시" }>
    | tags.Constant<"41220", { title: "경기 평택시" }>
    | tags.Constant<"41250", { title: "경기 동두천시" }>
    | tags.Constant<"41270", { title: "경기 안산시" }>
    | tags.Constant<"41271", { title: "경기 안산시 상록구" }>
    | tags.Constant<"41273", { title: "경기 안산시 단원구" }>
    | tags.Constant<"41280", { title: "경기 고양시" }>
    | tags.Constant<"41281", { title: "경기 고양시 덕양구" }>
    | tags.Constant<"41285", { title: "경기 고양시 일산동구" }>
    | tags.Constant<"41287", { title: "경기 고양시 일산서구" }>
    | tags.Constant<"41290", { title: "경기 과천시" }>
    | tags.Constant<"41310", { title: "경기 구리시" }>
    | tags.Constant<"41360", { title: "경기 남양주시" }>
    | tags.Constant<"41370", { title: "경기 오산시" }>
    | tags.Constant<"41390", { title: "경기 시흥시" }>
    | tags.Constant<"41410", { title: "경기 군포시" }>
    | tags.Constant<"41430", { title: "경기 의왕시" }>
    | tags.Constant<"41450", { title: "경기 하남시" }>
    | tags.Constant<"41460", { title: "경기 용인시" }>
    | tags.Constant<"41461", { title: "경기 용인시 처인구" }>
    | tags.Constant<"41463", { title: "경기 용인시 기흥구" }>
    | tags.Constant<"41465", { title: "경기 용인시 수지구" }>
    | tags.Constant<"41480", { title: "경기 파주시" }>
    | tags.Constant<"41500", { title: "경기 이천시" }>
    | tags.Constant<"41550", { title: "경기 안성시" }>
    | tags.Constant<"41570", { title: "경기 김포시" }>
    | tags.Constant<"41590", { title: "경기 화성시" }>
    | tags.Constant<"41610", { title: "경기 광주시" }>
    | tags.Constant<"41630", { title: "경기 양주시" }>
    | tags.Constant<"41650", { title: "경기 포천시" }>
    | tags.Constant<"41670", { title: "경기 여주시" }>
    | tags.Constant<"41800", { title: "경기 연천군" }>
    | tags.Constant<"41820", { title: "경기 가평군" }>
    | tags.Constant<"41830", { title: "경기 양평군" }>
    | tags.Constant<"43000", { title: "충북" }>
    | tags.Constant<"43110", { title: "충북 청주시" }>
    | tags.Constant<"43111", { title: "충북 청주시 상당구" }>
    | tags.Constant<"43112", { title: "충북 청주시 서원구" }>
    | tags.Constant<"43113", { title: "충북 청주시 흥덕구" }>
    | tags.Constant<"43114", { title: "충북 청주시 청원구" }>
    | tags.Constant<"43130", { title: "충북 충주시" }>
    | tags.Constant<"43150", { title: "충북 제천시" }>
    | tags.Constant<"43720", { title: "충북 보은군" }>
    | tags.Constant<"43730", { title: "충북 옥천군" }>
    | tags.Constant<"43740", { title: "충북 영동군" }>
    | tags.Constant<"43745", { title: "충북 증평군" }>
    | tags.Constant<"43750", { title: "충북 진천군" }>
    | tags.Constant<"43760", { title: "충북 괴산군" }>
    | tags.Constant<"43770", { title: "충북 음성군" }>
    | tags.Constant<"43800", { title: "충북 단양군" }>
    | tags.Constant<"44000", { title: "충남" }>
    | tags.Constant<"44130", { title: "충남 천안시" }>
    | tags.Constant<"44131", { title: "충남 천안시 동남구" }>
    | tags.Constant<"44133", { title: "충남 천안시 서북구" }>
    | tags.Constant<"44150", { title: "충남 공주시" }>
    | tags.Constant<"44180", { title: "충남 보령시" }>
    | tags.Constant<"44200", { title: "충남 아산시" }>
    | tags.Constant<"44210", { title: "충남 서산시" }>
    | tags.Constant<"44230", { title: "충남 논산시" }>
    | tags.Constant<"44250", { title: "충남 계룡시" }>
    | tags.Constant<"44270", { title: "충남 당진시" }>
    | tags.Constant<"44710", { title: "충남 금산군" }>
    | tags.Constant<"44760", { title: "충남 부여군" }>
    | tags.Constant<"44770", { title: "충남 서천군" }>
    | tags.Constant<"44790", { title: "충남 청양군" }>
    | tags.Constant<"44800", { title: "충남 홍성군" }>
    | tags.Constant<"44810", { title: "충남 예산군" }>
    | tags.Constant<"44825", { title: "충남 태안군" }>
    | tags.Constant<"46000", { title: "전남" }>
    | tags.Constant<"46110", { title: "전남 목포시" }>
    | tags.Constant<"46130", { title: "전남 여수시" }>
    | tags.Constant<"46150", { title: "전남 순천시" }>
    | tags.Constant<"46170", { title: "전남 나주시" }>
    | tags.Constant<"46230", { title: "전남 광양시" }>
    | tags.Constant<"46710", { title: "전남 담양군" }>
    | tags.Constant<"46720", { title: "전남 곡성군" }>
    | tags.Constant<"46730", { title: "전남 구례군" }>
    | tags.Constant<"46770", { title: "전남 고흥군" }>
    | tags.Constant<"46780", { title: "전남 보성군" }>
    | tags.Constant<"46790", { title: "전남 화순군" }>
    | tags.Constant<"46800", { title: "전남 장흥군" }>
    | tags.Constant<"46810", { title: "전남 강진군" }>
    | tags.Constant<"46820", { title: "전남 해남군" }>
    | tags.Constant<"46830", { title: "전남 영암군" }>
    | tags.Constant<"46840", { title: "전남 무안군" }>
    | tags.Constant<"46860", { title: "전남 함평군" }>
    | tags.Constant<"46870", { title: "전남 영광군" }>
    | tags.Constant<"46880", { title: "전남 장성군" }>
    | tags.Constant<"46890", { title: "전남 완도군" }>
    | tags.Constant<"46900", { title: "전남 진도군" }>
    | tags.Constant<"46910", { title: "전남 신안군" }>
    | tags.Constant<"47000", { title: "경북" }>
    | tags.Constant<"47110", { title: "경북 포항시" }>
    | tags.Constant<"47111", { title: "경북 포항시 남구" }>
    | tags.Constant<"47113", { title: "경북 포항시 북구" }>
    | tags.Constant<"47130", { title: "경북 경주시" }>
    | tags.Constant<"47150", { title: "경북 김천시" }>
    | tags.Constant<"47170", { title: "경북 안동시" }>
    | tags.Constant<"47190", { title: "경북 구미시" }>
    | tags.Constant<"47210", { title: "경북 영주시" }>
    | tags.Constant<"47230", { title: "경북 영천시" }>
    | tags.Constant<"47250", { title: "경북 상주시" }>
    | tags.Constant<"47280", { title: "경북 문경시" }>
    | tags.Constant<"47290", { title: "경북 경산시" }>
    | tags.Constant<"47730", { title: "경북 의성군" }>
    | tags.Constant<"47750", { title: "경북 청송군" }>
    | tags.Constant<"47760", { title: "경북 영양군" }>
    | tags.Constant<"47770", { title: "경북 영덕군" }>
    | tags.Constant<"47820", { title: "경북 청도군" }>
    | tags.Constant<"47830", { title: "경북 고령군" }>
    | tags.Constant<"47840", { title: "경북 성주군" }>
    | tags.Constant<"47850", { title: "경북 칠곡군" }>
    | tags.Constant<"47900", { title: "경북 예천군" }>
    | tags.Constant<"47920", { title: "경북 봉화군" }>
    | tags.Constant<"47930", { title: "경북 울진군" }>
    | tags.Constant<"47940", { title: "경북 울릉군" }>
    | tags.Constant<"48000", { title: "경남" }>
    | tags.Constant<"48120", { title: "경남 창원시" }>
    | tags.Constant<"48121", { title: "경남 창원시 의창구" }>
    | tags.Constant<"48123", { title: "경남 창원시 성산구" }>
    | tags.Constant<"48125", { title: "경남 창원시 마산합포구" }>
    | tags.Constant<"48127", { title: "경남 창원시 마산회원구" }>
    | tags.Constant<"48129", { title: "경남 창원시 진해구" }>
    | tags.Constant<"48170", { title: "경남 진주시" }>
    | tags.Constant<"48220", { title: "경남 통영시" }>
    | tags.Constant<"48240", { title: "경남 사천시" }>
    | tags.Constant<"48250", { title: "경남 김해시" }>
    | tags.Constant<"48270", { title: "경남 밀양시" }>
    | tags.Constant<"48310", { title: "경남 거제시" }>
    | tags.Constant<"48330", { title: "경남 양산시" }>
    | tags.Constant<"48720", { title: "경남 의령군" }>
    | tags.Constant<"48730", { title: "경남 함안군" }>
    | tags.Constant<"48740", { title: "경남 창녕군" }>
    | tags.Constant<"48820", { title: "경남 고성군" }>
    | tags.Constant<"48840", { title: "경남 남해군" }>
    | tags.Constant<"48850", { title: "경남 하동군" }>
    | tags.Constant<"48860", { title: "경남 산청군" }>
    | tags.Constant<"48870", { title: "경남 함양군" }>
    | tags.Constant<"48880", { title: "경남 거창군" }>
    | tags.Constant<"48890", { title: "경남 합천군" }>
    | tags.Constant<"50000", { title: "제주" }>
    | tags.Constant<"50110", { title: "제주 제주시" }>
    | tags.Constant<"50130", { title: "제주 서귀포시" }>
    | tags.Constant<"51000", { title: "강원" }>
    | tags.Constant<"51110", { title: "강원 춘천시" }>
    | tags.Constant<"51130", { title: "강원 원주시" }>
    | tags.Constant<"51150", { title: "강원 강릉시" }>
    | tags.Constant<"51170", { title: "강원 동해시" }>
    | tags.Constant<"51190", { title: "강원 태백시" }>
    | tags.Constant<"51210", { title: "강원 속초시" }>
    | tags.Constant<"51230", { title: "강원 삼척시" }>
    | tags.Constant<"51720", { title: "강원 홍천군" }>
    | tags.Constant<"51730", { title: "강원 횡성군" }>
    | tags.Constant<"51750", { title: "강원 영월군" }>
    | tags.Constant<"51760", { title: "강원 평창군" }>
    | tags.Constant<"51770", { title: "강원 정선군" }>
    | tags.Constant<"51780", { title: "강원 철원군" }>
    | tags.Constant<"51790", { title: "강원 화천군" }>
    | tags.Constant<"51800", { title: "강원 양구군" }>
    | tags.Constant<"51810", { title: "강원 인제군" }>
    | tags.Constant<"51820", { title: "강원 고성군" }>
    | tags.Constant<"51830", { title: "강원 양양군" }>
    | tags.Constant<"52000", { title: "전북" }>
    | tags.Constant<"52110", { title: "전북 전주시" }>
    | tags.Constant<"52111", { title: "전북 전주시 완산구" }>
    | tags.Constant<"52113", { title: "전북 전주시 덕진구" }>
    | tags.Constant<"52130", { title: "전북 군산시" }>
    | tags.Constant<"52140", { title: "전북 익산시" }>
    | tags.Constant<"52180", { title: "전북 정읍시" }>
    | tags.Constant<"52190", { title: "전북 남원시" }>
    | tags.Constant<"52210", { title: "전북 김제시" }>
    | tags.Constant<"52710", { title: "전북 완주군" }>
    | tags.Constant<"52720", { title: "전북 진안군" }>
    | tags.Constant<"52730", { title: "전북 무주군" }>
    | tags.Constant<"52740", { title: "전북 장수군" }>
    | tags.Constant<"52750", { title: "전북 임실군" }>
    | tags.Constant<"52770", { title: "전북 순창군" }>
    | tags.Constant<"52790", { title: "전북 고창군" }>
    | tags.Constant<"52800", { title: "전북 부안군" }>;

  /**
   * @title 직종코드
   */
  export type OccupationType =
    | tags.Constant<"01", { title: "경영·사무·금융·보험" }>
    | tags.Constant<"011", { title: "행정·경영·금융·보험 관리직" }>
    | tags.Constant<"011100", { title: "의회의원·고위공무원 및 공공단체임원" }>
    | tags.Constant<"011200", { title: "기업 고위임원" }>
    | tags.Constant<"012100", { title: "정부행정 관리자" }>
    | tags.Constant<"012200", { title: "경영지원 관리자" }>
    | tags.Constant<"012201", { title: "경영기획 부서장" }>
    | tags.Constant<"012202", { title: "인사·노무·교육·총무·감사 부서장" }>
    | tags.Constant<"012203", { title: "자재·구매 부서장" }>
    | tags.Constant<"012204", { title: "재무·회계·경리 부서장" }>
    | tags.Constant<"012205", { title: "기타 경영지원 서비스 관리자" }>
    | tags.Constant<"012300", { title: "마케팅·광고·홍보 관리자(부서장)" }>
    | tags.Constant<"012400", { title: "금융·보험 관리자(부서장)" }>
    | tags.Constant<
        "012",
        { title: "교육·법률·복지·의료·예술·방송·정보통신 등 전문서비스 관리직" }
      >
    | tags.Constant<"013100", { title: "연구 관리자" }>
    | tags.Constant<"013200", { title: "교육 관리자(부서장)" }>
    | tags.Constant<"013300", { title: "법률·경찰·소방·교도 관리자" }>
    | tags.Constant<"013400", { title: "보건·의료 관리자(부서장)" }>
    | tags.Constant<"013500", { title: "사회복지 관리자(부서장)" }>
    | tags.Constant<"013600", { title: "예술·디자인·방송 관리자(부서장)" }>
    | tags.Constant<"013700", { title: "정보통신 관리자(부서장)" }>
    | tags.Constant<
        "013900",
        { title: "부동산·조사·인력알선 및 기타 전문서비스 관리자" }
      >
    | tags.Constant<"013901", { title: "부동산·임대업 관리자" }>
    | tags.Constant<"013902", { title: "아파트 관리소장" }>
    | tags.Constant<"013903", { title: "빌딩 관리소장" }>
    | tags.Constant<
        "013904",
        { title: "조사, 인력공급·알선 및 기타 전문서비스 관리자(부서장)" }
      >
    | tags.Constant<"014100", { title: "미용·여행·숙박·스포츠 관리자" }>
    | tags.Constant<
        "013",
        { title: "미용·여행·숙박·음식 등 개인서비스 및 영업·판매·운송 관리직" }
      >
    | tags.Constant<"014101", { title: "미용·여행·숙박 관리자" }>
    | tags.Constant<"014102", { title: "스포츠 관리자" }>
    | tags.Constant<"014200", { title: "음식서비스 관리자" }>
    | tags.Constant<"014300", { title: "경비·청소 관리자" }>
    | tags.Constant<"014301", { title: "경비 관리자" }>
    | tags.Constant<"014302", { title: "환경·청소 관리자" }>
    | tags.Constant<"015100", { title: "영업·판매 관리자" }>
    | tags.Constant<"015101", { title: "영업 관리자(영업소장·지점장)" }>
    | tags.Constant<"015102", { title: "판매 관리자(소규모 판매점장 제외)" }>
    | tags.Constant<"015200", { title: "운송 관리자(부서장)" }>
    | tags.Constant<"015900", { title: "각종 단체 및 기타 고객서비스 관리자" }>
    | tags.Constant<"014", { title: "건설·채굴·제조·생산 관리직" }>
    | tags.Constant<"016100", { title: "건설·채굴 관리자(부서장)" }>
    | tags.Constant<"016200", { title: "전기·가스·수도 관리자(부서장)" }>
    | tags.Constant<"016300", { title: "제조·생산 관리자" }>
    | tags.Constant<"016301", { title: "기계·금속·비금속 제조 관리자(공장장)" }>
    | tags.Constant<"016302", { title: "화학 제조 관리자(공장장)" }>
    | tags.Constant<"016303", { title: "섬유·의류 제조 관리자(공장장)" }>
    | tags.Constant<"016304", { title: "전기·전자 제조 관리자(공장장)" }>
    | tags.Constant<"016305", { title: "식품가공 제조 관리자(공장장)" }>
    | tags.Constant<"016306", { title: "기타 제품 제조 관리자(공장장)" }>
    | tags.Constant<"016900", { title: "기타 건설·전기 및 제조 관리자" }>
    | tags.Constant<"016901", { title: "수리·정비 관리자(부서장)" }>
    | tags.Constant<"016902", { title: "농림어업 및 기타 생산 관리자" }>
    | tags.Constant<"015", { title: "행정·경영·회계·광고·상품기획 전문가" }>
    | tags.Constant<"021000", { title: "정부·공공행정 전문가" }>
    | tags.Constant<"022100", { title: "경영 컨설턴트(M&A·창업·인증심사·FTA)" }>
    | tags.Constant<"022201", { title: "인사·노무 전문가" }>
    | tags.Constant<"022202", { title: "HRD·교육·훈련 전문가" }>
    | tags.Constant<"023100", { title: "회계사" }>
    | tags.Constant<"023200", { title: "세무사" }>
    | tags.Constant<"023301", { title: "관세사" }>
    | tags.Constant<"023302", { title: "FTA 원산지관리사" }>
    | tags.Constant<"023400", { title: "감정 전문가" }>
    | tags.Constant<"023401", { title: "감정평가사" }>
    | tags.Constant<
        "023402",
        { title: "감정사(문화재·보석·문서·음식료품 및 조향사)" }
      >
    | tags.Constant<"024101", { title: "광고·홍보 전문가" }>
    | tags.Constant<"024102", { title: "마케팅 전문가" }>
    | tags.Constant<"024200", { title: "조사 전문가" }>
    | tags.Constant<"024301", { title: "상품 기획자" }>
    | tags.Constant<"024302", { title: "머천다이저(MD)" }>
    | tags.Constant<"024400", { title: "행사 기획자" }>
    | tags.Constant<"024401", { title: "행사·이벤트 기획자" }>
    | tags.Constant<"024402", { title: "전시·회의 기획자" }>
    | tags.Constant<"231400", { title: "직업상담사" }>
    | tags.Constant<"016", { title: "정부·공공행정 사무" }>
    | tags.Constant<"025100", { title: "조세행정 사무원" }>
    | tags.Constant<"025200", { title: "관세행정 사무원" }>
    | tags.Constant<"025300", { title: "병무행정 사무원" }>
    | tags.Constant<"025401", { title: "국가·지방행정 사무원" }>
    | tags.Constant<"025402", { title: "군무원" }>
    | tags.Constant<"025500", { title: "공공행정 사무원" }>
    | tags.Constant<"026100", { title: "기획·마케팅 사무원" }>
    | tags.Constant<"017", { title: "경영지원 사무" }>
    | tags.Constant<"026101", { title: "경영 기획 사무원" }>
    | tags.Constant<"026102", { title: "마케팅·광고·홍보·상품기획 사무원" }>
    | tags.Constant<"026103", { title: "영업 기획·관리·지원 사무원" }>
    | tags.Constant<"026104", { title: "분양·임대 사무원" }>
    | tags.Constant<"026200", { title: "인사·교육·훈련 사무원" }>
    | tags.Constant<"026201", { title: "인사 사무원" }>
    | tags.Constant<"026202", { title: "노무 사무원" }>
    | tags.Constant<"026203", { title: "교육·훈련 사무원" }>
    | tags.Constant<"026300", { title: "총무 사무원 및 대학 행정조교" }>
    | tags.Constant<"026301", { title: "총무 및 일반 사무원" }>
    | tags.Constant<"026302", { title: "병원행정 사무원(원무)" }>
    | tags.Constant<"026303", { title: "학교행정 사무원(교무)" }>
    | tags.Constant<"026304", { title: "대학 행정조교" }>
    | tags.Constant<"026305", { title: "협회·회원단체 사무원" }>
    | tags.Constant<"026306", { title: "기숙사사감 및 독서실·고시원 총무" }>
    | tags.Constant<"026400", { title: "감사 사무원" }>
    | tags.Constant<"215200", { title: "대학 교육 조교(TA) 및 연구 조교(RA)" }>
    | tags.Constant<"222000", { title: "법률 사무원" }>
    | tags.Constant<"018", { title: "회계·경리 사무" }>
    | tags.Constant<"027100", { title: "회계 사무원" }>
    | tags.Constant<"027101", { title: "재무 사무원" }>
    | tags.Constant<"027102", { title: "회계 사무원(회계·세무 사무소)" }>
    | tags.Constant<"027103", { title: "회계 사무원(일반 사업체)" }>
    | tags.Constant<"027200", { title: "경리 사무원" }>
    | tags.Constant<"027201", { title: "경리 사무원(무역)" }>
    | tags.Constant<"027202", { title: "경리 사무원(운수)" }>
    | tags.Constant<"027203", { title: "경리 사무원(건설)" }>
    | tags.Constant<"027204", { title: "경리 사무원(제조)" }>
    | tags.Constant<"027205", { title: "경리 사무원(회계·세무 사무소)" }>
    | tags.Constant<"027206", { title: "경리 사무원(일반사업체)" }>
    | tags.Constant<"027207", { title: "경리 사무원(아파트·빌딩)" }>
    | tags.Constant<"027208", { title: "단순 경리 사무원" }>
    | tags.Constant<"019", { title: "무역·운송·자재·구매·생산·품질 사무" }>
    | tags.Constant<"028100", { title: "무역 사무원" }>
    | tags.Constant<"028101", { title: "무역 사무원(영어)" }>
    | tags.Constant<"028102", { title: "무역 사무원(중국어)" }>
    | tags.Constant<"028103", { title: "무역 사무원(일본어)" }>
    | tags.Constant<"028104", { title: "무역 사무원(기타 언어)" }>
    | tags.Constant<"028105", { title: "관세 사무원" }>
    | tags.Constant<"028106", { title: "FTA 관리 사무원" }>
    | tags.Constant<"028200", { title: "운송 사무원" }>
    | tags.Constant<"028201", { title: "도로 운송 사무원(배차사무 포함)" }>
    | tags.Constant<"028202", { title: "철도·지하철 운송 사무원" }>
    | tags.Constant<"028203", { title: "항공 운송 사무원" }>
    | tags.Constant<"028204", { title: "수상 운송 사무원(해상 운송)" }>
    | tags.Constant<"028300", { title: "자재·구매·물류 사무원" }>
    | tags.Constant<"028301", { title: "자재·구매 사무원(건설)" }>
    | tags.Constant<"028302", { title: "자재·구매 사무원(기계·자동차·금속)" }>
    | tags.Constant<"028303", { title: "자재·구매 사무원(화학·섬유·의류)" }>
    | tags.Constant<"028304", { title: "자재·구매 사무원(전기·전자·컴퓨터)" }>
    | tags.Constant<"028305", { title: "자재·구매 사무원(음식료품)" }>
    | tags.Constant<"028306", { title: "자재·구매 사무원(일반 사업체)" }>
    | tags.Constant<"028307", { title: "창고 관리원(자재 검수원 포함)" }>
    | tags.Constant<"028308", { title: "물류 사무원(물류 관리사)" }>
    | tags.Constant<"028400", { title: "생산·품질 사무원" }>
    | tags.Constant<"028401", { title: "생산·품질 사무원 및 관리원(건설)" }>
    | tags.Constant<
        "028402",
        { title: "생산·품질 사무원 및 관리원(기계·자동차·금속)" }
      >
    | tags.Constant<
        "028403",
        { title: "생산·품질 사무원 및 관리원(화학·섬유·의료)" }
      >
    | tags.Constant<
        "028404",
        { title: "생산·품질 사무원 및 관리원(전기·전자·컴퓨터)" }
      >
    | tags.Constant<"028405", { title: "생산·품질 사무원 및 관리원(음식료품)" }>
    | tags.Constant<
        "028406",
        { title: "생산·품질 사무원 및 관리원(그 외 분야)" }
      >
    | tags.Constant<"01A", { title: "안내·접수·고객상담 사무" }>
    | tags.Constant<"029100", { title: "안내·접수원 및 전화교환원" }>
    | tags.Constant<
        "029101",
        { title: "일반 예약·접수 사무원(AS,고장,가입 및 호텔,콘도 등 제외)" }
      >
    | tags.Constant<
        "029102",
        { title: "예약·접수 사무원(A/S·고장·가입·신규발급·이전)" }
      >
    | tags.Constant<"029103", { title: "호텔·콘도·숙박시설 프론트 사무원" }>
    | tags.Constant<"029104", { title: "데스크 안내원" }>
    | tags.Constant<"029105", { title: "방송 안내원" }>
    | tags.Constant<"029200", { title: "고객 상담원 및 모니터 요원" }>
    | tags.Constant<"029201", { title: "콜센터 매니저" }>
    | tags.Constant<
        "029202",
        { title: "콜센터 상담원(콜센터·고객센터·CS센터)" }
      >
    | tags.Constant<"029203", { title: "고객 상담원(학원·학습지·유학·이민)" }>
    | tags.Constant<"029204", { title: "고객 상담원(금융·보험·부동산)" }>
    | tags.Constant<
        "029205",
        { title: "고객 상담원(스포츠·예식·항공·여행·숙박·오락)" }
      >
    | tags.Constant<
        "029206",
        { title: "고객 상담원(홈 및 인터넷쇼핑몰·택배·운송)" }
      >
    | tags.Constant<"029207", { title: "고객 상담원(백화점·마트)" }>
    | tags.Constant<"029208", { title: "고객 상담원(인터넷·통신)" }>
    | tags.Constant<"029209", { title: "고객 상담원(A/S·고장·제품사용)" }>
    | tags.Constant<"029210", { title: "병원 코디네이터" }>
    | tags.Constant<"029211", { title: "모니터 요원" }>
    | tags.Constant<"01B", { title: "통계·비서·사무보조·기타 사무" }>
    | tags.Constant<"029301", { title: "통계 사무원" }>
    | tags.Constant<"029302", { title: "통계·설문 조사원(슈퍼바이저 포함)" }>
    | tags.Constant<"029400", { title: "비서" }>
    | tags.Constant<"029500", { title: "전산자료 입력원 및 사무 보조원" }>
    | tags.Constant<"029501", { title: "전산자료 입력원(DB·단순자료)" }>
    | tags.Constant<"029502", { title: "전산자료 입력원(약국·판매·대리점)" }>
    | tags.Constant<"029503", { title: "홈페이지 자료관리원(정보검색 포함)" }>
    | tags.Constant<"029504", { title: "HTML 코더" }>
    | tags.Constant<"029505", { title: "사무 보조원(공공기관)" }>
    | tags.Constant<"029506", { title: "사무 보조원(일반사업체)" }>
    | tags.Constant<"029900", { title: "기타 사무원" }>
    | tags.Constant<"029901", { title: "도서 정리원" }>
    | tags.Constant<"029902", { title: "출판·자료 편집 사무원" }>
    | tags.Constant<"029903", { title: "속기사" }>
    | tags.Constant<"029904", { title: "행정사·문서대행자" }>
    | tags.Constant<"029905", { title: "취업 알선원(직업소개소)" }>
    | tags.Constant<"029906", { title: "부동산 중개 보조 사무원" }>
    | tags.Constant<"134301", { title: "정보시스템 운영자" }>
    | tags.Constant<"231400", { title: "직업상담사" }>
    | tags.Constant<"613000", { title: "텔레마케터" }>
    | tags.Constant<"01C", { title: "금융·보험 전문가" }>
    | tags.Constant<"031100", { title: "투자·신용 분석가(애널리스트)" }>
    | tags.Constant<"031200", { title: "자산 운용가(펀드매니저)" }>
    | tags.Constant<"031300", { title: "보험·금융상품 개발자" }>
    | tags.Constant<"031400", { title: "증권·외환 딜러" }>
    | tags.Constant<"031500", { title: "손해사정사" }>
    | tags.Constant<
        "031900",
        { title: "금융 컨설턴트, PB 등 기타 금융·보험 전문가" }
      >
    | tags.Constant<"01D", { title: "금융·보험 사무 및 영업" }>
    | tags.Constant<"032100", { title: "은행 사무원(출납창구 제외)" }>
    | tags.Constant<"032200", { title: "증권 사무원(출납창구 제외)" }>
    | tags.Constant<"032300", { title: "보험 심사원 및 사무원" }>
    | tags.Constant<"032400", { title: "출납창구 사무원" }>
    | tags.Constant<"032401", { title: "출납창구 사무원(은행·농협·수협·축협)" }>
    | tags.Constant<"032402", { title: "출납창구 사무원(우체국·새마을금고)" }>
    | tags.Constant<
        "032403",
        { title: "출납창구 사무원(증권 및 기타 금융기관)" }
      >
    | tags.Constant<"032500", { title: "수금원 및 신용 추심원" }>
    | tags.Constant<"032501", { title: "수금원" }>
    | tags.Constant<"032502", { title: "신용 추심원(채권 관리원)" }>
    | tags.Constant<"032503", { title: "연체 안내원(체납 고지원)" }>
    | tags.Constant<
        "032900",
        {
          title: "카드사·신협·새마을금고·할부사, 우체국(금융부문) 등 기타 사무원";
        }
      >
    | tags.Constant<"033100", { title: "대출·신용카드 모집인" }>
    | tags.Constant<"033200", { title: "보험 모집인 및 투자 권유 대행인" }>
    | tags.Constant<"033201", { title: "보험 대리인 및 중개인" }>
    | tags.Constant<"033203", { title: "투자 권유 대행인" }>
    | tags.Constant<"02", { title: "연구 및 공학기술	 " }>
    | tags.Constant<"021", { title: "인문·사회·자연·생명과학 연구 및 시험" }>
    | tags.Constant<"110100", { title: "인문과학 연구원" }>
    | tags.Constant<"110200", { title: "사회과학 연구원" }>
    | tags.Constant<"121100", { title: "자연과학 연구원" }>
    | tags.Constant<"121200", { title: "자연과학 시험원" }>
    | tags.Constant<"122101", { title: "생명과학 연구원" }>
    | tags.Constant<"122102", { title: "농어업 연구원 및 기술자" }>
    | tags.Constant<"122103", { title: "임업 및 산림 연구원 및 기술자" }>
    | tags.Constant<"122200", { title: "생명과학 시험원" }>
    | tags.Constant<"122300", { title: "농림어업 시험원" }>
    | tags.Constant<"215200", { title: "대학 교육 조교(TA) 및 연구 조교(RA)" }>
    | tags.Constant<"022", { title: "컴퓨터하드웨어·통신공학" }>
    | tags.Constant<"131100", { title: "컴퓨터 하드웨어 기술자 및 연구원" }>
    | tags.Constant<"131200", { title: "통신공학 기술자 및 연구원" }>
    | tags.Constant<"131201", { title: "통신기기·장비 개발자 및 연구원" }>
    | tags.Constant<
        "131202",
        { title: "통신기술 개발자 및 통신망 운영 기술자" }
      >
    | tags.Constant<"131203", { title: "통신공사 감리 기술자" }>
    | tags.Constant<"132000", { title: "컴퓨터시스템 전문가" }>
    | tags.Constant<"023", { title: "컴퓨터시스템" }>
    | tags.Constant<"132001", { title: "IT 컨설턴트" }>
    | tags.Constant<"132002", { title: "컴퓨터시스템 설계 및 분석가" }>
    | tags.Constant<"132003", { title: "IT 감리 전문가(시스템 감리)" }>
    | tags.Constant<"024", { title: "소프트웨어" }>
    | tags.Constant<"133100", { title: "시스템 소프트웨어 개발자" }>
    | tags.Constant<"133101", { title: "시스템 소프트웨어 개발자(프로그래머)" }>
    | tags.Constant<
        "133102",
        { title: "펌웨어 및 임베디드 소프트웨어 프로그래머" }
      >
    | tags.Constant<"133200", { title: "응용 소프트웨어 개발자" }>
    | tags.Constant<"133201", { title: "JAVA 프로그래밍 언어 전문가" }>
    | tags.Constant<
        "133202",
        { title: "C언어 및 그 외 프로그래밍 언어 전문가" }
      >
    | tags.Constant<
        "133203",
        { title: "범용 응용 소프트웨어 프로그래머(ERP,정보처리,재무관리 등)" }
      >
    | tags.Constant<
        "133204",
        {
          title: "산업특화 응용 소프트웨어 프로그래머(국방,항공,교통,에너지,금융,자동차 등)";
        }
      >
    | tags.Constant<"133205", { title: "네트워크 프로그래머" }>
    | tags.Constant<"133206", { title: "게임 프로그래머" }>
    | tags.Constant<
        "133207",
        { title: "모바일 애플리케이션 프로그래머(앱·어플 개발)" }
      >
    | tags.Constant<"133300", { title: "웹 개발자" }>
    | tags.Constant<"133301", { title: "웹 개발자(웹 엔지니어·웹 프로그래머)" }>
    | tags.Constant<"133302", { title: "웹 기획자" }>
    | tags.Constant<"133900", { title: "IT 테스터 및 IT QA 전문가" }>
    | tags.Constant<"025", { title: "데이터·네트워크 및 시스템 운영" }>
    | tags.Constant<"134100", { title: "데이터 전문가" }>
    | tags.Constant<"134101", { title: "데이터 설계 및 프로그래머" }>
    | tags.Constant<"134102", { title: "데이터 분석가(빅데이터 분석가)" }>
    | tags.Constant<"134103", { title: "데이터베이스 운영·관리자" }>
    | tags.Constant<"134200", { title: "네트워크 시스템 개발자" }>
    | tags.Constant<"134301", { title: "정보시스템 운영자" }>
    | tags.Constant<
        "134302",
        { title: "네트워크 관리자(클라우딩컴퓨터운영관리자)" }
      >
    | tags.Constant<"134303", { title: "IT 기술지원 전문가" }>
    | tags.Constant<"134400", { title: "웹 운영자(홈페이지 관리자)" }>
    | tags.Constant<
        "134900",
        { title: "디지털 포렌식 전문가 및 기타 데이터·네트워크 전문가" }
      >
    | tags.Constant<"026", { title: "정보 보안 및 통신·방송 송출" }>
    | tags.Constant<"135000", { title: "정보보안 전문가" }>
    | tags.Constant<"135001", { title: "정보보호 전문가" }>
    | tags.Constant<"135002", { title: "침해사고 대응 전문가" }>
    | tags.Constant<"136000", { title: "통신·방송송출 장비 기사" }>
    | tags.Constant<"027", { title: "건설·채굴 연구 및 공학기술" }>
    | tags.Constant<"140100", { title: "건축가(건축설계 포함)" }>
    | tags.Constant<"140200", { title: "건축공학 기술자" }>
    | tags.Constant<"140201", { title: "건축 현장소장" }>
    | tags.Constant<"140202", { title: "건축구조 기술자" }>
    | tags.Constant<"140203", { title: "건축시공 기술자(건축견적, 공무포함)" }>
    | tags.Constant<"140204", { title: "건축설비 기술자" }>
    | tags.Constant<"140205", { title: "건축감리 기술자" }>
    | tags.Constant<"140206", { title: "건축안전·환경·품질·에너지관리 기술자" }>
    | tags.Constant<"140300", { title: "토목공학 기술자" }>
    | tags.Constant<"140301", { title: "토목 현장소장" }>
    | tags.Constant<"140302", { title: "토목구조 설계 기술자" }>
    | tags.Constant<"140303", { title: "토목시공 기술자(토목견적, 공무포함)" }>
    | tags.Constant<"140304", { title: "토목감리 기술자" }>
    | tags.Constant<"140305", { title: "토목안전·환경·품질 기술자" }>
    | tags.Constant<"140400", { title: "조경 기술자" }>
    | tags.Constant<"140500", { title: "도시·교통 전문가" }>
    | tags.Constant<"140501", { title: "도시 계획·설계가" }>
    | tags.Constant<"140502", { title: "교통 계획·설계·안전·영향평가 전문가" }>
    | tags.Constant<"140600", { title: "측량·지리정보 전문가" }>
    | tags.Constant<"140601", { title: "측량사" }>
    | tags.Constant<"140602", { title: "지도제작 및 지리정보시스템 전문가" }>
    | tags.Constant<"140700", { title: "건설자재 시험원" }>
    | tags.Constant<"028", { title: "기계·로봇·금속·재료 연구 및 공학기술" }>
    | tags.Constant<"151100", { title: "기계공학 기술자 및 연구원" }>
    | tags.Constant<"151101", { title: "산업기계공학 기술자 및 연구원" }>
    | tags.Constant<"151102", { title: "건설기계공학 기술자 및 연구원" }>
    | tags.Constant<"151103", { title: "금형공학 기술자 및 연구원" }>
    | tags.Constant<"151104", { title: "플랜트공학 기술자 및 연구원" }>
    | tags.Constant<"151105", { title: "냉난방·공조공학 기술자 및 연구원" }>
    | tags.Constant<"151106", { title: "조선·해양공학 기술자 및 연구원" }>
    | tags.Constant<
        "151107",
        { title: "항공기·철도차량 공학 기술자 및 연구원" }
      >
    | tags.Constant<"151108", { title: "자동차공학 기술자 및 연구원" }>
    | tags.Constant<"151109", { title: "기타 기계공학 기술자 및 연구원" }>
    | tags.Constant<"151110", { title: "기계감리 기술자" }>
    | tags.Constant<"151200", { title: "로봇공학 기술자 및 연구원" }>
    | tags.Constant<"151300", { title: "기계·로봇공학 시험원" }>
    | tags.Constant<"152100", { title: "금속·재료공학 기술자 및 연구원" }>
    | tags.Constant<"152200", { title: "금속·재료공학 시험원" }>
    | tags.Constant<"029", { title: "전기·전자 연구 및 공학기술" }>
    | tags.Constant<"153100", { title: "전기공학 기술자 및 연구원" }>
    | tags.Constant<"153101", { title: "전기기기·제품 개발 기술자 및 연구원" }>
    | tags.Constant<
        "153102",
        { title: "전기계측 제어 기술자(전기패널, 계장, 공정자동화전기 등)" }
      >
    | tags.Constant<"153103", { title: "발전설비 기술자" }>
    | tags.Constant<"153104", { title: "송·배전설비 기술자" }>
    | tags.Constant<"153105", { title: "전기공사 기술자(전기견적, 공무포함)" }>
    | tags.Constant<"153106", { title: "전기감리 기술자" }>
    | tags.Constant<"153107", { title: "전기안전 기술자" }>
    | tags.Constant<"153200", { title: "전자공학 기술자 및 연구원" }>
    | tags.Constant<"153201", { title: "전자부품 개발 기술자 및 연구원" }>
    | tags.Constant<
        "153202",
        { title: "산업용 전자제품 개발 기술자 및 연구원" }
      >
    | tags.Constant<"153203", { title: "가전제품 개발 기술자 및 연구원" }>
    | tags.Constant<"153204", { title: "전자의료기기 개발 기술자 및 연구원" }>
    | tags.Constant<"153205", { title: "반도체공학 기술자 및 연구원" }>
    | tags.Constant<"153206", { title: "전자제어계측 기술자 및 연구원" }>
    | tags.Constant<"153300", { title: "전기·전자공학 시험원" }>
    | tags.Constant<"02A", { title: "화학·에너지·환경 연구 및 공학기술" }>
    | tags.Constant<"154100", { title: "화학공학 기술자 및 연구원" }>
    | tags.Constant<"154101", { title: "석유화학 기술자 및 연구원" }>
    | tags.Constant<"154102", { title: "고무·플라스틱 기술자 및 연구원" }>
    | tags.Constant<"154103", { title: "도료제품 기술자 및 연구원" }>
    | tags.Constant<"154104", { title: "화장품·비누제품 기술자 및 연구원" }>
    | tags.Constant<
        "154105",
        { title: "의약품, 농약, 비료 등 기타 석유화학 기술자 및 연구원" }
      >
    | tags.Constant<"154200", { title: "화학공학 시험원" }>
    | tags.Constant<"155100", { title: "가스·에너지공학 기술자 및 연구원" }>
    | tags.Constant<"155101", { title: "가스 기술자 및 연구원" }>
    | tags.Constant<
        "155102",
        { title: "에너지공학 기술자 및 연구원(에너지, 탐사, 시추)" }
      >
    | tags.Constant<"155200", { title: "가스·에너지 시험원" }>
    | tags.Constant<"155300", { title: "환경공학 기술자 및 연구원" }>
    | tags.Constant<"155301", { title: "대기 환경 기술자 및 연구원" }>
    | tags.Constant<"155302", { title: "수질 환경 기술자 및 연구원" }>
    | tags.Constant<"155303", { title: "폐기물처리 기술자 및 연구원" }>
    | tags.Constant<"155304", { title: "환경영향 평가원" }>
    | tags.Constant<
        "155305",
        { title: "소음진동, 토양 등 기타 환경 기술자 및 연구원" }
      >
    | tags.Constant<"155400", { title: "환경공학 시험원" }>
    | tags.Constant<"155500", { title: "보건위생·환경 검사원" }>
    | tags.Constant<
        "02B",
        { title: "섬유·식품·소방·방재·산업안전 연구 및 공학기술" }
      >
    | tags.Constant<"156100", { title: "섬유공학 기술자 및 연구원" }>
    | tags.Constant<"156200", { title: "섬유공학 시험원(섬유·염료)" }>
    | tags.Constant<"157100", { title: "식품공학 기술자 및 연구원" }>
    | tags.Constant<"157200", { title: "식품공학 시험원" }>
    | tags.Constant<"158100", { title: "방재 기술자 및 연구원" }>
    | tags.Constant<"158200", { title: "소방공학 기술자 및 연구원" }>
    | tags.Constant<"158201", { title: "소방설계 기술자" }>
    | tags.Constant<"158202", { title: "소방시설·설비 시공 기술자" }>
    | tags.Constant<"158203", { title: "소방공사 감리 기술자" }>
    | tags.Constant<"158300", { title: "소방공학 시험원" }>
    | tags.Constant<"158400", { title: "산업 안전원 및 위험물 관리원" }>
    | tags.Constant<"158500", { title: "비파괴 검사원" }>
    | tags.Constant<
        "02C",
        { title: "제도사(3D프린팅포함) 및 기타 인쇄·목재 등 공학기술" }
      >
    | tags.Constant<"159100", { title: "제도사" }>
    | tags.Constant<"159101", { title: "건축 제도사(캐드원)" }>
    | tags.Constant<"159102", { title: "토목 제도사(캐드원)" }>
    | tags.Constant<"159103", { title: "기계·금속 제도사(캐드원)" }>
    | tags.Constant<"159104", { title: "전기·전자 장비 제도사(캐드원)" }>
    | tags.Constant<"159105", { title: "3D 프린팅 제도사" }>
    | tags.Constant<"159106", { title: "기타 제도사(캐드원)" }>
    | tags.Constant<
        "159900",
        { title: "기타 인쇄·목재 등 공학 기술자 및 시험원" }
      >
    | tags.Constant<"03", { title: "교육·법률·사회복지·경찰·소방 및 군인	 " }>
    | tags.Constant<"031", { title: "대학교수, 학교 및 유치원 교사" }>
    | tags.Constant<"211100", { title: "대학 교수" }>
    | tags.Constant<
        "211200",
        {
          title: "대학 시간강사(초빙,겸임,BK,강의전담 교수 등 비전임교원 포함)";
        }
      >
    | tags.Constant<"212100", { title: "중·고등학교 교사" }>
    | tags.Constant<"212101", { title: "국어 교사" }>
    | tags.Constant<"212102", { title: "수학 교사" }>
    | tags.Constant<"212103", { title: "사회 교사" }>
    | tags.Constant<"212104", { title: "과학 교사" }>
    | tags.Constant<"212105", { title: "예체능 교사" }>
    | tags.Constant<"212106", { title: "실업 교사" }>
    | tags.Constant<"212107", { title: "외국어 교사" }>
    | tags.Constant<"212108", { title: "진로·교양·기타 교사" }>
    | tags.Constant<"212109", { title: "기타 중·고등학교 교사" }>
    | tags.Constant<"212200", { title: "초등학교 교사" }>
    | tags.Constant<"212300", { title: "특수교육 교사" }>
    | tags.Constant<"212900", { title: "기타 교사" }>
    | tags.Constant<"213000", { title: "유치원 교사" }>
    | tags.Constant<"232100", { title: "보육 교사" }>
    | tags.Constant<"032", { title: "문리·어학 강사" }>
    | tags.Constant<"214100", { title: "문리·어학 강사" }>
    | tags.Constant<"214101", { title: "국어 강사" }>
    | tags.Constant<"214102", { title: "수학 강사" }>
    | tags.Constant<"214103", { title: "사회 강사" }>
    | tags.Constant<"214104", { title: "과학 강사" }>
    | tags.Constant<"214105", { title: "성인고시·입사시험 학원 강사" }>
    | tags.Constant<"214106", { title: "영어 강사" }>
    | tags.Constant<"214107", { title: "중국어 강사" }>
    | tags.Constant<"214108", { title: "일본어 강사" }>
    | tags.Constant<"214109", { title: "한국어 강사(다문화 언어지도사 포함)" }>
    | tags.Constant<"214110", { title: "그 외 외국어 강사" }>
    | tags.Constant<"214111", { title: "독서·논술 강사" }>
    | tags.Constant<"214113", { title: "그 외 문리·어학 강사" }>
    | tags.Constant<"033", { title: "컴퓨터·기술·기능계 강사" }>
    | tags.Constant<"214200", { title: "컴퓨터 강사" }>
    | tags.Constant<
        "214201",
        { title: "컴퓨터 기초 강사(OA, 워드, 엑셀, 컴퓨터활용능력 등)" }
      >
    | tags.Constant<"214202", { title: "프로그래밍·웹·웹디자인·DB 강사" }>
    | tags.Constant<"214301", { title: "간호조무사, 간병, 관광안내 강사" }>
    | tags.Constant<"214302", { title: "디자인·캐드 강사" }>
    | tags.Constant<"214303", { title: "이미용·예식 강사" }>
    | tags.Constant<"214304", { title: "요리 강사" }>
    | tags.Constant<"214305", { title: "자동차운전강사" }>
    | tags.Constant<"214306", { title: "건설토목강사" }>
    | tags.Constant<"214307", { title: "기계·금속·전기·전자 강사" }>
    | tags.Constant<"214308", { title: "기타 기술·기능 강사" }>
    | tags.Constant<"034", { title: "예능·학습지·기타 강사" }>
    | tags.Constant<"214400", { title: "예능 강사" }>
    | tags.Constant<"214401", { title: "미술 강사" }>
    | tags.Constant<"214402", { title: "음악 강사" }>
    | tags.Constant<"214403", { title: "무용 강사" }>
    | tags.Constant<
        "214404",
        { title: "기타 예능 강사(바둑·웅변·연기·꽃꽂이·종이접기 등)" }
      >
    | tags.Constant<
        "214900",
        { title: "교육연수기관 및 기업체내 강사(리더십, 서비스마인드 등)" }
      >
    | tags.Constant<"420401", { title: "태권도·검도·합기도 등 무술사범" }>
    | tags.Constant<
        "420402",
        { title: "수영·골프·테니스·배드민턴·탁구 등 스포츠 강사" }
      >
    | tags.Constant<
        "035",
        { title: "장학관·교육조교(RA포함) 및 교사·보육 보조" }
      >
    | tags.Constant<"215100", { title: "장학관·연구관 및 교육 전문가" }>
    | tags.Constant<"215101", { title: "장학관·연구관·입학사정관" }>
    | tags.Constant<"215102", { title: "교재·교구 및 e-learning 교육 전문가" }>
    | tags.Constant<"215200", { title: "대학 교육 조교(TA) 및 연구 조교(RA)" }>
    | tags.Constant<"215300", { title: "교사보조 및 보육보조 서비스 종사원" }>
    | tags.Constant<"215301", { title: "교사 보조원" }>
    | tags.Constant<"215302", { title: "보육시설 서비스 종사원" }>
    | tags.Constant<"036", { title: "법률 전문가 및 법률 사무" }>
    | tags.Constant<"221100", { title: "판사 및 검사" }>
    | tags.Constant<"221200", { title: "변호사" }>
    | tags.Constant<"221300", { title: "법무사 및 집행관" }>
    | tags.Constant<"221400", { title: "변리사" }>
    | tags.Constant<"221900", { title: "외국 변호사 등 기타 법률 전문가" }>
    | tags.Constant<"222000", { title: "법률 사무원" }>
    | tags.Constant<
        "222001",
        { title: "법률 사무원(법원, 로펌, 법무사무소 등)" }
      >
    | tags.Constant<"222002", { title: "특허·저작권 사무원" }>
    | tags.Constant<"222003", { title: "법무 사무원(일반 기업체)" }>
    | tags.Constant<"037", { title: "사회복지·상담·직업상담·시민단체활동" }>
    | tags.Constant<"029905", { title: "취업 알선원(직업소개소)" }>
    | tags.Constant<"231100", { title: "사회복지사" }>
    | tags.Constant<"231101", { title: "사회복지사(사회복지시설)" }>
    | tags.Constant<"231102", { title: "사회복지사(공공행정)" }>
    | tags.Constant<"231103", { title: "사회복지프로그램 운영자" }>
    | tags.Constant<"231104", { title: "방과후 교사 및 지도사" }>
    | tags.Constant<"231200", { title: "상담 전문가" }>
    | tags.Constant<"231201", { title: "심리상담 전문가" }>
    | tags.Constant<
        "231202",
        { title: "가족·학교·아동·청소년·노인·중독 등 상담 전문가" }
      >
    | tags.Constant<"231300", { title: "청소년 지도사" }>
    | tags.Constant<"231400", { title: "직업상담사" }>
    | tags.Constant<"231500", { title: "시민단체 활동가" }>
    | tags.Constant<"038", { title: "보육교사·생활지도원 및 종교직" }>
    | tags.Constant<"232100", { title: "보육 교사" }>
    | tags.Constant<"232900", { title: "기타 사회복지 종사원" }>
    | tags.Constant<"232901", { title: "노인 생활지도원" }>
    | tags.Constant<"232902", { title: "아동 생활지도원" }>
    | tags.Constant<
        "232903",
        { title: "장애인 생활지도원(장애인활동보조원 포함)" }
      >
    | tags.Constant<"232904", { title: "그 외 사회복지 종사원" }>
    | tags.Constant<"233100", { title: "성직자" }>
    | tags.Constant<"233900", { title: "기타 종교 종사자" }>
    | tags.Constant<"039", { title: "경찰·소방·교도·군인" }>
    | tags.Constant<"240100", { title: "경찰관 및 수사관" }>
    | tags.Constant<"240200", { title: "소방관" }>
    | tags.Constant<"240300", { title: "교도관 및 소년원학교 교사" }>
    | tags.Constant<"250100", { title: "영관급 이상 장교" }>
    | tags.Constant<"250200", { title: "위관급 장교" }>
    | tags.Constant<"250300", { title: "부사관" }>
    | tags.Constant<"250900", { title: "기타 군인" }>
    | tags.Constant<"04", { title: "보건·의료	 " }>
    | tags.Constant<"041", { title: "의사·한의사·치과의사" }>
    | tags.Constant<"301100", { title: "전문 의사" }>
    | tags.Constant<"301200", { title: "일반 의사" }>
    | tags.Constant<"301300", { title: "한의사" }>
    | tags.Constant<"301400", { title: "치과 의사" }>
    | tags.Constant<"042", { title: "수의사·약사 및 한약사·간호사·영양사" }>
    | tags.Constant<"302000", { title: "수의사" }>
    | tags.Constant<"303000", { title: "약사 및 한약사" }>
    | tags.Constant<"304000", { title: "간호사" }>
    | tags.Constant<"304001", { title: "전문 간호사" }>
    | tags.Constant<"304002", { title: "일반 간호사" }>
    | tags.Constant<"304003", { title: "보건교사" }>
    | tags.Constant<"305000", { title: "영양사" }>
    | tags.Constant<"307500", { title: "간호조무사" }>
    | tags.Constant<"043", { title: "의료기사·치료사·재활사" }>
    | tags.Constant<"306100", { title: "임상병리사" }>
    | tags.Constant<"306200", { title: "방사선사" }>
    | tags.Constant<"306300", { title: "치과기공사" }>
    | tags.Constant<"306400", { title: "치과위생사" }>
    | tags.Constant<"306500", { title: "물리 및 작업 치료사" }>
    | tags.Constant<"306501", { title: "물리치료사" }>
    | tags.Constant<"306502", { title: "작업치료사" }>
    | tags.Constant<"306600", { title: "임상심리사(심리치료사)" }>
    | tags.Constant<"306700", { title: "재활공학 기사(의지보조기기사)" }>
    | tags.Constant<"306900", { title: "기타 치료·재활사 및 의료기사" }>
    | tags.Constant<"306901", { title: "언어·청능 치료사" }>
    | tags.Constant<"306902", { title: "놀이·음악·미술·독서 등 치료사" }>
    | tags.Constant<"306903", { title: "운동처방사" }>
    | tags.Constant<"044", { title: "그 외 보건·의료 종사자" }>
    | tags.Constant<"026302", { title: "병원행정 사무원(원무)" }>
    | tags.Constant<"029210", { title: "병원 코디네이터" }>
    | tags.Constant<
        "307100",
        { title: "응급구조사(인명구조원, 119구조대원 포함)" }
      >
    | tags.Constant<"307200", { title: "위생사" }>
    | tags.Constant<"307300", { title: "안경사" }>
    | tags.Constant<"307400", { title: "의무기록사" }>
    | tags.Constant<"307500", { title: "간호조무사" }>
    | tags.Constant<"307501", { title: "간호조무사(요양병원 제외)" }>
    | tags.Constant<"307502", { title: "요양병원 간호조무사" }>
    | tags.Constant<"307600", { title: "안마사" }>
    | tags.Constant<"307900", { title: "기타 보건·의료 종사원" }>
    | tags.Constant<"307901", { title: "의료 보조원" }>
    | tags.Constant<"307902", { title: "산후조리 종사원(산모 도우미)" }>
    | tags.Constant<"307903", { title: "기타 보건·의료 서비스 종사원" }>
    | tags.Constant<"550101", { title: "간병인(재가 제외)" }>
    | tags.Constant<"550102", { title: "재가 간병인" }>
    | tags.Constant<"550103", { title: "시설 요양보호사(노인요양사)" }>
    | tags.Constant<"550104", { title: "재가 요양보호사" }>
    | tags.Constant<"550200", { title: "육아 도우미(베이비시터)" }>
    | tags.Constant<"05", { title: "예술·디자인·방송·스포츠	 " }>
    | tags.Constant<"051", { title: "작가, 통·번역 및 출판물 전문가" }>
    | tags.Constant<"029902", { title: "출판·자료 편집 사무원" }>
    | tags.Constant<"411100", { title: "작가" }>
    | tags.Constant<"411200", { title: "번역가 및 통역가" }>
    | tags.Constant<"411201", { title: "번역가(영어)" }>
    | tags.Constant<"411202", { title: "번역가(중국어)" }>
    | tags.Constant<"411203", { title: "번역가(일본어)" }>
    | tags.Constant<"411204", { title: "번역가(기타 언어)" }>
    | tags.Constant<"411205", { title: "통역가(영어)" }>
    | tags.Constant<"411206", { title: "통역가(중국어)" }>
    | tags.Constant<"411207", { title: "통역가(일본어)" }>
    | tags.Constant<"411208", { title: "통역가(기타 언어)" }>
    | tags.Constant<"411209", { title: "수화 및 의료 통역가" }>
    | tags.Constant<"411300", { title: "출판물 전문가" }>
    | tags.Constant<"052", { title: "기자 및 언론 전문가" }>
    | tags.Constant<"412000", { title: "기자 및 언론 전문가" }>
    | tags.Constant<"412001", { title: "신문·방송 기자" }>
    | tags.Constant<"412002", { title: "잡지·생활정보지 및 기타 기자" }>
    | tags.Constant<"053", { title: "학예사·사서·기록물관리사" }>
    | tags.Constant<"413100", { title: "학예사 및 문화재 보존원" }>
    | tags.Constant<"413101", { title: "학예사(큐레이터)" }>
    | tags.Constant<"413102", { title: "문화재보존원(컨서베이터)" }>
    | tags.Constant<"413200", { title: "사서 및 기록물 관리사" }>
    | tags.Constant<"413201", { title: "사서" }>
    | tags.Constant<"413202", { title: "기록물 관리사(기록물관리전문요원)" }>
    | tags.Constant<"054", { title: "창작·공연 (작가 및 연극 제외)" }>
    | tags.Constant<"214401", { title: "미술 강사" }>
    | tags.Constant<"214402", { title: "음악 강사" }>
    | tags.Constant<"214403", { title: "무용 강사" }>
    | tags.Constant<"414100", { title: "화가 및 조각가" }>
    | tags.Constant<"414200", { title: "사진작가 및 사진사" }>
    | tags.Constant<"414300", { title: "만화가 및 만화영화 작가" }>
    | tags.Constant<"414301", { title: "만화가" }>
    | tags.Constant<"414302", { title: "만화영화 작가(애니메이터)" }>
    | tags.Constant<"414400", { title: "국악인 및 전통 예능인" }>
    | tags.Constant<"414500", { title: "지휘자, 작곡가 및 연주가" }>
    | tags.Constant<"414600", { title: "가수 및 성악가" }>
    | tags.Constant<"414700", { title: "무용가 및 안무가" }>
    | tags.Constant<"414900", { title: "기타 시각 및 공연 예술가" }>
    | tags.Constant<
        "414901",
        { title: "조련사(공연)·마술사 등 기타 시각 및 공연 예술가" }
      >
    | tags.Constant<"414902", { title: "동화구연사" }>
    | tags.Constant<"417100", { title: "공연·영화·음반 기획자" }>
    | tags.Constant<"055", { title: "디자이너 (미디어콘텐츠 제외)" }>
    | tags.Constant<"159100", { title: "제도사" }>
    | tags.Constant<"415100", { title: "제품 디자이너" }>
    | tags.Constant<"415101", { title: "기계·자동차·금속 제품 디자이너" }>
    | tags.Constant<"415102", { title: "조명·전기·전자·통신 기기 디자이너" }>
    | tags.Constant<"415103", { title: "가구 디자이너" }>
    | tags.Constant<
        "415104",
        { title: "팬시, 귀금속, 생활잡화 등 기타 제품 디자이너" }
      >
    | tags.Constant<"415200", { title: "패션 디자이너" }>
    | tags.Constant<"415201", { title: "의상 디자이너" }>
    | tags.Constant<"415202", { title: "직물(텍스타일) 디자이너" }>
    | tags.Constant<"415203", { title: "가방·신발·엑세서리 디자이너" }>
    | tags.Constant<"415300", { title: "실내장식 디자이너" }>
    | tags.Constant<"415301", { title: "인테리어 디자이너" }>
    | tags.Constant<"415302", { title: "무대·세트·디스플레이 디자이너" }>
    | tags.Constant<"415400", { title: "시각 디자이너" }>
    | tags.Constant<"415401", { title: "광고디자이너" }>
    | tags.Constant<"415402", { title: "책·인쇄물·출판 디자이너" }>
    | tags.Constant<"415403", { title: "포장(패키지)디자이너" }>
    | tags.Constant<"415404", { title: "일러스트레이터·삽화가" }>
    | tags.Constant<"415405", { title: "색채전문가(컬러리스트)" }>
    | tags.Constant<"415406", { title: "기타 시각 디자이너" }>
    | tags.Constant<
        "701603",
        {
          title: "내장 목공(인테리어 목공 - 나무창호, 주방가구, 싱크대, 인테리어 치장)";
        }
      >
    | tags.Constant<"056", { title: "미디어콘텐츠·UX/UI 디자이너" }>
    | tags.Constant<"415500", { title: "미디어 콘텐츠 디자이너" }>
    | tags.Constant<"415501", { title: "웹 디자이너" }>
    | tags.Constant<"415502", { title: "게임 디자이너" }>
    | tags.Constant<"415503", { title: "그래픽아트 기술자" }>
    | tags.Constant<"415504", { title: "UX/UI 디자이너" }>
    | tags.Constant<"415505", { title: "기타 미디어 콘텐츠 디자이너" }>
    | tags.Constant<"057", { title: "연극·영화·방송 (방송기술 포함)" }>
    | tags.Constant<"416100", { title: "감독 및 기술감독" }>
    | tags.Constant<"416200", { title: "배우 및 모델" }>
    | tags.Constant<"416301", { title: "아나운서 및 리포터" }>
    | tags.Constant<"416302", { title: "쇼핑호스트" }>
    | tags.Constant<"416303", { title: "사내(장내) 방송 아나운서" }>
    | tags.Constant<"416400", { title: "촬영 기사" }>
    | tags.Constant<"416500", { title: "음향·녹음 기사" }>
    | tags.Constant<"416600", { title: "영상·녹화 및 편집 기사" }>
    | tags.Constant<"416700", { title: "조명·영사 기사" }>
    | tags.Constant<"416900", { title: "기타 연극·영화·방송 종사원" }>
    | tags.Constant<"416901", { title: "방송연출 보조(AD, FD)" }>
    | tags.Constant<
        "416902",
        { title: "엑스트라,소품·무대의상 관리 등 기타 연극·영화·방송 종사원" }
      >
    | tags.Constant<"058", { title: "공연·음반 기획 및 매니저" }>
    | tags.Constant<"024401", { title: "행사·이벤트 기획자" }>
    | tags.Constant<"024402", { title: "전시·회의 기획자" }>
    | tags.Constant<"417100", { title: "공연·영화·음반 기획자" }>
    | tags.Constant<"059", { title: "스포츠·레크리에이션" }>
    | tags.Constant<"417200", { title: "연예인매니저 및 스포츠매니저" }>
    | tags.Constant<"420100", { title: "스포츠 감독 및 코치" }>
    | tags.Constant<"420200", { title: "직업 운동선수" }>
    | tags.Constant<"420300", { title: "경기 심판 및 경기 기록원" }>
    | tags.Constant<
        "420400",
        { title: "스포츠강사, 레크리에이션강사 및 기타 관련 전문가" }
      >
    | tags.Constant<"420401", { title: "태권도·검도·합기도 등 무술사범" }>
    | tags.Constant<
        "420402",
        { title: "수영·골프·테니스·배드민턴·탁구 등 스포츠 강사" }
      >
    | tags.Constant<"420403", { title: "헬스 트레이너" }>
    | tags.Constant<"420404", { title: "에어로빅, 요가 등 기타 스포츠 강사" }>
    | tags.Constant<"420405", { title: "레크리에이션 전문가" }>
    | tags.Constant<
        "420406",
        { title: "프로모터, 경주마 조련사 등 기타 스프츠 관련 전문가" }
      >
    | tags.Constant<"420900", { title: "기타 스포츠 및 여가서비스 종사원" }>
    | tags.Constant<"420901", { title: "골프장 캐디" }>
    | tags.Constant<"420902", { title: "카지노 딜러" }>
    | tags.Constant<
        "420903",
        { title: "응원단원 및 기타 스포츠·오락 관련 도우미" }
      >
    | tags.Constant<"06", { title: "미용·여행·숙박·음식·경비·돌봄·청소	 " }>
    | tags.Constant<"061", { title: "미용 및 반려동물 미용·관리" }>
    | tags.Constant<"511100", { title: "이용사" }>
    | tags.Constant<"511200", { title: "미용사" }>
    | tags.Constant<"511300", { title: "피부 및 체형 관리사" }>
    | tags.Constant<"511301", { title: "피부 및 체형 관리사(발관리사 포함)" }>
    | tags.Constant<"511302", { title: "네일 아티스트(손톱 관리사)" }>
    | tags.Constant<"511303", { title: "목욕관리 및 기타 피부미용 종사원" }>
    | tags.Constant<"511400", { title: "메이크업 아티스트 및 분장사" }>
    | tags.Constant<"511401", { title: "메이크업아티스트 및 뷰티매니저" }>
    | tags.Constant<"511402", { title: "분장사·특수분장사" }>
    | tags.Constant<"511500", { title: "반려동물 미용 및 관리 종사원" }>
    | tags.Constant<"511501", { title: "반려동물 미용사" }>
    | tags.Constant<"511502", { title: "반려동물 훈련사(맹인견 조련사 포함)" }>
    | tags.Constant<"511503", { title: "반려동물 장의사" }>
    | tags.Constant<
        "511504",
        { title: "수의사 보조원(수의간호, 수의테크니션)" }
      >
    | tags.Constant<
        "511900",
        { title: "기타 미용 관련 서비스종사원(패션코디, 이미지컨설턴트 등)" }
      >
    | tags.Constant<"062", { title: "결혼·장례 등 예식 서비스" }>
    | tags.Constant<"512100", { title: "결혼상담원 및 웨딩플래너" }>
    | tags.Constant<"512101", { title: "결혼 상담원" }>
    | tags.Constant<"512102", { title: "웨딩 플래너" }>
    | tags.Constant<"512200", { title: "혼례 종사원" }>
    | tags.Constant<"512300", { title: "장례 지도사 및 장례 상담원" }>
    | tags.Constant<"512400", { title: "점술가 및 민속신앙 종사원" }>
    | tags.Constant<
        "512900",
        { title: "말벗,노년플래너 등 기타 개인 생활 서비스원" }
      >
    | tags.Constant<"063", { title: "여행·객실승무·숙박·오락 서비스" }>
    | tags.Constant<"029103", { title: "호텔·콘도·숙박시설 프론트 사무원" }>
    | tags.Constant<"420901", { title: "골프장 캐디" }>
    | tags.Constant<"420902", { title: "카지노 딜러" }>
    | tags.Constant<"521100", { title: "여행상품 개발자" }>
    | tags.Constant<"521200", { title: "여행 사무원" }>
    | tags.Constant<"521300", { title: "여행 안내원 및 해설사" }>
    | tags.Constant<"521301", { title: "관광통역 안내원" }>
    | tags.Constant<"521302", { title: "여행 안내원" }>
    | tags.Constant<
        "521303",
        { title: "박물관,미술관,문화,역사,자연환경 등 각종 해설사" }
      >
    | tags.Constant<"522100", { title: "항공기 객실승무원" }>
    | tags.Constant<"522200", { title: "선박·열차 객실승무원" }>
    | tags.Constant<"523000", { title: "숙박시설 서비스원" }>
    | tags.Constant<"524000", { title: "오락시설 서비스원" }>
    | tags.Constant<"524001", { title: "오락시설 서비스원(노래방, PC방 등)" }>
    | tags.Constant<"524002", { title: "테마파크 서비스원" }>
    | tags.Constant<"541905", { title: "수학여행 안전요원" }>
    | tags.Constant<"064", { title: "주방장 및 조리사" }>
    | tags.Constant<"305000", { title: "영양사" }>
    | tags.Constant<
        "531100",
        { title: "주방장 및 요리 연구가(푸드코디네이터 포함)" }
      >
    | tags.Constant<"531200", { title: "한식 조리사" }>
    | tags.Constant<"531201", { title: "한식 조리사(일반 음식점)" }>
    | tags.Constant<"531202", { title: "학교 급식 조리사" }>
    | tags.Constant<"531203", { title: "유치원·어린이집 급식 조리사" }>
    | tags.Constant<"531204", { title: "병원 급식 조리사" }>
    | tags.Constant<"531205", { title: "사업체 구내식당 급식 조리사" }>
    | tags.Constant<"531300", { title: "중식 조리사" }>
    | tags.Constant<"531400", { title: "양식 조리사" }>
    | tags.Constant<"531500", { title: "일식 조리사" }>
    | tags.Constant<"531600", { title: "바텐터(조주사)" }>
    | tags.Constant<"531700", { title: "음료 조리사(바리스타 포함)" }>
    | tags.Constant<"531900", { title: "기타 조리사" }>
    | tags.Constant<"531901", { title: "분식 조리사" }>
    | tags.Constant<"531902", { title: "포장마차·주점 조리사" }>
    | tags.Constant<"531903", { title: "동남아·남미음식 조리사" }>
    | tags.Constant<"871100", { title: "제과·제빵원" }>
    | tags.Constant<"065", { title: "식당 서비스(음식배달 포함)" }>
    | tags.Constant<"532100", { title: "패스트푸드 준비원" }>
    | tags.Constant<"532200", { title: "홀서빙원" }>
    | tags.Constant<"532201", { title: "호텔·레스토랑 웨이터·웨이트리스" }>
    | tags.Constant<"532202", { title: "일반 음식점 서빙원" }>
    | tags.Constant<"532203", { title: "주점·커피숍 서빙원" }>
    | tags.Constant<"532300", { title: "주방 보조원" }>
    | tags.Constant<"532301", { title: "주방 보조원(일반 음식점)" }>
    | tags.Constant<"532302", { title: "단체 급식 보조원" }>
    | tags.Constant<"532400", { title: "음식 배달원" }>
    | tags.Constant<"532401", { title: "음식 배달원" }>
    | tags.Constant<"532402", { title: "패스트푸드 배달원" }>
    | tags.Constant<"532900", { title: "기타 음식서비스 종사원(병원 배식원)" }>
    | tags.Constant<"872200", { title: "김치·밑반찬 제조 종사원" }>
    | tags.Constant<"066", { title: "경호·보안" }>
    | tags.Constant<"541100", { title: "경호원" }>
    | tags.Constant<"541200", { title: "청원경찰" }>
    | tags.Constant<"541300", { title: "시설·특수 경비원" }>
    | tags.Constant<
        "541301",
        { title: "기계·무인 경비원(해당 경비지도사 포함)" }
      >
    | tags.Constant<
        "541302",
        { title: "시설·호송·특수 경비원(해당 경비지도사 포함)" }
      >
    | tags.Constant<"541900", { title: "기타 경호·보안 종사원" }>
    | tags.Constant<"541901", { title: "보안 관제원(경비 관제원)" }>
    | tags.Constant<"541902", { title: "유통·매장·창고 감시원" }>
    | tags.Constant<"541903", { title: "주차 단속원 및 안전 순찰원" }>
    | tags.Constant<"541904", { title: "레저·테마파크 안전요원" }>
    | tags.Constant<"541905", { title: "수학여행 안전요원" }>
    | tags.Constant<"067", { title: "경비원" }>
    | tags.Constant<"542000", { title: "경비원(건물 관리원)" }>
    | tags.Constant<"542001", { title: "아파트·빌라 경비원" }>
    | tags.Constant<
        "542002",
        { title: "건물 경비원(청사,학교,병원,상가,빌딩,공장 등)" }
      >
    | tags.Constant<"542003", { title: "공사현장 경비원" }>
    | tags.Constant<"542004", { title: "기타 건물 관리원(공원, 종교시설 등)" }>
    | tags.Constant<"068", { title: "돌봄 서비스" }>
    | tags.Constant<"550100", { title: "요양 보호사 및 간병인" }>
    | tags.Constant<"550101", { title: "간병인(재가 제외)" }>
    | tags.Constant<"550102", { title: "재가 간병인" }>
    | tags.Constant<"550103", { title: "시설 요양보호사(노인요양사)" }>
    | tags.Constant<"550104", { title: "재가 요양보호사" }>
    | tags.Constant<"550105", { title: "복지시설 보조원" }>
    | tags.Constant<"550200", { title: "육아 도우미(베이비시터)" }>
    | tags.Constant<"069", { title: "청소·방역 및 가사 서비스" }>
    | tags.Constant<"561100", { title: "청소원" }>
    | tags.Constant<
        "561101",
        { title: "건물 청소원(공공건물,아파트,사무실,병원,상가,공장 등)" }
      >
    | tags.Constant<
        "561102",
        { title: "호텔·콘도·숙박시설 청소원(룸메이드,하우스키퍼)" }
      >
    | tags.Constant<"561103", { title: "외벽 및 창문 청소원" }>
    | tags.Constant<"561104", { title: "특수 크리닝장비 청소원" }>
    | tags.Constant<"561105", { title: "세차원 및 운송장비 청소원" }>
    | tags.Constant<"561200", { title: "환경미화원 및 재활용품 수거원" }>
    | tags.Constant<"561201", { title: "환경 미화원" }>
    | tags.Constant<"561202", { title: "재활용품 및 폐기물 수거원" }>
    | tags.Constant<"561300", { title: "배관 세정원 및 방역원" }>
    | tags.Constant<"561301", { title: "배관 세정원(물탱크 청소 포함)" }>
    | tags.Constant<"561302", { title: "방역원(해충퇴치원 포함)" }>
    | tags.Constant<"561400", { title: "구두 미화원" }>
    | tags.Constant<"561500", { title: "세탁원(다림질원)" }>
    | tags.Constant<"561601", { title: "가사 도우미" }>
    | tags.Constant<"561602", { title: "입주 가사도우미" }>
    | tags.Constant<"06A", { title: "검침·주차관리 및 기타 단순 서비스" }>
    | tags.Constant<"562100", { title: "계기 검침원 및 가스 점검원" }>
    | tags.Constant<"562200", { title: "자동판매기 관리원" }>
    | tags.Constant<"562300", { title: "주차 관리·안내원" }>
    | tags.Constant<"562400", { title: "검표원" }>
    | tags.Constant<"562900", { title: "기타 서비스 단순 종사원" }>
    | tags.Constant<"562901", { title: "대여제품 방문 점검원" }>
    | tags.Constant<"562902", { title: "환경 감시원" }>
    | tags.Constant<
        "562903",
        { title: "기타 서비스 단순종사원(사우나,찜질방 정리원 등)" }
      >
    | tags.Constant<"624401", { title: "하역·적재 종사원" }>
    | tags.Constant<"624402", { title: "물건·이삿짐 운반원" }>
    | tags.Constant<"07", { title: "영업·판매·운전·운송	 " }>
    | tags.Constant<"071", { title: "부동산중개, 기술·의약품 및 해외 영업" }>
    | tags.Constant<"611000", { title: "부동산 컨설턴트 및 중개인" }>
    | tags.Constant<"612100", { title: "기술 영업원" }>
    | tags.Constant<"612101", { title: "자동차부품 및 운송장비 기술영업원" }>
    | tags.Constant<"612102", { title: "기계장비 기술영업원" }>
    | tags.Constant<"612103", { title: "화학제품 기술영업원" }>
    | tags.Constant<"612104", { title: "전기·전자장비 기술영업원" }>
    | tags.Constant<"612105", { title: "의료장비 기술영업원" }>
    | tags.Constant<"612106", { title: "IT 기술영업원(전산장비,소프트웨어)" }>
    | tags.Constant<"612107", { title: "의약품 영업원(제약 영업원)" }>
    | tags.Constant<"612108", { title: "기타 기술영업원" }>
    | tags.Constant<"612200", { title: "해외 영업원" }>
    | tags.Constant<"612201", { title: "해외 영업원(영어)" }>
    | tags.Constant<"612202", { title: "해외 영업원(중국어)" }>
    | tags.Constant<"612203", { title: "해외 영업원(일본어)" }>
    | tags.Constant<"612204", { title: "해외 영업원(기타 언어권)" }>
    | tags.Constant<"072", { title: "자동차·제품·광고 영업 및 상품 중개" }>
    | tags.Constant<"612300", { title: "자동차 영업원" }>
    | tags.Constant<"612301", { title: "자동차 영업원(자동차 딜러)" }>
    | tags.Constant<"612302", { title: "중고차 영업원" }>
    | tags.Constant<"612400", { title: "제품·광고 영업원" }>
    | tags.Constant<"612401", { title: "식품·주류 영업원" }>
    | tags.Constant<"612402", { title: "건설자재 영업원" }>
    | tags.Constant<"612403", { title: "건설수주 영업원" }>
    | tags.Constant<"612404", { title: "광고·출판 영업원" }>
    | tags.Constant<"612405", { title: "체인점 영업원" }>
    | tags.Constant<"612406", { title: "상조·렌탈·회원모집 영업원" }>
    | tags.Constant<"612407", { title: "일반 영업원" }>
    | tags.Constant<"612500", { title: "상품 중개인 및 경매사" }>
    | tags.Constant<"612900", { title: "기타 기술 영업·중개 종사원" }>
    | tags.Constant<"073", { title: "텔레마케터(TM)" }>
    | tags.Constant<
        "029202",
        { title: "콜센터 상담원(콜센터·고객센터·CS센터)" }
      >
    | tags.Constant<"613000", { title: "텔레마케터" }>
    | tags.Constant<"613001", { title: "텔레마케터(콜센터)" }>
    | tags.Constant<"613002", { title: "텔레마케터(학원, 학습지, 유학)" }>
    | tags.Constant<"613003", { title: "텔레마케터(금융·보험·대출·부동산)" }>
    | tags.Constant<"613004", { title: "텔레마케터(쇼핑몰, 백화점, 마트)" }>
    | tags.Constant<"613005", { title: "텔레마케터(인터넷, 통신)" }>
    | tags.Constant<"613006", { title: "기타 텔레마케터" }>
    | tags.Constant<"074", { title: "소규모 판매점장 및 상점 판매" }>
    | tags.Constant<"531700", { title: "음료 조리사(바리스타 포함)" }>
    | tags.Constant<
        "614000",
        { title: "소규모 매장점장(매장매니저·매장슈퍼바이저)" }
      >
    | tags.Constant<"615100", { title: "상점 판매원" }>
    | tags.Constant<"615101", { title: "백화점 판매원" }>
    | tags.Constant<"615102", { title: "대형마트 판매원" }>
    | tags.Constant<"615103", { title: "편의점 판매원" }>
    | tags.Constant<"615104", { title: "면세점 판매원" }>
    | tags.Constant<"615105", { title: "일반상점 판매원" }>
    | tags.Constant<"615106", { title: "의류 판매원" }>
    | tags.Constant<"615107", { title: "화장품 판매원" }>
    | tags.Constant<"615108", { title: "가구 판매원" }>
    | tags.Constant<"615109", { title: "가전 판매원(컴퓨터 포함)" }>
    | tags.Constant<"615110", { title: "음식료품 판매원" }>
    | tags.Constant<
        "615111",
        { title: "꽃 판매원(플로리스트, 토피어리어 포함)" }
      >
    | tags.Constant<"615112", { title: "잡화 판매원(사무용품,도서,음반 포함)" }>
    | tags.Constant<"616101", { title: "매장 계산원" }>
    | tags.Constant<
        "075",
        { title: "통신서비스·온라인판매·상품대여·노점·이동판매 및 주유" }
      >
    | tags.Constant<"615200", { title: "통신 기기·서비스 판매원" }>
    | tags.Constant<"615201", { title: "통신기기 판매원(핸드폰 판매 및 가입)" }>
    | tags.Constant<"615202", { title: "통신서비스 판매원(인터넷,IPTV 가입)" }>
    | tags.Constant<"615300", { title: "온라인 판매원" }>
    | tags.Constant<"615400", { title: "상품 대여원" }>
    | tags.Constant<"615401", { title: "자동차 대여원(렌터카)" }>
    | tags.Constant<
        "615402",
        { title: "생활용품 대여원(정수기,가전제품,의복,어린이 용품)" }
      >
    | tags.Constant<
        "615403",
        { title: "기타 대여원(기계장비,오락·스포츠 용품,도서,영상)" }
      >
    | tags.Constant<"615500", { title: "노점 및 이동 판매원" }>
    | tags.Constant<"615700", { title: "주유원(가스 충전원)" }>
    | tags.Constant<"615701", { title: "주유원(주유판매원)" }>
    | tags.Constant<"615702", { title: "가스 충전원" }>
    | tags.Constant<"076", { title: "매장 계산 및 매표" }>
    | tags.Constant<"616100", { title: "매장 계산원 및 요금 정산원" }>
    | tags.Constant<"616101", { title: "매장 계산원" }>
    | tags.Constant<"616102", { title: "요금 정산원(주차요금,통행료)" }>
    | tags.Constant<"616200", { title: "매표원 및 복권 판매원" }>
    | tags.Constant<"077", { title: "판촉 및 기타 판매 종사자" }>
    | tags.Constant<"617100", { title: "홍보 도우미 및 판촉원" }>
    | tags.Constant<
        "617101",
        { title: "홍보 도우미 및 판촉원(나레이터 모델 포함)" }
      >
    | tags.Constant<"617102", { title: "이벤트·행사 진행원" }>
    | tags.Constant<"617900", { title: "기타 판매 단순 종사원" }>
    | tags.Constant<"617901", { title: "매장 정리원(매장 보조원)" }>
    | tags.Constant<"617902", { title: "상품 진열원" }>
    | tags.Constant<"617903", { title: "쇼핑몰택배 준비원" }>
    | tags.Constant<
        "617904",
        { title: "기타 판매 단순 종사원(전단지배포, 벽보원, 물품 보관원)" }
      >
    | tags.Constant<"078", { title: "항공기·선박·철도 조종 및 관제" }>
    | tags.Constant<"028202", { title: "철도·지하철 운송 사무원" }>
    | tags.Constant<"028203", { title: "항공 운송 사무원" }>
    | tags.Constant<"028204", { title: "수상 운송 사무원(해상 운송)" }>
    | tags.Constant<"621100", { title: "항공기 조종사" }>
    | tags.Constant<"621200", { title: "선장, 항해사 및 도선사" }>
    | tags.Constant<"621300", { title: "철도·전동차 기관사" }>
    | tags.Constant<"621400", { title: "관제사(항공,선박,철도 등)" }>
    | tags.Constant<
        "621900",
        { title: "기타 항공·철도운송종사원(항공기유도원·화물열차차장·신호수)" }
      >
    | tags.Constant<"885901", { title: "드론 조작원" }>
    | tags.Constant<
        "079",
        { title: "자동차 운전(택시·버스·화물차·기타 자동차)" }
      >
    | tags.Constant<"028201", { title: "도로 운송 사무원(배차사무 포함)" }>
    | tags.Constant<"562300", { title: "주차 관리·안내원" }>
    | tags.Constant<"622100", { title: "택시 운전원" }>
    | tags.Constant<"622200", { title: "버스 운전원" }>
    | tags.Constant<
        "622201",
        { title: "노선버스 운전원(시내, 마을, 시외, 고속)" }
      >
    | tags.Constant<
        "622202",
        { title: "관광 및 통근·통학·학원 및 기타 버스 운전원" }
      >
    | tags.Constant<"622300", { title: "화물차·특수차 운전원" }>
    | tags.Constant<"622301", { title: "경·소형 화물차 운전원" }>
    | tags.Constant<"622302", { title: "중·대형 화물차 운전원(트레일러 포함)" }>
    | tags.Constant<
        "622303",
        { title: "견인차·유조차·구난차·청소차 등 특수차 운전원" }
      >
    | tags.Constant<"622900", { title: "기타 자동차 운전원" }>
    | tags.Constant<"622901", { title: "승용차 운전원(자가용 운전원)" }>
    | tags.Constant<"622902", { title: "승합차 운전원" }>
    | tags.Constant<"622903", { title: "대리 운전원" }>
    | tags.Constant<"622904", { title: "주차 운전원" }>
    | tags.Constant<"622905", { title: "호송차량 운전원" }>
    | tags.Constant<
        "622906",
        { title: "기타 자동차 운전원(렌터카,구급차,우편차,자동차선적 등)" }
      >
    | tags.Constant<"07A", { title: "물품이동장비 조작" }>
    | tags.Constant<
        "623000",
        { title: "물품이동장비 조작원(크레인·호이스트·지게차)" }
      >
    | tags.Constant<"623001", { title: "크레인 운전원(천정,타워 제외)" }>
    | tags.Constant<"623002", { title: "천장·타워 크레인 운전원" }>
    | tags.Constant<"623003", { title: "호이스트 운전원" }>
    | tags.Constant<"623004", { title: "지게차 운전원" }>
    | tags.Constant<"623005", { title: "리프트·케이블카 조작원" }>
    | tags.Constant<
        "07B",
        { title: "택배·납품영업·선박갑판·하역 및 기타 운송" }
      >
    | tags.Constant<"532401", { title: "음식 배달원" }>
    | tags.Constant<"532402", { title: "패스트푸드 배달원" }>
    | tags.Constant<"624100", { title: "택배원" }>
    | tags.Constant<"624101", { title: "일반 택배원(퀵서비스 포함)" }>
    | tags.Constant<"624102", { title: "지하철 택배원" }>
    | tags.Constant<"624103", { title: "배송·납품 운전원(납품영업 포함)" }>
    | tags.Constant<"624200", { title: "우편물 집배원" }>
    | tags.Constant<"624300", { title: "선박 갑판원 및 관련 종사원" }>
    | tags.Constant<"624401", { title: "하역·적재 종사원" }>
    | tags.Constant<"624402", { title: "물건·이삿짐 운반원" }>
    | tags.Constant<
        "624900",
        { title: "신문·음료(우유·요구르트 등) 기타 배달원" }
      >
    | tags.Constant<"08", { title: "건설·채굴	 " }>
    | tags.Constant<
        "081",
        { title: "건설구조 기능(철골·철근·석공·목공·조적 등)" }
      >
    | tags.Constant<"701100", { title: "철골공(강구조물 건립원)" }>
    | tags.Constant<
        "701200",
        { title: "경량철골공(석고보드공,텍스공,조립주택 건립원)" }
      >
    | tags.Constant<"701300", { title: "철근공" }>
    | tags.Constant<"701401", { title: "콘크리트공" }>
    | tags.Constant<"701402", { title: "콘크리트건물·피시 조립원" }>
    | tags.Constant<"701500", { title: "건축 석공" }>
    | tags.Constant<"701600", { title: "건축 목공" }>
    | tags.Constant<"701601", { title: "형틀 목공(거푸집 설치공)" }>
    | tags.Constant<"701602", { title: "외장 목공(목조주택 건립)" }>
    | tags.Constant<
        "701603",
        {
          title: "내장 목공(인테리어 목공 - 나무창호, 주방가구, 싱크대, 인테리어 치장)";
        }
      >
    | tags.Constant<"701604", { title: "전통 건축원" }>
    | tags.Constant<"701700", { title: "조적공 및 석재 부설공" }>
    | tags.Constant<"701900", { title: "기타 건설 구조 기능원" }>
    | tags.Constant<"701901", { title: "건설현장반장" }>
    | tags.Constant<"701902", { title: "비계공" }>
    | tags.Constant<"701903", { title: "건물칸막이 설치원" }>
    | tags.Constant<
        "701904",
        { title: "기타 건설 기능원(건물해체,정화조설치,방음벽설치 등)" }
      >
    | tags.Constant<
        "082",
        { title: "건축마감 기능(미장·단열·도배·새시·영선 등)" }
      >
    | tags.Constant<"702100", { title: "미장공" }>
    | tags.Constant<"702200", { title: "방수공" }>
    | tags.Constant<"702300", { title: "단열공" }>
    | tags.Constant<"702400", { title: "바닥재 시공원" }>
    | tags.Constant<"702401", { title: "타일·대리석 시공원" }>
    | tags.Constant<"702402", { title: "장판·카펫 시공원" }>
    | tags.Constant<"702500", { title: "도배공 및 유리 부착원" }>
    | tags.Constant<"702501", { title: "도배공" }>
    | tags.Constant<"702502", { title: "유리 부착원(유리공)" }>
    | tags.Constant<"702600", { title: "건물 도장공" }>
    | tags.Constant<"702701", { title: "새시 조립·설치원" }>
    | tags.Constant<"702702", { title: "새시 보조원(견습공)" }>
    | tags.Constant<"702900", { title: "기타 건축 마감 기능원" }>
    | tags.Constant<
        "702901",
        { title: "건물 보수원 및 영선원(아파트 기계·전기 시설관리 제외)" }
      >
    | tags.Constant<"702902", { title: "지붕잇기원 등 기타 건축 마감 기능원" }>
    | tags.Constant<"083", { title: "배관" }>
    | tags.Constant<"703100", { title: "건설 배관공" }>
    | tags.Constant<
        "703101",
        { title: "건축 배관공(옥내급수관,상하수배관,위생 배관)" }
      >
    | tags.Constant<"703102", { title: "가스 배관공(가스관 설치원)" }>
    | tags.Constant<
        "703200",
        { title: "공업 배관공(플랜트,항공,선박,철도차량)" }
      >
    | tags.Constant<"703900", { title: "기타 배관공" }>
    | tags.Constant<"703901", { title: "기타 배관공(배관누수 탐지원)" }>
    | tags.Constant<"703902", { title: "배관 보조원" }>
    | tags.Constant<"824100", { title: "용접원" }>
    | tags.Constant<"084", { title: "건설·채굴 기계 운전" }>
    | tags.Constant<"623001", { title: "크레인 운전원(천정,타워 제외)" }>
    | tags.Constant<"623002", { title: "천장·타워 크레인 운전원" }>
    | tags.Constant<"704000", { title: "건설·채굴 기계 운전원" }>
    | tags.Constant<"704001", { title: "굴착기(굴삭기,포클레인) 운전원" }>
    | tags.Constant<"704002", { title: "로더 운전원(페이로더 운전원)" }>
    | tags.Constant<
        "704003",
        { title: "레미콘 차량 운전원(콘크리트 믹서 트럭)" }
      >
    | tags.Constant<
        "704004",
        { title: "도로정지기, 덤프트럭 등 기타 건설·채굴 기계 운전원" }
      >
    | tags.Constant<"704005", { title: "농림어업 기계 운전원" }>
    | tags.Constant<"085", { title: "기타 건설 기능(광원,채석,철로설치 등)" }>
    | tags.Constant<"705100", { title: "광원, 채석원 및 석재 절단원" }>
    | tags.Constant<"705101", { title: "광원 및 채석원" }>
    | tags.Constant<
        "705102",
        { title: "석재 가공원(석재 절단, 연마, 조각원 등)" }
      >
    | tags.Constant<"705200", { title: "철로 설치·보수원" }>
    | tags.Constant<"705900", { title: "기타 채굴·토목 종사원" }>
    | tags.Constant<"705901", { title: "점화·발파·화약관리원 및 삭구원" }>
    | tags.Constant<"705902", { title: "잠수 기능원(잠수부, 구난 잠수요원)" }>
    | tags.Constant<"086", { title: "건설·채굴 단순 종사자" }>
    | tags.Constant<"706000", { title: "건설·채굴 단순 종사원" }>
    | tags.Constant<"706001", { title: "조경시설물 설치원" }>
    | tags.Constant<"706002", { title: "건설·채굴 단순 종사원" }>
    | tags.Constant<"09", { title: "설치·정비·생산-기계·금속·재료	 " }>
    | tags.Constant<"091", { title: "기계장비 설치·정비" }>
    | tags.Constant<"811100", { title: "공업기계 설치·정비원" }>
    | tags.Constant<"811101", { title: "공작기계 설치·정비원" }>
    | tags.Constant<"811102", { title: "화학기계 설치·정비원" }>
    | tags.Constant<"811103", { title: "섬유기계 설치·정비원" }>
    | tags.Constant<"811104", { title: "전자제품 제조기계 설치·정비원" }>
    | tags.Constant<"811105", { title: "식품기계 설치·정비원" }>
    | tags.Constant<"811106", { title: "기타 공업기계 설치·정비원" }>
    | tags.Constant<"811200", { title: "승강기 설치·정비원" }>
    | tags.Constant<"811201", { title: "엘리베이터 설치·정비원" }>
    | tags.Constant<
        "811202",
        { title: "에스컬레이터 설치·정비원(무빙워크 포함)" }
      >
    | tags.Constant<
        "811203",
        { title: "기타 승강기 설치·정비원(휠체어리프트, 자동문 포함)" }
      >
    | tags.Constant<"811300", { title: "물품이동장비 설치·정비원" }>
    | tags.Constant<"811301", { title: "크레인·호이스트 설치·정비원" }>
    | tags.Constant<"811302", { title: "지게차 정비원" }>
    | tags.Constant<"811400", { title: "냉동·냉장·공조기 설치·정비원" }>
    | tags.Constant<"811401", { title: "산업용 냉동·냉장·공조기 설치·정비원" }>
    | tags.Constant<
        "811402",
        { title: "건물·가정용 냉동·냉장·공조기 설치·정비원" }
      >
    | tags.Constant<"811500", { title: "보일러 설치·정비원" }>
    | tags.Constant<"811501", { title: "산업용 보일러 설치·수리원" }>
    | tags.Constant<"811502", { title: "건물·가정용 보일러 설치·수리원" }>
    | tags.Constant<"811600", { title: "건설·광업용 기계 설치·정비원" }>
    | tags.Constant<
        "811900",
        { title: "농업용 및 기타 기계장비 설치 및 정비원" }
      >
    | tags.Constant<"092", { title: "운송장비 정비" }>
    | tags.Constant<"812100", { title: "항공기 정비원" }>
    | tags.Constant<"812200", { title: "선박 정비원" }>
    | tags.Constant<"812300", { title: "철도기관차·전동차 정비원" }>
    | tags.Constant<"812400", { title: "자동차 정비원" }>
    | tags.Constant<"812401", { title: "자동차 엔진·섀시·전기·전자 정비원" }>
    | tags.Constant<"812402", { title: "자동차 차체·판금·도장 정비원" }>
    | tags.Constant<"812403", { title: "자동차 경정비원" }>
    | tags.Constant<"812404", { title: "자동차 튜닝원" }>
    | tags.Constant<
        "812900",
        { title: "오토바이·자전거 및 기타 운송장비 정비원" }
      >
    | tags.Constant<"093", { title: "금형 및 공작기계 조작" }>
    | tags.Constant<"813100", { title: "금형원" }>
    | tags.Constant<"813101", { title: "프레스 금형 제조원" }>
    | tags.Constant<"813102", { title: "플라스틱 금형 제조원" }>
    | tags.Constant<"813103", { title: "다이캐스팅 금형 제조원" }>
    | tags.Constant<"813104", { title: "캐드캠 기능원" }>
    | tags.Constant<"813105", { title: "금형제조 보조원" }>
    | tags.Constant<"813200", { title: "금속 공작기계 조작원" }>
    | tags.Constant<"813201", { title: "CNC 선반 조작원(NC 선반 조작원)" }>
    | tags.Constant<"813202", { title: "범용 선반 조작원" }>
    | tags.Constant<"813203", { title: "CNC 밀링기 조작원(NC 밀링기 조작원)" }>
    | tags.Constant<"813204", { title: "범용 밀링기조작원" }>
    | tags.Constant<"813205", { title: "드릴링기 및 보링기 조작원" }>
    | tags.Constant<"813206", { title: "연삭기 및 연마(광택)기 조작원" }>
    | tags.Constant<"813207", { title: "프레스기 및 절단기 조작원" }>
    | tags.Constant<"813208", { title: "톱기계 조작원" }>
    | tags.Constant<"813209", { title: "금속절곡기 조작원(밴딩기 조작원)" }>
    | tags.Constant<"813210", { title: "머시닝센터(MCT) 조작원" }>
    | tags.Constant<"813211", { title: "방전기 및 와이어컷 방전기 조작원" }>
    | tags.Constant<"813212", { title: "레이저 절단원" }>
    | tags.Constant<"813213", { title: "기타 금속공작기계 조작원 및 보조원" }>
    | tags.Constant<"821200", { title: "금속가공 기계 조작원" }>
    | tags.Constant<
        "094",
        { title: "냉난방 설비·자동 조립라인·산업용 로봇 조작" }
      >
    | tags.Constant<"814000", { title: "냉·난방 설비 조작원" }>
    | tags.Constant<"814001", { title: "산업용 냉난방 설비 조작원" }>
    | tags.Constant<"814002", { title: "건물용 냉난방 설비 조작원" }>
    | tags.Constant<"815000", { title: "자동조립라인·산업용로봇 조작원" }>
    | tags.Constant<"815001", { title: "자동조립라인 조작원" }>
    | tags.Constant<"815002", { title: "산업용 로봇 조작원" }>
    | tags.Constant<"834000", { title: "전기·전자 설비 조작원" }>
    | tags.Constant<"095", { title: "기계 및 운송장비 조립" }>
    | tags.Constant<"816100", { title: "일반기계 조립원" }>
    | tags.Constant<"816101", { title: "공작기계 조립·검사원" }>
    | tags.Constant<"816102", { title: "공업기계 조립·검사원(공작기계 제외)" }>
    | tags.Constant<"816103", { title: "건설·광업·농업 기계 조립·검사원" }>
    | tags.Constant<"816104", { title: "공구 조립·검사원" }>
    | tags.Constant<"816105", { title: "기타 기계 조립·검사원" }>
    | tags.Constant<"816200", { title: "금속기계부품 조립원" }>
    | tags.Constant<"817100", { title: "자동차 조립·검사원" }>
    | tags.Constant<"817200", { title: "자동차 부품 조립·검사원" }>
    | tags.Constant<
        "817300",
        { title: "항공기·선박·철도기관차·전동차 등 운송장비 조립·검사원" }
      >
    | tags.Constant<"096", { title: "금속관련 기계·설비 조작" }>
    | tags.Constant<"813200", { title: "금속 공작기계 조작원" }>
    | tags.Constant<
        "821100",
        { title: "금속가공 제어장치 조작원(용광로·용해로·금속가열로)" }
      >
    | tags.Constant<"821200", { title: "금속가공 기계 조작원" }>
    | tags.Constant<"821201", { title: "압연기 조작원" }>
    | tags.Constant<"821202", { title: "금속 열처리로 조작원" }>
    | tags.Constant<"821203", { title: "인발·신선·연선·압출기 조작원" }>
    | tags.Constant<"821204", { title: "금속가공 검사원" }>
    | tags.Constant<"097", { title: "판금·제관·단조·주조" }>
    | tags.Constant<
        "703101",
        { title: "건축 배관공(옥내급수관,상하수배관,위생 배관)" }
      >
    | tags.Constant<"703102", { title: "가스 배관공(가스관 설치원)" }>
    | tags.Constant<
        "703200",
        { title: "공업 배관공(플랜트,항공,선박,철도차량)" }
      >
    | tags.Constant<"703902", { title: "배관 보조원" }>
    | tags.Constant<"822100", { title: "판금원(덕트원 포함)" }>
    | tags.Constant<"822201", { title: "판금기 조작원" }>
    | tags.Constant<"822202", { title: "판금기 보조원(견습공)" }>
    | tags.Constant<"822301", { title: "제관원" }>
    | tags.Constant<"822302", { title: "제관 보조원(견습공)" }>
    | tags.Constant<"822400", { title: "제관기 조작원" }>
    | tags.Constant<"823101", { title: "단조원" }>
    | tags.Constant<"823102", { title: "단조 보조원(견습공)" }>
    | tags.Constant<"823200", { title: "단조기조작원" }>
    | tags.Constant<"823300", { title: "주조원" }>
    | tags.Constant<"823301", { title: "주조원(목형원, 원형원, 주형원)" }>
    | tags.Constant<"823302", { title: "주조 보조원(견습공)" }>
    | tags.Constant<"098", { title: "용접" }>
    | tags.Constant<
        "703101",
        { title: "건축 배관공(옥내급수관,상하수배관,위생 배관)" }
      >
    | tags.Constant<"703102", { title: "가스 배관공(가스관 설치원)" }>
    | tags.Constant<
        "703200",
        { title: "공업 배관공(플랜트,항공,선박,철도차량)" }
      >
    | tags.Constant<"703902", { title: "배관 보조원" }>
    | tags.Constant<
        "823400",
        { title: "주조기 조작원(다이캐스팅기 조작원 포함)" }
      >
    | tags.Constant<"824100", { title: "용접원" }>
    | tags.Constant<"824101", { title: "가스용접원(산소용접원)" }>
    | tags.Constant<"824102", { title: "전기용접원(아크,알곤,티그용접원)" }>
    | tags.Constant<"824103", { title: "화염절단원" }>
    | tags.Constant<"824104", { title: "조선용접원(조선취부사 포함)" }>
    | tags.Constant<"824105", { title: "납땜원" }>
    | tags.Constant<"824106", { title: "기타 용접원" }>
    | tags.Constant<"824107", { title: "용접 사상원 및 보조원" }>
    | tags.Constant<"824200", { title: "자동용접기 및 용접로봇 조작원" }>
    | tags.Constant<"099", { title: "도장·도금" }>
    | tags.Constant<"825100", { title: "도장원(도장기조작원)" }>
    | tags.Constant<"825101", { title: "자동차 도장기 조작원" }>
    | tags.Constant<"825102", { title: "금속제품 도장기 조작원" }>
    | tags.Constant<"825103", { title: "가구 및 기타 도장기 조작원" }>
    | tags.Constant<"825200", { title: "도금·금속분무기 조작원" }>
    | tags.Constant<"09A", { title: "비금속제품 생산기계 조작" }>
    | tags.Constant<"826100", { title: "유리·유리제품 생산기계 조작원" }>
    | tags.Constant<"826101", { title: "유리 생산기계 조작원" }>
    | tags.Constant<"826102", { title: "유리제품 생산기계 조작원" }>
    | tags.Constant<"826103", { title: "렌즈 가공기계 조작원" }>
    | tags.Constant<"826200", { title: "점토제품 생산기계 조작원" }>
    | tags.Constant<"826201", { title: "도자기 생산기계 조작원" }>
    | tags.Constant<"826202", { title: "벽돌·타일 생산기계 조작원" }>
    | tags.Constant<"826300", { title: "시멘트·광물제품 생산기계 조작원" }>
    | tags.Constant<"826400", { title: "광석·석제품 생산기계 조작원" }>
    | tags.Constant<"826900", { title: "기타 비금속제품 생산기계 조작원" }>
    | tags.Constant<"10", { title: "설치·정비·생산-전기·전자·정보통신	 " }>
    | tags.Constant<"101", { title: "전기공(전기공사)" }>
    | tags.Constant<
        "831100",
        { title: "산업 전기공(항공기·선박·철도기관차·전동차 전기공)" }
      >
    | tags.Constant<"831200", { title: "내선 전기공" }>
    | tags.Constant<"831201", { title: "내선 전기공(건물 내 전기공사원)" }>
    | tags.Constant<"831202", { title: "조명기구 등 전기기기 설치·정비원" }>
    | tags.Constant<"831203", { title: "발전기 설치·정비원" }>
    | tags.Constant<"831204", { title: "전기·전자 제어장치 설치·정비원" }>
    | tags.Constant<"831300", { title: "외선 전기공" }>
    | tags.Constant<
        "102",
        { title: "전기·전자 기기 설치·수리(사무용,가전제품,기타)" }
      >
    | tags.Constant<
        "832100",
        { title: "사무용 전자기기 설치·수리원(컴퓨터 제외)" }
      >
    | tags.Constant<"832200", { title: "가전제품 설치·수리원" }>
    | tags.Constant<"832201", { title: "TV·비디오·오디오 설치 및 수리원" }>
    | tags.Constant<"832202", { title: "냉장고·세탁기 설치 및 수리원" }>
    | tags.Constant<"832203", { title: "에어컨·공기정화기 설치 및 수리원" }>
    | tags.Constant<"832204", { title: "정수기·냉온수기·비데 설치 및 수리원" }>
    | tags.Constant<"832205", { title: "그 외 가전제품 설치 및 수리원" }>
    | tags.Constant<"832900", { title: "기타 전기·전자 기기 설치·수리원" }>
    | tags.Constant<"832901", { title: "감시카메라 및 보안장치 설치·수리원" }>
    | tags.Constant<"832902", { title: "현금인출기 설치·수리원" }>
    | tags.Constant<
        "832903",
        { title: "포스시스템 설치·수리원(POS 설치 및 수리원)" }
      >
    | tags.Constant<"832904", { title: "의료기기·장비 설치·수리원" }>
    | tags.Constant<"832905", { title: "시계·카메라·광학기구 수리원" }>
    | tags.Constant<
        "832906",
        { title: "영상·음향기기 등 기타 전기·전자 기기 설치·수리원" }
      >
    | tags.Constant<"841100", { title: "컴퓨터 설치·수리원(컴퓨터A/S원)" }>
    | tags.Constant<"841200", { title: "핸드폰(휴대폰) 수리원" }>
    | tags.Constant<"841900", { title: "기타 정보통신기기 설치·수리원" }>
    | tags.Constant<
        "103",
        { title: "발전·배전 장비, 전기·전자 설비 조작(전기관리)" }
      >
    | tags.Constant<"814001", { title: "산업용 냉난방 설비 조작원" }>
    | tags.Constant<"814002", { title: "건물용 냉난방 설비 조작원" }>
    | tags.Constant<"833000", { title: "발전·배전 장치 조작원" }>
    | tags.Constant<"834000", { title: "전기·전자 설비 조작원" }>
    | tags.Constant<"834001", { title: "아파트 전기관리원" }>
    | tags.Constant<"834002", { title: "빌딩 전기관리원" }>
    | tags.Constant<"834003", { title: "공장 전기관리원" }>
    | tags.Constant<"834004", { title: "기타 전기·전자 설비 조작원" }>
    | tags.Constant<"104", { title: "전기·전자 부품·제품 생산기계 조작" }>
    | tags.Constant<"835100", { title: "전기 부품·제품 생산기계 조작원" }>
    | tags.Constant<"835200", { title: "전자 부품·제품 생산기계 조작원" }>
    | tags.Constant<"105", { title: "전기·전자 부품·제품 조립" }>
    | tags.Constant<"817200", { title: "자동차 부품 조립·검사원" }>
    | tags.Constant<"836000", { title: "전기·전자 부품·제품 조립원" }>
    | tags.Constant<"836001", { title: "전기 부품·제품 조립·검사원" }>
    | tags.Constant<"836002", { title: "PCB 부품·제품 조립·검사원" }>
    | tags.Constant<"836003", { title: "LCD 부품·제품 조립·검사원" }>
    | tags.Constant<"836004", { title: "LED 부품·제품 조립·검사원" }>
    | tags.Constant<"836005", { title: "통신기기 부품·제품 조립원(핸드폰)" }>
    | tags.Constant<"836006", { title: "기타 전자 부품·제품 조립·검사원" }>
    | tags.Constant<"106", { title: "정보통신기기 설치·수리(컴퓨터,핸드폰)" }>
    | tags.Constant<"841100", { title: "컴퓨터 설치·수리원(컴퓨터A/S원)" }>
    | tags.Constant<"841200", { title: "핸드폰(휴대폰) 수리원" }>
    | tags.Constant<"841900", { title: "기타 정보통신기기 설치·수리원" }>
    | tags.Constant<"107", { title: "방송·통신장비 및 케이블 설치·수리" }>
    | tags.Constant<"842100", { title: "방송장비 설치·수리원" }>
    | tags.Constant<"842200", { title: "통신장비 설치·수리원" }>
    | tags.Constant<"842300", { title: "방송·통신·인터넷 케이블 설치·수리원" }>
    | tags.Constant<"842301", { title: "통신·인터넷 케이블 설치·수리원" }>
    | tags.Constant<"842302", { title: "방송 케이블 설치·수리원" }>
    | tags.Constant<
        "11",
        { title: "설치·정비·생산-화학·환경·섬유·의복·식품가공	 " }
      >
    | tags.Constant<"111", { title: "석유·화학물 가공장치 조작" }>
    | tags.Constant<"851101", { title: "석유·천연가스 제조 제어장치 조작원" }>
    | tags.Constant<"851102", { title: "폐유·재생유 처리 제어장치 조작원" }>
    | tags.Constant<"851200", { title: "화학물 가공장치 조작원" }>
    | tags.Constant<"851900", { title: "기타 석유·화학물 가공장치 조작원" }>
    | tags.Constant<"112", { title: "고무·플라스틱 및 화학제품 생산기계 조작" }>
    | tags.Constant<"852100", { title: "타이어·고무제품 생산기계 조작원" }>
    | tags.Constant<"852101", { title: "고무 사출성형기 조작원" }>
    | tags.Constant<"852102", { title: "고무 압출성형기 조작원" }>
    | tags.Constant<"852103", { title: "고무 프레스기 조작원" }>
    | tags.Constant<"852104", { title: "타이어 생산기계 조작원" }>
    | tags.Constant<"852200", { title: "플라스틱제품 생산기계 조작원" }>
    | tags.Constant<"852201", { title: "플라스틱 사출성형기 조작원" }>
    | tags.Constant<"852202", { title: "플라스틱 압출성형기 조작원" }>
    | tags.Constant<
        "852300",
        { title: "화학제품 생산기계 조작원(고무·플라스틱 제외)" }
      >
    | tags.Constant<"852301", { title: "도료·잉크제품 생산기계 조작원" }>
    | tags.Constant<"852302", { title: "화장품·비누제품 생산기계 조작원" }>
    | tags.Constant<"852303", { title: "의약품 생산기계 조작원" }>
    | tags.Constant<"852304", { title: "농약·비료 생산기계 조작원" }>
    | tags.Constant<"852305", { title: "기타 화학제품 생산기계 조작원" }>
    | tags.Constant<"852400", { title: "고무·플라스틱 제품 조립원" }>
    | tags.Constant<"852401", { title: "고무제품 조립원 및 검사원" }>
    | tags.Constant<"852402", { title: "플라스틱제품 조립원 및 검사원" }>
    | tags.Constant<"113", { title: "환경 장치 조작(상하수도·재활용처리)" }>
    | tags.Constant<"853100", { title: "상·하수도 처리장치 조작원" }>
    | tags.Constant<"853101", { title: "물펌프·정수 처리장치 조작원" }>
    | tags.Constant<"853102", { title: "하수·폐수 처리장치 조작원" }>
    | tags.Constant<
        "853103",
        { title: "기타 상·하수도 처리장치 조작원(댐수문, 저수지)" }
      >
    | tags.Constant<"853200", { title: "재활용 처리장치·소각로 조작원" }>
    | tags.Constant<"853201", { title: "소각로 조작원" }>
    | tags.Constant<"853202", { title: "재활용 처리장치 조작원" }>
    | tags.Constant<"114", { title: "섬유 제조 및 가공 기계 조작" }>
    | tags.Constant<
        "861100",
        { title: "섬유 제조기계 조작원(방적,방사,연사,합사,권사기 등)" }
      >
    | tags.Constant<"861200", { title: "직조기·편직기 조작원" }>
    | tags.Constant<"861201", { title: "제직기(직조기) 조작원" }>
    | tags.Constant<"861202", { title: "편직기 조작원" }>
    | tags.Constant<
        "861203",
        { title: "기타 직조기·편직기 조작원(정단,정경,연경,통경기 등)" }
      >
    | tags.Constant<"861204", { title: "섬유가공 준비 및 후가공 처리원" }>
    | tags.Constant<"861300", { title: "표백·염색기 조작원" }>
    | tags.Constant<"861301", { title: "염색 준비 및 조색기 조작원" }>
    | tags.Constant<"861302", { title: "정련·표백기 조작원" }>
    | tags.Constant<"861303", { title: "염색기 조작원" }>
    | tags.Constant<"861304", { title: "날염기 조작원(나염기)" }>
    | tags.Constant<"115", { title: "패턴·재단·재봉" }>
    | tags.Constant<"415201", { title: "의상 디자이너" }>
    | tags.Constant<"862100", { title: "패턴사" }>
    | tags.Constant<"862200", { title: "재단사" }>
    | tags.Constant<"862300", { title: "재봉사" }>
    | tags.Constant<"862301", { title: "재봉사(의류·직물)" }>
    | tags.Constant<"862302", { title: "가죽·모피·신발 재봉사" }>
    | tags.Constant<"862303", { title: "기계 자수원" }>
    | tags.Constant<
        "862900",
        { title: "의복·직물 검사 등 기타 섬유·가죽 기능원" }
      >
    | tags.Constant<"116", { title: "의복 제조 및 수선" }>
    | tags.Constant<"863100", { title: "한복 제조원" }>
    | tags.Constant<"863200", { title: "양장·양복 제조원" }>
    | tags.Constant<"863300", { title: "모피·가죽의복 제조원" }>
    | tags.Constant<"863400", { title: "의복·가죽·모피 수선원" }>
    | tags.Constant<"863900", { title: "기타 의복 제조원" }>
    | tags.Constant<"117", { title: "제화, 기타 섬유·의복 기계 조작" }>
    | tags.Constant<"864100", { title: "제화원" }>
    | tags.Constant<"864200", { title: "신발 제조기계 조작원 및 조립원" }>
    | tags.Constant<"864300", { title: "세탁 기계 조작원" }>
    | tags.Constant<"864900", { title: "기타 직물·신발 기계 조작원 및 조립원" }>
    | tags.Constant<"118", { title: "제과·제빵 및 떡 제조" }>
    | tags.Constant<"531201", { title: "한식 조리사(일반 음식점)" }>
    | tags.Constant<"871100", { title: "제과·제빵원" }>
    | tags.Constant<"871200", { title: "떡 제조원(한과 포함)" }>
    | tags.Constant<
        "119",
        { title: "식품가공 기능원(도축·정육,김치·밑반찬제조 등)" }
      >
    | tags.Constant<"532301", { title: "주방 보조원(일반 음식점)" }>
    | tags.Constant<"872100", { title: "정육원 및 도축원" }>
    | tags.Constant<"872101", { title: "도축원" }>
    | tags.Constant<"872102", { title: "정육원" }>
    | tags.Constant<"872200", { title: "김치·밑반찬 제조 종사원" }>
    | tags.Constant<"872300", { title: "식품·담배 등급원" }>
    | tags.Constant<"872900", { title: "기타 식품가공 종사원 (건강원,탕제원)" }>
    | tags.Constant<"11A", { title: "식품가공 기계 조작" }>
    | tags.Constant<"873100", { title: "육류·어패류·낙농품 가공기계 조작원" }>
    | tags.Constant<"873101", { title: "육류 가공기계 조작원" }>
    | tags.Constant<"873102", { title: "어패류(수산물) 가공기계 조작원" }>
    | tags.Constant<"873103", { title: "낙농품 가공기계 조작원" }>
    | tags.Constant<"873200", { title: "제분·도정 기계 조작원" }>
    | tags.Constant<"873300", { title: "곡물 가공제품 기계 조작원" }>
    | tags.Constant<
        "873301",
        { title: "과자·빵·떡·캔디·초콜릿 제조기계 조작원" }
      >
    | tags.Constant<"873302", { title: "두부 및 유사제품 생산기계 조작원" }>
    | tags.Constant<"873303", { title: "국수 및 면류제품 생산기계 조작원" }>
    | tags.Constant<"873400", { title: "과실·채소 기계 조작원" }>
    | tags.Constant<"873500", { title: "음료 제조기계 조작원" }>
    | tags.Constant<
        "873900",
        {
          title: "기타 식품가공기계 조작원(유지, 장류, 조미식품, 설탕, 커피, 담배 등)";
        }
      >
    | tags.Constant<
        "12",
        { title: "설치·정비·생산-인쇄·목재·공예 및 제조 단순	 " }
      >
    | tags.Constant<"121", { title: "인쇄기계·사진현상기 조작" }>
    | tags.Constant<"881100", { title: "인쇄기계 조작원" }>
    | tags.Constant<"881101", { title: "인쇄판·인쇄필름 출력원" }>
    | tags.Constant<"881102", { title: "오프셋·윤전 인쇄기 조작원" }>
    | tags.Constant<"881103", { title: "그라비어 인쇄기 조작원" }>
    | tags.Constant<
        "881104",
        { title: "스크린 인쇄기 조작원(실크스크린 포함)" }
      >
    | tags.Constant<"881105", { title: "디지털 및 기타 인쇄기 조작원" }>
    | tags.Constant<"881106", { title: "인쇄 후가공원" }>
    | tags.Constant<"881107", { title: "제책·제본기 조작원" }>
    | tags.Constant<
        "881200",
        { title: "사진 인화·현상기 조작원(사진수정 포함)" }
      >
    | tags.Constant<"122", { title: "목재·펄프·종이 생산" }>
    | tags.Constant<"882101", { title: "목재 가공기계 조작원" }>
    | tags.Constant<"882102", { title: "합판 제조기계 조작원" }>
    | tags.Constant<"882200", { title: "펄프·종이 제조장치 조작원" }>
    | tags.Constant<"882300", { title: "종이제품 생산기계 조작원" }>
    | tags.Constant<"882900", { title: "기타 목재·종이 기계 조작원" }>
    | tags.Constant<"123", { title: "가구·목제품 제조·수리" }>
    | tags.Constant<"883100", { title: "가구 제조·수리원" }>
    | tags.Constant<"883101", { title: "가구 제조원" }>
    | tags.Constant<"883102", { title: "가구 수리원" }>
    | tags.Constant<"883200", { title: "가구 조립원" }>
    | tags.Constant<"883300", { title: "목제품 제조원" }>
    | tags.Constant<"124", { title: "공예 및 귀금속 세공" }>
    | tags.Constant<"884100", { title: "공예원" }>
    | tags.Constant<"884200", { title: "귀금속·보석 세공원" }>
    | tags.Constant<"125", { title: "악기·간판 및 기타 제조(드론조작 포함)" }>
    | tags.Constant<"885100", { title: "악기 제조원 및 조율사" }>
    | tags.Constant<"885200", { title: "간판 제작·설치원" }>
    | tags.Constant<
        "885300",
        { title: "유리기능, 복사, 수제 제본 등 기타 기능 종사원" }
      >
    | tags.Constant<
        "885900",
        { title: "주입·포장·상표부착기 및 기타 기계 조작원" }
      >
    | tags.Constant<"885901", { title: "드론 조작원" }>
    | tags.Constant<
        "885902",
        { title: "주입·포장·상표부착기 등 기타 기계 조작원" }
      >
    | tags.Constant<"126", { title: "제조 단순 종사자" }>
    | tags.Constant<"816200", { title: "금속기계부품 조립원" }>
    | tags.Constant<"824107", { title: "용접 사상원 및 보조원" }>
    | tags.Constant<"836000", { title: "전기·전자 부품·제품 조립원" }>
    | tags.Constant<"852401", { title: "고무제품 조립원 및 검사원" }>
    | tags.Constant<"852402", { title: "플라스틱제품 조립원 및 검사원" }>
    | tags.Constant<"862200", { title: "재단사" }>
    | tags.Constant<"862301", { title: "재봉사(의류·직물)" }>
    | tags.Constant<
        "862900",
        { title: "의복·직물 검사 등 기타 섬유·가죽 기능원" }
      >
    | tags.Constant<"890000", { title: "제조 단순 종사원" }>
    | tags.Constant<"890001", { title: "기계·금속 분야 단순 종사원" }>
    | tags.Constant<
        "890002",
        { title: "단순 사상원(용접사상 제외-용접원구분)" }
      >
    | tags.Constant<"890003", { title: "화학·환경·에너지 분야 단순 종사원" }>
    | tags.Constant<"890004", { title: "섬유·의복 분야 단순 종사원" }>
    | tags.Constant<"890005", { title: "전기·전자 분야 단순 종사원" }>
    | tags.Constant<"890006", { title: "식품 분야 단순 종사원" }>
    | tags.Constant<
        "890007",
        { title: "인쇄, 목재, 가구 및 기타 제조 분야 단순 종사원" }
      >
    | tags.Constant<"13", { title: "농림어업직" }>
    | tags.Constant<"131", { title: "작물재배" }>
    | tags.Constant<"901100", { title: "곡식작물 재배원" }>
    | tags.Constant<"901200", { title: "채소·특용작물 재배원" }>
    | tags.Constant<"901300", { title: "과수작물 재배원" }>
    | tags.Constant<"901400", { title: "원예작물 재배원" }>
    | tags.Constant<"901500", { title: "조경원" }>
    | tags.Constant<"901501", { title: "조경 식재원" }>
    | tags.Constant<"901502", { title: "식물 관리원" }>
    | tags.Constant<"132", { title: "낙농·사육" }>
    | tags.Constant<
        "414901",
        { title: "조련사(공연)·마술사 등 기타 시각 및 공연 예술가" }
      >
    | tags.Constant<
        "420406",
        { title: "프로모터, 경주마 조련사 등 기타 스프츠 관련 전문가" }
      >
    | tags.Constant<"511502", { title: "반려동물 훈련사(맹인견 조련사 포함)" }>
    | tags.Constant<"902100", { title: "낙농 종사원" }>
    | tags.Constant<"902200", { title: "가축 사육 종사원" }>
    | tags.Constant<
        "902900",
        { title: "기타 사육 종사원(양봉·감별·동물원사육·실험동물사육 등)" }
      >
    | tags.Constant<"133", { title: "임업 종사자" }>
    | tags.Constant<"903100", { title: "조림·산림경영인 및 벌목원" }>
    | tags.Constant<"903900", { title: "임산물 채취 및 기타 임업 종사원" }>
    | tags.Constant<"134", { title: "어업 종사자" }>
    | tags.Constant<"904100", { title: "양식원" }>
    | tags.Constant<"904200", { title: "어부 및 해녀" }>
    | tags.Constant<"135", { title: "농림어업 단순 종사자" }>
    | tags.Constant<"905000", { title: "농림어업 단순 종사원" }>
    | tags.Constant<"905001", { title: "농업 단순 종사원" }>
    | tags.Constant<
        "905002",
        { title: "임업 단순 종사원(산림보호감시, 산불감시원 등)" }
      >
    | tags.Constant<"905003", { title: "어업 단순 종사원		" }>;

  /**
   * @title 역세권 코드
   * @description `지역코드-호선번호-지하철역번호` 형식으로 표현한다.
   */
  export type SubwayType =
    | tags.Constant<"11000-1-1", { title: "가능" }>
    | tags.Constant<"11000-1-10", { title: "금정" }>
    | tags.Constant<"11000-1-100", { title: "전곡" }>
    | tags.Constant<"11000-1-101", { title: "연천" }>
    | tags.Constant<"11000-1-102", { title: "청산" }>
    | tags.Constant<"11000-1-11", { title: "남영" }>
    | tags.Constant<"11000-1-12", { title: "노량진" }>
    | tags.Constant<"11000-1-13", { title: "녹양" }>
    | tags.Constant<"11000-1-14", { title: "녹천" }>
    | tags.Constant<"11000-1-15", { title: "대방" }>
    | tags.Constant<"11000-1-16", { title: "덕계" }>
    | tags.Constant<"11000-1-17", { title: "덕정" }>
    | tags.Constant<"11000-1-18", { title: "도봉" }>
    | tags.Constant<"11000-1-19", { title: "도봉산" }>
    | tags.Constant<"11000-1-2", { title: "가산디지털단지" }>
    | tags.Constant<"11000-1-20", { title: "도원" }>
    | tags.Constant<"11000-1-21", { title: "도화" }>
    | tags.Constant<"11000-1-22", { title: "독산" }>
    | tags.Constant<"11000-1-23", { title: "동대문" }>
    | tags.Constant<"11000-1-24", { title: "동두천" }>
    | tags.Constant<"11000-1-25", { title: "동두천중앙" }>
    | tags.Constant<"11000-1-26", { title: "동묘앞" }>
    | tags.Constant<"11000-1-27", { title: "동암" }>
    | tags.Constant<"11000-1-28", { title: "동인천" }>
    | tags.Constant<"11000-1-29", { title: "두정" }>
    | tags.Constant<"11000-1-3", { title: "간석" }>
    | tags.Constant<"11000-1-30", { title: "망월사" }>
    | tags.Constant<"11000-1-31", { title: "명학" }>
    | tags.Constant<"11000-1-32", { title: "방학" }>
    | tags.Constant<"11000-1-33", { title: "백운" }>
    | tags.Constant<"11000-1-34", { title: "병점" }>
    | tags.Constant<"11000-1-35", { title: "보산" }>
    | tags.Constant<"11000-1-36", { title: "부개" }>
    | tags.Constant<"11000-1-37", { title: "부천" }>
    | tags.Constant<"11000-1-38", { title: "부평" }>
    | tags.Constant<"11000-1-39", { title: "서울역" }>
    | tags.Constant<"11000-1-4", { title: "개봉" }>
    | tags.Constant<"11000-1-40", { title: "서정리" }>
    | tags.Constant<"11000-1-41", { title: "석계" }>
    | tags.Constant<"11000-1-42", { title: "석수" }>
    | tags.Constant<"11000-1-43", { title: "성균관대" }>
    | tags.Constant<"11000-1-44", { title: "광운대" }>
    | tags.Constant<"11000-1-45", { title: "성환" }>
    | tags.Constant<"11000-1-46", { title: "세류" }>
    | tags.Constant<"11000-1-47", { title: "세마" }>
    | tags.Constant<"11000-1-48", { title: "소사" }>
    | tags.Constant<"11000-1-49", { title: "소요산" }>
    | tags.Constant<"11000-1-5", { title: "관악" }>
    | tags.Constant<"11000-1-50", { title: "송내" }>
    | tags.Constant<"11000-1-51", { title: "송탄" }>
    | tags.Constant<"11000-1-52", { title: "수원" }>
    | tags.Constant<"11000-1-53", { title: "시청" }>
    | tags.Constant<"11000-1-54", { title: "금천구청" }>
    | tags.Constant<"11000-1-55", { title: "신길" }>
    | tags.Constant<"11000-1-56", { title: "신도림" }>
    | tags.Constant<"11000-1-57", { title: "신설동" }>
    | tags.Constant<"11000-1-58", { title: "신이문" }>
    | tags.Constant<"11000-1-59", { title: "안양" }>
    | tags.Constant<"11000-1-6", { title: "광명" }>
    | tags.Constant<"11000-1-60", { title: "양주" }>
    | tags.Constant<"11000-1-61", { title: "역곡" }>
    | tags.Constant<"11000-1-62", { title: "영등포" }>
    | tags.Constant<"11000-1-63", { title: "오류동" }>
    | tags.Constant<"11000-1-64", { title: "오산" }>
    | tags.Constant<"11000-1-65", { title: "오산대" }>
    | tags.Constant<"11000-1-66", { title: "온수" }>
    | tags.Constant<"11000-1-67", { title: "외대앞" }>
    | tags.Constant<"11000-1-68", { title: "용산" }>
    | tags.Constant<"11000-1-69", { title: "월계" }>
    | tags.Constant<"11000-1-7", { title: "구로" }>
    | tags.Constant<"11000-1-70", { title: "의왕" }>
    | tags.Constant<"11000-1-71", { title: "의정부" }>
    | tags.Constant<"11000-1-72", { title: "인천" }>
    | tags.Constant<"11000-1-73", { title: "제기동" }>
    | tags.Constant<"11000-1-74", { title: "제물포" }>
    | tags.Constant<"11000-1-75", { title: "종각" }>
    | tags.Constant<"11000-1-76", { title: "종로3가" }>
    | tags.Constant<"11000-1-77", { title: "종로5가" }>
    | tags.Constant<"11000-1-78", { title: "주안" }>
    | tags.Constant<"11000-1-79", { title: "중동" }>
    | tags.Constant<"11000-1-8", { title: "구일" }>
    | tags.Constant<"11000-1-80", { title: "지제" }>
    | tags.Constant<"11000-1-81", { title: "지행" }>
    | tags.Constant<"11000-1-82", { title: "직산" }>
    | tags.Constant<"11000-1-83", { title: "진위" }>
    | tags.Constant<"11000-1-84", { title: "창동" }>
    | tags.Constant<"11000-1-85", { title: "천안" }>
    | tags.Constant<"11000-1-86", { title: "청량리" }>
    | tags.Constant<"11000-1-87", { title: "평택" }>
    | tags.Constant<"11000-1-88", { title: "화서" }>
    | tags.Constant<"11000-1-89", { title: "회기" }>
    | tags.Constant<"11000-1-9", { title: "군포" }>
    | tags.Constant<"11000-1-90", { title: "회룡" }>
    | tags.Constant<"11000-1-91", { title: "온양온천" }>
    | tags.Constant<"11000-1-92", { title: "신창(순천향대)" }>
    | tags.Constant<"11000-1-93", { title: "쌍용(나사렛대)" }>
    | tags.Constant<"11000-1-94", { title: "아산" }>
    | tags.Constant<"11000-1-95", { title: "배방" }>
    | tags.Constant<"11000-1-96", { title: "서동탄" }>
    | tags.Constant<"11000-1-97", { title: "봉명" }>
    | tags.Constant<"11000-1-98", { title: "당정" }>
    | tags.Constant<"11000-1-99", { title: "탕정역" }>
    | tags.Constant<"11000-2-100", { title: "대림" }>
    | tags.Constant<"11000-2-101", { title: "도림천" }>
    | tags.Constant<"11000-2-102", { title: "동대문역사문화공원  " }>
    | tags.Constant<"11000-2-103", { title: "뚝섬" }>
    | tags.Constant<"11000-2-104", { title: "문래" }>
    | tags.Constant<"11000-2-105", { title: "방배" }>
    | tags.Constant<"11000-2-106", { title: "봉천" }>
    | tags.Constant<"11000-2-107", { title: "사당" }>
    | tags.Constant<"11000-2-108", { title: "삼성" }>
    | tags.Constant<"11000-2-109", { title: "상왕십리" }>
    | tags.Constant<"11000-2-110", { title: "서울대입구" }>
    | tags.Constant<"11000-2-111", { title: "서초" }>
    | tags.Constant<"11000-2-112", { title: "선릉" }>
    | tags.Constant<"11000-2-113", { title: "잠실나루" }>
    | tags.Constant<"11000-2-114", { title: "성수" }>
    | tags.Constant<"11000-2-115", { title: "시청" }>
    | tags.Constant<"11000-2-116", { title: "신답" }>
    | tags.Constant<"11000-2-117", { title: "신당" }>
    | tags.Constant<"11000-2-118", { title: "신대방" }>
    | tags.Constant<"11000-2-119", { title: "신도림" }>
    | tags.Constant<"11000-2-120", { title: "신림" }>
    | tags.Constant<"11000-2-121", { title: "신설동" }>
    | tags.Constant<"11000-2-122", { title: "신정네거리" }>
    | tags.Constant<"11000-2-123", { title: "잠실새내" }>
    | tags.Constant<"11000-2-124", { title: "신촌" }>
    | tags.Constant<"11000-2-125", { title: "아현" }>
    | tags.Constant<"11000-2-126", { title: "양천구청" }>
    | tags.Constant<"11000-2-127", { title: "역삼" }>
    | tags.Constant<"11000-2-128", { title: "영등포구청" }>
    | tags.Constant<"11000-2-129", { title: "왕십리" }>
    | tags.Constant<"11000-2-130", { title: "용답" }>
    | tags.Constant<"11000-2-131", { title: "을지로3가" }>
    | tags.Constant<"11000-2-132", { title: "을지로4가" }>
    | tags.Constant<"11000-2-133", { title: "을지로입구" }>
    | tags.Constant<"11000-2-134", { title: "이대" }>
    | tags.Constant<"11000-2-135", { title: "잠실" }>
    | tags.Constant<"11000-2-136", { title: "종합운동장" }>
    | tags.Constant<"11000-2-137", { title: "충정로" }>
    | tags.Constant<"11000-2-138", { title: "한양대" }>
    | tags.Constant<"11000-2-139", { title: "합정" }>
    | tags.Constant<"11000-2-140", { title: "홍대입구" }>
    | tags.Constant<"11000-2-415", { title: "용두" }>
    | tags.Constant<"11000-2-91", { title: "강남" }>
    | tags.Constant<"11000-2-92", { title: "강변" }>
    | tags.Constant<"11000-2-93", { title: "건대입구" }>
    | tags.Constant<"11000-2-94", { title: "교대" }>
    | tags.Constant<"11000-2-95", { title: "구로디지털단지" }>
    | tags.Constant<"11000-2-96", { title: "구의" }>
    | tags.Constant<"11000-2-97", { title: "까치산" }>
    | tags.Constant<"11000-2-98", { title: "낙성대" }>
    | tags.Constant<"11000-2-99", { title: "당산" }>
    | tags.Constant<"11000-3-141", { title: "경복궁" }>
    | tags.Constant<"11000-3-142", { title: "고속터미널" }>
    | tags.Constant<"11000-3-143", { title: "교대" }>
    | tags.Constant<"11000-3-144", { title: "구파발" }>
    | tags.Constant<"11000-3-145", { title: "금호" }>
    | tags.Constant<"11000-3-146", { title: "남부터미널" }>
    | tags.Constant<"11000-3-147", { title: "녹번" }>
    | tags.Constant<"11000-3-148", { title: "대곡" }>
    | tags.Constant<"11000-3-149", { title: "대청" }>
    | tags.Constant<"11000-3-150", { title: "대치" }>
    | tags.Constant<"11000-3-151", { title: "대화" }>
    | tags.Constant<"11000-3-152", { title: "도곡" }>
    | tags.Constant<"11000-3-153", { title: "독립문" }>
    | tags.Constant<"11000-3-154", { title: "동대입구" }>
    | tags.Constant<"11000-3-155", { title: "마두" }>
    | tags.Constant<"11000-3-156", { title: "매봉" }>
    | tags.Constant<"11000-3-157", { title: "무악재" }>
    | tags.Constant<"11000-3-158", { title: "백석" }>
    | tags.Constant<"11000-3-159", { title: "불광" }>
    | tags.Constant<"11000-3-160", { title: "삼송" }>
    | tags.Constant<"11000-3-161", { title: "수서" }>
    | tags.Constant<"11000-3-162", { title: "신사" }>
    | tags.Constant<"11000-3-163", { title: "안국" }>
    | tags.Constant<"11000-3-164", { title: "압구정" }>
    | tags.Constant<"11000-3-165", { title: "약수" }>
    | tags.Constant<"11000-3-166", { title: "양재" }>
    | tags.Constant<"11000-3-167", { title: "연신내" }>
    | tags.Constant<"11000-3-168", { title: "옥수" }>
    | tags.Constant<"11000-3-169", { title: "원당" }>
    | tags.Constant<"11000-3-170", { title: "을지로3가" }>
    | tags.Constant<"11000-3-171", { title: "일원" }>
    | tags.Constant<"11000-3-172", { title: "잠원" }>
    | tags.Constant<"11000-3-173", { title: "정발산" }>
    | tags.Constant<"11000-3-174", { title: "종로3가" }>
    | tags.Constant<"11000-3-175", { title: "주엽" }>
    | tags.Constant<"11000-3-176", { title: "지축" }>
    | tags.Constant<"11000-3-177", { title: "충무로" }>
    | tags.Constant<"11000-3-178", { title: "학여울" }>
    | tags.Constant<"11000-3-179", { title: "홍제" }>
    | tags.Constant<"11000-3-180", { title: "화정" }>
    | tags.Constant<"11000-3-181", { title: "가락시장" }>
    | tags.Constant<"11000-3-182", { title: "경찰병원" }>
    | tags.Constant<"11000-3-183", { title: "오금" }>
    | tags.Constant<"11000-3-184", { title: "원흥" }>
    | tags.Constant<"11000-4-181", { title: "경마공원" }>
    | tags.Constant<"11000-4-182", { title: "고잔" }>
    | tags.Constant<"11000-4-183", { title: "초지" }>
    | tags.Constant<"11000-4-184", { title: "과천" }>
    | tags.Constant<"11000-4-185", { title: "금정" }>
    | tags.Constant<"11000-4-186", { title: "길음" }>
    | tags.Constant<"11000-4-187", { title: "남태령" }>
    | tags.Constant<"11000-4-188", { title: "노원" }>
    | tags.Constant<"11000-4-189", { title: "당고개" }>
    | tags.Constant<"11000-4-190", { title: "대공원" }>
    | tags.Constant<"11000-4-191", { title: "대야미" }>
    | tags.Constant<"11000-4-192", { title: "동대문" }>
    | tags.Constant<"11000-4-193", { title: "동대문역사문화공원  " }>
    | tags.Constant<"11000-4-194", { title: "동작" }>
    | tags.Constant<"11000-4-195", { title: "명동" }>
    | tags.Constant<"11000-4-196", { title: "미아" }>
    | tags.Constant<"11000-4-197", { title: "미아사거리" }>
    | tags.Constant<"11000-4-198", { title: "반월" }>
    | tags.Constant<"11000-4-199", { title: "범계" }>
    | tags.Constant<"11000-4-200", { title: "사당" }>
    | tags.Constant<"11000-4-201", { title: "산본" }>
    | tags.Constant<"11000-4-202", { title: "삼각지" }>
    | tags.Constant<"11000-4-203", { title: "상계" }>
    | tags.Constant<"11000-4-204", { title: "상록수" }>
    | tags.Constant<"11000-4-205", { title: "서울역" }>
    | tags.Constant<"11000-4-206", { title: "선바위" }>
    | tags.Constant<"11000-4-207", { title: "성신여대입구" }>
    | tags.Constant<"11000-4-208", { title: "수리산" }>
    | tags.Constant<"11000-4-209", { title: "수유(강북구청)" }>
    | tags.Constant<"11000-4-210", { title: "숙대입구" }>
    | tags.Constant<"11000-4-211", { title: "신길온천" }>
    | tags.Constant<"11000-4-212", { title: "신용산" }>
    | tags.Constant<"11000-4-213", { title: "쌍문" }>
    | tags.Constant<"11000-4-214", { title: "안산" }>
    | tags.Constant<"11000-4-215", { title: "오이도" }>
    | tags.Constant<"11000-4-216", { title: "이촌" }>
    | tags.Constant<"11000-4-217", { title: "인덕원" }>
    | tags.Constant<"11000-4-218", { title: "정부과천청사" }>
    | tags.Constant<"11000-4-219", { title: "정왕" }>
    | tags.Constant<"11000-4-220", { title: "중앙" }>
    | tags.Constant<"11000-4-221", { title: "창동" }>
    | tags.Constant<"11000-4-222", { title: "총신대입구" }>
    | tags.Constant<"11000-4-223", { title: "충무로" }>
    | tags.Constant<"11000-4-224", { title: "평촌" }>
    | tags.Constant<"11000-4-225", { title: "한대앞" }>
    | tags.Constant<"11000-4-226", { title: "한성대입구" }>
    | tags.Constant<"11000-4-227", { title: "혜화" }>
    | tags.Constant<"11000-4-228", { title: "회현" }>
    | tags.Constant<"11000-4-229", { title: "진접역" }>
    | tags.Constant<"11000-4-230", { title: "별내별가람역" }>
    | tags.Constant<"11000-4-231", { title: "오남역" }>
    | tags.Constant<"11000-5-229", { title: "강동" }>
    | tags.Constant<"11000-5-230", { title: "개롱" }>
    | tags.Constant<"11000-5-231", { title: "개화산" }>
    | tags.Constant<"11000-5-232", { title: "거여" }>
    | tags.Constant<"11000-5-233", { title: "고덕" }>
    | tags.Constant<"11000-5-234", { title: "공덕" }>
    | tags.Constant<"11000-5-235", { title: "광나루" }>
    | tags.Constant<"11000-5-236", { title: "광화문" }>
    | tags.Constant<"11000-5-237", { title: "군자" }>
    | tags.Constant<"11000-5-238", { title: "굽은다리" }>
    | tags.Constant<"11000-5-239", { title: "길동" }>
    | tags.Constant<"11000-5-240", { title: "김포공항" }>
    | tags.Constant<"11000-5-241", { title: "까치산" }>
    | tags.Constant<"11000-5-242", { title: "답십리" }>
    | tags.Constant<"11000-5-243", { title: "동대문역사문화공원  " }>
    | tags.Constant<"11000-5-244", { title: "둔촌동" }>
    | tags.Constant<"11000-5-245", { title: "마곡" }>
    | tags.Constant<"11000-5-246", { title: "마장" }>
    | tags.Constant<"11000-5-247", { title: "마천" }>
    | tags.Constant<"11000-5-248", { title: "마포" }>
    | tags.Constant<"11000-5-249", { title: "명일" }>
    | tags.Constant<"11000-5-250", { title: "목동" }>
    | tags.Constant<"11000-5-251", { title: "발산" }>
    | tags.Constant<"11000-5-252", { title: "방이" }>
    | tags.Constant<"11000-5-253", { title: "방화" }>
    | tags.Constant<"11000-5-254", { title: "상일동" }>
    | tags.Constant<"11000-5-255", { title: "서대문" }>
    | tags.Constant<"11000-5-256", { title: "송정" }>
    | tags.Constant<"11000-5-257", { title: "신금호" }>
    | tags.Constant<"11000-5-258", { title: "신길" }>
    | tags.Constant<"11000-5-259", { title: "신정" }>
    | tags.Constant<"11000-5-260", { title: "아차산" }>
    | tags.Constant<"11000-5-261", { title: "애오개" }>
    | tags.Constant<"11000-5-262", { title: "양평" }>
    | tags.Constant<"11000-5-263", { title: "여의나루" }>
    | tags.Constant<"11000-5-264", { title: "여의도" }>
    | tags.Constant<"11000-5-265", { title: "영등포구청" }>
    | tags.Constant<"11000-5-266", { title: "영등포시장" }>
    | tags.Constant<"11000-5-267", { title: "오금" }>
    | tags.Constant<"11000-5-268", { title: "오목교" }>
    | tags.Constant<"11000-5-269", { title: "올림픽공원" }>
    | tags.Constant<"11000-5-270", { title: "왕십리" }>
    | tags.Constant<"11000-5-271", { title: "우장산" }>
    | tags.Constant<"11000-5-272", { title: "을지로4가" }>
    | tags.Constant<"11000-5-273", { title: "장한평" }>
    | tags.Constant<"11000-5-274", { title: "종로3가" }>
    | tags.Constant<"11000-5-275", { title: "천호" }>
    | tags.Constant<"11000-5-276", { title: "청구" }>
    | tags.Constant<"11000-5-277", { title: "충정로" }>
    | tags.Constant<"11000-5-278", { title: "행당" }>
    | tags.Constant<"11000-5-279", { title: "화곡" }>
    | tags.Constant<"11000-5-280", { title: "하남풍산" }>
    | tags.Constant<"11000-5-281", { title: "미사" }>
    | tags.Constant<"11000-5-282", { title: "강일" }>
    | tags.Constant<"11000-5-283", { title: "하남검단산" }>
    | tags.Constant<"11000-5-284", { title: "하남시청" }>
    | tags.Constant<"11000-6-280", { title: "고려대" }>
    | tags.Constant<"11000-6-281", { title: "공덕" }>
    | tags.Constant<"11000-6-282", { title: "광흥창" }>
    | tags.Constant<"11000-6-283", { title: "구산" }>
    | tags.Constant<"11000-6-284", { title: "녹사평(용산구청)" }>
    | tags.Constant<"11000-6-285", { title: "대흥" }>
    | tags.Constant<"11000-6-286", { title: "독바위" }>
    | tags.Constant<"11000-6-287", { title: "돌곶이" }>
    | tags.Constant<"11000-6-288", { title: "동묘앞" }>
    | tags.Constant<"11000-6-289", { title: "마포구청" }>
    | tags.Constant<"11000-6-290", { title: "망원" }>
    | tags.Constant<"11000-6-291", { title: "버티고개" }>
    | tags.Constant<"11000-6-292", { title: "보문" }>
    | tags.Constant<"11000-6-293", { title: "봉화산(서울의료원)" }>
    | tags.Constant<"11000-6-294", { title: "불광" }>
    | tags.Constant<"11000-6-295", { title: "삼각지" }>
    | tags.Constant<"11000-6-296", { title: "상수" }>
    | tags.Constant<"11000-6-297", { title: "상월곡" }>
    | tags.Constant<"11000-6-298", { title: "새절" }>
    | tags.Constant<"11000-6-299", { title: "석계" }>
    | tags.Constant<"11000-6-300", { title: "디지털미디어시티" }>
    | tags.Constant<"11000-6-301", { title: "신당" }>
    | tags.Constant<"11000-6-302", { title: "안암" }>
    | tags.Constant<"11000-6-303", { title: "약수" }>
    | tags.Constant<"11000-6-304", { title: "역촌" }>
    | tags.Constant<"11000-6-305", { title: "연신내" }>
    | tags.Constant<"11000-6-306", { title: "월곡" }>
    | tags.Constant<"11000-6-307", { title: "월드컵경기장" }>
    | tags.Constant<"11000-6-308", { title: "응암" }>
    | tags.Constant<"11000-6-309", { title: "이태원" }>
    | tags.Constant<"11000-6-310", { title: "증산" }>
    | tags.Constant<"11000-6-311", { title: "창신" }>
    | tags.Constant<"11000-6-312", { title: "청구" }>
    | tags.Constant<"11000-6-313", { title: "태릉입구" }>
    | tags.Constant<"11000-6-314", { title: "한강진" }>
    | tags.Constant<"11000-6-315", { title: "합정" }>
    | tags.Constant<"11000-6-316", { title: "화랑대" }>
    | tags.Constant<"11000-6-317", { title: "효창공원앞" }>
    | tags.Constant<"11000-7-318", { title: "가산디지털단지" }>
    | tags.Constant<"11000-7-319", { title: "강남구청" }>
    | tags.Constant<"11000-7-320", { title: "건대입구" }>
    | tags.Constant<"11000-7-321", { title: "고속터미널" }>
    | tags.Constant<"11000-7-322", { title: "공릉" }>
    | tags.Constant<"11000-7-323", { title: "광명사거리" }>
    | tags.Constant<"11000-7-324", { title: "군자" }>
    | tags.Constant<"11000-7-325", { title: "남구로" }>
    | tags.Constant<"11000-7-326", { title: "남성" }>
    | tags.Constant<"11000-7-327", { title: "내방" }>
    | tags.Constant<"11000-7-328", { title: "노원" }>
    | tags.Constant<"11000-7-329", { title: "논현" }>
    | tags.Constant<"11000-7-330", { title: "대림" }>
    | tags.Constant<"11000-7-331", { title: "도봉산" }>
    | tags.Constant<"11000-7-332", { title: "뚝섬유원지" }>
    | tags.Constant<"11000-7-333", { title: "마들" }>
    | tags.Constant<"11000-7-334", { title: "먹골" }>
    | tags.Constant<"11000-7-335", { title: "면목" }>
    | tags.Constant<"11000-7-336", { title: "반포" }>
    | tags.Constant<"11000-7-337", { title: "보라매" }>
    | tags.Constant<"11000-7-338", { title: "사가정" }>
    | tags.Constant<"11000-7-339", { title: "상도" }>
    | tags.Constant<"11000-7-340", { title: "상봉" }>
    | tags.Constant<"11000-7-341", { title: "수락산" }>
    | tags.Constant<"11000-7-342", { title: "숭실대입구" }>
    | tags.Constant<"11000-7-343", { title: "신대방삼거리" }>
    | tags.Constant<"11000-7-344", { title: "신풍" }>
    | tags.Constant<"11000-7-345", { title: "어린이대공원" }>
    | tags.Constant<"11000-7-346", { title: "온수" }>
    | tags.Constant<"11000-7-347", { title: "용마산" }>
    | tags.Constant<"11000-7-348", { title: "총신대입구" }>
    | tags.Constant<"11000-7-349", { title: "장승배기" }>
    | tags.Constant<"11000-7-350", { title: "장암" }>
    | tags.Constant<"11000-7-351", { title: "중계" }>
    | tags.Constant<"11000-7-352", { title: "중곡" }>
    | tags.Constant<"11000-7-353", { title: "중화" }>
    | tags.Constant<"11000-7-354", { title: "천왕" }>
    | tags.Constant<"11000-7-355", { title: "철산" }>
    | tags.Constant<"11000-7-356", { title: "청담" }>
    | tags.Constant<"11000-7-357", { title: "태릉입구" }>
    | tags.Constant<"11000-7-358", { title: "하계" }>
    | tags.Constant<"11000-7-359", { title: "학동" }>
    | tags.Constant<"11000-7-454", { title: "까치울" }>
    | tags.Constant<"11000-7-455", { title: "부천종합운동장" }>
    | tags.Constant<"11000-7-456", { title: "춘의" }>
    | tags.Constant<"11000-7-457", { title: "신중동" }>
    | tags.Constant<"11000-7-458", { title: "부천시청" }>
    | tags.Constant<"11000-7-459", { title: "상동" }>
    | tags.Constant<"11000-7-460", { title: "삼산체육관" }>
    | tags.Constant<"11000-7-461", { title: "굴포천" }>
    | tags.Constant<"11000-7-462", { title: "부평구청" }>
    | tags.Constant<"11000-7-476", { title: "이수" }>
    | tags.Constant<"11000-7-477", { title: "산곡" }>
    | tags.Constant<"11000-7-478", { title: "석남" }>
    | tags.Constant<"11000-8-360", { title: "가락시장" }>
    | tags.Constant<"11000-8-361", { title: "강동구청" }>
    | tags.Constant<"11000-8-362", { title: "남한산성입구" }>
    | tags.Constant<"11000-8-363", { title: "단대오거리" }>
    | tags.Constant<"11000-8-364", { title: "모란" }>
    | tags.Constant<"11000-8-365", { title: "몽촌토성" }>
    | tags.Constant<"11000-8-366", { title: "문정" }>
    | tags.Constant<"11000-8-367", { title: "복정" }>
    | tags.Constant<"11000-8-368", { title: "산성" }>
    | tags.Constant<"11000-8-369", { title: "석촌" }>
    | tags.Constant<"11000-8-370", { title: "송파" }>
    | tags.Constant<"11000-8-371", { title: "수진" }>
    | tags.Constant<"11000-8-372", { title: "신흥" }>
    | tags.Constant<"11000-8-373", { title: "암사" }>
    | tags.Constant<"11000-8-374", { title: "잠실" }>
    | tags.Constant<"11000-8-375", { title: "장지" }>
    | tags.Constant<"11000-8-376", { title: "천호" }>
    | tags.Constant<"11000-8-377", { title: "남위례" }>
    | tags.Constant<"11000-9-901", { title: "개화" }>
    | tags.Constant<"11000-9-902", { title: "김포공항" }>
    | tags.Constant<"11000-9-903", { title: "공항시장" }>
    | tags.Constant<"11000-9-904", { title: "신방화" }>
    | tags.Constant<"11000-9-905", { title: "마곡나루" }>
    | tags.Constant<"11000-9-906", { title: "양천향교" }>
    | tags.Constant<"11000-9-907", { title: "가양" }>
    | tags.Constant<"11000-9-908", { title: "증미" }>
    | tags.Constant<"11000-9-909", { title: "등촌" }>
    | tags.Constant<"11000-9-910", { title: "염창" }>
    | tags.Constant<"11000-9-911", { title: "신목동" }>
    | tags.Constant<"11000-9-912", { title: "선유도" }>
    | tags.Constant<"11000-9-913", { title: "당산" }>
    | tags.Constant<"11000-9-914", { title: "국회의사당" }>
    | tags.Constant<"11000-9-915", { title: "여의도" }>
    | tags.Constant<"11000-9-916", { title: "샛강" }>
    | tags.Constant<"11000-9-917", { title: "노량진" }>
    | tags.Constant<"11000-9-918", { title: "노들" }>
    | tags.Constant<"11000-9-919", { title: "흑석" }>
    | tags.Constant<"11000-9-920", { title: "동작" }>
    | tags.Constant<"11000-9-921", { title: "구반포" }>
    | tags.Constant<"11000-9-922", { title: "신반포" }>
    | tags.Constant<"11000-9-923", { title: "고속터미널" }>
    | tags.Constant<"11000-9-924", { title: "사평" }>
    | tags.Constant<"11000-9-925", { title: "신논현" }>
    | tags.Constant<"11000-9-926", { title: "언주" }>
    | tags.Constant<"11000-9-927", { title: "선정릉" }>
    | tags.Constant<"11000-9-928", { title: "삼성중앙" }>
    | tags.Constant<"11000-9-929", { title: "봉은사" }>
    | tags.Constant<"11000-9-930", { title: "종합운동장" }>
    | tags.Constant<"11000-9-931", { title: "삼전" }>
    | tags.Constant<"11000-9-932", { title: "석촌고분" }>
    | tags.Constant<"11000-9-933", { title: "석촌" }>
    | tags.Constant<"11000-9-934", { title: "송파나루" }>
    | tags.Constant<"11000-9-935", { title: "한성백제" }>
    | tags.Constant<"11000-9-936", { title: "올림픽공원" }>
    | tags.Constant<"11000-9-937", { title: "둔촌오륜" }>
    | tags.Constant<"11000-9-938", { title: "중앙보훈병원" }>
    | tags.Constant<"11000-11-377", { title: "구리" }>
    | tags.Constant<"11000-11-378", { title: "덕소" }>
    | tags.Constant<"11000-11-379", { title: "도농" }>
    | tags.Constant<"11000-11-380", { title: "도심" }>
    | tags.Constant<"11000-11-381", { title: "망우" }>
    | tags.Constant<"11000-11-382", { title: "서빙고" }>
    | tags.Constant<"11000-11-383", { title: "상봉" }>
    | tags.Constant<"11000-11-384", { title: "양원" }>
    | tags.Constant<"11000-11-385", { title: "양정" }>
    | tags.Constant<"11000-11-386", { title: "옥수" }>
    | tags.Constant<"11000-11-387", { title: "왕십리" }>
    | tags.Constant<"11000-11-388", { title: "용산" }>
    | tags.Constant<"11000-11-389", { title: "응봉" }>
    | tags.Constant<"11000-11-390", { title: "이촌" }>
    | tags.Constant<"11000-11-391", { title: "중랑" }>
    | tags.Constant<"11000-11-392", { title: "청량리" }>
    | tags.Constant<"11000-11-393", { title: "팔당" }>
    | tags.Constant<"11000-11-394", { title: "한남" }>
    | tags.Constant<"11000-11-395", { title: "회기" }>
    | tags.Constant<"11000-11-396", { title: "도심" }>
    | tags.Constant<"11000-11-397", { title: "팔당" }>
    | tags.Constant<"11000-11-398", { title: "운길산" }>
    | tags.Constant<"11000-11-399", { title: "양수" }>
    | tags.Constant<"11000-11-400", { title: "신원" }>
    | tags.Constant<"11000-11-401", { title: "국수" }>
    | tags.Constant<"11000-11-402", { title: "아신" }>
    | tags.Constant<"11000-11-403", { title: "양평" }>
    | tags.Constant<"11000-11-404", { title: "원덕" }>
    | tags.Constant<"11000-11-405", { title: "용문" }>
    | tags.Constant<"11000-11-407", { title: "오빈" }>
    | tags.Constant<"11000-11-434", { title: "서울역" }>
    | tags.Constant<"11000-11-435", { title: "곡산" }>
    | tags.Constant<"11000-11-436", { title: "백마" }>
    | tags.Constant<"11000-11-437", { title: "풍산" }>
    | tags.Constant<"11000-11-438", { title: "일산" }>
    | tags.Constant<"11000-11-439", { title: "탄현" }>
    | tags.Constant<"11000-11-440", { title: "운정" }>
    | tags.Constant<"11000-11-441", { title: "금릉" }>
    | tags.Constant<"11000-11-442", { title: "금촌" }>
    | tags.Constant<"11000-11-443", { title: "월롱" }>
    | tags.Constant<"11000-11-444", { title: "파주" }>
    | tags.Constant<"11000-11-445", { title: "신촌(경의중앙선)" }>
    | tags.Constant<"11000-11-446", { title: "문산" }>
    | tags.Constant<"11000-11-447", { title: "가좌" }>
    | tags.Constant<"11000-11-448", { title: "디지털미디어시티" }>
    | tags.Constant<"11000-11-449", { title: "수색" }>
    | tags.Constant<"11000-11-450", { title: "화전" }>
    | tags.Constant<"11000-11-451", { title: "행신" }>
    | tags.Constant<"11000-11-452", { title: "능곡" }>
    | tags.Constant<"11000-11-453", { title: "대곡" }>
    | tags.Constant<"11000-11-454", { title: "홍대입구" }>
    | tags.Constant<"11000-11-455", { title: "서강대" }>
    | tags.Constant<"11000-11-456", { title: "공덕" }>
    | tags.Constant<"11000-11-457", { title: "강매" }>
    | tags.Constant<"11000-11-458", { title: "야당" }>
    | tags.Constant<"11000-11-459", { title: "효창공원앞" }>
    | tags.Constant<"11000-11-460", { title: "지평" }>
    | tags.Constant<"11000-12-416", { title: "상봉" }>
    | tags.Constant<"11000-12-417", { title: "청평" }>
    | tags.Constant<"11000-12-418", { title: "상천" }>
    | tags.Constant<"11000-12-419", { title: "가평" }>
    | tags.Constant<"11000-12-420", { title: "굴봉산" }>
    | tags.Constant<"11000-12-421", { title: "백양리" }>
    | tags.Constant<"11000-12-422", { title: "강촌" }>
    | tags.Constant<"11000-12-423", { title: "김유정" }>
    | tags.Constant<"11000-12-424", { title: "남춘천" }>
    | tags.Constant<"11000-12-425", { title: "춘천" }>
    | tags.Constant<"11000-12-426", { title: "망우" }>
    | tags.Constant<"11000-12-427", { title: "갈매" }>
    | tags.Constant<"11000-12-428", { title: "퇴계원" }>
    | tags.Constant<"11000-12-429", { title: "사릉" }>
    | tags.Constant<"11000-12-430", { title: "금곡" }>
    | tags.Constant<"11000-12-431", { title: "평내호평" }>
    | tags.Constant<"11000-12-432", { title: "마석" }>
    | tags.Constant<"11000-12-433", { title: "대성리" }>
    | tags.Constant<"11000-12-435", { title: "별내" }>
    | tags.Constant<"11000-12-436", { title: "신내" }>
    | tags.Constant<"11000-12-437", { title: "천마산" }>
    | tags.Constant<"11000-12-438", { title: "중랑" }>
    | tags.Constant<"11000-12-439", { title: "회기" }>
    | tags.Constant<"11000-12-440", { title: "청량리" }>
    | tags.Constant<"11000-12-441", { title: "광운대" }>
    | tags.Constant<"11000-13-1101", { title: "판교" }>
    | tags.Constant<"11000-13-1102", { title: "이매" }>
    | tags.Constant<"11000-13-1103", { title: "삼동" }>
    | tags.Constant<"11000-13-1104", { title: "경기광주" }>
    | tags.Constant<"11000-13-1105", { title: "초월" }>
    | tags.Constant<"11000-13-1106", { title: "곤지암" }>
    | tags.Constant<"11000-13-1107", { title: "신둔도예촌" }>
    | tags.Constant<"11000-13-1108", { title: "이천" }>
    | tags.Constant<"11000-13-1109", { title: "부발" }>
    | tags.Constant<"11000-13-1110", { title: "세종대왕릉" }>
    | tags.Constant<"11000-13-1111", { title: "여주" }>
    | tags.Constant<"11000-14-1112", { title: "북한산우이" }>
    | tags.Constant<"11000-14-1113", { title: "솔밭공원" }>
    | tags.Constant<"11000-14-1114", { title: "4.19묘지" }>
    | tags.Constant<"11000-14-1115", { title: "가오리" }>
    | tags.Constant<"11000-14-1116", { title: "화계" }>
    | tags.Constant<"11000-14-1117", { title: "삼양" }>
    | tags.Constant<"11000-14-1118", { title: "삼양사거리" }>
    | tags.Constant<"11000-14-1119", { title: "솔샘" }>
    | tags.Constant<"11000-14-1120", { title: "북한산보국문" }>
    | tags.Constant<"11000-14-1121", { title: "정릉" }>
    | tags.Constant<"11000-14-1122", { title: "성신여대입구" }>
    | tags.Constant<"11000-14-1123", { title: "보문" }>
    | tags.Constant<"11000-14-1124", { title: "신설동" }>
    | tags.Constant<"11000-15-1", { title: "소새울" }>
    | tags.Constant<"11000-15-10", { title: "시우" }>
    | tags.Constant<"11000-15-11", { title: "원시" }>
    | tags.Constant<"11000-15-12", { title: "소사" }>
    | tags.Constant<"11000-15-2", { title: "시흥대야" }>
    | tags.Constant<"11000-15-3", { title: "신천" }>
    | tags.Constant<"11000-15-4", { title: "신현" }>
    | tags.Constant<"11000-15-5", { title: "시흥시청" }>
    | tags.Constant<"11000-15-6", { title: "시흥능곡" }>
    | tags.Constant<"11000-15-7", { title: "달미" }>
    | tags.Constant<"11000-15-8", { title: "선부" }>
    | tags.Constant<"11000-15-9", { title: "초지" }>
    | tags.Constant<"11000-16-G100", { title: "양촌" }>
    | tags.Constant<"11000-16-G101", { title: "구래" }>
    | tags.Constant<"11000-16-G102", { title: "마산" }>
    | tags.Constant<"11000-16-G103", { title: "장기" }>
    | tags.Constant<"11000-16-G104", { title: "운양" }>
    | tags.Constant<"11000-16-G105", { title: "걸포북변" }>
    | tags.Constant<"11000-16-G106", { title: "사우(김포시청)" }>
    | tags.Constant<"11000-16-G107", { title: "풍무" }>
    | tags.Constant<"11000-16-G108", { title: "고촌" }>
    | tags.Constant<"11000-16-G109", { title: "김포공항" }>
    | tags.Constant<"11000-17-S401", { title: "샛강" }>
    | tags.Constant<"11000-17-S402", { title: "대방" }>
    | tags.Constant<"11000-17-S403", { title: "서울지방병무청" }>
    | tags.Constant<"11000-17-S404", { title: "보라매" }>
    | tags.Constant<"11000-17-S405", { title: "보라매공원" }>
    | tags.Constant<"11000-17-S406", { title: "보라매병원" }>
    | tags.Constant<"11000-17-S407", { title: "당곡" }>
    | tags.Constant<"11000-17-S408", { title: "신림" }>
    | tags.Constant<"11000-17-S409", { title: "서원" }>
    | tags.Constant<"11000-17-S410", { title: "서울대벤처타운" }>
    | tags.Constant<"11000-17-S411", { title: "관악산" }>
    | tags.Constant<"11000-21-701", { title: "인천국제공항" }>
    | tags.Constant<"11000-21-702", { title: "공항화물청사" }>
    | tags.Constant<"11000-21-703", { title: "운서" }>
    | tags.Constant<"11000-21-704", { title: "검암" }>
    | tags.Constant<"11000-21-705", { title: "계양" }>
    | tags.Constant<"11000-21-706", { title: "김포공항" }>
    | tags.Constant<"11000-21-707", { title: "디지털미디어시티" }>
    | tags.Constant<"11000-21-708", { title: "홍대입구" }>
    | tags.Constant<"11000-21-709", { title: "서울역" }>
    | tags.Constant<"11000-21-710", { title: "공덕" }>
    | tags.Constant<"11000-21-711", { title: "청라국제도시" }>
    | tags.Constant<"11000-21-712", { title: "영종" }>
    | tags.Constant<"11000-31-396", { title: "개포동" }>
    | tags.Constant<"11000-31-397", { title: "가천대" }>
    | tags.Constant<"11000-31-398", { title: "구룡" }>
    | tags.Constant<"11000-31-399", { title: "대모산입구" }>
    | tags.Constant<"11000-31-400", { title: "도곡" }>
    | tags.Constant<"11000-31-401", { title: "모란" }>
    | tags.Constant<"11000-31-402", { title: "미금" }>
    | tags.Constant<"11000-31-403", { title: "복정" }>
    | tags.Constant<"11000-31-404", { title: "서현" }>
    | tags.Constant<"11000-31-405", { title: "선릉" }>
    | tags.Constant<"11000-31-406", { title: "수내" }>
    | tags.Constant<"11000-31-407", { title: "수서" }>
    | tags.Constant<"11000-31-408", { title: "야탑" }>
    | tags.Constant<"11000-31-410", { title: "오리" }>
    | tags.Constant<"11000-31-411", { title: "이매" }>
    | tags.Constant<"11000-31-412", { title: "정자" }>
    | tags.Constant<"11000-31-413", { title: "태평" }>
    | tags.Constant<"11000-31-414", { title: "한티" }>
    | tags.Constant<"11000-31-415", { title: "죽전" }>
    | tags.Constant<"11000-31-416", { title: "보정" }>
    | tags.Constant<"11000-31-417", { title: "구성" }>
    | tags.Constant<"11000-31-418", { title: "신갈" }>
    | tags.Constant<"11000-31-419", { title: "기흥" }>
    | tags.Constant<"11000-31-463", { title: "선정릉" }>
    | tags.Constant<"11000-31-464", { title: "강남구청" }>
    | tags.Constant<"11000-31-465", { title: "압구정로데오" }>
    | tags.Constant<"11000-31-466", { title: "서울숲" }>
    | tags.Constant<"11000-31-467", { title: "왕십리" }>
    | tags.Constant<"11000-31-468", { title: "상갈" }>
    | tags.Constant<"11000-31-469", { title: "청명" }>
    | tags.Constant<"11000-31-470", { title: "영통" }>
    | tags.Constant<"11000-31-471", { title: "망포" }>
    | tags.Constant<"11000-31-472", { title: "매탄권선" }>
    | tags.Constant<"11000-31-473", { title: "수원시청" }>
    | tags.Constant<"11000-31-474", { title: "매교" }>
    | tags.Constant<"11000-31-475", { title: "수원" }>
    | tags.Constant<"11000-51-980", { title: "성복" }>
    | tags.Constant<"11000-51-981", { title: "수지구청" }>
    | tags.Constant<"11000-51-990", { title: "강남" }>
    | tags.Constant<"11000-51-991", { title: "양재" }>
    | tags.Constant<"11000-51-992", { title: "양재시민의숲" }>
    | tags.Constant<"11000-51-993", { title: "청계산입구" }>
    | tags.Constant<"11000-51-994", { title: "판교" }>
    | tags.Constant<"11000-51-995", { title: "정자" }>
    | tags.Constant<"11000-51-996", { title: "광교" }>
    | tags.Constant<"11000-51-997", { title: "동천" }>
    | tags.Constant<"11000-51-998", { title: "광교중앙" }>
    | tags.Constant<"11000-51-999", { title: "상현" }>
    | tags.Constant<"11000-61-1000", { title: "오이도" }>
    | tags.Constant<"11000-61-1001", { title: "달월" }>
    | tags.Constant<"11000-61-1002", { title: "월곶" }>
    | tags.Constant<"11000-61-1003", { title: "소래포구" }>
    | tags.Constant<"11000-61-1004", { title: "인천논현" }>
    | tags.Constant<"11000-61-1005", { title: "호구포" }>
    | tags.Constant<"11000-61-1006", { title: "남동인더스파크" }>
    | tags.Constant<"11000-61-1007", { title: "원인재" }>
    | tags.Constant<"11000-61-1008", { title: "연수" }>
    | tags.Constant<"11000-61-1009", { title: "송도" }>
    | tags.Constant<"11000-61-1010", { title: "숭의" }>
    | tags.Constant<"11000-61-1011", { title: "신포" }>
    | tags.Constant<"11000-61-1012", { title: "인천" }>
    | tags.Constant<"11000-61-1013", { title: "인하대" }>
    | tags.Constant<"11000-61-1014", { title: "사리" }>
    | tags.Constant<"11000-61-1015", { title: "가천대" }>
    | tags.Constant<"11000-61-1016", { title: "강남구청" }>
    | tags.Constant<"11000-61-1017", { title: "개포동" }>
    | tags.Constant<"11000-61-1018", { title: "고색" }>
    | tags.Constant<"11000-61-1019", { title: "고잔" }>
    | tags.Constant<"11000-61-1020", { title: "구룡" }>
    | tags.Constant<"11000-61-1021", { title: "구성" }>
    | tags.Constant<"11000-61-1022", { title: "기흥" }>
    | tags.Constant<"11000-61-1025", { title: "대모산입구" }>
    | tags.Constant<"11000-61-1026", { title: "도곡" }>
    | tags.Constant<"11000-61-1027", { title: "망포" }>
    | tags.Constant<"11000-61-1028", { title: "매교" }>
    | tags.Constant<"11000-61-1029", { title: "매탄권산" }>
    | tags.Constant<"11000-61-1030", { title: "모란" }>
    | tags.Constant<"11000-61-1031", { title: "미금" }>
    | tags.Constant<"11000-61-1032", { title: "보정" }>
    | tags.Constant<"11000-61-1033", { title: "복정" }>
    | tags.Constant<"11000-61-1035", { title: "상갈" }>
    | tags.Constant<"11000-61-1036", { title: "서울숲" }>
    | tags.Constant<"11000-61-1037", { title: "서현" }>
    | tags.Constant<"11000-61-1038", { title: "선릉" }>
    | tags.Constant<"11000-61-1039", { title: "선정릉" }>
    | tags.Constant<"11000-61-1042", { title: "수내" }>
    | tags.Constant<"11000-61-1043", { title: "수서" }>
    | tags.Constant<"11000-61-1044", { title: "수원" }>
    | tags.Constant<"11000-61-1045", { title: "수원시청" }>
    | tags.Constant<"11000-61-1047", { title: "신갈" }>
    | tags.Constant<"11000-61-1048", { title: "신길온천" }>
    | tags.Constant<"11000-61-1049", { title: "	안산" }>
    | tags.Constant<"11000-61-1050", { title: "압구정로데오" }>
    | tags.Constant<"11000-61-1051", { title: "야목" }>
    | tags.Constant<"11000-61-1052", { title: "야탑" }>
    | tags.Constant<"11000-61-1053", { title: "어천" }>
    | tags.Constant<"11000-61-1055", { title: "영통" }>
    | tags.Constant<"11000-61-1056", { title: "오리" }>
    | tags.Constant<"11000-61-1057", { title: "오목천" }>
    | tags.Constant<"11000-61-1059", { title: "왕십리" }>
    | tags.Constant<"11000-61-1062", { title: "이매" }>
    | tags.Constant<"11000-61-1066", { title: "정왕" }>
    | tags.Constant<"11000-61-1067", { title: "정자" }>
    | tags.Constant<"11000-61-1068", { title: "죽전" }>
    | tags.Constant<"11000-61-1069", { title: "중앙" }>
    | tags.Constant<"11000-61-1070", { title: "청량리" }>
    | tags.Constant<"11000-61-1071", { title: "청명" }>
    | tags.Constant<"11000-61-1072", { title: "초지" }>
    | tags.Constant<"11000-61-1073", { title: "태평" }>
    | tags.Constant<"11000-61-1074", { title: "한대앞" }>
    | tags.Constant<"11000-61-1075", { title: "한티" }>
    | tags.Constant<"11000-71-1020", { title: "발곡" }>
    | tags.Constant<"11000-71-1021", { title: "회룡" }>
    | tags.Constant<"11000-71-1022", { title: "범골" }>
    | tags.Constant<"11000-71-1023", { title: "경전철의정부" }>
    | tags.Constant<"11000-71-1024", { title: "의정부시청" }>
    | tags.Constant<"11000-71-1025", { title: "흥선" }>
    | tags.Constant<"11000-71-1026", { title: "의정부중앙" }>
    | tags.Constant<"11000-71-1027", { title: "동오" }>
    | tags.Constant<"11000-71-1028", { title: "새말" }>
    | tags.Constant<"11000-71-1029", { title: "경기도청북부청사" }>
    | tags.Constant<"11000-71-1030", { title: "효자" }>
    | tags.Constant<"11000-71-1031", { title: "곤제" }>
    | tags.Constant<"11000-71-1032", { title: "어룡" }>
    | tags.Constant<"11000-71-1033", { title: "송산" }>
    | tags.Constant<"11000-71-1034", { title: "탑석" }>
    | tags.Constant<"11000-81-1035", { title: "기흥" }>
    | tags.Constant<"11000-81-1036", { title: "강남대" }>
    | tags.Constant<"11000-81-1037", { title: "지석" }>
    | tags.Constant<"11000-81-1038", { title: "어정" }>
    | tags.Constant<"11000-81-1039", { title: "동백" }>
    | tags.Constant<"11000-81-1040", { title: "초당" }>
    | tags.Constant<"11000-81-1041", { title: "삼가" }>
    | tags.Constant<"11000-81-1042", { title: "시청·용인대" }>
    | tags.Constant<"11000-81-1043", { title: "명지대" }>
    | tags.Constant<"11000-81-1044", { title: "김량장" }>
    | tags.Constant<"11000-81-1045", { title: "운동장·송담대" }>
    | tags.Constant<"11000-81-1046", { title: "고진" }>
    | tags.Constant<"11000-81-1047", { title: "보평" }>
    | tags.Constant<"11000-81-1048", { title: "둔전" }>
    | tags.Constant<"11000-81-1049", { title: "전대·에버랜드" }>
    | tags.Constant<"11000-91-1050", { title: "인천국제공항" }>
    | tags.Constant<"11000-91-1051", { title: "장기주차장" }>
    | tags.Constant<"11000-91-1052", { title: "합동청사" }>
    | tags.Constant<"11000-91-1053", { title: "국제업무단지" }>
    | tags.Constant<"11000-91-1054", { title: "워터파크" }>
    | tags.Constant<"11000-91-1055", { title: "용유" }>
    | tags.Constant<"26000-1-1", { title: "괴정" }>
    | tags.Constant<"26000-1-10", { title: "동래" }>
    | tags.Constant<"26000-1-11", { title: "두실" }>
    | tags.Constant<"26000-1-12", { title: "명륜" }>
    | tags.Constant<"26000-1-13", { title: "범내골" }>
    | tags.Constant<"26000-1-14", { title: "범어사" }>
    | tags.Constant<"26000-1-15", { title: "범일" }>
    | tags.Constant<"26000-1-16", { title: "부산대" }>
    | tags.Constant<"26000-1-17", { title: "부산역" }>
    | tags.Constant<"26000-1-18", { title: "부산진" }>
    | tags.Constant<"26000-1-19", { title: "부전" }>
    | tags.Constant<"26000-1-2", { title: "교대" }>
    | tags.Constant<"26000-1-20", { title: "사하" }>
    | tags.Constant<"26000-1-21", { title: "서대신" }>
    | tags.Constant<"26000-1-22", { title: "서면" }>
    | tags.Constant<"26000-1-23", { title: "시청" }>
    | tags.Constant<"26000-1-24", { title: "신평" }>
    | tags.Constant<"26000-1-25", { title: "양정" }>
    | tags.Constant<"26000-1-26", { title: "연산" }>
    | tags.Constant<"26000-1-27", { title: "온천장" }>
    | tags.Constant<"26000-1-28", { title: "자갈치" }>
    | tags.Constant<"26000-1-29", { title: "장전" }>
    | tags.Constant<"26000-1-3", { title: "구서" }>
    | tags.Constant<"26000-1-30", { title: "좌천" }>
    | tags.Constant<"26000-1-31", { title: "중앙" }>
    | tags.Constant<"26000-1-32", { title: "초량" }>
    | tags.Constant<"26000-1-33", { title: "토성" }>
    | tags.Constant<"26000-1-34", { title: "하단" }>
    | tags.Constant<"26000-1-35", { title: "동매" }>
    | tags.Constant<"26000-1-36", { title: "장림" }>
    | tags.Constant<"26000-1-37", { title: "신장림" }>
    | tags.Constant<"26000-1-38", { title: "낫개" }>
    | tags.Constant<"26000-1-39", { title: "다대포항" }>
    | tags.Constant<"26000-1-4", { title: "남산" }>
    | tags.Constant<"26000-1-40", { title: "다대포해수욕장" }>
    | tags.Constant<"26000-1-5", { title: "남포" }>
    | tags.Constant<"26000-1-6", { title: "노포" }>
    | tags.Constant<"26000-1-7", { title: "당리" }>
    | tags.Constant<"26000-1-8", { title: "대티" }>
    | tags.Constant<"26000-1-9", { title: "동대신" }>
    | tags.Constant<"26000-2-132", { title: "증산" }>
    | tags.Constant<"26000-2-133", { title: "벡스코" }>
    | tags.Constant<"26000-2-35", { title: "가야" }>
    | tags.Constant<"26000-2-36", { title: "감전" }>
    | tags.Constant<"26000-2-37", { title: "개금" }>
    | tags.Constant<"26000-2-38", { title: "경성대·부경대" }>
    | tags.Constant<"26000-2-39", { title: "광안" }>
    | tags.Constant<"26000-2-40", { title: "구남" }>
    | tags.Constant<"26000-2-41", { title: "구명" }>
    | tags.Constant<"26000-2-42", { title: "금곡" }>
    | tags.Constant<"26000-2-43", { title: "금련산" }>
    | tags.Constant<"26000-2-44", { title: "남양산" }>
    | tags.Constant<"26000-2-45", { title: "남천" }>
    | tags.Constant<"26000-2-46", { title: "냉정" }>
    | tags.Constant<"26000-2-47", { title: "대연" }>
    | tags.Constant<"26000-2-48", { title: "덕천" }>
    | tags.Constant<"26000-2-49", { title: "덕포" }>
    | tags.Constant<"26000-2-50", { title: "동백" }>
    | tags.Constant<"26000-2-51", { title: "동원" }>
    | tags.Constant<"26000-2-52", { title: "동의대" }>
    | tags.Constant<"26000-2-53", { title: "모덕" }>
    | tags.Constant<"26000-2-54", { title: "모라" }>
    | tags.Constant<"26000-2-55", { title: "못골" }>
    | tags.Constant<"26000-2-56", { title: "국제금융센터 · 부산은행" }>
    | tags.Constant<"26000-2-57", { title: "문현" }>
    | tags.Constant<"26000-2-58", { title: "민락" }>
    | tags.Constant<"26000-2-59", { title: "부경대" }>
    | tags.Constant<"26000-2-60", { title: "부산대양산캠퍼스" }>
    | tags.Constant<"26000-2-61", { title: "부암" }>
    | tags.Constant<"26000-2-62", { title: "사상" }>
    | tags.Constant<"26000-2-63", { title: "서면" }>
    | tags.Constant<"26000-2-64", { title: "센텀시티" }>
    | tags.Constant<"26000-2-65", { title: "수영" }>
    | tags.Constant<"26000-2-66", { title: "수정" }>
    | tags.Constant<"26000-2-67", { title: "벡스코" }>
    | tags.Constant<"26000-2-68", { title: "양산" }>
    | tags.Constant<"26000-2-70", { title: "율리" }>
    | tags.Constant<"26000-2-71", { title: "장산" }>
    | tags.Constant<"26000-2-72", { title: "전포" }>
    | tags.Constant<"26000-2-73", { title: "주례" }>
    | tags.Constant<"26000-2-74", { title: "중동" }>
    | tags.Constant<"26000-2-76", { title: "지게골" }>
    | tags.Constant<"26000-2-77", { title: "해운대" }>
    | tags.Constant<"26000-2-78", { title: "호포" }>
    | tags.Constant<"26000-2-79", { title: "화명" }>
    | tags.Constant<"26000-3-80", { title: "강서구청" }>
    | tags.Constant<"26000-3-81", { title: "거제" }>
    | tags.Constant<"26000-3-82", { title: "구포" }>
    | tags.Constant<"26000-3-83", { title: "남산정" }>
    | tags.Constant<"26000-3-84", { title: "대저" }>
    | tags.Constant<"26000-3-85", { title: "덕천" }>
    | tags.Constant<"26000-3-86", { title: "만덕" }>
    | tags.Constant<"26000-3-87", { title: "망미" }>
    | tags.Constant<"26000-3-88", { title: "물만골" }>
    | tags.Constant<"26000-3-89", { title: "미남" }>
    | tags.Constant<"26000-3-90", { title: "배산" }>
    | tags.Constant<"26000-3-91", { title: "사직" }>
    | tags.Constant<"26000-3-92", { title: "수영" }>
    | tags.Constant<"26000-3-93", { title: "숙등" }>
    | tags.Constant<"26000-3-94", { title: "연산" }>
    | tags.Constant<"26000-3-95", { title: "종합운동장" }>
    | tags.Constant<"26000-3-96", { title: "체육공원" }>
    | tags.Constant<"26000-4-100", { title: "낙민" }>
    | tags.Constant<"26000-4-101", { title: "충렬사" }>
    | tags.Constant<"26000-4-102", { title: "명장" }>
    | tags.Constant<"26000-4-103", { title: "서동" }>
    | tags.Constant<"26000-4-104", { title: "금사" }>
    | tags.Constant<"26000-4-105", { title: "반여농산물시장" }>
    | tags.Constant<"26000-4-106", { title: "석대" }>
    | tags.Constant<"26000-4-107", { title: "영산대" }>
    | tags.Constant<"26000-4-108", { title: "윗반송" }>
    | tags.Constant<"26000-4-109", { title: "고촌" }>
    | tags.Constant<"26000-4-110", { title: "안평" }>
    | tags.Constant<"26000-4-97", { title: "미남" }>
    | tags.Constant<"26000-4-98", { title: "동래" }>
    | tags.Constant<"26000-4-99", { title: "수안" }>
    | tags.Constant<"26000-11-111", { title: "가야대" }>
    | tags.Constant<"26000-11-112", { title: "장신대" }>
    | tags.Constant<"26000-11-113", { title: "연지공원" }>
    | tags.Constant<"26000-11-114", { title: "박물관" }>
    | tags.Constant<"26000-11-115", { title: "수로왕릉" }>
    | tags.Constant<"26000-11-116", { title: "봉황" }>
    | tags.Constant<"26000-11-117", { title: "부원" }>
    | tags.Constant<"26000-11-118", { title: "김해시청" }>
    | tags.Constant<"26000-11-119", { title: "인제대" }>
    | tags.Constant<"26000-11-120", { title: "김해대학" }>
    | tags.Constant<"26000-11-121", { title: "지내" }>
    | tags.Constant<"26000-11-122", { title: "불암" }>
    | tags.Constant<"26000-11-123", { title: "대사" }>
    | tags.Constant<"26000-11-124", { title: "평강" }>
    | tags.Constant<"26000-11-125", { title: "대저" }>
    | tags.Constant<"26000-11-126", { title: "등구" }>
    | tags.Constant<"26000-11-127", { title: "덕두" }>
    | tags.Constant<"26000-11-128", { title: "공항" }>
    | tags.Constant<"26000-11-129", { title: "서부산유통지구" }>
    | tags.Constant<"26000-11-130", { title: "괘법르네시떼" }>
    | tags.Constant<"26000-11-131", { title: "사상" }>
    | tags.Constant<"26000-21-134", { title: "부전" }>
    | tags.Constant<"26000-21-135", { title: "거제해맞이" }>
    | tags.Constant<"26000-21-136", { title: "거제" }>
    | tags.Constant<"26000-21-137", { title: "교대" }>
    | tags.Constant<"26000-21-138", { title: "동래" }>
    | tags.Constant<"26000-21-139", { title: "안락" }>
    | tags.Constant<"26000-21-140", { title: "재송" }>
    | tags.Constant<"26000-21-141", { title: "센텀" }>
    | tags.Constant<"26000-21-142", { title: "벡스코" }>
    | tags.Constant<"26000-21-143", { title: "신해운대" }>
    | tags.Constant<"26000-21-144", { title: "송정" }>
    | tags.Constant<"26000-21-145", { title: "오시리아" }>
    | tags.Constant<"26000-21-146", { title: "기장" }>
    | tags.Constant<"26000-21-147", { title: "일광" }>
    | tags.Constant<"26000-21-148", { title: "부산원동" }>
    | tags.Constant<"26000-21-149", { title: "좌천역" }>
    | tags.Constant<"27000-1-1", { title: "각산" }>
    | tags.Constant<"27000-1-10", { title: "반월당" }>
    | tags.Constant<"27000-1-11", { title: "방촌" }>
    | tags.Constant<"27000-1-12", { title: "상인" }>
    | tags.Constant<"27000-1-13", { title: "성당못" }>
    | tags.Constant<"27000-1-14", { title: "송현" }>
    | tags.Constant<"27000-1-15", { title: "신기" }>
    | tags.Constant<"27000-1-16", { title: "신천" }>
    | tags.Constant<"27000-1-17", { title: "아양교" }>
    | tags.Constant<"27000-1-18", { title: "안심" }>
    | tags.Constant<"27000-1-19", { title: "안지랑" }>
    | tags.Constant<"27000-1-2", { title: "교대" }>
    | tags.Constant<"27000-1-20", { title: "영대병원" }>
    | tags.Constant<"27000-1-21", { title: "용계" }>
    | tags.Constant<"27000-1-22", { title: "월배" }>
    | tags.Constant<"27000-1-23", { title: "월촌" }>
    | tags.Constant<"27000-1-24", { title: "율하" }>
    | tags.Constant<"27000-1-25", { title: "중앙로" }>
    | tags.Constant<"27000-1-26", { title: "진천" }>
    | tags.Constant<"27000-1-27", { title: "칠성시장" }>
    | tags.Constant<"27000-1-28", { title: "동구청" }>
    | tags.Constant<"27000-1-29", { title: "해안" }>
    | tags.Constant<"27000-1-3", { title: "대곡" }>
    | tags.Constant<"27000-1-30", { title: "현충로" }>
    | tags.Constant<"27000-1-31", { title: "설화명곡" }>
    | tags.Constant<"27000-1-32", { title: "화원" }>
    | tags.Constant<"27000-1-4", { title: "대구역" }>
    | tags.Constant<"27000-1-5", { title: "대명" }>
    | tags.Constant<"27000-1-6", { title: "동대구역" }>
    | tags.Constant<"27000-1-7", { title: "동촌" }>
    | tags.Constant<"27000-1-8", { title: "명덕" }>
    | tags.Constant<"27000-1-9", { title: "반야월" }>
    | tags.Constant<"27000-2-31", { title: "감삼" }>
    | tags.Constant<"27000-2-32", { title: "강창" }>
    | tags.Constant<"27000-2-33", { title: "경대병원" }>
    | tags.Constant<"27000-2-34", { title: "계명대" }>
    | tags.Constant<"27000-2-35", { title: "고산" }>
    | tags.Constant<"27000-2-36", { title: "내당" }>
    | tags.Constant<"27000-2-37", { title: "다사" }>
    | tags.Constant<"27000-2-38", { title: "담티" }>
    | tags.Constant<"27000-2-39", { title: "대공원" }>
    | tags.Constant<"27000-2-40", { title: "대구은행" }>
    | tags.Constant<"27000-2-41", { title: "대실" }>
    | tags.Constant<"27000-2-42", { title: "두류" }>
    | tags.Constant<"27000-2-43", { title: "만촌" }>
    | tags.Constant<"27000-2-44", { title: "문양" }>
    | tags.Constant<"27000-2-45", { title: "반고개" }>
    | tags.Constant<"27000-2-46", { title: "반월당" }>
    | tags.Constant<"27000-2-47", { title: "범어" }>
    | tags.Constant<"27000-2-48", { title: "사월" }>
    | tags.Constant<"27000-2-49", { title: "신남" }>
    | tags.Constant<"27000-2-50", { title: "성서산업단지" }>
    | tags.Constant<"27000-2-51", { title: "수성구청" }>
    | tags.Constant<"27000-2-52", { title: "신매" }>
    | tags.Constant<"27000-2-53", { title: "연호" }>
    | tags.Constant<"27000-2-54", { title: "용산" }>
    | tags.Constant<"27000-2-55", { title: "이곡" }>
    | tags.Constant<"27000-2-56", { title: "죽전" }>
    | tags.Constant<"27000-2-57", { title: "정평" }>
    | tags.Constant<"27000-2-58", { title: "임당" }>
    | tags.Constant<"27000-2-59", { title: "영남대" }>
    | tags.Constant<"27000-2-90", { title: "청라언덕" }>
    | tags.Constant<"27000-3-60", { title: "칠곡경대병원" }>
    | tags.Constant<"27000-3-61", { title: "학정" }>
    | tags.Constant<"27000-3-62", { title: "팔거" }>
    | tags.Constant<"27000-3-63", { title: "동천" }>
    | tags.Constant<"27000-3-64", { title: "칠곡운암" }>
    | tags.Constant<"27000-3-65", { title: "구암" }>
    | tags.Constant<"27000-3-66", { title: "태전" }>
    | tags.Constant<"27000-3-67", { title: "매천" }>
    | tags.Constant<"27000-3-68", { title: "매천시장" }>
    | tags.Constant<"27000-3-69", { title: "팔달" }>
    | tags.Constant<"27000-3-70", { title: "공단" }>
    | tags.Constant<"27000-3-71", { title: "만평" }>
    | tags.Constant<"27000-3-72", { title: "팔달시장" }>
    | tags.Constant<"27000-3-73", { title: "원대" }>
    | tags.Constant<"27000-3-74", { title: "북구청" }>
    | tags.Constant<"27000-3-75", { title: "달성공원" }>
    | tags.Constant<"27000-3-76", { title: "서문시장" }>
    | tags.Constant<"27000-3-77", { title: "신남" }>
    | tags.Constant<"27000-3-78", { title: "남산" }>
    | tags.Constant<"27000-3-79", { title: "명덕" }>
    | tags.Constant<"27000-3-80", { title: "건들바위" }>
    | tags.Constant<"27000-3-81", { title: "대봉교" }>
    | tags.Constant<"27000-3-82", { title: "수성시장" }>
    | tags.Constant<"27000-3-83", { title: "수성구민운동장" }>
    | tags.Constant<"27000-3-84", { title: "어린이회관" }>
    | tags.Constant<"27000-3-85", { title: "황금" }>
    | tags.Constant<"27000-3-86", { title: "수성못" }>
    | tags.Constant<"27000-3-87", { title: "지산" }>
    | tags.Constant<"27000-3-88", { title: "범물" }>
    | tags.Constant<"27000-3-89", { title: "용지" }>
    | tags.Constant<"27000-3-91", { title: "청라언덕" }>
    | tags.Constant<"28000-1-1", { title: "간석오거리" }>
    | tags.Constant<"28000-1-10", { title: "문학경기장" }>
    | tags.Constant<"28000-1-11", { title: "박촌" }>
    | tags.Constant<"28000-1-12", { title: "부평구청" }>
    | tags.Constant<"28000-1-13", { title: "부평삼거리" }>
    | tags.Constant<"28000-1-14", { title: "부평시장" }>
    | tags.Constant<"28000-1-15", { title: "부평" }>
    | tags.Constant<"28000-1-16", { title: "선학" }>
    | tags.Constant<"28000-1-17", { title: "신연수" }>
    | tags.Constant<"28000-1-18", { title: "예술회관" }>
    | tags.Constant<"28000-1-19", { title: "원인재" }>
    | tags.Constant<"28000-1-2", { title: "갈산" }>
    | tags.Constant<"28000-1-20", { title: "인천시청" }>
    | tags.Constant<"28000-1-21", { title: "인천터미널" }>
    | tags.Constant<"28000-1-22", { title: "임학" }>
    | tags.Constant<"28000-1-23", { title: "작전" }>
    | tags.Constant<"28000-1-24", { title: "테크노파크" }>
    | tags.Constant<"28000-1-25", { title: "지식정보단지" }>
    | tags.Constant<"28000-1-26", { title: "인천대입구" }>
    | tags.Constant<"28000-1-27", { title: "센트럴파크" }>
    | tags.Constant<"28000-1-28", { title: "국제업무지구" }>
    | tags.Constant<"28000-1-29", { title: "캠퍼스타운" }>
    | tags.Constant<"28000-1-3", { title: "경인교대입구" }>
    | tags.Constant<"28000-1-4", { title: "계산" }>
    | tags.Constant<"28000-1-5", { title: "계양" }>
    | tags.Constant<"28000-1-6", { title: "귤현" }>
    | tags.Constant<"28000-1-7", { title: "동막" }>
    | tags.Constant<"28000-1-8", { title: "동수" }>
    | tags.Constant<"28000-1-9", { title: "동춘" }>
    | tags.Constant<"28000-2-1", { title: "가재울" }>
    | tags.Constant<"28000-2-10", { title: "마전" }>
    | tags.Constant<"28000-2-11", { title: "만수" }>
    | tags.Constant<"28000-2-12", { title: "모래내시장" }>
    | tags.Constant<"28000-2-13", { title: "서구청" }>
    | tags.Constant<"28000-2-14", { title: "서부여성회관" }>
    | tags.Constant<"28000-2-15", { title: "석남" }>
    | tags.Constant<"28000-2-16", { title: "석바위시장" }>
    | tags.Constant<"28000-2-17", { title: "석천사거리" }>
    | tags.Constant<"28000-2-18", { title: "시민공원" }>
    | tags.Constant<"28000-2-19", { title: "아시아드경기장" }>
    | tags.Constant<"28000-2-2", { title: "가정" }>
    | tags.Constant<"28000-2-20", { title: "완정" }>
    | tags.Constant<"28000-2-21", { title: "왕길" }>
    | tags.Constant<"28000-2-22", { title: "운연" }>
    | tags.Constant<"28000-2-23", { title: "인천가좌" }>
    | tags.Constant<"28000-2-24", { title: "인천대공원" }>
    | tags.Constant<"28000-2-25", { title: "인천시청" }>
    | tags.Constant<"28000-2-26", { title: "주안" }>
    | tags.Constant<"28000-2-27", { title: "주안국가산단" }>
    | tags.Constant<"28000-2-3", { title: "가정중앙시장" }>
    | tags.Constant<"28000-2-4", { title: "검단사거리" }>
    | tags.Constant<"28000-2-5", { title: "검단오류" }>
    | tags.Constant<"28000-2-6", { title: "검바위" }>
    | tags.Constant<"28000-2-7", { title: "검암" }>
    | tags.Constant<"28000-2-8", { title: "남동구청" }>
    | tags.Constant<"28000-2-9", { title: "독정" }>
    | tags.Constant<"29000-1-1", { title: "공항" }>
    | tags.Constant<"29000-1-10", { title: "문화전당" }>
    | tags.Constant<"29000-1-11", { title: "상무" }>
    | tags.Constant<"29000-1-12", { title: "소태" }>
    | tags.Constant<"29000-1-13", { title: "송정공원" }>
    | tags.Constant<"29000-1-14", { title: "광주송정" }>
    | tags.Constant<"29000-1-15", { title: "쌍촌" }>
    | tags.Constant<"29000-1-16", { title: "양동시장" }>
    | tags.Constant<"29000-1-19", { title: "운천" }>
    | tags.Constant<"29000-1-2", { title: "금남로4가" }>
    | tags.Constant<"29000-1-20", { title: "학동·증심사입구" }>
    | tags.Constant<"29000-1-21", { title: "평동" }>
    | tags.Constant<"29000-1-22", { title: "화정" }>
    | tags.Constant<"29000-1-3", { title: "금남로5가" }>
    | tags.Constant<"29000-1-4", { title: "김대중컨벤션센터" }>
    | tags.Constant<"29000-1-5", { title: "남광주" }>
    | tags.Constant<"29000-1-6", { title: "녹동" }>
    | tags.Constant<"29000-1-7", { title: "농성" }>
    | tags.Constant<"29000-1-8", { title: "도산" }>
    | tags.Constant<"29000-1-9", { title: "돌고개" }>
    | tags.Constant<"30000-1-1", { title: "갈마" }>
    | tags.Constant<"30000-1-10", { title: "신흥" }>
    | tags.Constant<"30000-1-11", { title: "오룡" }>
    | tags.Constant<"30000-1-12", { title: "용문" }>
    | tags.Constant<"30000-1-13", { title: "월드컵경기장" }>
    | tags.Constant<"30000-1-14", { title: "월평" }>
    | tags.Constant<"30000-1-15", { title: "유성온천" }>
    | tags.Constant<"30000-1-16", { title: "정부청사" }>
    | tags.Constant<"30000-1-17", { title: "중구청" }>
    | tags.Constant<"30000-1-18", { title: "중앙로" }>
    | tags.Constant<"30000-1-19", { title: "지족" }>
    | tags.Constant<"30000-1-2", { title: "갑천" }>
    | tags.Constant<"30000-1-20", { title: "탄방" }>
    | tags.Constant<"30000-1-21", { title: "판암" }>
    | tags.Constant<"30000-1-22", { title: "현충원" }>
    | tags.Constant<"30000-1-3", { title: "구암" }>
    | tags.Constant<"30000-1-4", { title: "노은" }>
    | tags.Constant<"30000-1-5", { title: "대동" }>
    | tags.Constant<"30000-1-6", { title: "대전역" }>
    | tags.Constant<"30000-1-7", { title: "반석" }>
    | tags.Constant<"30000-1-8", { title: "서대전네거리" }>
    | tags.Constant<"30000-1-9", { title: "시청" }>;

  /**
   * @title 강소기업 분류 코드
   */
  export type SmlGntCoClcd =
    | tags.Constant<
        "100",
        {
          title: "일자리 친화";
          description: "열린 일자리를 만들어 가는 강소기업";
        }
      >
    | tags.Constant<
        "101",
        {
          title: "고용창출 100대 우수기업";
          description: "열린 일자리를 만들어 가는 강소기업";
        }
      >
    | tags.Constant<
        "102",
        {
          title: "노사문화우수기업";
          description: "열린 일자리를 만들어 가는 강소기업";
        }
      >
    | tags.Constant<
        "103",
        {
          title: "우리지역일하기좋은기업";
          description: "열린 일자리를 만들어 가는 강소기업";
        }
      >
    | tags.Constant<
        "104",
        {
          title: "인재육성형중소기업";
          description: "열린 일자리를 만들어 가는 강소기업";
        }
      >
    | tags.Constant<
        "105",
        {
          title: "대한민국일자리으뜸기업";
          description: "열린 일자리를 만들어 가는 강소기업";
        }
      >
    | tags.Constant<
        "106",
        {
          title: "최고일자리 기업";
          description: "열린 일자리를 만들어 가는 강소기업";
        }
      >
    | tags.Constant<
        "108",
        {
          title: "근무혁신 우수기업";
          description: "열린 일자리를 만들어 가는 강소기업";
        }
      >
    | tags.Constant<
        "109",
        {
          title: "우리지역청년희망이음기업";
          description: "열린 일자리를 만들어 가는 강소기업";
        }
      >
    | tags.Constant<
        "200",
        {
          title: "기술력 우수";
          description: "우수한 기술력으로 미래가 밝은 강소기업";
        }
      >
    | tags.Constant<
        "201",
        {
          title: "기능한국인";
          description: "우수한 기술력으로 미래가 밝은 강소기업";
        }
      >
    | tags.Constant<
        "202",
        {
          title: "월드클래스300";
          description: "우수한 기술력으로 미래가 밝은 강소기업";
        }
      >
    | tags.Constant<
        "203",
        {
          title: "ATC(Advanced Technology Center) ";
          description: "우수한 기술력으로 미래가 밝은 강소기업";
        }
      >
    | tags.Constant<
        "204",
        {
          title: "기술혁신형 중소기업(이노비즈)";
          description: "우수한 기술력으로 미래가 밝은 강소기업";
        }
      >
    | tags.Constant<
        "205",
        {
          title: "월드클래스플러스";
          description: "우수한 기술력으로 미래가 밝은 강소기업";
        }
      >
    | tags.Constant<
        "300",
        { title: "재무건전성"; description: "재무구조가 탄탄한 강소기업" }
      >
    | tags.Constant<
        "301",
        { title: "우수중소기업"; description: "재무구조가 탄탄한 강소기업" }
      >
    | tags.Constant<
        "302",
        {
          title: "경영혁신형 중소기업(메인비즈)";
          description: "재무구조가 탄탄한 강소기업";
        }
      >
    | tags.Constant<
        "400",
        { title: "글로벌역량"; description: "글로벌 시장을 선도하는 강소기업" }
      >
    | tags.Constant<
        "401",
        {
          title: "세계일류상품생산기업";
          description: "글로벌 시장을 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "402",
        {
          title: "한국거래소 히든챔피언";
          description: "글로벌 시장을 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "403",
        {
          title: "KDB글로벌스타";
          description: "글로벌 시장을 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "404",
        {
          title: "신보스타기업";
          description: "글로벌 시장을 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "405",
        { title: "월드챔프"; description: "글로벌 시장을 선도하는 강소기업" }
      >
    | tags.Constant<
        "406",
        {
          title: "글로벌방산강소기업";
          description: "글로벌 시장을 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "407",
        { title: "라이징스타"; description: "글로벌 시장을 선도하는 강소기업" }
      >
    | tags.Constant<
        "408",
        {
          title: "글로벌 강소기업";
          description: "글로벌 시장을 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "409",
        {
          title: "한국형 히든챔피언 육성프로그램";
          description: "글로벌 시장을 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "500",
        { title: "지역선도기업"; description: "지역경제를 선도하는 강소기업" }
      >
    | tags.Constant<
        "501",
        { title: "하이서울"; description: "지역경제를 선도하는 강소기업" }
      >
    | tags.Constant<
        "502",
        { title: "서울형강소기업"; description: "지역경제를 선도하는 강소기업" }
      >
    | tags.Constant<
        "503",
        { title: "선도기업(부산)"; description: "지역경제를 선도하는 강소기업" }
      >
    | tags.Constant<
        "504",
        {
          title: "고용우수기업(부산)";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "505",
        { title: "향토기업(부산)"; description: "지역경제를 선도하는 강소기업" }
      >
    | tags.Constant<
        "506",
        {
          title: "고용친화대표기업(대구)";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "507",
        {
          title: "일자리창출 우수기업(인천)";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "508",
        {
          title: "고용우수기업(광주)";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "509",
        {
          title: "명품강소기업(광주)";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "510",
        {
          title: "유망중소기업(대전)";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "511",
        {
          title: "고용우수기업(대전)";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "512",
        {
          title: "글로벌IP스타기업";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "513",
        {
          title: "글로벌스타벤처기업";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "514",
        {
          title: "유망중소기업(경기)";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "515",
        { title: "백년기업"; description: "지역경제를 선도하는 강소기업" }
      >
    | tags.Constant<
        "516",
        {
          title: "유망중소기업(강원)";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "517",
        {
          title: "고용우수기업(충북)";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "518",
        { title: "강소기업(충남)"; description: "지역경제를 선도하는 강소기업" }
      >
    | tags.Constant<
        "519",
        {
          title: "유망중소기업(충남)";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "520",
        {
          title: "전라북도지사인증상품지정기업";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "521",
        {
          title: "유망중소기업(전남)";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "522",
        {
          title: "경북PRIDE상품(경북)";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "523",
        {
          title: "명문장수기업(경북)";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "524",
        {
          title: "유망강소기업(경북)";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "525",
        {
          title: "일자리창출 우수기업(경북)";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "526",
        {
          title: "칠곡군스타기업(경북)";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "527",
        {
          title: "고용우수기업(경남)";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "528",
        {
          title: "고용우수기업(제주)";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "529",
        {
          title: "유망중소기업(인천)";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "530",
        {
          title: "PRE-명품강소기업(광주)";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "531",
        {
          title: "청년고용우수기업";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "532",
        {
          title: "일자리우수기업(광주)";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "533",
        {
          title: "중견성장사다리기업(인천)";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "534",
        { title: "비전기업(인천)"; description: "지역경제를 선도하는 강소기업" }
      >
    | tags.Constant<
        "535",
        {
          title: "일자리창출 우수기업(울산)";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "536",
        {
          title: "고용창출 우수기업(세종)";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "537",
        { title: "스타기업(경기)"; description: "지역경제를 선도하는 강소기업" }
      >
    | tags.Constant<
        "538",
        { title: "선도기업(전북)"; description: "지역경제를 선도하는 강소기업" }
      >
    | tags.Constant<
        "539",
        { title: "도약기업(전북)"; description: "지역경제를 선도하는 강소기업" }
      >
    | tags.Constant<
        "540",
        { title: "스타기업(경북)"; description: "지역경제를 선도하는 강소기업" }
      >
    | tags.Constant<
        "541",
        {
          title: "좋은일터조성사업";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "542",
        {
          title: "전략산업선도기업";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "543",
        { title: "스타기업"; description: "지역경제를 선도하는 강소기업" }
      >
    | tags.Constant<
        "544",
        {
          title: "2021년 매출의탑";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "545",
        { title: "U-챔피언(울산)"; description: "지역경제를 선도하는 강소기업" }
      >
    | tags.Constant<
        "546",
        {
          title: "경남형 청년친화기업";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "547",
        {
          title: "청년동행일자리우수기업";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "548",
        {
          title: "지역스타기업(울산)";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "549",
        {
          title: "지역혁신 선도기업(울산)";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "550",
        {
          title: "모범장수기업(울산)";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "551",
        {
          title: "유망중소기업(세종)";
          description: "지역경제를 선도하는 강소기업";
        }
      >
    | tags.Constant<
        "600",
        {
          title: "사회적가치";
          description: "이웃과 더불어 사는 강소기업,자연을 생각하는 강소기업,가족을 먼저 생각하는 강소기업,병역 이행도 함께하는 강소기업";
        }
      >
    | tags.Constant<
        "601",
        { title: "사회적기업"; description: "이웃과 더불어 사는 강소기업" }
      >
    | tags.Constant<
        "602",
        { title: "녹색기업"; description: "자연을 생각하는 강소기업" }
      >
    | tags.Constant<
        "603",
        { title: "가족친화기업"; description: "가족을 먼저 생각하는 강소기업" }
      >
    | tags.Constant<
        "604",
        { title: "병역지정업체"; description: "병역 이행도 함께하는 강소기업" }
      >
    | tags.Constant<
        "605",
        {
          title: "안전보건경영시스템 인증기업";
          description: "안전보건관리체계를 구축한 강소기업";
        }
      >
    | tags.Constant<
        "606",
        { title: "남녀고용평등우수기업"; description: "양성이 평등한 강소기업" }
      >
    | tags.Constant<
        "607",
        { title: "여가친화기업"; description: "여가 친화적인 기업" }
      >
    | tags.Constant<
        "700",
        { title: "신청 강소기업"; description: "고용부 선정 강소기업 신청기업" }
      >
    | tags.Constant<
        "701",
        {
          title: "고용부 선정 강소기업 신청기업";
          description: "고용부 선정 강소기업 신청기업";
        }
      >
    | tags.Constant<"A00", { title: "임금 우수"; description: "임금우수" }>
    | tags.Constant<"A01", { title: "임금 우수"; description: "임금우수" }>
    | tags.Constant<
        "B00",
        { title: "일생활균형 우수"; description: "일생활균형 우수" }
      >
    | tags.Constant<
        "B01",
        { title: "일생활균형 우수"; description: "일생활균형 우수" }
      >
    | tags.Constant<
        "C00",
        { title: "고용안정 우수"; description: "고용안정 우수" }
      >
    | tags.Constant<
        "C01",
        { title: "고용안정 우수"; description: "고용안정 우수" }
      >;

  /**
   * @title 외국어 코드
   */
  export type ForeignLanguage =
    | tags.Constant<"01", { title: "영어" }>
    | tags.Constant<"02", { title: "일어" }>
    | tags.Constant<"03", { title: "독일어" }>
    | tags.Constant<"04", { title: "불어" }>
    | tags.Constant<"05", { title: "서반어" }>
    | tags.Constant<"06", { title: "라틴어" }>
    | tags.Constant<"07", { title: "중국어" }>
    | tags.Constant<"08", { title: "러시아어" }>
    | tags.Constant<"09", { title: "아랍어" }>
    | tags.Constant<"10", { title: "베트남어" }>
    | tags.Constant<"11", { title: "이태리어" }>
    | tags.Constant<"12", { title: "포르투갈어" }>
    | tags.Constant<"13", { title: "화란어" }>
    | tags.Constant<"14", { title: "힌디어(북부인도어)" }>
    | tags.Constant<"15", { title: "이란어" }>
    | tags.Constant<"16", { title: "타이어" }>
    | tags.Constant<"17", { title: "스와힐리어" }>
    | tags.Constant<"18", { title: "터키어" }>
    | tags.Constant<"19", { title: "마이인도네이사어" }>
    | tags.Constant<"20", { title: "한국어" }>
    | tags.Constant<"21", { title: "만주어" }>
    | tags.Constant<"22", { title: "몽고어" }>
    | tags.Constant<"23", { title: "스페인어" }>
    | tags.Constant<"24", { title: "스웨덴어" }>
    | tags.Constant<"25", { title: "체코어" }>
    | tags.Constant<"26", { title: "덴마크어" }>
    | tags.Constant<"27", { title: "네덜란드어" }>
    | tags.Constant<"28", { title: "에스토니아어" }>
    | tags.Constant<"29", { title: "핀란드어" }>
    | tags.Constant<"30", { title: "그리스어" }>
    | tags.Constant<"31", { title: "헤브루어" }>
    | tags.Constant<"32", { title: "헝가리어" }>
    | tags.Constant<"33", { title: "아이슬란드어" }>
    | tags.Constant<"34", { title: "라트비아어" }>
    | tags.Constant<"35", { title: "리투아니아어" }>
    | tags.Constant<"36", { title: "노르웨이어" }>
    | tags.Constant<"37", { title: "폴란드어" }>
    | tags.Constant<"38", { title: "루마니아어" }>
    | tags.Constant<"39", { title: "말레이어" }>
    | tags.Constant<"40", { title: "인도네시아어" }>
    | tags.Constant<"41", { title: "방글라데시어" }>
    | tags.Constant<"42", { title: "바스크어" }>
    | tags.Constant<"43", { title: "벨로루시어 " }>
    | tags.Constant<"44", { title: "카탈로니아어" }>
    | tags.Constant<"45", { title: "크로아티아어" }>
    | tags.Constant<"46", { title: "페로스어" }>
    | tags.Constant<"47", { title: "페르시아어" }>
    | tags.Constant<"48", { title: "게일어" }>
    | tags.Constant<"49", { title: "마세도니아어" }>
    | tags.Constant<"50", { title: "말타어" }>
    | tags.Constant<"51", { title: "레토로만어" }>
    | tags.Constant<"52", { title: "라플란드어" }>
    | tags.Constant<"53", { title: "세르비아어" }>
    | tags.Constant<"54", { title: "슬로바키아어" }>
    | tags.Constant<"55", { title: "슬로베니아어" }>
    | tags.Constant<"56", { title: "소르비아어" }>
    | tags.Constant<"57", { title: "수투어" }>
    | tags.Constant<"58", { title: "총가어" }>
    | tags.Constant<"59", { title: "츠와나어" }>
    | tags.Constant<"60", { title: "우크라이나어" }>
    | tags.Constant<"61", { title: "우르두어" }>
    | tags.Constant<"62", { title: "벤다어" }>
    | tags.Constant<"63", { title: "트란스카이어" }>
    | tags.Constant<"64", { title: "이디시어" }>
    | tags.Constant<"65", { title: "줄루어" }>
    | tags.Constant<"66", { title: "미얀마어" }>
    | tags.Constant<"67", { title: "라다크어" }>
    | tags.Constant<"68", { title: "우즈베키스탄어" }>
    | tags.Constant<"69", { title: "크메르어" }>
    | tags.Constant<"70", { title: "카자흐어" }>
    | tags.Constant<"71", { title: "네팔어" }>;
}
