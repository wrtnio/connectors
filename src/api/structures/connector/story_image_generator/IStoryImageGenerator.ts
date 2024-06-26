/**
 * @title  이미지 생성을 위한 입력.
 */
export interface IGenerateStoryImageInput {
  /**
   * 이미지를 생성할 스토리.
   *
   * @title 이미지를 생성할 스토리.
   */
  storyLine: string;

  /**
   * 이전에 있었던 스토리들.
   *
   * @title 이전 스토리들.
   */
  previousStories: string[];
}

export interface IStoryImage {
  /**
   * 생성된 이미지 URL입니다.
   *
   * @title 이미지 URL.
   */
  imageUrl: string;
}
