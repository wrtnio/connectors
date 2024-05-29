import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import axios, { AxiosError } from "axios";

import { IHwp } from "@wrtn/connector-api/lib/structures/connector/hwp/IHwp";

import { ConnectorGlobal } from "../../../ConnectorGlobal";

@Injectable()
export class HwpProvider {
  async parseHwp(input: IHwp.IParseInput): Promise<IHwp.IParseOutput> {
    try {
      const res = await axios.post(
        `${ConnectorGlobal.env.CONNECTOR_BRANCH_API_SERVER}/api/v1/hwp/parse`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return { text: res.data.data };
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data.statusCode === 400) {
          throw new BadRequestException(e.response?.data.message);
        }
        throw new InternalServerErrorException(e.response?.data.message);
      } else {
        throw e;
      }
    }
  }
}
