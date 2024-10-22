import { Controller } from '@nestjs/common';
import { DropboxProvider } from '../providers/dropbox/DropboxProvider';
import { IDropbox } from '../api/structures/connector/dropbox/IDropbox';

@Controller()
class DropboxController {
  constructor(private readonly dropboxProvider: DropboxProvider) {}

  /**
   * Upload a file to Dropbox.
   *
   * This connector uploads a file to the user's Dropbox account.
   *
   * @summary Upload File to Dropbox
   */
  @core.TypedRoute.Post("upload-file")
  async uploadFile(
    @TypedBody() input: IDropbox.IUploadFileInput,
  ): Promise<IDropbox.IUploadFileOutput> {
    return this.dropboxProvider.uploadFile(input);
  }
}
