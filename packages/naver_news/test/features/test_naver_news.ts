import {
  INaverNewsService,
  NaverNewsService,
} from "@wrtnlabs/connector-naver-news";
import typia from "typia";
import { TestGlobal } from "../TestGlobal";

export const test_read_news_naver =
  async (): Promise<INaverNewsService.INewsNaverOutput> => {
    const naverNewsService = new NaverNewsService({
      clientId: TestGlobal.env.NAVER_CLIENT_ID,
      clientSecret: TestGlobal.env.NAVER_CLIENT_SECRET,
    });

    const input: INaverNewsService.INaverKeywordInput = {
      andKeywords: "뤼튼",
    };
    const result = await naverNewsService.getNews(input);
    typia.assert(result);
    return result;
  };
