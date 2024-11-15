import axios from "axios";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { Singleton } from "tstl";
import typia, { tags } from "typia";
import { AwsProvider } from "./providers/connector/aws/AwsProvider";

export class ConnectorGlobal {
  /**
   * 테스트 환경에서 사용하기 위해 만든 것으로, 평소에는 사용하지 않는다.
   *
   * @param env
   * @returns
   */
  public static async write(env: Record<string, string>) {
    const bucket = ConnectorGlobal.env.AWS_S3_BUCKET;
    const key = ConnectorGlobal.env.ROTATION_REFRESH_TOKEN_PATH;
    const url = `https://${bucket}.s3.ap-northeast-2.amazonaws.com/${key}`;
    const res = await axios.get(url);
    const parsed = res.data;

    Object.entries({ ...parsed, ...env }).forEach(([key, value]) => {
      if (Object.keys(ConnectorGlobal.env).includes(key)) {
        parsed[key] = value as any;
      }
    });

    const data = Buffer.from(JSON.stringify(parsed), "utf-8");
    await AwsProvider.uploadObject({ key, data, contentType: "plain/text" });

    return await this.reload();
  }

  /**
   * 테스트 환경에서 사용하기 위해 만든 것으로, 평소에는 사용하지 않는다.
   *
   * @param env
   * @returns
   */
  public static async reload() {
    const bucket = ConnectorGlobal.env.AWS_S3_BUCKET;
    const key = ConnectorGlobal.env.ROTATION_REFRESH_TOKEN_PATH;
    const url = `https://${bucket}.s3.ap-northeast-2.amazonaws.com/${key}`;
    const res = await axios.get(url);
    const parsed = res.data;

    Object.entries(parsed).forEach(([key, value]) => {
      if (Object.keys(ConnectorGlobal.env).includes(key)) {
        (ConnectorGlobal.env as any)[key] = value as any;
      }
    });

    return ConnectorGlobal;
  }

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

    // CALENDLY
    CALENDLY_CLIENT_ID: string;
    CALENDLY_CLIENT_SECRET: string;
    CALENDLY_TEST_SECRET: string;

    // DAUM
    DAUM_API_KEY: string;

    // GITHUB
    G_GITHUB_TEST_SECRET: string;
    G_GITHUB_TEST_SECRET_2: string;

    // GOOGLE
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_TEST_SECRET: string;
    GOOGLE_API_KEY: string;

    // GOOGLE ADS
    GOOGLE_ADS_ACCOUNT_ID: `${number}`;
    GOOGLE_ADS_DEVELOPER_TOKEN: string;
    GOOGLE_ADS_PARENT_SECRET: string;

    JIRA_CLIENT_ID: string;
    JIRA_CLIENT_SECRET: string;
    JIRA_TEST_SECRET: string;
    JIRA_REFRESH_URI: string;

    // NAVER
    NAVER_CLIENT_ID: string;
    NAVER_CLIENT_SECRET: string;

    NOTION_TEST_SECRET: string;

    // OPENAI
    OPENAI_API_KEY: string;

    // OPEN_DATA
    OPEN_DATA_API_KEY: string;

    // SERP
    SERP_API_KEY: string;

    // TYPEFORM
    TYPEFORM_PERSONAL_ACCESS_KEY: string;
    TYPEFORM_TEST_SECRET: string;
    TYPEFORM_CLIENT_ID: string;
    TYPEFORM_CLIENT_SECRET: string;

    // FIGMA
    FIGMA_TEST_FILE_KEY: string;

    FIGMA_CLIENT_ID: string;
    FIGMA_CLIENT_SECRET: string;
    FIGMA_TEST_SECRET: string;

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

    // RAPIDAPI
    RAPIDAPI_KEY: string;

    // STABILITY AI
    STABILITY_AI_API_KEY: string;
    STABILITY_AI_HOST: string & tags.Format<"iri">;
    STABILITY_AI_ENGINE_ID: string;
    STABILITY_AI_DEFAULT_STEP: `${number}`;
    STABILITY_AI_CFG_SCALE: `${number}`;

    // SLACK
    SLACK_CLIENT_ID: string;
    SLACK_CLIENT_SECRET: string;
    SLACK_TEST_SECRET: string;

    // DISCORD
    DISCORD_BOT_TOKEN: string;

    // OPENWEATHER
    OPEN_WEATHER_API_KEY: string;
    // X
    X_APP_USER_BEARER_TOKEN: string;
    X_CLIENT_ID: string;
    X_CLIENT_SECRET: string;
    X_TEST_SECRET: string;

    //----
    // INHOUSE SERVERS
    //----
    // RAG SERVERS
    RAG_SERVER_URL: string & tags.Format<"iri">;

    // CONNECTOR API
    CONNECTOR_BRANCH_API_SERVER: string & tags.Format<"iri">;

    // LLM PROXY
    HAMLET_URL: string & tags.Format<"iri">;
    SHAKESPEARE_URL: string & tags.Format<"iri">;
    HAMLET_CHAT_COMPLETION_REQUEST_ENDPOINT: string;
    HAMLET_HEADER_KEY_NAME: string;
    HAMLET_HEADER_KEY_VALUE: string;
    HAMLET_PROMPT_NODE_MODEL_NAME: string;
    HAMLET_PROMPT_NODE_REQUEST_ENDPOINT: string;

    // GH DEVS BE
    GH_DEVS_BE_SERVER_URL: string & tags.Format<"iri">;
    SHORT_LINK_RETURN_URL: string & tags.Format<"iri">;

    // ROTATION_REFRESH_TOKEN_PATH
    ROTATION_REFRESH_TOKEN_PATH: string;

    // BROWSING AGENT PLAYGROUND
    BROWSING_AGENT_PLAYGROUND_SERVER_URL: string & tags.Format<"iri">;

    // RAG FLOW
    RAG_FLOW_SERVER_URL: string & tags.Format<"iri">;
    RAG_FLOW_DOCUMENT_INDEX: string;
    RAG_FLOW_TOPK: string;
  }
}

const environments = new Singleton(() => {
  const env = dotenv.config();
  dotenvExpand.expand(env);
  return typia.assert<ConnectorGlobal.IEnvironments>(process.env);
});
