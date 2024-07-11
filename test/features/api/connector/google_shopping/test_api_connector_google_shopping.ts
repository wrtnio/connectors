import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

export const test_api_connector_google_shopping = async (
  connection: CApi.IConnection,
) => {
  const musinsa_result =
    await CApi.functional.connector.google_shopping.musinsa(connection, {
      keyword: "니트",
      max_results: 100,
    });
  typia.assertEquals(musinsa_result);

  const twentyNineCentimeter =
    await CApi.functional.connector.google_shopping.twenty_nine_centimeter.twentyNineCentimeter(
      connection,
      {
        keyword: "데님",
        max_results: 10,
      },
    );
  typia.assertEquals(twentyNineCentimeter);

  const eql = await CApi.functional.connector.google_shopping.eql.hansumEQL(
    connection,
    {
      keyword: "볼캡",
      max_results: 10,
    },
  );
  typia.assertEquals(eql);

  const oco = await CApi.functional.connector.google_shopping.oco(connection, {
    keyword: "더비슈즈",
    max_results: 10,
  });
  typia.assertEquals(oco);

  const uniqlo = await CApi.functional.connector.google_shopping.uniqlo(
    connection,
    {
      keyword: "셔츠",
      max_results: 10,
    },
  );
  typia.assertEquals(uniqlo);

  // const wconcept = await CApi.functional.connector.google_shopping.wconcept(connection, {
  //   keyword: "블라우스"
  // })
  // typia.assertEquals(wconcept);

  const coupang = await CApi.functional.connector.google_shopping.coupang(
    connection,
    {
      keyword: "휴지",
      max_results: 10,
    },
  );
  typia.assertEquals(coupang);

  const marketKurly =
    await CApi.functional.connector.google_shopping.market_kurly.marketKurly(
      connection,
      {
        keyword: "사과",
        max_results: 10,
      },
    );
  typia.assertEquals(marketKurly);

  const iHerb = await CApi.functional.connector.google_shopping.iherb(
    connection,
    {
      keyword: "비타민",
      max_results: 10,
    },
  );
  typia.assertEquals(iHerb);

  const aliExpress =
    await CApi.functional.connector.google_shopping.ali_express.aliExpress(
      connection,
      {
        keyword: "키보드",
        max_results: 10,
      },
    );
  typia.assertEquals(aliExpress);

  const oliveYoung =
    await CApi.functional.connector.google_shopping.olive_young.oliveYoung(
      connection,
      {
        keyword: "선크림",
        max_results: 10,
      },
    );
  typia.assertEquals(oliveYoung);

  const yes24 =
    await CApi.functional.connector.google_shopping.yes_twenty_four.yes24(
      connection,
      {
        keyword: "타입스크립트",
        max_results: 10,
      },
    );
  typia.assertEquals(yes24);

  const aladine = await CApi.functional.connector.google_shopping.aladine(
    connection,
    {
      keyword: "도커",
      max_results: 10,
    },
  );
  typia.assertEquals(aladine);
};
