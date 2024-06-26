import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IStoryImage } from "@wrtn/connector-api/lib/structures/connector/story_image_generator/IStoryImageGenerator";

/**
 * Do not run in `npm run test` since actual calls to OpenAI are made and they are expensive and slow
 */
export async function test_api_story_image(
  connection: CApi.IConnection,
): Promise<IStoryImage> {
  const result =
    await CApi.functional.connector.story_image_generator.generateImage(
      connection,
      {
        storyLine: "옛날 옛적에 한 공주가 살았어요.",
        previousStories: [],
      },
    );
  typia.assert(result);
  console.log(result);
  return result;
}
