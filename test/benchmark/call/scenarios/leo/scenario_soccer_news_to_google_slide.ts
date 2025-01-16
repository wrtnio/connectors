import { NaverNewsController } from "../../../../../src/controllers/connector/naver_news/NaverNewsController";
import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";
import { scenario_google_slide_operations } from "../internal/scenario_google_slide_operations";

export const scenario_soccer_news_to_google_slide =
  (): IFunctionCallBenchmarkScenario => ({
    title: "축구 뉴스 (구글 슬라이드)",
    prompt: `
축구협회 키워드로 네이버뉴스에서 최신순으로 뉴스를 검색해서 
10개를 구글 슬라이드에 정리해줘.`,
    expected: {
      type: "array",
      items: [
        {
          type: "standalone",
          function: NaverNewsController.prototype.newsList,
        },
        ...scenario_google_slide_operations().items,
      ],
    },
  });
