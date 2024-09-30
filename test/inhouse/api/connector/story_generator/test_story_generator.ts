import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

export async function test_api_story_generator(
  connection: CApi.IConnection,
): Promise<any> {
  const generated = await CApi.functional.connector.story_generator.generate(
    connection,
    {
      query: "공주와 공룡이 나오는 이야기 만들어줘.",
      chatHistory: [],
      previousStories: [],
    },
  );
  typia.assert(generated);
  return generated;
}
