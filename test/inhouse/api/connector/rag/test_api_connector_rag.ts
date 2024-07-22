import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IRag } from "@wrtn/connector-api/lib/structures/connector/rag/IRag";

export const test_api_connector_rag = async (connection: CApi.IConnection) => {
  /**
   * Pdf 형식
   */
  const analyzePdfInput: IRag.IAnalyzeInput[] = [
    {
      fileUrl: `https://studio-api-bucket.s3.ap-northeast-2.amazonaws.com/rag-test-2.pdf`,
      fileType: "pdf",
    },
    {
      fileUrl: `https://studio-api-bucket.s3.ap-northeast-2.amazonaws.com/rag-test.pdf`,
      fileType: "pdf",
    },
  ];
  const analyzePdf = await CApi.functional.connector.rag.analyze(
    connection,
    analyzePdfInput,
  );
  typia.assertEquals<IRag.IAnalysisOutput>(analyzePdf);

  const generateInput: IRag.IGenerateInput = {
    query:
      "지구 온난화(열 스트레스)와 미세플라스틱이 다양한 산호초 종에 미치는 세 가지 실험내용을 요약 분석해 줘. 그리고 마이크로 플라스틱이 잎이 많은 식물의 생장에 미치는 영향을 분석 및 비교해줘. 각각의 비교를 할 때 대제목을 생성해줘.",
  };
  const chatId = analyzePdf.chatId;
  const generateOutput = await CApi.functional.connector.rag.generate(
    connection,
    generateInput,
    chatId,
  );
  console.log("result", generateOutput);
  typia.assertEquals<IRag.IGenerateOutput>(generateOutput);
};
