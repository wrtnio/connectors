/**
 * @title Input for image generation
 */
export interface IGenerateStoryImageInput {
  /**
   * The story to create the image for.
   *
   * @title The story to create the image for
   */
  storyLine: string;

  /**
   * Previous stories.
   *
   * @title Previous stories
   */
  previousStories: string[];
}

export interface IStoryImage {
  /**
   * Generated image URL.
   *
   * @title Image URL
   */
  imageUrl: string;
}
