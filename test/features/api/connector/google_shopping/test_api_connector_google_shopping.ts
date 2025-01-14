import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

export const test_api_connector_google_shopping = async (
  connection: CApi.IConnection,
) => {
  const musinsa_result =
    await CApi.functional.connector.google_shopping.musinsa(connection, {
      keyword: "니트",
      lang: "ko",
      max_results: 100,
    });
  typia.assert(musinsa_result);

  const twentyNineCentimeter =
    await CApi.functional.connector.google_shopping.twenty_nine_centimeter.twentyNineCentimeter(
      connection,
      {
        keyword: "데님",
        lang: "ko",
        max_results: 10,
      },
    );
  typia.assert(twentyNineCentimeter);

  const eql = await CApi.functional.connector.google_shopping.eql.hansumEQL(
    connection,
    {
      keyword: "볼캡",
      lang: "ko",
      max_results: 10,
    },
  );
  typia.assert(eql);

  const oco = await CApi.functional.connector.google_shopping.oco(connection, {
    keyword: "더비슈즈",
    lang: "ko",
    max_results: 10,
  });
  typia.assert(oco);

  const uniqlo = await CApi.functional.connector.google_shopping.uniqlo(
    connection,
    {
      keyword: "셔츠",
      lang: "ko",
      max_results: 10,
    },
  );
  typia.assert(uniqlo);

  // const wconcept = await CApi.functional.connector.google_shopping.wconcept(connection, {
  //   keyword: "블라우스"
  // })
  // typia.assert(wconcept);

  const coupang = await CApi.functional.connector.google_shopping.coupang(
    connection,
    {
      keyword: "휴지",
      lang: "ko",
      max_results: 10,
    },
  );
  typia.assert(coupang);

  const marketKurly =
    await CApi.functional.connector.google_shopping.market_kurly.marketKurly(
      connection,
      {
        keyword: "사과",
        lang: "ko",
        max_results: 10,
      },
    );
  typia.assert(marketKurly);

  const iHerb = await CApi.functional.connector.google_shopping.iherb(
    connection,
    {
      keyword: "비타민",
      lang: "ko",
      max_results: 10,
    },
  );
  typia.assert(iHerb);

  const aliExpress =
    await CApi.functional.connector.google_shopping.ali_express.aliExpress(
      connection,
      {
        keyword: "키보드",
        lang: "ko",
        max_results: 10,
      },
    );
  typia.assert(aliExpress);

  const oliveYoung =
    await CApi.functional.connector.google_shopping.olive_young.oliveYoung(
      connection,
      {
        keyword: "선크림",
        lang: "ko",
        max_results: 10,
      },
    );
  typia.assert(oliveYoung);

  const yes24 =
    await CApi.functional.connector.google_shopping.yes_twenty_four.yes24(
      connection,
      {
        keyword: "타입스크립트",
        lang: "ko",
        max_results: 10,
      },
    );
  typia.assert(yes24);

  const aladine = await CApi.functional.connector.google_shopping.aladine(
    connection,
    {
      keyword: "도커",
      lang: "ko",
      max_results: 10,
    },
  );
  typia.assert(aladine);

  // const amazon = await CApi.functional.connector.google_shopping.amazon(
  //   connection,
  //   {
  //     keyword: "macbook",
  //     lang: "en",
  //     max_results: 10,
  //   },
  // );

  // const ebay = await CApi.functional.connector.google_shopping.ebay(
  //   connection,
  //   {
  //     keyword: "macbook",
  //     lang: "en",
  //     max_results: 10,
  //   },
  // );
  // typia.assert(ebay);

  // const walmart = await CApi.functional.connector.google_shopping.walmart(
  //   connection,
  //   {
  //     keyword: "macbook",
  //     lang: "en",
  //     max_results: 10,
  //   },
  // );
  // typia.assert(walmart);
};
