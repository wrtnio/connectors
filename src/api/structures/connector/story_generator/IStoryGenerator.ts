export interface IStoryGeneratorRequest {
  query: string;
  chatHistory: { role: string; content: string }[];
  previousStories: string[];
}

// function call doesn't seem to accept `oneOf` so use the merged type directly
// Invalid schema for function 'GenerateOutput': schema must be a JSON Schema of 'type: "object"', got 'type: "None"'.
/**
 * Story has reached end and ready to be outputted.
 * Come up with a title that fits the story you've written.
 */
//interface CompletedFullStoryOutput {
//done: true;
/**
 * Must be in Korean.
 */
//title: string;
//}

/**
 * The next story line has been generated.
 * Each story line should be a sentence.
 */
//interface CompletedStoryLineOutput {
//done: false;
/**
 * Must be in Korean.
 */
//storyLine: string;
//}

/**
 * When there is not enough information to create the next story line, prompt the user for more information.
 */
//interface PromptUserOutput {
//done: false;
//messageToUser: string;
//}

//type IStoryGeneratorOutput =
//| CompletedFullStoryOutput
//| CompletedStoryLineOutput
//| PromptUserOutput;

export interface IStoryGeneratorResponse {
  /**
   * Whether the story has reached a natural conclusion and is ready to be outputted.
   */
  done: boolean;

  /**
   * When there is not enough information to create the next story line, prompt the user for more information.
   */
  messageToUser?: string;

  /**
   * If the next story line can be generated, provide it here.
   * Only generate the story when you have a good idea of what the user wants.
   * When the user is not sure, you can suggest stories but ask the user first before generating the story line.
   */
  storyLine?: string;

  /**
   * If the entire story has been generated, provide the title here.
   */
  title?: string;
}
