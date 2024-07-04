import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtn/decorators";

import { IConnector } from "@wrtn/connector-api/lib/structures/common/IConnector";
import { IYoutubeSearch } from "@wrtn/connector-api/lib/structures/connector/youtube_search/IYoutubeSearch";

import { YoutubeSearchProvider } from "../../../providers/connector/youtube_search/YoutubeSearchProvider";
import { Try, createResponseForm } from "../../../utils/createResponseForm";
import { retry } from "../../../utils/retry";

@Controller("connector/youtube-search")
export class YoutubeSearchController {
  /**
   * 유튜브 영상 검색 결과를 가져옵니다.
   *
   * @summary 유튜브 영상 검색
   *
   * @param input 유튜브 영상 검색을 위한 조건
   *
   * @returns 유튜브 영상 검색 결과 목록.
   *
   * @tag Youtube 유튜브
   * @tag 유튜브
   * @tag 동영상 검색
   * @tag 숏폼
   * @tag 춋츠
   * @tag 밈
   * @tag 동영상 업로드
   * @tag 유튜브 채널
   * @tag 구독
   * @tag 좋아요
   * @tag 댓글
   * @tag 동영상
   * @tag 라이브 방송
   * @tag 재생 목록
   * @tag 동영상 추천
   * @tag 유튜브 광고
   * @tag 시청자
   * @tag 시청자 통계
   * @tag 동영상 분석
   * @tag 동영상 공유
   * @tag 동영상 요약
   * @tag 구독자
   * @tag 알림 설정
   * @tag 커뮤니티 게시판
   * @tag 콘텐츠 제작
   * @tag 저작권 관리
   * @tag 동영상 다운로드
   * @tag 동영상 제목
   * @tag 동영상 설명
   * @tag 유튜브 트렌드
   * @tag 조회수
   * @tag 채널 홍보
   * @tag 조회수 분석
   * @tag 동영상 SEO
   * @tag 채널 아트
   * @tag 채널 배너
   * @tag 썸네일
   * @tag 인급동
   * @tag 인기 급상승 동영상
   * @tag YouTube
   * @tag Video Search
   * @tag Short-form Video
   * @tag Shorts
   * @tag Memes
   * @tag Upload Video
   * @tag YouTube Channel
   * @tag Subscribe
   * @tag Like
   * @tag Comment
   * @tag Video
   * @tag Live Stream
   * @tag Playlist
   * @tag Video Recommendations
   * @tag YouTube Ads
   * @tag Viewer
   * @tag Viewer Statistics
   * @tag Video Analysis
   * @tag Share Video
   * @tag Video Summary
   * @tag Subscriber
   * @tag Notification Settings
   * @tag Community Tab
   * @tag Content Creation
   * @tag Copyright Management
   * @tag Download Video
   * @tag Video Title
   * @tag Video Description
   * @tag YouTube Trends
   * @tag Views
   * @tag Promote Channel
   * @tag View Analysis
   * @tag Video SEO
   * @tag Channel Art
   * @tag Channel Banner
   * @tag Thumbnail
   * @tag Trending Videos
   */
  @Standalone()
  @core.TypedRoute.Post()
  @RouteIcon("https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/youtube.svg")
  async search(@core.TypedBody() input: IYoutubeSearch.ISearchInput): Promise<Try<IConnector.ISearchOutput>> {
    const data = await retry(YoutubeSearchProvider.search)(input);
    return createResponseForm(data);
  }
}
