import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, SelectBenchmark } from "@wrtnio/decorators";

import { ApiTags } from "@nestjs/swagger";
import { retry } from "../../../utils/retry";
import { IDaumBlog } from "@wrtn/connector-api/lib/structures/connector/daum_blog/IDaumBlog";
import { DaumBlogProvider } from "../../../providers/connector/daum_blog/DaumBlogProvider";

@Controller("connector/daum-blog")
export class DaumBlogController {
  /**
   * Search the following blog content
   *
   * @summary Search the following blog
   * @param input Conditions for searching the following blog
   */
  @SelectBenchmark("다음 블로그 검색 해줘")
  @core.TypedRoute.Patch("")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/daum.svg",
  )
  @ApiTags("Daum Blog")
  async searchBlog(
    @core.TypedBody() input: IDaumBlog.ISearchInput,
  ): Promise<IDaumBlog.IBlogOutput> {
    return retry(() => DaumBlogProvider.search(input))();
  }
}
