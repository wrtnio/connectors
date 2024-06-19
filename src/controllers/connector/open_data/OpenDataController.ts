import { TypedBody, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IOpenData } from "@wrtn/connector-api/lib/structures/connector/open_data/IOpenData";

import { OpenDataProvider } from "../../../providers/connector/open_data/OpenDataProvider";

@Controller("connector/open-data")
export class OpenDataController {
  @TypedRoute.Post("getShortTermForecast")
  async getShortTermForecast(
    @TypedBody()
    input: IOpenData.IKoreaMeteorologicalAdministration.IGetVillageForecastInformationInput,
  ): Promise<IOpenData.IKoreaMeteorologicalAdministration.IGetVillageForecastInformationOutput> {
    return OpenDataProvider.getShortTermForecast(input);
  }
}
