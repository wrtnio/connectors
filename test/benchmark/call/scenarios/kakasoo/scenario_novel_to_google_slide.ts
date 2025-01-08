import { IFunctionCallBenchmarkScenario } from "../../structures/IFunctionCallBenchmarkScenario";
import { scenario_google_slide_operations } from "../internal/scenario_google_slide_operations";

export const scenario_novel_to_google_slide =
  (): IFunctionCallBenchmarkScenario => ({
    title: "Google Slide 소설 쓰기",
    prompt: `
    구글 슬라이드에 소설을 써줘. 
    
    내용은 1984와 달과 6펜스를 적절히 섞어서 10줄씩 쓰되 4페이지의 슬라이드를 작성해야 해. 
    
    각 페이지는 삽화가 필요하니까 너가 이미지를 생성해.
  `,
    expected: scenario_google_slide_operations(),
  });
