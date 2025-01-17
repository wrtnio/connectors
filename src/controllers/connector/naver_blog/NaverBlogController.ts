import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { ApiTags } from "@nestjs/swagger";
import { retry } from "../../../utils/retry";
import { INaverBlog } from "@wrtn/connector-api/lib/structures/connector/naver_blog/INaverBlog";
import { NaverBlogProvider } from "../../../providers/connector/naver_blog/NaverBlogProvider";

@Controller("connector/naver-blog")
export class NaverBlogController {
  /**
   * Search Naver blog content
   *
   * @summary Naver blog search
   * @param input Conditions for Naver blog search
   */
  @core.TypedRoute.Patch("")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icons/naver_blog.svg",
  )
  @ApiTags("Naver Blog")
  async blogList(
    @core.TypedBody() input: INaverBlog.INaverKeywordInput,
  ): Promise<INaverBlog.IBlogNaverOutput> {
    return retry(() => NaverBlogProvider.getBlog(input))();
  }
}
