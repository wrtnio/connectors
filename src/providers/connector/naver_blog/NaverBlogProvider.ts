import axios from "axios";

import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { INaverBlog } from "@wrtn/connector-api/lib/structures/connector/naver_blog/INaverBlog";

export namespace NaverBlogProvider {
  const headers = () => ({
    "X-Naver-Client-Id": ConnectorGlobal.env.NAVER_CLIENT_ID,
    "X-Naver-Client-Secret": ConnectorGlobal.env.NAVER_CLIENT_SECRET,
  });

  export async function getBlog(
    input: INaverBlog.INaverKeywordInput,
  ): Promise<INaverBlog.IBlogNaverOutput> {
    try {
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
      const res = await axios.get(
        `https://openapi.naver.com/v1/search/blog.json?query=${query}&sort=${sort}&display=${display}`,
        {
          headers: headers(),
        },
      );

      return res.data;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
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
