import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../src/api";
import type {
  IStoryGeneratorRequest,
  IStoryGeneratorResponse,
} from "../../../../src/api/structures/connector/story_generator/IStoryGenerator";

export const test_api_connector_story_generator_generate = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IStoryGeneratorResponse> =
    await api.functional.connector.story_generator.generate(
      connection,
      typia.random<IStoryGeneratorRequest>(),
    );
  typia.assert(output);
};
