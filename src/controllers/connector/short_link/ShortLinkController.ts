import { HumanRoute, TypedBody, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";

import { retry } from "../../../utils/retry";
import { IShortLink } from "@wrtn/connector-api/lib/structures/connector/short_link/IShortLink";
import { ShortLinkProvider } from "../../../providers/connector/short_link/ShortLinkProvider";

@Controller("connector/short-link")
export class ShortLinkController {
  constructor(private readonly shortLinkProvider: ShortLinkProvider) {}

  /**
   * @internal
   */
  @HumanRoute()
  @TypedRoute.Post("create")
  async createShortLink(
    @TypedBody() input: IShortLink.IRequest,
  ): Promise<IShortLink.IResponse> {
    return retry(() => this.shortLinkProvider.createShortLink(input))();
  }
}
