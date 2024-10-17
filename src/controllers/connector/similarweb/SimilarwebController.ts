import { TypedBody, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ISimilarweb } from "@wrtn/connector-api/lib/structures/connector/similarweb/ISimilarweb";
import { SimilarwebProvider } from "../../../providers/connector/similarweb/SimilarwebProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/similarweb")
export class SimilarwebController {
  constructor(private readonly similarwebProvider: SimilarwebProvider) {}

  /**
   * Retrieves domain information using the Similarweb API
   *
   * You can get all the traffic and various indicators for that domain.
   * Information available includes site name and description, traffic by country of access, visit/inflow information, inflow information by period, and ranking by global, country, and category.
   * In general, it can be used for investors' company analysis. In addition, it is also useful for marketers because the top keywords and Cpc values for each user can be known in advance.
   *
   * @summary Get Domain Info from similarweb
   * @param input - The input parameters containing the domain name to retrieve information for.
   * @returns A promise that resolves to the domain information output, including status and detailed data.
   */
  @TypedRoute.Post("get-domain-info")
  async getDomainInfo(
    @TypedBody() input: ISimilarweb.IGetDomainInfoInput,
  ): Promise<ISimilarweb.IGetDomainInfoOutput> {
    return retry(() => this.similarwebProvider.getDomainInfo(input))();
  }
}
