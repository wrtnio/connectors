import { TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IOpenData } from "@wrtn/connector-api/lib/structures/connector/open_data/IOpenData";

@Controller("connector/open-data")
export class OpenDataController {
  @TypedRoute.Post("getUltraSrtNcst")
  async getUltraSrtNcst(
    input: IOpenData.IKoreaMeteorologicalAdministration.IGetVillageForecastInformationInput,
  ): Promise<IOpenData.IKoreaMeteorologicalAdministration.IGetVillageForecastInformationOutput> {
    return null!;
  }
}
