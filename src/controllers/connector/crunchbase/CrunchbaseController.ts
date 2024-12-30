import { TypedBody, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ICrunchbase } from "@wrtn/connector-api/lib/structures/connector/crunchbase/ICrunchbase";
import { RouteIcon, SelectBenchmark } from "@wrtnio/decorators";
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
  @SelectBenchmark("회사 정보 좀 찾아줘")
  @SelectBenchmark("스타트업 정보 좀 찾아줘")
  @SelectBenchmark("회사 투자 라운드 좀 알려줘")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/crunchbase_full.svg",
  )
  @TypedRoute.Patch("get-organization-data")
  async getOrganizationData(
    @TypedBody() input: ICrunchbase.IGetOrganizationDataInput,
  ): Promise<ICrunchbase.CrunchbaseResponse> {
    return retry(
      () => this.crunchbaseProvider.getOrganizationData(input),
      10,
    )();
  }

  /**
   * Search for company name and auto-completion
   *
   * Search and auto-completion capabilities to get unique identifiers for querying accurate company names and company information.
   * Use your natural language search to explore if you have a similar company name.
   * A company called 'Wrtn Technologies(뤼튼 테크놀로지스)' can search with a unique identifier called 'wrtn-technologies'.
   * If the person attempting to search for the 'Wrtn Technologies(뤼튼 테크놀로지스)' fails to call this connector, the above 'wrtn-technologies' may be used as is.
   *
   * @summary Search for company name and auto-completion
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/crunchbase_full.svg",
  )
  @TypedRoute.Patch("auto-complete")
  async autocomplete(
    @TypedBody() input: ICrunchbase.IAutocompleteInput,
  ): Promise<ICrunchbase.IAutocompleteOutput> {
    return retry(() => this.crunchbaseProvider.autocomplete(input), 10)();
  }
}
