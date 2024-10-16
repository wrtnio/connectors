import { Controller } from "@nestjs/common";
import { ICrunchbase } from "@wrtn/connector-api/lib/structures/connector/crunchbase/ICrunchbase";
import { CrunchbaseProvider } from "../../../providers/connector/crunchbase/CrunchbaseProvider";

@Controller("connector/crunchbase")
export class CrunchbaseController {
  constructor(private readonly crunchbaseProvider: CrunchbaseProvider) {}

  async getOrganizationData(
    input: ICrunchbase.IGetOrganizationDataInput,
  ): Promise<ICrunchbase.CrunchbaseResponse> {
    return this.crunchbaseProvider.getOrganizationData(input);
  }

  async autocomplete(
    input: ICrunchbase.IAutocompleteInput,
  ): Promise<ICrunchbase.IAutocompleteOutput> {
    return this.crunchbaseProvider.autocomplete(input);
  }
}
