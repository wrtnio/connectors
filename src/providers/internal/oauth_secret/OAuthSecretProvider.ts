import typia, { tags } from "typia";
import { IOAuthSecret } from "./structures/IOAuthSecret";
import axios from "axios";
import { ConnectorGlobal } from "../../../ConnectorGlobal";

export namespace OAuthSecretProvider {
  /**
   * OAuth Secret 정보 취득
   */
  export async function getSecretValue(
    secretValue: (string & tags.Format<"uuid">) | string,
  ): Promise<IOAuthSecret.ISecretValue | string> {
    try {
      const isUuid = typia.createIs<string & tags.Format<"uuid">>();

      if (isUuid(secretValue)) {
        const res = await axios.get(
          `${ConnectorGlobal.env.GH_DEVS_BE_SERVER_URL}/studio/customers/accounts/secrets/values/sandboxes/${secretValue}`,
        );
        return res.data;
      } else {
        return secretValue;
      }
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  /**
   * OAuth Secret 값 업데이트
   */
  export async function updateSecretValue(
    id: string & tags.Format<"uuid">,
    input: IOAuthSecret.IUpdateSecretValueRequest,
  ): Promise<void> {
    try {
      await axios.put(
        `${ConnectorGlobal.env.GH_DEVS_BE_SERVER_URL}/studio/customers/accounts/secrets/values/sandboxes/${id}`,
        input,
      );
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }
}
