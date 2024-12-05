import { Cheerio, CheerioAPI } from "cheerio";
import { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";
import { PaginationInfiniteExtractor } from "./PaginationInfiniteExtractor";
import { PaginationNumberExtractor } from "./PaginationNumberExtractor";
import { PaginationLoadMoreExtractor } from "./PaginationLoadMoreExtractor";

export namespace CommonExtractor {
  const hasPageContent = ($element: Cheerio<any>): boolean => {
    const contentList = $element.find('[class*="feed__list"]');
    if (!contentList.length) return false;

    const paginator = $element.find('[class*="paginator"]');
    return paginator.length > 0;
  };

  export const findPaginationElements = async (
    $: CheerioAPI,
  ): Promise<Cheerio<any>[]> => {
    const paginatorSelectors = [
      ...PaginationInfiniteExtractor.scriptSelectors,
      ...PaginationInfiniteExtractor.infiniteScrollSelectors,
      ...PaginationLoadMoreExtractor.loadMoreSelectors,
      ...PaginationNumberExtractor.paginationSelectors,
    ];

    const sections: Cheerio<any>[] = [];

    // 페이지네이터가 있는 섹션 찾기
    $("section").each((_, section) => {
      const $section = $(section);
      const hasPaginator = paginatorSelectors.some(
        (selector) => $section.find(selector).length > 0,
      );

      if (hasPaginator) {
        // 데이터 리스트 찾기
        const listSelectors = [
          '[class*="list"]',
          '[class*="items"]',
          '[class*="feed"]',
        ];

        const hasList = listSelectors.some(
          (selector) => $section.find(selector).length > 0,
        );

        if (hasList) {
          sections.push($section);
        }
      }
    });

    return sections;
  };

  export const detectPaginationType = async (
    $element: Cheerio<any>,
  ): Promise<{
    type: IWebCrawler.PaginationType;
    $element: Cheerio<any>;
  } | null> => {
    if (PaginationInfiniteExtractor.isInfiniteScroll($element)) {
      return {
        type: "infinite-scroll",
        $element: $element,
      };
    }

    if (PaginationNumberExtractor.isNumberedPagination($element)) {
      return {
        type: "numbered",
        $element: $element,
      };
    }

    if (PaginationLoadMoreExtractor.isLoadMore($element)) {
      return {
        type: "load-more",
        $element: $element,
      };
    }

    return null;
  };

  // export const extractPaginationInfo = async (
  //   $: CheerioAPI,
  //   xhr: IWebCrawler.IXHR[],
  //   currentUrl: string,
  // ): Promise<IWebCrawler.IPagination> => {
  //   const type = await detectPaginationType($);
  //   const apiPattern = ApiExtractor.detectAPIPattern($);
  //
  //   let paginationInfo: IWebCrawler.IPagination;
  //
  //   switch (type) {
  //     case "numbered":
  //       paginationInfo =
  //         await PaginationNumberExtractor.handleNumberedPagination(
  //           $,
  //           currentUrl,
  //         );
  //       break;
  //     case "infinite-scroll":
  //       paginationInfo =
  //         await PaginationInfiniteExtractor.handleInfiniteScroll($);
  //       break;
  //     case "load-more":
  //       paginationInfo = await PaginationLoadMoreExtractor.handleLoadMore(
  //         $,
  //         currentUrl,
  //       );
  //       break;
  //     default:
  //       paginationInfo = {
  //         type: null,
  //         hasNextPage: false,
  //       };
  //   }
  //
  //   // API 패턴이 감지된 경우 패턴 정보 병합
  //   if (apiPattern.found) {
  //     paginationInfo.pattern = apiPattern.pattern;
  //   }
  //
  //   return paginationInfo;
  // };

  export const groupPages = (
    pages: IWebCrawler.IPage[],
  ): IWebCrawler.IResponse["paginationGroups"] => {
    // 페이지들을 공통된 특성으로 그룹화
    const groups = new Map<string, IWebCrawler.IPage[]>();

    pages.forEach((page) => {
      // URL 패턴, 클래스명 패턴 등을 기반으로 식별자 생성
      const identifier = generatePageIdentifier(page);

      if (!groups.has(identifier)) {
        groups.set(identifier, []);
      }
      groups.get(identifier)!.push(page);
    });

    return Array.from(groups.entries()).map(([identifier, pages]) => ({
      identifier: [identifier], // 식별자 배열로 변환
      pages,
    }));
  };

  const generatePageIdentifier = (page: IWebCrawler.IPage): string => {
    // URL 패턴, 클래스명 패턴, 페이지네이션 타입 등을 조합하여 고유 식별자 생성
    const urlPattern = new URL(page.url).pathname.split("/")[1] || "";
    const commonClasses = page.classNames
      .filter(
        (cls) =>
          cls.includes("content") ||
          cls.includes("article") ||
          cls.includes("post"),
      )
      .sort()
      .join("-");
    const paginationType = page.pagination.type || "none";

    return `${urlPattern}-${commonClasses}-${paginationType}`;
  };
}
