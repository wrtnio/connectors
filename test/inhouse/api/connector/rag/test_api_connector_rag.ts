import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { FileType, IRag } from "@wrtn/connector-api/lib/structures/connector/rag/IRag";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_rag = async (connection: CApi.IConnection) => {
  const analyzeInput: IRag.IAnalyzeInput = {
    fileUrls: [`https://${ConnectorGlobal.env.AWS_S3_BUCKET}.s3.ap-northeast-2.amazonaws.com/2308.13921.pdf`],
    fileType: FileType.PDF,
  };
  const analyzeOutput = await CApi.functional.connector.rag.analyze(connection, analyzeInput);
  typia.assertEquals(analyzeOutput);

  const generateInput: IRag.IGenerateInput = {
    docId: analyzeOutput.data.docId,
    query: "요약해줘",
  };
  const generateOutput = await CApi.functional.connector.rag.generate.generateChat(connection, generateInput);
  typia.assertEquals(generateOutput);
};
