import { Injectable } from "@nestjs/common";
import { IInnoforest } from "@wrtn/connector-api/lib/structures/connector/innoforest/IInnoforest";
import axios from "axios";
import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { createQueryParameter } from "../../../utils/CreateQueryParameter";

@Injectable()
export class InnoforestProvider {
  async getcorp(
    input: IInnoforest.IGetcorpInput,
  ): Promise<IInnoforest.IGetcorpOutput> {
    try {
      const url = `seed/party/s1/getcorp` as const;
      const queryParameter = createQueryParameter(input);
      const res = await axios.get(`${url}?${queryParameter}`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": ConnectorGlobal.env.INNOFOREST_API_KEY,
        },
      });
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getcorpfinance(
    input: IInnoforest.IGetcorpfinanceInput,
  ): Promise<IInnoforest.IGetcorpfinanceOutput> {
    try {
      const url = `seed/party/s1/getcorpfinance` as const;
      const queryParameter = createQueryParameter(input);
      const res = await axios.get(`${url}?${queryParameter}`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": ConnectorGlobal.env.INNOFOREST_API_KEY,
        },
      });
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getcorpinvest(
    input: IInnoforest.IGetcorpinvestInput,
  ): Promise<IInnoforest.IGetcorpinvestOutput> {
    try {
      const url = `seed/party/s1/getcorpinvest` as const;
      const queryParameter = createQueryParameter(input);
      const res = await axios.get(`${url}?${queryParameter}`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": ConnectorGlobal.env.INNOFOREST_API_KEY,
        },
      });
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async getcorpcommon(
    input: IInnoforest.IGetcorpcommonInput,
  ): Promise<IInnoforest.IGetcorpcommonOutput> {
    try {
      const url = `seed/party/s1/getcorpcommon` as const;
      const queryParameter = createQueryParameter(input);
      const res = await axios.get(`${url}?${queryParameter}`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": ConnectorGlobal.env.INNOFOREST_API_KEY,
        },
      });
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async findproduct(
    input: IInnoforest.IFindproductInput,
  ): Promise<IInnoforest.IFindproductOutput> {
    try {
      const url = `seed/party/s1/findproduct` as const;
      const queryParameter = createQueryParameter(input);
      const res = await axios.get(`${url}?${queryParameter}`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": ConnectorGlobal.env.INNOFOREST_API_KEY,
        },
      });
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async findtraffic(
    input: IInnoforest.IFindtrafficInput,
  ): Promise<IInnoforest.IFindtrafficOutput> {
    try {
      const url = `seed/party/s1/findtraffic` as const;
      const queryParameter = createQueryParameter(input);
      const res = await axios.get(`${url}?${queryParameter}`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": ConnectorGlobal.env.INNOFOREST_API_KEY,
        },
      });
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async findsales(
    input: IInnoforest.IFindsalesInput,
  ): Promise<IInnoforest.IFindsalesOutput> {
    try {
      const url = `seed/party/s1/findsales` as const;
      const queryParameter = createQueryParameter(input);
      const res = await axios.get(`${url}?${queryParameter}`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": ConnectorGlobal.env.INNOFOREST_API_KEY,
        },
      });
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async findsalesrebuy(
    input: IInnoforest.IFindsalesrebuyInput,
  ): Promise<IInnoforest.IFindsalesrebuyOutput> {
    try {
      const url = `seed/party/s1/findsalesrebuy` as const;
      const queryParameter = createQueryParameter(input);
      const res = await axios.get(`${url}?${queryParameter}`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": ConnectorGlobal.env.INNOFOREST_API_KEY,
        },
      });
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async findsalesavgbuy(
    input: IInnoforest.IFindsalesavgbuyInput,
  ): Promise<IInnoforest.IFindsalesavgbuyOutput> {
    try {
      const url = `seed/party/s1/findsalesavgbuy` as const;
      const queryParameter = createQueryParameter(input);
      const res = await axios.get(`${url}?${queryParameter}`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": ConnectorGlobal.env.INNOFOREST_API_KEY,
        },
      });
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async findsalesperson(
    input: IInnoforest.IFindsalespersonInput,
  ): Promise<IInnoforest.IFindsalespersonOutput> {
    try {
      const url = `seed/party/s1/findsalesperson` as const;
      const queryParameter = createQueryParameter(input);
      const res = await axios.get(`${url}?${queryParameter}`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": ConnectorGlobal.env.INNOFOREST_API_KEY,
        },
      });
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async findsaleshousehold(
    input: IInnoforest.IFindsaleshouseholdInput,
  ): Promise<IInnoforest.IFindsaleshouseholdOutput> {
    try {
      const url = `seed/party/s1/findsaleshousehold` as const;
      const queryParameter = createQueryParameter(input);
      const res = await axios.get(`${url}?${queryParameter}`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": ConnectorGlobal.env.INNOFOREST_API_KEY,
        },
      });
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async findsalesincome(
    input: IInnoforest.IFindsalesincomeInput,
  ): Promise<IInnoforest.IFindsalesincomeOutput> {
    try {
      const url = `seed/party/s1/findsalesincome` as const;
      const queryParameter = createQueryParameter(input);
      const res = await axios.get(`${url}?${queryParameter}`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": ConnectorGlobal.env.INNOFOREST_API_KEY,
        },
      });
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async findinvest(
    input: IInnoforest.IFindinvestInput,
  ): Promise<IInnoforest.IFindinvestOutput> {
    try {
      const url = `seed/party/s1/findinvest` as const;
      const queryParameter = createQueryParameter(input);
      const res = await axios.get(`${url}?${queryParameter}`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": ConnectorGlobal.env.INNOFOREST_API_KEY,
        },
      });
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async findpatent(
    input: IInnoforest.IFindpatentInput,
  ): Promise<IInnoforest.IFindpatentOutput> {
    try {
      const url = `seed/party/s1/findpatent` as const;
      const queryParameter = createQueryParameter(input);
      const res = await axios.get(`${url}?${queryParameter}`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": ConnectorGlobal.env.INNOFOREST_API_KEY,
        },
      });
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async findpatentword(
    input: IInnoforest.IFindpatentwordInput,
  ): Promise<IInnoforest.IFindpatentwordOutput> {
    try {
      const url = `seed/party/s1/findpatentword` as const;
      const queryParameter = createQueryParameter(input);
      const res = await axios.get(`${url}?${queryParameter}`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": ConnectorGlobal.env.INNOFOREST_API_KEY,
        },
      });
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async findfinance(
    input: IInnoforest.IFindfinanceInput,
  ): Promise<IInnoforest.IFindfinanceOutput> {
    try {
      const url = `seed/party/s1/findfinance` as const;
      const queryParameter = createQueryParameter(input);
      const res = await axios.get(`${url}?${queryParameter}`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": ConnectorGlobal.env.INNOFOREST_API_KEY,
        },
      });
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async findemployee(
    input: IInnoforest.IFindemployeeInput,
  ): Promise<IInnoforest.IFindemployeeOutput> {
    try {
      const url = `seed/party/s1/findemployee` as const;
      const queryParameter = createQueryParameter(input);
      const res = await axios.get(`${url}?${queryParameter}`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": ConnectorGlobal.env.INNOFOREST_API_KEY,
        },
      });
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async findpress(
    input: IInnoforest.IFindpressInput,
  ): Promise<IInnoforest.IFindpressOutput> {
    try {
      const url = `seed/party/s1/findpress` as const;
      const queryParameter = createQueryParameter(input);
      const res = await axios.get(`${url}?${queryParameter}`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": ConnectorGlobal.env.INNOFOREST_API_KEY,
        },
      });
      return res.data;
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }
}
