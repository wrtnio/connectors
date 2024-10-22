export namespace IDropbox {
  export interface IUploadFileInput {
    /** 
     * @title Access Token
     * 
     * The access token for Dropbox API authentication.
     */
    accessToken: string;

    /** 
     * @title File Path
     * 
     * The path where the file will be uploaded in Dropbox.
     */
    path: string;

    /** 
     * @title File Content
     * 
     * The content of the file to be uploaded.
     */
    content: Buffer;
  }

  export interface IUploadFileOutput {
    /** 
     * @title File Metadata
     * 
     * Metadata of the uploaded file.
     */
    metadata: any;
  }
}