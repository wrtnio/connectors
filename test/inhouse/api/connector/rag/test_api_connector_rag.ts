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
  ];
  const analyzePdf = await CApi.functional.connector.rag.analyze(
    connection,
    analyzePdfInput,
  );
  typia.assertEquals<IRag.IAnalysisOutput>(analyzePdf);

  // const generateInput: IRag.IGenerateInput = {
  //   query:
  //     "지구 온난화 (열 스트레스)와 미세플라스틱이 다양한 산호초 종에 미치는 세 가지 실험내용을 요약 분석해 줘",
  // };
  // const chatId = analyzePdf.chatId;
  // const generatePdfOutput = await CApi.functional.connector.rag.generate(
  //   connection,
  //   generateInput,
  //   chatId,
  // );
  // typia.assertEquals<IRag.IGenerateOutput>(generatePdfOutput);

  // /**
  //  * docx 형식
  //  */
  // const analyzeDocxInput: IRag.IAnalyzeInput[] = [
  //   {
  //     fileUrl: `https://studio-api-bucket.s3.ap-northeast-2.amazonaws.com/rag-test-2.pdf`,
  //     fileType: "docx",
  //   },
  // ];
  // const analyzeDocx = await CApi.functional.connector.rag.analyze(
  //   connection,
  //   analyzeDocxInput,
  // );
  // typia.assertEquals<IRag.IAnalysisOutput>(analyzeDocx);

  // const generateDocxOutput = await CApi.functional.connector.rag.generate(
  //   connection,
  //   generateInput,
  //   chatId,
  // );
  // typia.assertEquals<IRag.IGenerateOutput>(generateDocxOutput);

  // /**
  //  * hwp 형식
  //  */
  // const analyzeHwpInput: IRag.IAnalyzeInput[] = [
  //   {
  //     fileUrl: `https://studio-api-bucket.s3.ap-northeast-2.amazonaws.com/rag-test-2.pdf`,
  //     fileType: "hwp",
  //   },
  // ];
  // const anaylzeHwp = await CApi.functional.connector.rag.analyze(
  //   connection,
  //   analyzeHwpInput,
  // );
  // typia.assertEquals<IRag.IAnalysisOutput>(anaylzeHwp);

  // const generateHwpoutput = await CApi.functional.connector.rag.generate(
  //   connection,
  //   generateInput,
  //   chatId,
  // );
  // typia.assertEquals<IRag.IGenerateOutput>(generateHwpoutput);

  // /**
  //  * text 형식
  //  */
  // const analyzeTextInput: IRag.IAnalyzeInput[] = [
  //   {
  //     fileUrl: `https://studio-api-bucket.s3.ap-northeast-2.amazonaws.com/rag-text-test.txt`,
  //     fileType: "txt",
  //   },
  // ];
  // const analyzeText = await CApi.functional.connector.rag.analyze(
  //   connection,
  //   analyzeTextInput,
  // );
  // typia.assertEquals<IRag.IAnalysisOutput>(analyzeText);

  // const generateTextInput: IRag.IGenerateInput = {
  //   query: "검색-증강 생성은 어떻게 작동해?",
  // };
  // const textChatId = analyzeText.chatId;
  // const generateTextOutput = await CApi.functional.connector.rag.generate(
  //   connection,
  //   generateTextInput,
  //   textChatId,
  // );
  // typia.assertEquals<IRag.IGenerateOutput>(generateTextOutput);
};
