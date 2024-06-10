import axios from "axios";
import cheerio from "cheerio";

import { INaver } from "@wrtn/connector-api/lib/structures/connector/naver/INaver";

import { ConnectorGlobal } from "../../../ConnectorGlobal";

export namespace NaverProvider {
  const headers = () => ({
    "X-Naver-Client-Id": ConnectorGlobal.env.NAVER_CLIENT_ID,
    "X-Naver-Client-Secret": ConnectorGlobal.env.NAVER_CLIENT_SECRET,
  });

  export async function getCafe(
    input: INaver.INaverKeywordInput,
  ): Promise<INaver.ICafeNaverOutput> {
    const {
      andKeywords,
      orKeywords,
      notKeywords,
      display = 10,
      sort = "sim",
    } = input;
    const query = makeQuery(
      andKeywords.split(","),
      orKeywords?.split(",") ?? [],
      notKeywords?.split(",") ?? [],
    );
    try {
      const res = await axios.get(
        `https://openapi.naver.com/v1/search/cafearticle.json?query=${query}&sort=${sort}&display=${display}`,
        {
          headers: headers(),
        },
      );

      return { data: res.data };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  export async function getBlog(
    input: INaver.INaverKeywordInput,
  ): Promise<INaver.IBlogNaverOutput> {
    const {
      andKeywords,
      orKeywords,
      notKeywords,
      display = 10,
      sort = "sim",
    } = input;
    const query = makeQuery(
      andKeywords.split(","),
      orKeywords?.split(",") ?? [],
      notKeywords?.split(",") ?? [],
    );
    try {
      const res = await axios.get(
        `https://openapi.naver.com/v1/search/blog.json?query=${query}&sort=${sort}&display=${display}`,
        {
          headers: headers(),
        },
      );

      return res.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  export async function getBlogDetail(
    input: INaver.INaverBlogInput,
  ): Promise<INaver.INaverBlogOutput> {
    const { blogUrl } = input;
    // 결과를 INaverBlogOutput 형식으로 반환
    const result: INaver.INaverBlogOutput = {
      result: "",
    };

    try {
      // 블로그 페이지 가져오기
      const { data } = await axios.get(blogUrl);
      const $ = cheerio.load(data);

      // 본문 내용이 포함된 iframe의 src 추출
      const iframeSrc = $("#mainFrame").attr("src");
      if (!iframeSrc) {
        result["result"] = "Cannot find iframe source";
        // throw new Error("Cannot find iframe source");
      }

      // iframe 페이지 가져오기
      const iframeUrl = `https://blog.naver.com${iframeSrc}`;
      const iframeResponse = await axios.get(iframeUrl);
      const $$ = cheerio.load(iframeResponse.data);

      // 본문 내용 추출
      const content = $$(".se-main-container").html();
      if (!content) {
        result["result"] = "Cannot find blog content";
        // throw new Error("Cannot find blog content");
      } else {
        result["result"] = content;
      }

      return result;
    } catch (error) {
      // @ts-ignore
      result["result"] = error.message;
      return result;
    }
  }

  function makeQuery(
    andKeywords: string[],
    orKeywords: string[],
    notKeywords: string[],
  ) {
    let s = "";

    for (const ok of orKeywords) {
      s += `${ok} `;
    }

    for (const ak of andKeywords) {
      if (ak.includes(" ")) {
        s += `+"${ak}" `;
      } else {
        s += `+${ak} `;
      }
    }

    for (const nk of notKeywords) {
      if (nk.includes(" ")) {
        s += `-"${nk}" `;
      } else {
        s += `-${nk} `;
      }
    }

    return s;
  }
}
