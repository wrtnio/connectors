import { TypedBody, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ISimilarweb } from "@wrtn/connector-api/lib/structures/connector/similarweb/ISimilarweb";
import { SimilarwebProvider } from "../../../providers/connector/similarweb/SimilarwebProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/similarweb")
export class SimilarwebController {
  constructor(private readonly similarwebProvider: SimilarwebProvider) {}

  @TypedRoute.Post("get-domain-info")
  async getDomainInfo(
    @TypedBody() input: ISimilarweb.IGetDomainInfoInput,
  ): Promise<ISimilarweb.IGetDomainInfoOutput> {
    return retry(() => this.similarwebProvider.getDomainInfo(input))();
  }
}
