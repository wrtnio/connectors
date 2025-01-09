import { BadRequestException, Injectable } from "@nestjs/common";
import { getJson } from "serpapi";

import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { IGoogleShopping } from "@wrtn/connector-api/lib/structures/connector/google_shopping/IGoogleShopping";

const defaultParams = {
  engine: "google_shopping",
  api_key: ConnectorGlobal.env.SERP_API_KEY,
  google_domain: "google.com",
  location_requested: "South Korea",
  location_used: "South Korea",
  device: "desktop",
  hl: "ko",
  gl: "kr",
};

@Injectable()
export class GoogleShoppingProvider {
  async getGoogleShoppingResults(
    input: IGoogleShopping.IRequestStandAlone,
    tbs: string,
  ): Promise<IGoogleShopping.IResponse[]> {
    try {
      const maxResultPerPage = 60;
      let start = 0;
      const output: IGoogleShopping.IResponse[] = [];

      while (output.length < input.max_results) {
        // const num = Math.min(
        //   input.max_results - output.length,
        //   maxResultPerPage,
        // );
        const res = await getJson({
          ...defaultParams,
          tbs: tbs,
          q: input.keyword,
          start: start,
          // num: num,
          num: 5,
        });
        const results = res["shopping_results"];

        if (!results || results.length === 0) {
          return [];
        }
        for (const result of results) {
          if (output.length === input.max_results) {
            break;
          }
          const data = {
            title: result.title,
            link: result.link,
            price: result.price,
            source: result?.source,
            deliveryCost: result?.delivery,
            thumbnail: result.thumbnail,
          };
          output.push(data);
        }

        if (results.length < maxResultPerPage) {
          break;
        }
        start += maxResultPerPage;
      }

      return output;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  /**
   *  패션 카테고리
   */
  async musinsa(
    input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return this.getGoogleShoppingResults(
      input,
      "mr:1,merchagg:g316277865|m138871704",
    );
  }

  async twentyNineCentimeter(
    input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return this.getGoogleShoppingResults(input, "mr:1,merchagg:m114992958");
  }

  async hansumEQL(
    input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return this.getGoogleShoppingResults(input, "mr:1,merchagg:m764640149");
  }

  async oco(
    input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return this.getGoogleShoppingResults(input, "mr:1,merchagg:m134397367");
  }

  async uniqlo(
    input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return this.getGoogleShoppingResults(
      input,
      "mr:1,merchagg:g10415709|m228577309",
    );
  }

  /**
   * 상품이 안나오는 것들이 있어서 보류.
   */
  // async wconcept(
  //   input: IGoogleShopping.IRequestStandAlone,
  // ): Promise<IGoogleShopping.IResponse[]> {
  //   return this.getGoogleShoppingResults(input, "mr:1,merchagg:m118597626")
  // }

  /**
   * 생필품 카테고리
   */
  async coupang(
    input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return this.getGoogleShoppingResults(
      input,
      "mr:1,merchagg:g139180266|m139321488",
    );
  }

  async marketKurly(
    input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return this.getGoogleShoppingResults(input, "mr:1,merchagg:m128922144");
  }

  async iherb(
    input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return this.getGoogleShoppingResults(input, "mr:1,merchagg:m169620201");
  }

  async aliExpress(
    input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return this.getGoogleShoppingResults(
      input,
      "mr:1,merchagg:g6802718|m5356299783|m5348983679|m5345522195|m5349919702",
    );
  }

  /**
   * 화장품 카테고리
   */
  async oliveYoung(
    input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return this.getGoogleShoppingResults(
      input,
      "mr:1,merchagg:g651998268|m117387471",
    );
  }

  /**
   * 인테리어 카테고리
   */
  async todayHouse(
    input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return this.getGoogleShoppingResults(input, "mr:1,merchagg:m133751878");
  }

  /**
   * 도서 카테고리
   */
  async yes24(
    input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    const extractInputKeywords = [
      "윤석열",
      "한덕수",
      "이종섭",
      "추경호",
      "박진",
      "김기현",
      "이재명",
      "주호영",
      "박광온",
      "김건희",
      "심상정",
      "문재인",
      "박근혜",
      "이명박",
      "안철수",
      "홍준표",
      "오세훈",
      "유승민",
      "김동연",
      "이낙연",
      "원희룡",
      "나경원",
      "이준석",
      "박영선",
      "하태경",
      "조국",
      "유시민",
      "박용진",
      "장혜영",
      "국민의힘",
      "더불어민주당",
      "정의당",
      "새누리당",
      "김정은",
      "한나라당",
      "민주당",
      "추미애",
      "윤미향",
      "송영길",
      "민형배",
    ];
    const normalizedKeyword = input.keyword.trim();
    const isSensitiveKeyword = extractInputKeywords.some((keyword) =>
      normalizedKeyword.includes(keyword),
    );

    if (isSensitiveKeyword) {
      throw new BadRequestException(
        `Contains sensitive keyword: ${input.keyword}`,
      );
    }
    return this.getGoogleShoppingResults(input, "mr:1,merchagg:m534059966");
  }

  async aladine(
    input: IGoogleShopping.IRequestStandAlone,
  ): Promise<IGoogleShopping.IResponse[]> {
    return this.getGoogleShoppingResults(input, "mr:1,merchagg:m139753761");
  }
}
