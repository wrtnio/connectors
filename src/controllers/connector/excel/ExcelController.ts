import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon } from "@wrtn/decorators";

import { IExcel } from "@wrtn/connector-api/lib/structures/connector/excel/IExcel";

import { ExcelProvider } from "../../../providers/connector/excel/ExcelProvider";
import { Try, createResponseForm } from "../../../utils/createResponseForm";
import { retry } from "../../../utils/retry";

@Controller("connector/excel")
export class ExcelController {
  // /**
  //  * create new excel file.
  //  *
  //  * @param input file name and folder id (default root)
  //  *
  //  * @tag Excel
  //  */
  // @core.TypedRoute.Post()
  // async create(@core.TypedBody() input: IExcel.ICreateExcelInput) {
  //   const data = await retry(() =>  ExcelProvider.create)(input);
  // }

  /**
   * 입력된 파일 정보를 바탕으로 해당 엑셀 파일의 내용을 가져옵니다.
   *
   * @summary 엑셀 파일 안의 내용 가져오기
   *
   * @param input 내용을 가져올 엑셀 파일 정보
   *
   * @tag Excel 엑셀 파일
   * @tag 엑셀
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
   * @tag 엑셀 만들기
   * @tag 엑셀 파일 열기
   * @tag 데이터 추출
   * @tag 데이터 필터링
   * @tag 데이터 병합
   * @tag Excel
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
   * @tag Create Excel
   * @tag Open Excel File
   * @tag Extract Data
   * @tag Filter Data
   * @tag Merge Data
   */
  @core.TypedRoute.Post("/read")
  @RouteIcon("https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/excel.svg")
  async read(@core.TypedBody() input: IExcel.IReadExcelInput): Promise<Try<IExcel.IReadExcelOutput>> {
    const data = await retry(() => ExcelProvider.getExcelData(input))();
    return createResponseForm(data);
  }

  /**
   * 입력된 파일 url에 존재하는 엑셀 워크 시트 목록을 가져옵니다.
   *
   * @summary 액셀 워크 시트 목록 가져오기
   *
   * @param input 워크 시트 목록을 가져올 엑셀 파일 url
   *
   * @returns 엑셀 워크 시트 목록.
   *
   * @tag Excel 엑셀 파일
   * @tag 엑셀
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
   * @tag 엑셀 만들기
   * @tag 엑셀 파일 열기
   * @tag 데이터 추출
   * @tag 데이터 필터링
   * @tag 데이터 병합
   * @tag Excel
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
   * @tag Create Excel
   * @tag Open Excel File
   * @tag Extract Data
   * @tag Filter Data
   * @tag Merge Data
   */
  @core.TypedRoute.Post("/worksheet")
  @RouteIcon("https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/excel.svg")
  async worksheetList(
    @core.TypedBody() input: IExcel.IGetWorksheetListInput,
  ): Promise<Try<IExcel.IWorksheetListOutput>> {
    const data = await retry(() => ExcelProvider.readSheets(input))();
    return createResponseForm(data);
  }

  /**
   * 데이터를 엑셀시트에 추가합니다.
   *
   * @summary 액셀 데이터 추가
   *
   * @param input 엑셀 파일에 새로운 데이터를 추가 하기 위한 정보
   *
   * @tag Excel 엑셀 파일
   * @tag 엑셀
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
   * @tag 엑셀 만들기
   * @tag 엑셀 파일 열기
   * @tag 데이터 추출
   * @tag 데이터 필터링
   * @tag 데이터 병합
   * @tag Excel
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
   * @tag Create Excel
   * @tag Open Excel File
   * @tag Extract Data
   * @tag Filter Data
   * @tag Merge Data
   */
  @core.TypedRoute.Post("/rows")
  @RouteIcon("https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/excel.svg")
  async insertRows(@core.TypedBody() input: IExcel.IInsertExcelRowInput): Promise<Try<IExcel.IInsertExcelRowOutput>> {
    const data = await retry(() => ExcelProvider.insertRows(input))();
    return createResponseForm(data);
  }
}
