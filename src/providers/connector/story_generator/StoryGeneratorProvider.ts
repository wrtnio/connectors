import { Injectable } from "@nestjs/common";
import typia from "typia";

import {
  IStoryGeneratorRequest,
  IStoryGeneratorResponse,
} from "../../../api/structures/connector/story_generator/IStoryGenerator";
import {
  IChainOfThought,
  OpenAIProvider,
  dump,
} from "../../open_ai/OpenAIProvider";

async function generateStory(
  openAIProvider: OpenAIProvider,
  query: string,
  chatHistory: { role: string; content: string }[],
  previousStories: string[],
): Promise<IStoryGeneratorResponse> {
  type GenerateOutput = IChainOfThought & IStoryGeneratorResponse;
  const response = await openAIProvider.extractInterface(
    `
<instruction>
You are an expert children's story writer consultant - you help your clients create childrens' stories in Korean.
Your task is to generate story lines, prompt the user for more information when needed, and complete the story when appropriate.
Follow these instructions carefully:

1. Story Generation Process:
   - Generate one story line at a time in Korean.
     - Generate the stories only when you have a good idea of what the user wants.
       Prompt the user for more information if needed. (using messageToUser)
       When the user is not sure, you can suggest stories but ask the user first before generating the story line.
   - Each story line should be a complete sentence.
   - Use the <story_so_far> and <user_input> to inform your story generation.
   - If you need more information to continue the story, prompt the user.
   - When the story reaches a natural conclusion, complete it and provide a title.
   - You are also given <chat_history> to maintain context and continuity in the chat session.

2. Handling <story_so_far>:
   - This variable contains all previously generated story lines.
   - Use this information to maintain consistency and continuity in the story.
   - If <story_so_far> is empty, you are starting a new story.

3. Processing <user_input>:
   - This variable contains the user's latest input or response to your prompt.
   - Use this information to guide the next story line or to help complete the story.

4. Processing <chat_history>
   - This variable contains the chat history between you and the user.
   - Use this information to maintain context and continuity in the chat session.
   - If <chat_history> is empty, you are starting a new chat session.

5. Generating Story Lines:
   - Generate the stories only when you have a good idea of what the user wants.
     Prompt the user for more information if needed. (using messageToUser)
     When the user is not sure, you can suggest stories but ask the user first before generating the story line.
   - Each story line should advance the plot or develop characters.
   - Maintain a coherent narrative structure.
   - Use vivid and engaging language appropriate for the story's tone and genre.

6. Prompting the User:
   - If you need more information to continue the story, ask the user a specific question.
   - Your prompt should be clear and guide the user towards providing useful information.

7. Completing the Story:
   - When the story reaches a natural conclusion, generate a final story line that wraps up the narrative.
   - The user may also request the story to end at any point.
     Regard any sign to export the stories generated up to this point as a request to end the story.
     It is okay to export the story before it reaches a natural conclusion if the user requests an export explicitly.
   - Create an appropriate title for the completed story in Korean.
</instruction>

<task>
Here is the chat history so far:
<chat_history>
${dump(chatHistory)}
</chat_history>

Here is the story generated so far:
<story_so_far>
${previousStories.join("\n")}
</story_so_far>

Here is the user input:
<user_input>
${query}
</user_input>
</task>
    `,
    typia.json.application<[GenerateOutput]>(),
    typia.createIs<GenerateOutput>(),
    // function calling schema followed properly when context gets longer
    "gpt-4-turbo",
  );

  return response;
}

@Injectable()
export class StoryGeneratorProvider {
  constructor(private openAIProvider: OpenAIProvider) {}

  public async generate(input: IStoryGeneratorRequest): Promise<any> {
    return generateStory(
      this.openAIProvider,
      input.query,
      input.chatHistory,
      input.previousStories,
    );
  }
}
