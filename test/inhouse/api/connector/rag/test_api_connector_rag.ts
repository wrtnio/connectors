import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import {
  FileType,
  IRag,
} from "@wrtn/connector-api/lib/structures/connector/rag/IRag";

// import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_rag = async (connection: CApi.IConnection) => {
  /**
   * Pdf 형식
   */
  const analyzeInput: IRag.IAnalyzeInput = {
    fileUrl: `https://studio-api-bucket.s3.ap-northeast-2.amazonaws.com/2308.13921.pdf`,
    fileType: FileType.PDF,
  };
  const analyzeOutput = await CApi.functional.connector.rag.analyze(
    connection,
    analyzeInput,
  );
  typia.assertEquals<IRag.IAnalysisOutput>(analyzeOutput);

  const generateInput: IRag.IGenerateInput = {
    query: "NOSQL의 단점을 알려줘",
  };
  const chatId = analyzeOutput.chatId;
  const generateOutput = await CApi.functional.connector.rag.generate(
    connection,
    generateInput,
    chatId,
  );
  console.log("gen output", generateOutput);
  typia.assertEquals<IRag.IGenerateOutput>(generateOutput);

  /**
   * docx 형식
   */

  /**
   * hwp 형식
   */

  /**
   * text 형식
   */
};
