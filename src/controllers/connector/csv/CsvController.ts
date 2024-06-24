import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtn/decorators";

import { ICsv } from "@wrtn/connector-api/lib/structures/connector/csv/ICsv";

import { CsvProvider } from "../../../providers/connector/csv/CsvProvider";

@Controller("connector/csv")
export class CsvController {
  /**
   * CSV 파일 내용을 읽어옵니다.
   *
   * @summary CSV 파일 읽기
   *
   * @param input CSV 파일을 읽어 오기 위한 정보
   *
   * @returns CSV 파일 내용.
   *
   * @tag CSV 텍스트 파일 형식
   * @tag CSV
   * @tag 파일
   * @tag 내보내기
   * @tag 다운로드
   * @tag 추출
   * @tag 추출하기
   * @tag 스프레드시트
   * @tag 데이터 저장
   * @tag 데이터 불러오기
   * @tag 데이터 분석
   * @tag 스프레드시트
   * @tag 데이터 베이스
   * @tag 데이터 내보내기
   * @tag 데이터 가져오기
   * @tag 엑셀 변환
   * @tag 텍스트 파일
   * @tag 데이터 처리
   * @tag 대량 데이터
   * @tag 데이터 편집
   * @tag 파일 분할
   * @tag 데이터 통합
   * @tag CSV 만들기
   * @tag CSV 파일 열기
   * @tag 데이터 추출
   * @tag 데이터 필터링
   * @tag 데이터 병합
   * @tag CSV
   * @tag File
   * @tag Export
   * @tag Download
   * @tag Extract
   * @tag Spreadsheet
   * @tag Save Data
   * @tag Load Data
   * @tag Data Analysis
   * @tag Spreadsheet
   * @tag Database
   * @tag Export Data
   * @tag Import Data
   * @tag Convert to Excel
   * @tag Text File
   * @tag Data Processing
   * @tag Large Data
   * @tag Edit Data
   * @tag Split File
   * @tag Integrate Data
   * @tag Create CSV
   * @tag Open CSV File
   * @tag Extract Data
   * @tag Filter Data
   * @tag Merge Data
   */
  @core.TypedRoute.Post("read")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/csv.svg",
  )
  async read(
    @core.TypedBody() input: ICsv.IReadInput,
  ): Promise<ICsv.IReadOutput> {
    return await CsvProvider.read(input);
  }

  /**
   * CSV 파일을 생성합니다.
   *
   * @summary CSV 파일 생성
   *
   * @param input CSV 파일을 생성하기 위한 정보
   *
   * @tag CSV
   * @tag 파일
   * @tag 내보내기
   * @tag 다운로드
   * @tag 추출
   * @tag 추출하기
   * @tag 스프레드시트
   * @tag 데이터 저장
   * @tag 데이터 불러오기
   * @tag 데이터 분석
   * @tag 스프레드시트
   * @tag 데이터 베이스
   * @tag 데이터 내보내기
   * @tag 데이터 가져오기
   * @tag 엑셀 변환
   * @tag 텍스트 파일
   * @tag 데이터 처리
   * @tag 대량 데이터
   * @tag 데이터 편집
   * @tag 파일 분할
   * @tag 데이터 통합
   * @tag CSV 만들기
   * @tag CSV 파일 열기
   * @tag 데이터 추출
   * @tag 데이터 필터링
   * @tag 데이터 병합
   * @tag CSV
   * @tag File
   * @tag Export
   * @tag Download
   * @tag Extract
   * @tag Spreadsheet
   * @tag Save Data
   * @tag Load Data
   * @tag Data Analysis
   * @tag Spreadsheet
   * @tag Database
   * @tag Export Data
   * @tag Import Data
   * @tag Convert to Excel
   * @tag Text File
   * @tag Data Processing
   * @tag Large Data
   * @tag Edit Data
   * @tag Split File
   * @tag Integrate Data
   * @tag Create CSV
   * @tag Open CSV File
   * @tag Extract Data
   * @tag Filter Data
   * @tag Merge Data
   */
  @Standalone()
  @core.TypedRoute.Post("write")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/csv.svg",
  )
  async write(
    @core.TypedBody() input: ICsv.IWriteInput,
  ): Promise<ICsv.IWriteOutput> {
    return CsvProvider.write(input);
  }

  /**
   * CSV 파일을 엑셀 파일로 변환합니다.
   *
   * @summary CSV 파일 Excel 파일 변환
   *
   * @param input CSV 파일을 엑셀 파일로 변환하기 위한 정보
   *
   * @returns excel file url
   *
   * @tag CSV
   * @tag 파일
   * @tag 내보내기
   * @tag 다운로드
   * @tag 추출
   * @tag 추출하기
   * @tag 스프레드시트
   * @tag 데이터 저장
   * @tag 데이터 불러오기
   * @tag 데이터 분석
   * @tag 스프레드시트
   * @tag 데이터 베이스
   * @tag 데이터 내보내기
   * @tag 데이터 가져오기
   * @tag 엑셀 변환
   * @tag 텍스트 파일
   * @tag 데이터 처리
   * @tag 대량 데이터
   * @tag 데이터 편집
   * @tag 파일 분할
   * @tag 데이터 통합
   * @tag CSV 만들기
   * @tag CSV 파일 열기
   * @tag 데이터 추출
   * @tag 데이터 필터링
   * @tag 데이터 병합
   * @tag CSV
   * @tag File
   * @tag Export
   * @tag Download
   * @tag Extract
   * @tag Spreadsheet
   * @tag Save Data
   * @tag Load Data
   * @tag Data Analysis
   * @tag Spreadsheet
   * @tag Database
   * @tag Export Data
   * @tag Import Data
   * @tag Convert to Excel
   * @tag Text File
   * @tag Data Processing
   * @tag Large Data
   * @tag Edit Data
   * @tag Split File
   * @tag Integrate Data
   * @tag Create CSV
   * @tag Open CSV File
   * @tag Extract Data
   * @tag Filter Data
   * @tag Merge Data
   */
  @core.TypedRoute.Post("csv-to-excel")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/csv.svg",
  )
  async csvToExcel(
    @core.TypedBody() input: ICsv.ICsvToExcelInput,
  ): Promise<ICsv.ICsvToExcelOutput> {
    return await CsvProvider.convertCsvToExcel(input);
  }
}
