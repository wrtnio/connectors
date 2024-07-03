import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon } from "@wrtn/decorators";

import { IHwp } from "@wrtn/connector-api/lib/structures/connector/hwp/IHwp";

import { HwpProvider } from "../../../providers/connector/hwp/HwpProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/hwp")
export class HwpController {
  constructor(private readonly hwpProvider: HwpProvider) {}

  /**
   * hwp 파일을 파싱합니다.
   *
   * @summary Hwp 파일 파싱
   *
   * @param input 파싱할 hwp 파일
   *
   * @returns 파싱된 hwp 파일 텍스트 데이터.
   *
   * @tag Hwp 한글 워드 프로세서
   * @tag 한글
   * @tag 한글과 컴퓨터
   * @tag 한컴오피스
   * @tag 한글 문서
   * @tag hwp
   * @tag 문서 작성
   * @tag 문서 편집
   * @tag 파일 열기
   * @tag 문서 저장
   * @tag 문서 템플릿
   * @tag 문서 양식
   * @tag 문서 서식
   * @tag 표 삽입
   * @tag 차트 생성
   * @tag 이미지 삽입
   * @tag 페이지 설정
   * @tag 글꼴 변경
   * @tag 글자 크기 조정
   * @tag PDF 변환
   * @tag 파일 변환
   * @tag 서식 생성
   * @tag 문서 공유
   * @tag 문서 병합
   * @tag 보고서 작성
   * @tag 서류 작성
   * @tag 텍스트 입력
   * @tag 가정통신문
   * @tag 학교 문서
   * @tag 공무원 문서
   * @tag Hancom Office Hangul
   * @tag Hangul
   * @tag Hancom Office
   * @tag Hancom Document
   * @tag HWP
   * @tag HWP Document
   * @tag Document Writing
   * @tag Document Editing
   * @tag Open File
   * @tag Save Document
   * @tag Document Template
   * @tag Document Form
   * @tag Document Formatting
   * @tag Insert Table
   * @tag Create Chart
   * @tag Insert Image
   * @tag Page Setup
   * @tag Change Font
   * @tag Adjust Font Size
   * @tag Convert to PDF
   * @tag File Conversion
   * @tag Create Formatting
   * @tag Share Document
   * @tag Merge Document
   * @tag Write Report
   * @tag Write Paper
   * @tag Enter Text
   * @tag Parent Letter
   * @tag School Document
   * @tag Government Document
   */
  @core.TypedRoute.Post("/parse")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/hwp.svg",
  )
  async parseHwp(
    @core.TypedBody() input: IHwp.IParseInput,
  ): Promise<IHwp.IParseOutput> {
    return retry(() => this.hwpProvider.parseHwp(input))();
  }
}
