import axios from "axios";

import { IWork24 } from "@wrtn/connector-api/lib/structures/connector/work24/IWork24";

import { ConnectorGlobal } from "../../../ConnectorGlobal";
import { ObjectToQueryString } from "../../../utils/ObjectToQueryString";
import { convertXmlToJson } from "../../../utils/convertXmlToJson";

export namespace Work24Provider {
  export async function getJobOpenings(
    input: IWork24.IGetJobOpeningInput,
  ): Promise<IWork24.IGetJobOpeningOutput> {
    const { careerOptions, salaryOptions, ...rest } = input;

    const baseUrl = `https://www.work24.go.kr/cm/openApi/call/wk/callOpenApiSvcInfo210L01.do`;

    const q1 = ObjectToQueryString(careerOptions ?? {});
    const q2 = ObjectToQueryString(salaryOptions ?? {});
    const q3 = ObjectToQueryString(rest);
    const authKey = ConnectorGlobal.env.WORK24_JOB_INFO_KEY;
    const url = `${baseUrl}?${q1}&${q2}&${q3}&authKey=${authKey}&callTp=L`;
    const res = await axios.get(url);

    return convertXmlToJson(res.data);
  }
}
