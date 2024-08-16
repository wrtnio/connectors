import { Controller } from "@nestjs/common";
import { GithubProvider } from "../../../providers/connector/github/GithubProvider";

@Controller("connector/github")
export class GithubController {
  constructor(private readonly githubProvider: GithubProvider) {}
}
