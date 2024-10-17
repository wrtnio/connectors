import { TypedBody, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ICrunchbase } from "@wrtn/connector-api/lib/structures/connector/crunchbase/ICrunchbase";
import { CrunchbaseProvider } from "../../../providers/connector/crunchbase/CrunchbaseProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/crunchbase")
export class CrunchbaseController {
  constructor(private readonly crunchbaseProvider: CrunchbaseProvider) {}

  /**
   * Inquire corporate information
   *
   * A company's information includes a brief introduction to the company and on-mark rankings, industry groups, social media, websites, funding information including funding amounts and rounds, contacts, similar services, and competitors.
   * In addition to that, the company can acquire all the overall information, including the number of articles and employees mentioned, and the list of founders.
   *
   * @summary Get Organization Data from crunchbase
   */
  @TypedRoute.Post("get-organization-data")
  async getOrganizationData(
    @TypedBody() input: ICrunchbase.IGetOrganizationDataInput,
  ): Promise<ICrunchbase.CrunchbaseResponse> {
    return retry(() => this.crunchbaseProvider.getOrganizationData(input))();
  }

  /**
   * Search for company name and auto-completion
   *
   * Search and auto-completion capabilities to get unique identifiers for querying accurate company names and company information.
   * Use your natural language search to explore if you have a similar company name.
   *
   * @summary Search for company name and auto-completion
   */
  @TypedRoute.Post("auto-complete")
  async autocomplete(
    @TypedBody() input: ICrunchbase.IAutocompleteInput,
  ): Promise<ICrunchbase.IAutocompleteOutput> {
    return retry(() => this.crunchbaseProvider.autocomplete(input))();
  }
}
