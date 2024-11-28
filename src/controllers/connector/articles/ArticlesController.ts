import { Controller } from "@nestjs/common";
import { ArticlesProvider } from "../../../providers/connector/articles/ArticlesProvider";

@Controller("connector/articles")
export class ArticlesController {
  constructor(private readonly articlesProvider: ArticlesProvider) {}
}
