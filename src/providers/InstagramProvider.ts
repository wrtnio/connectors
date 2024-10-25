import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class InstagramProvider {
  async getInstagramData(input: any) {
    const res = await axios.get('https://api.instagram.com/v1/users/self', {
      params: { access_token: input.accessToken }
    });
    return res.data;
  }
}
