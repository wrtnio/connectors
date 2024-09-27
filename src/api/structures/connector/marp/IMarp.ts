export namespace IMarp {
  /**
   * @title Parameters for Marp conversion
   */
  export interface IConvertInput {
    /**
     * Marp markdown input string.
     *
     * @title Marp markdown
     */
    markdown: string;
  }

  /**
   * @title Marp conversion output
   */
  export interface IConvertOutput {
    /**
     * S3 link for the converted PPT.
     *
     * @title S3 link
     */
    s3Link: string;
  }
}
