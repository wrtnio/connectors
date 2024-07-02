import core, { TypedBody, TypedParam } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { IGoogleSlides } from "@wrtn/connector-api/lib/structures/connector/google_slides/IGoogleSlides";

import { GoogleSlidesProvider } from "../../../providers/connector/google_slides/GoogleSlidesProvider";

@Controller("connector/google-slides")
export class GoogleSlidesController {
  constructor(private readonly googleSlideProvider: GoogleSlidesProvider) {}
  /**
   * 구글 슬라이드 프레젠테이션을 파워포인트 형식으로 내보내요!
   *
   * @summary 프레젠테이션을 PPT 파일로 내보내기
   *
   * @param presentationId 변환할 프레젠테이션 아이디
   * @param input 인증 정보
   * @returns 파워포인트 파일을 다운로드 가능한 링크
   */
  @ApiTags(
    "구글 슬라이드",
    "구글 드라이브",
    "프레젠테이션",
    "피피티",
    "피티",
    "슬라이드",
    "슬라이드 디자인",
    "프레젠테이션 만들기",
    "슬라이드 템플릿",
    "슬라이드 공유",
    "이미지 삽입",
    "동영상 삽입",
    "슬라이드 애니메이션",
    "슬라이드쇼",
    "발표 준비",
    "발표 자료",
    "슬라이드 내보내기",
    "슬라이드 인쇄",
    "슬라이드 전환",
    "슬라이드 배경",
    "슬라이드 텍스트",
    "슬라이드 표",
    "슬라이드 차트",
    "슬라이드 그래프",
    "슬라이드 복제",
    "슬라이드 이동",
    "슬라이드 삭제",
    "맞춤법 검사",
    "슬라이드 찾기",
    "슬라이드 저장",
    "프레젠테이션 준비",
    "슬라이드 협업",
    "슬라이드 제목",
  )
  @core.TypedRoute.Post("presentations/:id/export/power-point")
  async powerPoint(
    @TypedParam("id") presentationId: string,
    @TypedBody() input: IGoogleSlides.IExportPresentationInput,
  ): Promise<IGoogleSlides.IExportPresentationOutput> {
    return this.googleSlideProvider.createPowerPoint(presentationId, {
      secretKey: input.secretKey,
    });
  }

  /**
   * Google Slides 프레젠테이션을 조회합니다.
   *
   * @summary Google Slides 프레젠테이션 조회.
   *
   * @param input 프레젠테이션을 조회하기 위한 조건 DTO.
   * @returns 조회된 프레젠테이션 정보 DTO.
   */
  @ApiTags(
    "구글 슬라이드",
    "구글 드라이브",
    "프레젠테이션",
    "피피티",
    "피티",
    "슬라이드",
    "슬라이드 디자인",
    "프레젠테이션 만들기",
    "슬라이드 템플릿",
    "슬라이드 공유",
    "이미지 삽입",
    "동영상 삽입",
    "슬라이드 애니메이션",
    "슬라이드쇼",
    "발표 준비",
    "발표 자료",
    "슬라이드 내보내기",
    "슬라이드 인쇄",
    "슬라이드 전환",
    "슬라이드 배경",
    "슬라이드 텍스트",
    "슬라이드 표",
    "슬라이드 차트",
    "슬라이드 그래프",
    "슬라이드 복제",
    "슬라이드 이동",
    "슬라이드 삭제",
    "맞춤법 검사",
    "슬라이드 찾기",
    "슬라이드 저장",
    "프레젠테이션 준비",
    "슬라이드 협업",
    "슬라이드 제목",
  )
  @core.TypedRoute.Post("get-presentations")
  async getPresentation(
    @TypedBody() input: IGoogleSlides.IGetPresentationInput,
  ): Promise<IGoogleSlides.Presentation> {
    return this.googleSlideProvider.getPresentation(input);
  }

  @core.TypedRoute.Put("presentations/:id/image-slide")
  async appendImageSlide(
    @TypedParam("id") presentationId: string,
    @TypedBody() input: IGoogleSlides.AppendSlideInput,
  ): Promise<IGoogleSlides.Presentation> {
    return this.googleSlideProvider.appendImageSlide(presentationId, input);
  }

  /**
   * Google Slides 프레젠테이션을 생성합니다.
   *
   * @summary Google Slides 프레젠테이션 생성.
   *
   * @param input 프레젠테이션을 만들기 위한 조건 DTO.
   * @returns 생성된 프레젠테이션 정보 DTO.
   */
  @ApiTags(
    "구글 슬라이드",
    "구글 드라이브",
    "프레젠테이션",
    "피피티",
    "피티",
    "슬라이드",
    "슬라이드 디자인",
    "프레젠테이션 만들기",
    "슬라이드 템플릿",
    "슬라이드 공유",
    "이미지 삽입",
    "동영상 삽입",
    "슬라이드 애니메이션",
    "슬라이드쇼",
    "발표 준비",
    "발표 자료",
    "슬라이드 내보내기",
    "슬라이드 인쇄",
    "슬라이드 전환",
    "슬라이드 배경",
    "슬라이드 텍스트",
    "슬라이드 표",
    "슬라이드 차트",
    "슬라이드 그래프",
    "슬라이드 복제",
    "슬라이드 이동",
    "슬라이드 삭제",
    "맞춤법 검사",
    "슬라이드 찾기",
    "슬라이드 저장",
    "프레젠테이션 준비",
    "슬라이드 협업",
    "슬라이드 제목",
  )
  @core.TypedRoute.Post("presentations")
  async createPresentation(
    @TypedBody() input: IGoogleSlides.ICreatePresentationInput,
  ): Promise<IGoogleSlides.Presentation> {
    return this.googleSlideProvider.createPresentation(input);
  }
}
