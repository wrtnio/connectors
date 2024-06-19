import typia from "typia";

import CApi from "@wrtn/connector-api";
import { IPrompt } from "@wrtn/connector-api/lib/structures/connector/prompt/IPrompt";

export const test_api_connector_prompt = async (
  connection: CApi.IConnection,
) => {
  const requestBody: IPrompt.IRequest = {
    user_request:
      "이메일 제목: 파티 초대, 이메일 내용: 뤼튼 20주년 파티에 초대합니다. 이메일 제목과 이메일 내용을 보고 답장을 생성해줘.",
  };
  const output = await CApi.functional.connector.prompt.generate(
    connection,
    requestBody,
  );
  typia.assertEquals<IPrompt.IResponse>(output);
};
