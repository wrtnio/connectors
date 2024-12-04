import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type { IKeywordExtraction } from "../../../../src/api/structures/connector/extract/IKeywordExtractor";

export const test_api_connector_extract_keyword_extractKeyword = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IKeywordExtraction.IExtractKeywordOutput> =
    await api.functional.connector.extract.keyword.extractKeyword(
      connection,
      typia.random<IKeywordExtraction.IExtractKeywordInput>(),
    );
  typia.assert(output);
};
