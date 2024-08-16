import { Injectable } from "@nestjs/common";
import { IGithub } from "@wrtn/connector-api/lib/structures/connector/github/IGithub";
import axios from "axios";

@Injectable()
export class GithubProvider {
  async searchUser(input: IGithub.ISearchUserInput) {
    const url = `https://api.github.com/search/users?q=${input.q}`;
    const res = await axios.get(url);
    return res.data;
  }
}
