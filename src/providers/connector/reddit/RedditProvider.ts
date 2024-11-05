import { Injectable } from "@nestjs/common";
import { IReddit } from "@wrtn/connector-api/lib/structures/connector/reddit/IReddit";
import axios from "axios";

@Injectable()
export class RedditProvider {
  async getHotPosts(
    input: IReddit.IGetHotPostsInput,
  ): Promise<IReddit.IGetHotPostsOutput> {
    const response = await axios.post(
      "https://www.reddit.com/api/v1/get-hot-posts",
      input,
    );
    return response.data;
  }
}
