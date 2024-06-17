import axios from "axios";
import { createHmac } from "crypto";

import { ConnectorGlobal } from "../../../ConnectorGlobal";

export namespace MetaProvider {
  export const baseUrl = "https://graph.facebook.com/v20.0/";

  export async function getAccessToken(options: {
    client_id: string;
    client_secret: string;
    redirect_uri: string;
    code: string;
  }) {
    const queryParams = Object.entries(options)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const res = await axios.get(
      `https://graph.facebook.com/oauth/access_token?${queryParams}`,
    );

    return res.data;
  }

  export async function setAgency(input: {
    businessId: string; // client business id
    userAccessToken: string; // user access token
  }) {
    const PARTNER_BM_ID = ConnectorGlobal.env.META_PARENT_BUSINESS_ID;
    const url = `${MetaProvider.baseUrl}/${PARTNER_BM_ID}/managed_businesses?existing_client_business_id=${input.businessId}&access_token=${input.userAccessToken}`;
    const res = await axios.post(url);
    return res.data;
  }

  export async function getSystemUserAccessToken(input: {
    businessId: string; // client business id
    userAccessToken: string; // user access token
  }) {
    const pbmAcessToken = `${ConnectorGlobal.env.META_PARENT_BUSINESS_SYSTEM_USER_ACCESS_TOKEN}`;
    const appId = `${ConnectorGlobal.env.META_APP_ID}`;
    const url = `${MetaProvider.baseUrl}/${input.businessId}/access_token?scope=ads_management,pages_read_engagement&app_id=${appId}&access_token=${pbmAcessToken}`;
    const res = await axios.post(url);
    return res.data;
  }

  /**
   *
   * @param input 조회할 대상의 액세스 토큰을 담은 요청 DTO.
   * @returns
   */
  export async function getUserId(input: {
    /**
     * 조회할 대상의 액세스 토큰으로 타입이 유저가 아닌 모든 것을 포함한다.
     */
    accessToken: string;
  }) {
    const url = `${baseUrl}/me?access_token=${input.accessToken}`;
    const res = await axios.get(url);
    return res.data;
  }

  export async function assign(input: {
    /**
     * 할당할 자신의 아이디
     */
    assetId: string;

    /**
     * 할당받을 유저의 아이디 ( 여기서는 시스템 유저에 해당 )
     */
    userId: string;

    accessToken: string;
  }) {
    const url = `${baseUrl}/${input.assetId}/assigned_users?user=${input.userId}&tasks=MANAGE&access_token=${input.accessToken}`;
    const res = await axios.post(url);
    return res.data;
  }

  export async function getPage(input: {
    /**
     * 권한을 가진 시스템 유저의 액세스 토큰
     */
    systemUserAccessToken: string;
  }) {
    const url = `${MetaProvider.baseUrl}/me/accounts?access_token=${input.systemUserAccessToken}`;
    const res = await axios.get(url);
    return res.data;
  }

  export function makeAppSecretProof(accessToken: string) {
    return createHmac("sha256", ConnectorGlobal.env.META_CLIENT_SECRET)
      .update(accessToken)
      .digest("hex");
  }
}
