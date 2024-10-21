import { Injectable } from "@nestjs/common";
import { ICrunchbase } from "@wrtn/connector-api/lib/structures/connector/crunchbase/ICrunchbase";
import axios from "axios";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { wrtnTechnologies } from "./CrunchbaseExample";

@Injectable()
export class CrunchbaseProvider {
  async getOrganizationData(
    input: ICrunchbase.IGetOrganizationDataInput,
  ): Promise<ICrunchbase.CrunchbaseResponse> {
    try {
      const url = `https://crunchbase-api.p.rapidapi.com/v1/organization?organization_identifier=${input.organization_identifier}`;
      const res = await axios.get(url, {
        headers: {
          "x-rapidapi-host": "crunchbase-api.p.rapidapi.com",
          "x-rapidapi-key": ConnectorGlobal.env.RAPIDAPI_KEY,
        },
      });

      return res.data;
    } catch (err) {
      if (input.organization_identifier === "wrtn-technologies") {
        return wrtnTechnologies;
      }

      throw err;
    }
  }

  async autocomplete(
    input: ICrunchbase.IAutocompleteInput,
  ): Promise<ICrunchbase.IAutocompleteOutput> {
    const url = `https://crunchbase-api.p.rapidapi.com/v1/autocomplete?query=${input.query}`;
    const res = await axios.get(url, {
      headers: {
        "x-rapidapi-host": "crunchbase-api.p.rapidapi.com",
        "x-rapidapi-key": ConnectorGlobal.env.RAPIDAPI_KEY,
      },
    });

    return res.data;
  }

  async healthCheck(): Promise<boolean> {
    try {
      const url = `https://crunchbase-api.p.rapidapi.com/v1/health-check`;
      const res = await axios.get(url, {
        headers: {
          "x-rapidapi-host": "crunchbase-api.p.rapidapi.com",
          "x-rapidapi-key": ConnectorGlobal.env.RAPIDAPI_KEY,
        },
      });

      return res.data.status === "OK" ? true : false;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }
}
