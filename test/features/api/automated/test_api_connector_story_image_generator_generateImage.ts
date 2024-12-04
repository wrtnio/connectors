import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type {
  IGenerateStoryImageInput,
  IStoryImage,
} from "../../../../src/api/structures/connector/story_image_generator/IStoryImageGenerator";

export const test_api_connector_story_image_generator_generateImage = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IStoryImage> =
    await api.functional.connector.story_image_generator.generateImage(
      connection,
      typia.random<IGenerateStoryImageInput>(),
    );
  typia.assert(output);
};
