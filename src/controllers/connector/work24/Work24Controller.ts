import core from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IWork24 } from "@wrtn/connector-api/lib/structures/connector/work24/IWork24";

import { Work24Provider } from "../../../providers/connector/work24/Work24Provider";

@Controller("connector/work24")
export class Work24Controller {
  @core.TypedRoute.Get("job-openings")
  async getJobOpenings(
    input: IWork24.IGetJobOpeningInput,
  ): Promise<IWork24.IGetJobOpeningOutput> {
    return Work24Provider.getJobOpenings(input);
  }
}
