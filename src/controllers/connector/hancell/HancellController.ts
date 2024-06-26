import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Standalone } from "@wrtn/decorators";

import { IHancell } from "@wrtn/connector-api/lib/structures/connector/hancell/IHancell";

import { HancellProvider } from "../../../providers/connector/hancell/HancellProvider";

@Controller("connector/hancell")
export class HancellController {
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
  @Standalone()
  @core.TypedRoute.Post("read")
  async read(
    @TypedBody() input: IHancell.IReadHancellInput,
  ): Promise<IHancell.IReadHancellOutput> {
    return HancellProvider.getHancellData(input);
  }
}
