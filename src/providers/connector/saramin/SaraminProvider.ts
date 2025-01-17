import { Injectable } from "@nestjs/common";

import { IGoogleSearch } from "@wrtn/connector-api/lib/structures/connector/google_search/IGoogleSearch";

import { GoogleSearchProvider } from "../google_search/GoogleSearchProvider";

@Injectable()
export class SaraminProvider {
  constructor(private readonly googleSearchProvider: GoogleSearchProvider) {}
  async search(
    input: IGoogleSearch.IRequest,
  ): Promise<IGoogleSearch.IResponse[]> {
    return await this.googleSearchProvider.searchResult(
      input,
      "https://www.saramin.co.kr/zf_user",
    );
  }
}
