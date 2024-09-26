import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IRag } from "@wrtn/connector-api/lib/structures/connector/rag/IRag";

export const test_api_connector_rag = async (connection: CApi.IConnection) => {
  const analyzeInput: IRag.IAnalyzeInput = {
    url: [
      `https://studio-api-bucket.s3.ap-northeast-2.amazonaws.com/rag-test-2.pdf`,
      `https://studio-api-bucket.s3.ap-northeast-2.amazonaws.com/rag-hwp-test.hwp`,
      "https://namu.wiki/w/%EC%98%AC%EB%A6%BC%ED%94%BD",
    ],
  };

  const analyzeOutput = await CApi.functional.connector.rag.analyze(
    connection,
    analyzeInput,
  );
  typia.assertEquals(analyzeOutput);

  const generateInput: IRag.IGenerateInput = {
    query:
      "지구 온난화(열 스트레스)와 미세플라스틱이 다양한 산호초 종에 미치는 세 가지 실험내용을 요약 분석해 줘. 그리고 대규모 언어 모델(LLM)의 맥락에서 오픈소스 소프트웨어의 국가별 다양화와 발전을 요약해줘. 각각의 비교를 할 때 대제목을 생성해줘.",
  };
  const chatId = analyzeOutput.chatId;
  const generateOutput = await CApi.functional.connector.rag.generate(
    connection,
    generateInput,
    chatId,
  );

  typia.assertEquals(generateOutput);
};

export const test_api_connector_rag_step_by_step = async (
  connection: CApi.IConnection,
) => {
  const res1 = await CApi.functional.connector.rag.analyze(connection, {
    url: [
      `https://studio-api-bucket.s3.ap-northeast-2.amazonaws.com/rag-test-2.pdf`,
    ],
  });
  typia.assertEquals(res1);

  const res2 = await CApi.functional.connector.rag.analyze(connection, {
    url: [
      `https://studio-api-bucket.s3.ap-northeast-2.amazonaws.com/rag-hwp-test.hwp`,
    ],
  });
  typia.assertEquals(res2);

  const res3 = await CApi.functional.connector.rag.analyze(connection, {
    url: [`https://namu.wiki/w/%EC%98%AC%EB%A6%BC%ED%94%BD`],
  });
  typia.assertEquals(res3);
};
