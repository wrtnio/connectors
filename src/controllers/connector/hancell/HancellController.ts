import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { IHancell } from "@wrtn/connector-api/lib/structures/connector/hancell/IHancell";

import { HancellProvider } from "../../../providers/connector/hancell/HancellProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/hancell")
export class HancellController {
  constructor(private readonly hancellProvider: HancellProvider) {}

  /**
   * 한셀 시트를 수정합니다.
   *
   * 만약 시트가 이미 존재한다면 시트를 수정하고 기존에 없던 시트라면 추가합니다.
   *
   * @summary 한셀 수정
   * @param input 수정할 한셀 정보
   * @returns 수정 후 새로 만들어진 파일 링크
   */
  @ApiTags(
    "Hancell 엑셀 파일",
    "엑셀",
    "파일",
    "내보내기",
    "다운로드",
    "추출",
    "추출하기",
    "스프레드시트",
    "데이터 저장",
    "데이터 불러오기",
    "데이터 분석",
    "스프레드시트",
    "데이터 베이스",
    "데이터 내보내기",
    "데이터 가져오기",
    "엑셀 변환",
    "텍스트 파일",
    "데이터 처리",
    "대량 데이터",
    "데이터 편집",
    "파일 분할",
    "데이터 통합",
    "엑셀 만들기",
    "엑셀 파일 열기",
    "데이터 추출",
    "데이터 필터링",
    "데이터 병합",
    "Hancell",
    "File",
    "Export",
    "Download",
    "Extract",
    "Spreadsheet",
    "Save Data",
    "Load Data",
    "Data Analysis",
    "Spreadsheet",
    "Database",
    "Export Data",
    "Import Data",
    "Convert to Hancell",
    "Text File",
    "Data Processing",
    "Large Data",
    "Edit Data",
    "Split File",
    "Integrate Data",
    "Create Hancell",
    "Open Hancell File",
    "Extract Data",
    "Filter Data",
    "Merge Data",
  )
  @core.TypedRoute.Post("sheet")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/hancell.svg",
  )
  async upsertSheet(
    @TypedBody() input: IHancell.IUpsertSheetInput,
  ): Promise<IHancell.IUpsertSheetOutput> {
    return retry(() => this.hancellProvider.upsertSheet(input))();
  }

  /**
   * 한셀 파일을 읽습니다.
   *
   * @summary 한셀 파일 읽기
   * @param input 읽을 한셀 파일 정보
   * @returns 한셀 파일 정보
   */
  @ApiTags(
    "Hancell 엑셀 파일",
    "엑셀",
    "파일",
    "내보내기",
    "다운로드",
    "추출",
    "추출하기",
    "스프레드시트",
    "데이터 저장",
    "데이터 불러오기",
    "데이터 분석",
    "스프레드시트",
    "데이터 베이스",
    "데이터 내보내기",
    "데이터 가져오기",
    "엑셀 변환",
    "텍스트 파일",
    "데이터 처리",
    "대량 데이터",
    "데이터 편집",
    "파일 분할",
    "데이터 통합",
    "엑셀 만들기",
    "엑셀 파일 열기",
    "데이터 추출",
    "데이터 필터링",
    "데이터 병합",
    "Hancell",
    "File",
    "Export",
    "Download",
    "Extract",
    "Spreadsheet",
    "Save Data",
    "Load Data",
    "Data Analysis",
    "Spreadsheet",
    "Database",
    "Export Data",
    "Import Data",
    "Convert to Hancell",
    "Text File",
    "Data Processing",
    "Large Data",
    "Edit Data",
    "Split File",
    "Integrate Data",
    "Create Hancell",
    "Open Hancell File",
    "Extract Data",
    "Filter Data",
    "Merge Data",
  )
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/hancell.svg",
  )
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/hancell.svg",
  )
  @core.TypedRoute.Post("read")
  async read(
    @TypedBody() input: IHancell.IReadHancellInput,
  ): Promise<IHancell.IReadHancellOutput> {
    return retry(() => this.hancellProvider.getHancellData(input))();
  }
}
