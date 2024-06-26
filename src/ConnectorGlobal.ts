import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { Singleton } from "tstl";
import typia, { tags } from "typia";

export class ConnectorGlobal {
  public static get env(): ConnectorGlobal.IEnvironments {
    return environments.get();
  }
}
export namespace ConnectorGlobal {
  export interface IEnvironments {
    // BASIC SERVER INFO
    CONNECTOR_API_PORT: `${number}`;
    CONNECTOR_SWAGGER_PORT: `${number}`;

    //----
    // VENDORS
    //----
    // AWS
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_S3_BUCKET: string;
    FAKE_S3_PORT: `${number}`;

    // DAUM
    DAUM_API_KEY: string;

    // GOOGLE
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_TEST_SECRET: string;

    // NAVER
    NAVER_CLIENT_ID: string;
    NAVER_CLIENT_SECRET: string;

    // OPENAI
    OPENAI_API_KEY: string;

    // OPEN_DATA
    OPEN_DATA_KOREA_METEOROLOGICAL_ADMINISTRATION: string;

    // SERP
    SERP_API_KEY: string;

    // TYPEFORM
    TYPEFORM_PERSONAL_ACCESS_KEY: string;

    // WORK24
    WORK24_AUTH_KEY: string;

    // FIGMA
    FIGMA_TEST_SECRET: string;
    FIGMA_TEST_FILE_KEY: string;

    // ZOOM
    ZOOM_TEST_REFRESH_TOKEN: string;
    ZOOM_TEST_AUTHORIZATION_CODE: string;
    ZOOM_TEST_AUTHORIZATION_HEADER: string;

    // SWEET_TRACKER
    TEST_SWEET_TRACKER_KEY: string;
    TEST_SWEET_TRACKER_T_INVOICE: string;

    // KAKAO_TALK
    KAKAO_TALK_CLIENT_ID: string;
    KAKAO_TALK_CLIENT_SECRET: string;
    KAKAO_TALK_TEST_REFRESH_TOKEN: string;

    // KOREA_EXIM_BANK (한국수출입은행)
    KOREA_EXIM_BANK_API_KEY: string;

    // IMWEB
    IMWEB_TEST_API_KEY: string;
    IMWEB_TEST_API_SECRET: string;

    //----
    // INHOUSE SERVERS
    //----
    // RAG SERVERS
    RAG_SERVER_URL: string & tags.Format<"uri">;

    // CONNECTOR API
    CONNECTOR_BRANCH_API_SERVER: string & tags.Format<"uri">;

    // LLM PROXY
    HAMLET_URL: string & tags.Format<"uri">;
    SHAKESPEARE_URL: string & tags.Format<"uri">;
  }
}

const environments = new Singleton(() => {
  const env = dotenv.config();
  dotenvExpand.expand(env);
  return typia.assert<ConnectorGlobal.IEnvironments>(process.env);
});
