import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { INaver } from "@wrtn/connector-api/lib/structures/connector/naver/INaver";

import { NaverProvider } from "../../../providers/connector/naver/NaverProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/naver")
export class NaverController {
  /**
   * 네이버 카페 컨텐츠를 검색합니다.
   *
   * @summary 네이버 카페 검색
   *
   * @param input 네이버 카페 검색을 위한 조건
   *
   * @tag Naver 네이버 포털 사이트
   * @tag 네이버 카페
   * @tag 카페
   * @tag 카페 멤버
   * @tag 카페 글쓰기
   * @tag 카페 이벤트
   * @tag 카페 게시판
   * @tag 카페 이미지
   * @tag 카페 동영상
   * @tag 카페 공지
   * @tag 카페 검색
   * @tag 카페 댓글
   * @tag 카페 게시물
   * @tag 카페 인기글
   * @tag 블로그 포스트
   * @tag 포스트 작성
   * @tag Naver Cafe
   * @tag Cafe
   * @tag Cafe Members
   * @tag Cafe Writing
   * @tag Cafe Events
   * @tag Cafe Bulletin Board
   * @tag Cafe Images
   * @tag Cafe Videos
   * @tag Cafe Announcements
   * @tag Cafe Search
   * @tag Cafe Comments
   * @tag Cafe Posts
   * @tag Cafe Popular Posts
   * @tag Blog Post
   * @tag Post Writing
   */
  @Standalone()
  @core.TypedRoute.Post("/cafe")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/naver_cafe.svg",
  )
  async cafeList(
    @core.TypedBody() input: INaver.INaverKeywordInput,
  ): Promise<INaver.ICafeNaverOutput> {
    return retry(() => NaverProvider.getCafe(input))();
  }

  /**
   * 네이버 블로그 컨텐츠를 검색합니다.
   *
   * @summary 네이버 블로그 검색
   *
   * @param input 네이버 블로그 검색을 위한 조건
   *
   * @tag Naver 네이버 포털 사이트
   * @tag 네이버 블로그
   * @tag 블로그
   * @tag 블로그 작성
   * @tag 블로그 트래픽
   * @tag 블로그 마케팅
   * @tag 블로그 SEO
   * @tag 블로그 통계
   * @tag 블로그 공유
   * @tag 블로그 댓글
   * @tag 블로그 팔로우
   * @tag 블로그 검색
   * @tag 블로그 포스팅
   * @tag 블로그 이미지
   * @tag 블로그 동영상
   * @tag 블로그 업로드
   * @tag 블로그 글쓰기
   * @tag 블로그 수익화
   * @tag 블로그 방문자
   * @tag 블로그 피드
   * @tag 네이버 블로그 챌린지
   * @tag Naver Blog
   * @tag Blog
   * @tag Blog Writing
   * @tag Blog Traffic
   * @tag Blog Marketing
   * @tag Blog SEO
   * @tag Blog Statistics
   * @tag Blog Sharing
   * @tag Blog Comments
   * @tag Blog Follow
   * @tag Blog Search
   * @tag Blog Posting
   * @tag Blog Images
   * @tag Blog Videos
   * @tag Blog Upload
   * @tag Blog Writing
   * @tag Blog Monetization
   * @tag Blog Visitors
   * @tag Blog Feed
   * @tag Naver Blog Challenge
   */
  @Standalone()
  @core.TypedRoute.Post("/blog")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/naver_blog.svg",
  )
  async blogList(
    @core.TypedBody() input: INaver.INaverKeywordInput,
  ): Promise<INaver.IBlogNaverOutput> {
    return retry(() => NaverProvider.getBlog(input))();
  }
}
