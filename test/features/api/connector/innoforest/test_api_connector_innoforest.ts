import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";

export const test_api_connector_innoforest_getcorp = async (
  connection: CApi.IConnection,
) => {
  const res = await CApi.functional.connector.innoforest.seed.party.s1.getcorp(
    connection,
    { corpUniqNum: "1198691245" },
  );

  typia.assert(res);
};

export const test_api_connector_innoforest_getcorpfinance = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.innoforest.seed.party.s1.getcorpfinance(
      connection,
      { corpUniqNum: "1198691245" },
    );

  typia.assert(res);
};

export const test_api_connector_innoforest_getcorpinvest = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.innoforest.seed.party.s1.getcorpinvest(
      connection,
      { corpUniqNum: "1198691245" },
    );

  typia.assert(res);
};

export const test_api_connector_innoforest_getcorpcommon = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.innoforest.seed.party.s1.getcorpcommon(
      connection,
      { corpUniqNum: "1198691245" },
    );

  typia.assert(res);
};

export const test_api_connector_innoforest_findproduct = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.innoforest.seed.party.s1.findproduct(
      connection,
      { corpUniqNum: "1198691245" },
    );

  typia.assert(res);
};

export const test_api_connector_innoforest_findtraffic = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.innoforest.seed.party.s1.findtraffic(
      connection,
      { corpUniqNum: "1198691245" },
    );

  typia.assert(res);
};

export const test_api_connector_innoforest_findsales = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.innoforest.seed.party.s1.findsales(
      connection,
      { corpUniqNum: "1198691245" },
    );

  typia.assert(res);
};

export const test_api_connector_innoforest_findsalesrebuy = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.innoforest.seed.party.s1.findsalesrebuy(
      connection,
      { corpUniqNum: "1198691245" },
    );

  typia.assert(res);
};

export const test_api_connector_innoforest_findsalesavgbuy = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.innoforest.seed.party.s1.findsalesavgbuy(
      connection,
      { corpUniqNum: "1198691245" },
    );

  typia.assert(res);
};

export const test_api_connector_innoforest_findsalesperson = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.innoforest.seed.party.s1.findsalesperson(
      connection,
      { corpUniqNum: "1198691245" },
    );

  typia.assert(res);
};

export const test_api_connector_innoforest_findsaleshousehold = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.innoforest.seed.party.s1.findsaleshousehold(
      connection,
      { corpUniqNum: "1198691245" },
    );

  typia.assert(res);
};

export const test_api_connector_innoforest_findsalesincome = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.innoforest.seed.party.s1.findsalesincome(
      connection,
      { corpUniqNum: "1198691245" },
    );

  typia.assert(res);
};

export const test_api_connector_innoforest_findinvest = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.innoforest.seed.party.s1.findinvest(
      connection,
      { corpUniqNum: "1198691245" },
    );

  typia.assert(res);
};

export const test_api_connector_innoforest_findpatent = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.innoforest.seed.party.s1.findpatent(
      connection,
      { corpUniqNum: "1198691245" },
    );

  typia.assert(res);
};

export const test_api_connector_innoforest_findpatentword = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.innoforest.seed.party.s1.findpatentword(
      connection,
      { corpUniqNum: "1198691245" },
    );

  typia.assert(res);
};

export const test_api_connector_innoforest_findfinance = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.innoforest.seed.party.s1.findfinance(
      connection,
      { corpUniqNum: "1198691245" },
    );

  typia.assert(res);
};

export const test_api_connector_innoforest_findemployee = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.innoforest.seed.party.s1.findemployee(
      connection,
      { corpUniqNum: "1198691245" },
    );

  typia.assert(res);
};

export const test_api_connector_innoforest_findpress = async (
  connection: CApi.IConnection,
) => {
  const res =
    await CApi.functional.connector.innoforest.seed.party.s1.findpress(
      connection,
      { corpUniqNum: "1198691245" },
    );

  typia.assert(res);
};
