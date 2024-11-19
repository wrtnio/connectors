import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";

const companies = [
  {
    corpUniqNum: "1198691245",
    companyName: "오늘의집(버킷플레이스)",
  },
  {
    corpUniqNum: "1798102225",
    companyName: "올웨이즈(레브잇)",
  },
  {
    corpUniqNum: "8458601667",
    companyName: "트웰브랩스",
  },
  {
    corpUniqNum: "1068706394",
    companyName: "뤼이드",
  },
  {
    corpUniqNum: "4578100277",
    companyName: "클래스101",
  },
] as const;

export const test_api_connector_innoforest_getcorp = async (
  connection: CApi.IConnection,
) => {
  for await (const { corpUniqNum } of companies) {
    const res =
      await CApi.functional.connector.innoforest.seed.party.s1.getcorp(
        connection,
        { corpUniqNum: corpUniqNum },
      );

    typia.assert(res);
  }
};

export const test_api_connector_innoforest_getcorpfinance = async (
  connection: CApi.IConnection,
) => {
  for await (const { corpUniqNum } of companies) {
    const res =
      await CApi.functional.connector.innoforest.seed.party.s1.getcorpfinance(
        connection,
        { corpUniqNum: corpUniqNum },
      );

    typia.assert(res);
  }
};

export const test_api_connector_innoforest_getcorpinvest = async (
  connection: CApi.IConnection,
) => {
  for await (const { corpUniqNum } of companies) {
    const res =
      await CApi.functional.connector.innoforest.seed.party.s1.getcorpinvest(
        connection,
        { corpUniqNum: corpUniqNum },
      );

    typia.assert(res);
  }
};

export const test_api_connector_innoforest_getcorpcommon = async (
  connection: CApi.IConnection,
) => {
  for await (const { corpUniqNum } of companies) {
    const res =
      await CApi.functional.connector.innoforest.seed.party.s1.getcorpcommon(
        connection,
        { corpUniqNum: corpUniqNum },
      );

    typia.assert(res);
  }
};

export const test_api_connector_innoforest_findproduct = async (
  connection: CApi.IConnection,
) => {
  for await (const { corpUniqNum } of companies) {
    const res =
      await CApi.functional.connector.innoforest.seed.party.s1.findproduct(
        connection,
        { corpUniqNum: corpUniqNum },
      );

    typia.assert(res);
  }
};

export const test_api_connector_innoforest_findtraffic = async (
  connection: CApi.IConnection,
) => {
  for await (const { corpUniqNum } of companies) {
    const res =
      await CApi.functional.connector.innoforest.seed.party.s1.findtraffic(
        connection,
        { corpUniqNum: corpUniqNum },
      );

    typia.assert(res);
  }
};

export const test_api_connector_innoforest_findsales = async (
  connection: CApi.IConnection,
) => {
  for await (const { corpUniqNum } of companies) {
    const res =
      await CApi.functional.connector.innoforest.seed.party.s1.findsales(
        connection,
        { corpUniqNum: corpUniqNum },
      );

    typia.assert(res);
  }
};

export const test_api_connector_innoforest_findsalesrebuy = async (
  connection: CApi.IConnection,
) => {
  for await (const { corpUniqNum } of companies) {
    const res =
      await CApi.functional.connector.innoforest.seed.party.s1.findsalesrebuy(
        connection,
        { corpUniqNum: corpUniqNum },
      );

    typia.assert(res);
  }
};

export const test_api_connector_innoforest_findsalesavgbuy = async (
  connection: CApi.IConnection,
) => {
  for await (const { corpUniqNum } of companies) {
    const res =
      await CApi.functional.connector.innoforest.seed.party.s1.findsalesavgbuy(
        connection,
        { corpUniqNum: corpUniqNum },
      );

    typia.assert(res);
  }
};

export const test_api_connector_innoforest_findsalesperson = async (
  connection: CApi.IConnection,
) => {
  for await (const { corpUniqNum } of companies) {
    const res =
      await CApi.functional.connector.innoforest.seed.party.s1.findsalesperson(
        connection,
        { corpUniqNum: corpUniqNum },
      );

    typia.assert(res);
  }
};

export const test_api_connector_innoforest_findsaleshousehold = async (
  connection: CApi.IConnection,
) => {
  for await (const { corpUniqNum } of companies) {
    const res =
      await CApi.functional.connector.innoforest.seed.party.s1.findsaleshousehold(
        connection,
        { corpUniqNum: corpUniqNum },
      );

    typia.assert(res);
  }
};

export const test_api_connector_innoforest_findsalesincome = async (
  connection: CApi.IConnection,
) => {
  for await (const { corpUniqNum } of companies) {
    const res =
      await CApi.functional.connector.innoforest.seed.party.s1.findsalesincome(
        connection,
        { corpUniqNum: corpUniqNum },
      );

    typia.assert(res);
  }
};

export const test_api_connector_innoforest_findinvest = async (
  connection: CApi.IConnection,
) => {
  for await (const { corpUniqNum } of companies) {
    const res =
      await CApi.functional.connector.innoforest.seed.party.s1.findinvest(
        connection,
        { corpUniqNum: corpUniqNum },
      );

    typia.assert(res);
  }
};

export const test_api_connector_innoforest_findpatent = async (
  connection: CApi.IConnection,
) => {
  for await (const { corpUniqNum } of companies) {
    const res =
      await CApi.functional.connector.innoforest.seed.party.s1.findpatent(
        connection,
        { corpUniqNum: corpUniqNum },
      );

    typia.assert(res);
  }
};

export const test_api_connector_innoforest_findpatentword = async (
  connection: CApi.IConnection,
) => {
  for await (const { corpUniqNum } of companies) {
    const res =
      await CApi.functional.connector.innoforest.seed.party.s1.findpatentword(
        connection,
        { corpUniqNum: corpUniqNum },
      );

    typia.assert(res);
  }
};

export const test_api_connector_innoforest_findfinance = async (
  connection: CApi.IConnection,
) => {
  for await (const { corpUniqNum } of companies) {
    const res =
      await CApi.functional.connector.innoforest.seed.party.s1.findfinance(
        connection,
        { corpUniqNum: corpUniqNum },
      );

    typia.assert(res);
  }
};

export const test_api_connector_innoforest_findemployee = async (
  connection: CApi.IConnection,
) => {
  for await (const { corpUniqNum } of companies) {
    const res =
      await CApi.functional.connector.innoforest.seed.party.s1.findemployee(
        connection,
        { corpUniqNum: corpUniqNum },
      );

    typia.assert(res);
  }
};

export const test_api_connector_innoforest_findpress = async (
  connection: CApi.IConnection,
) => {
  for await (const { corpUniqNum } of companies) {
    const res =
      await CApi.functional.connector.innoforest.seed.party.s1.findpress(
        connection,
        { corpUniqNum: corpUniqNum },
      );

    typia.assert(res);
  }
};

export const test_api_connector_innoforest_search_and_get_unified_info = async (
  connection: CApi.IConnection,
) => {
  const companies = await CApi.functional.connector.innoforest.search(
    connection,
    {},
  );
  typia.assert(companies);

  const res = await CApi.functional.connector.innoforest.unify(connection, {
    corpUniqNum: "1068706394",
  });

  typia.assert(res);
};
