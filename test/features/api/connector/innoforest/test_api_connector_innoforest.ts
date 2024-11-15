import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";

export const test_api_connector_innoforest = async (
  connection: CApi.IConnection,
) => {
  const res = await CApi.functional.connector.innoforest.seed.party.s1.getcorp(
    connection,
    {
      corpUniqNum: "1198691245",
    },
  );

  console.log(JSON.stringify(res, null, 2));
  typia.assert(res);
};
