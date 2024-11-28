import { tags } from "typia";

export namespace IWebCrawler {
  /**
   * @title Request to crawl a web page
   */
  export interface IRequest {
    type:
      | "good"
      | "review"
      | "article"
      | "social"
      | "blog"
      | "community"
      | null;

    /**
     * @title Target URL to crawl
     */
    url: string;

    /**
     * @title Wait for a CSS selector to appear before returning content. (not required)
     */
    wait_for?: string;
  }

  /**
   * @title Response from crawled web page
   */
  export interface IResponse {
    type:
      | "good"
      | "review"
      | "article"
      | "social"
      | "blog"
      | "community"
      | null;

    /**
     * @title Crawled content
     */
    content:
      | GoodData
      | ReviewData
      | ArticleData
      | SocialData
      | BlogData
      | CommunityData
      | (string & {});

    metadata: IMetadata;
  }

  export interface IImage {
    id?: string; // 이미지의 id 속성
    url: string; // 이미지 URL
    alt?: string; // 이미지 설명
    classNames: string[]; // 이미지에 할당된 클래스 배열
    parentClassNames?: string[]; // 부모 요소의 클래스 배열
  }

  export interface IMetadata {
    url: string; // 크롤링한 페이지 URL
    timestamp: string; // 크롤링 시점
    language: string | null; // 컨텐츠 언어 (ko, en 등)
    lastUpdated?: string; // 컨텐츠 마지막 수정일
    paginate: PaginationInfo | null; // 페이지네이션 정보
  }

  // 상품 정보
  export interface GoodData {
    name: string; // 상품명
    price: {
      current: number; // 현재 가격
      original?: number; // 원가 (있는 경우)
      currency: string; // 통화 (KRW, USD 등)
      discountRate?: number; // 할인율
    };
    manufacturer?: string; // 제조사
    category: string[]; // 카테고리 경로
    description: string; // 상품 설명
    images: IImage[];
    ratings?: {
      average: number; // 평균 평점
      count: number; // 평점 개수
      distribution?: {
        // 평점 분포
        [rating: number]: number; // (예: 5: 100, 4: 50...)
      };
    };
    availability: "in_stock" | "out_of_stock" | "pre_order";
  }

  // 리뷰 데이터
  export interface ReviewData {
    items: {
      id: string; // 리뷰 ID
      author: {
        name: string; // 작성자명
        verified?: boolean; // 구매 인증 여부
      };
      rating: number; // 평점
      date: string; // 작성일
      content: string; // 리뷰 내용
      pros?: string[]; // 장점
      cons?: string[]; // 단점
      helpful?: {
        // 도움이 됐어요
        count: number;
        total: number;
      };
      images?: IImage[];
      replies?: {
        // 답글
        author: string;
        content: string;
        date: string;
      }[];
    }[];
    summary?: {
      // 리뷰 요약
      totalCount: number; // 전체 리뷰 수
      averageRating: number; // 평균 평점
      keywordFrequency: {
        // 주요 키워드 빈도
        [keyword: string]: number;
      };
    };
  }

  // 뉴스/기사 데이터
  export interface ArticleData {
    title: string; // 제목
    author?: string; // 작성자
    publishDate: string; // 발행일
    modifiedDate?: string; // 수정일
    content: string; // 본문
    summary?: string; // 요약
    category?: string; // 카테고리
    tags?: string[]; // 태그
    images?: IImage[];
    source: string; // 언론사
    related?: {
      // 관련 기사
      title: string;
      url: string;
    }[];
  }

  // 소셜미디어 게시물
  export interface SocialData {
    author: {
      name: string; // 작성자명
      handle: string; // 계정명
      verified?: boolean; // 인증계정 여부
    };
    content: string; // 게시물 내용
    date: string; // 작성일시
    engagement: {
      // 참여 지표
      likes?: number;
      shares?: number;
      comments?: number;
      views?: number;
    };
    media?: IImage[];
    hashtags?: string[]; // 해시태그
    location?: string; // 위치정보
  }

  // 페이지네이션 정보
  export interface PaginationInfo {
    type: "infinite-scroll" | "pagination" | "load-more";
    currentPage?: number;
    totalPages?: number;
    nextPageUrl?: string;
    hasMore: boolean;
    apiPattern?: string; // API 호출 패턴 발견시
  }

  // 블로그 데이터
  export interface BlogData {
    title: string; // 글 제목
    author: {
      name: string; // 작성자 이름
      profileUrl?: string; // 프로필 URL
      description?: string; // 작성자 소개
    };
    content: string; // 본문 내용
    publishDate: string; // 작성일
    modifiedDate?: string; // 수정일
    category?: string[]; // 카테고리
    tags?: string[]; // 태그
    images: IImage[];
    comments?: {
      // 댓글
      id: string;
      author: string;
      content: string;
      date: string;
      likes?: number;
      replies?: {
        author: string;
        content: string;
        date: string;
      }[];
    }[];
    stats?: {
      // 통계
      views: number; // 조회수
      likes: number; // 좋아요
      shares?: number; // 공유
      bookmarks?: number; // 북마크
    };
    series?: {
      // 시리즈 정보 (있는 경우)
      name: string; // 시리즈명
      order: number; // 시리즈 내 순서
      totalPosts: number; // 시리즈 전체 글 수
    };
  }

  // 커뮤니티 데이터
  export interface CommunityData {
    title: string; // 글 제목
    author: {
      name: string; // 작성자
      rank?: string; // 등급
      joinDate?: string; // 가입일
      postCount?: number; // 게시글 수
    };
    content: string; // 본문
    board: {
      // 게시판 정보
      name: string; // 게시판명
      category?: string; // 게시판 카테고리
    };
    publishDate: string; // 작성일
    modifiedDate?: string; // 수정일
    images: IImage[];
    attachments?: {
      // 첨부파일
      name: string;
      url: string;
      size?: number;
    }[];
    stats: {
      // 통계
      views: number; // 조회수
      likes: number; // 추천/좋아요
      comments: number; // 댓글 수
    };
    comments?: {
      // 댓글
      id: string;
      author: {
        name: string;
        rank?: string;
      };
      content: string;
      date: string;
      likes?: number;
      isAnswer?: boolean; // 채택된 답변 여부
      replies?: {
        author: {
          name: string;
          rank?: string;
        };
        content: string;
        date: string;
      }[];
    }[];
    notices?: {
      // 공지사항
      content: string;
      date: string;
    }[];
  }
}
