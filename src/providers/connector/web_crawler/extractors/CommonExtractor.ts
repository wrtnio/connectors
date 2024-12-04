import { Cheerio, CheerioAPI } from "cheerio";
import { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";
import { PaginationInfiniteExtractor } from "./PaginationInfiniteExtractor";
import { PaginationNumberExtractor } from "./PaginationNumberExtractor";
import { PaginationLoadMoreExtractor } from "./PaginationLoadMoreExtractor";
import { ApiExtractor } from "./ApiExtractor";

export namespace CommonExtractor {
  export const extractPage = async (
    $: CheerioAPI,
    xhr: IWebCrawler.IXHR[],
    currentUrl: string,
  ): Promise<IWebCrawler.IPage> => {
    const classNames = extractPageClassNames($);
    const pagination = await extractPaginationInfo($, xhr, currentUrl);

    return {
      classNames,
      url: currentUrl,
      data: [],
      res_json: extractResponseJSON(xhr),
      pagination,
    };
  };

  const extractPageClassNames = ($: CheerioAPI): string[] => {
    const classNames = new Set<string>();

    $("[class]").each((_, element) => {
      const elementClasses = ($(element).attr("class") || "")
        .split(/\s+/)
        .filter(Boolean);
      elementClasses.forEach((className) => classNames.add(className));
    });

    return Array.from(classNames);
  };

  const extractResponseJSON = (xhr: IWebCrawler.IXHR[]): any => {
    // XHR 응답 중 JSON 데이터가 있는 경우 파싱하여 반환
    for (const request of xhr) {
      try {
        if (request.responseStatus === 200 && request.body) {
          return JSON.parse(request.body);
        }
      } catch {
        continue;
      }
    }
    return null;
  };

  export const extractImages = async (
    $: CheerioAPI,
  ): Promise<IWebCrawler.IImage[]> => {
    const images: IWebCrawler.IImage[] = [];

    $("img").each((_, element) => {
      const $img = $(element);
      const $parent = $img.parent();
      const url = $img.attr("src");

      if (url && isValidImage($img)) {
        images.push({
          id: $img.attr("id"),
          url,
          alt: $img.attr("alt"),
          classNames: extractElementClasses($img),
          parentClassNames: extractElementClasses($parent),
        });
      }
    });

    return images;
  };

  const isValidImage = ($img: Cheerio<any>): boolean => {
    // 작은 이미지나 장식용 이미지 필터링
    const width = Number($img.attr("width"));
    const height = Number($img.attr("height"));
    const isDecorative = $img.attr("role") === "presentation";

    return !(width < 100 || height < 100 || isDecorative);
  };

  const extractElementClasses = ($element: Cheerio<any>): string[] => {
    return ($element.attr("class") || "").split(/\s+/).filter(Boolean);
  };

  const detectPaginationType = async (
    $: CheerioAPI,
  ): Promise<IWebCrawler.PaginationType> => {
    if (PaginationInfiniteExtractor.isInfiniteScroll($)) {
      return "infinite-scroll";
    }

    if (PaginationNumberExtractor.isNumberedPagination($)) {
      return "numbered";
    }

    if (PaginationLoadMoreExtractor.isLoadMore($)) {
      return "load-more";
    }

    return null;
  };

  export const extractPaginationInfo = async (
    $: CheerioAPI,
    xhr: IWebCrawler.IXHR[],
    currentUrl: string,
  ): Promise<IWebCrawler.IPagination> => {
    const type = await detectPaginationType($);
    const apiPattern = ApiExtractor.detectAPIPattern($);

    let paginationInfo: IWebCrawler.IPagination;

    switch (type) {
      case "numbered":
        paginationInfo =
          await PaginationNumberExtractor.handleNumberedPagination(
            $,
            currentUrl,
          );
        break;
      case "infinite-scroll":
        paginationInfo =
          await PaginationInfiniteExtractor.handleInfiniteScroll($);
        break;
      case "load-more":
        paginationInfo = await PaginationLoadMoreExtractor.handleLoadMore(
          $,
          currentUrl,
        );
        break;
      default:
        paginationInfo = {
          type: null,
          hasNextPage: false,
        };
    }

    // API 패턴이 감지된 경우 패턴 정보 병합
    if (apiPattern.found) {
      paginationInfo.pattern = apiPattern.pattern;
    }

    return paginationInfo;
  };

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
