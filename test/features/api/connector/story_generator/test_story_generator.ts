import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

export async function test_api_story_generator(
  connection: CApi.IConnection,
): Promise<any> {
  const generated = await CApi.functional.connector.story_generator.generate(
    connection,
    {
      query: "Once upon a time, there was a princess who lived in a castle.",
      chatHistory: [],
      previousStories: [],
    },
  );
  typia.assertEquals(generated);
  return generated;
}
