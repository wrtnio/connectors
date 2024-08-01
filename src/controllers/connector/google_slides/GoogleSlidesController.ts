import core, { TypedBody, TypedParam } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { IGoogleSlides } from "@wrtn/connector-api/lib/structures/connector/google_slides/IGoogleSlides";

import { GoogleSlidesProvider } from "../../../providers/connector/google_slides/GoogleSlidesProvider";
import { retry } from "../../../utils/retry";
import { RouteIcon } from "@wrtnio/decorators";

@Controller("connector/google-slides")
export class GoogleSlidesController {
  constructor(private readonly googleSlideProvider: GoogleSlidesProvider) {}

  /**
   * 구글 슬라이드 프레젠테이션을 한쇼 형식으로 내보내요!
   *
   * @summary 프레젠테이션을 한쇼 파일로 내보내기
   *
   * @param presentationId 변환할 프레젠테이션 아이디
   * @param input 인증 정보
   * @returns 한쇼 파일을 다운로드 가능한 링크
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
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_slides.svg",
  )
  @core.TypedRoute.Post("presentations/:id/export/hanshow")
  async hanshow(
    @TypedParam("id") presentationId: string,
    @TypedBody() input: IGoogleSlides.IExportPresentationInput,
  ): Promise<IGoogleSlides.IExportHanshowOutput> {
    return retry(() =>
      this.googleSlideProvider.createHanshow(presentationId, {
        secretKey: input.secretKey,
      }),
    )();
  }

  /**
   * 구글 슬라이드 프레젠테이션을 파워포인트 형식으로 내보내요!
   *
   * 이야기 또는 그림책을 생성할 때 사용될 수 있는 커넥터입니다.
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
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_slides.svg",
  )
  @core.TypedRoute.Post("presentations/:id/export/power-point")
  async powerPoint(
    @TypedParam("id") presentationId: string,
    @TypedBody() input: IGoogleSlides.IExportPresentationInput,
  ): Promise<IGoogleSlides.IExportPresentationOutput> {
    return retry(() =>
      this.googleSlideProvider.createPowerPoint(presentationId, {
        secretKey: input.secretKey,
      }),
    )();
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
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_slides.svg",
  )
  @core.TypedRoute.Post("get-presentations")
  async getPresentation(
    @TypedBody() input: IGoogleSlides.IGetPresentationInput,
  ): Promise<IGoogleSlides.ISimplePresentationIdOutput> {
    return retry(() => this.googleSlideProvider.getPresentation(input))();
  }

  /**
   * Google Slides 프레젠테이션에 슬라이드를 추가합니다.
   *
   * 이야기 또는 그림책을 생성할 때 connector/google-slides/createPresentation 커넥터와 함께 사용해주세요.
   *
   * 이야기 또는 그림책을 생성할 때 connector/google-slides/createPresentation 커넥터로 부터 생성된 프레젠테이션에 이 커넥터를 사용해서 생성된 이야기와 그림을 넣어주세요.
   *
   * 이야기 또는 그림책을 생성할 때 해당 커넥터를 사용하지 않으면 빈 그림책이 될 수 있으니 조심해주세요.
   *
   * @summary Google Slides 프레젠테이션에 이미지 및 텍스트 슬라이드를 추가합니다.
   * @param presentationId 슬라이드를 추가할 프레젠테이션 id
   * @param input 추가할 템플릿
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_slides.svg",
  )
  @core.TypedRoute.Put("presentations/:id/image-slide")
  async appendImageSlide(
    @TypedParam("id") presentationId: string,
    @TypedBody() input: IGoogleSlides.AppendSlideInput,
  ): Promise<IGoogleSlides.ISimplePresentationIdOutput> {
    return retry(() =>
      this.googleSlideProvider.appendImageSlide(presentationId, input),
    )();
  }

  /**
   * Google Slides 프레젠테이션을 생성합니다.
   *
   * 이야기 또는 그림책을 생성할 때 사용될 수 있는 커넥터입니다.
   *
   * 이야기 또는 그림책을 생성할 때 connector/google-slides/appendImageSlide 커넥터와 함께 사용해주세요.
   *
   * 이야기 또는 그림책을 생성할 때 이 커넥터로 새로운 프레젠테이션을 생성하고 connector/google-slides/appendImageSlide 커넥터를 사용해서 생성된 이야기와 그림을 슬라이드에 넣어주세요.
   *
   * 이야기 또는 그림책을 생성할 때 connector/google-slides/appendImageSlide 커넥터와 같이 사용하지 않으면 빈 그림책이 될 수 있으니 조심해주세요.
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
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_slides.svg",
  )
  @core.TypedRoute.Post("presentations")
  async createPresentation(
    @TypedBody() input: IGoogleSlides.ICreatePresentationInput,
  ): Promise<IGoogleSlides.ISimplePresentationIdOutput> {
    return retry(() => this.googleSlideProvider.createPresentation(input))();
  }
}
