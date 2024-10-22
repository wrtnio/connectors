import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IDropbox } from '../api/structures/connector/dropbox/IDropbox';

@Injectable()
export class DropboxProvider {
  async uploadFile(input: IDropbox.IUploadFileInput): Promise<IDropbox.IUploadFileOutput> {
    const res = await axios.post('https://api.dropboxapi.com/2/files/upload', input, {
      headers: {
        'Authorization': `Bearer ${input.accessToken}`,
        'Content-Type': 'application/octet-stream',
        'Dropbox-API-Arg': JSON.stringify({
          path: input.path,
          mode: 'add',
          autorename: true,
          mute: false
        })
      }
    });
    return res.data;
  }
}
