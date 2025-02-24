import { GoogleShoppingService } from "@wrtnlabs/connector-google-shopping";
import typia from "typia";
import { TestGlobal } from "../TestGlobal";

export const test_google_shopping = async () => {
  const googleShoppingService = new GoogleShoppingService({
    apiKey: TestGlobal.env.SERP_API_KEY,
  });

  const musinsa_result = await googleShoppingService.musinsa({
    keyword: "니트",
    lang: "ko",
    max_results: 100,
  });
  typia.assert(musinsa_result);

  const twentyNineCentimeter = await googleShoppingService.twentyNineCentimeter(
    {
      keyword: "데님",
      lang: "ko",
      max_results: 10,
    },
  );
  typia.assert(twentyNineCentimeter);

  const eql = await googleShoppingService.hansumEQL({
    keyword: "볼캡",
    lang: "ko",
    max_results: 10,
  });
  typia.assert(eql);

  const oco = await googleShoppingService.oco({
    keyword: "더비슈즈",
    lang: "ko",
    max_results: 10,
  });
  typia.assert(oco);

  const uniqlo = await googleShoppingService.uniqlo({
    keyword: "셔츠",
    lang: "ko",
    max_results: 10,
  });
  typia.assert(uniqlo);

  // const wconcept = await googleShoppingService.wconcept( {
  //   keyword: "블라우스"
  // })
  // typia.assert(wconcept);

  const coupang = await googleShoppingService.coupang({
    keyword: "휴지",
    lang: "ko",
    max_results: 10,
  });
  typia.assert(coupang);

  const marketKurly = await googleShoppingService.kurly({
    keyword: "사과",
    lang: "ko",
    max_results: 10,
  });
  typia.assert(marketKurly);

  const iHerb = await googleShoppingService.iherb({
    keyword: "비타민",
    lang: "ko",
    max_results: 10,
  });
  typia.assert(iHerb);

  const aliExpress = await googleShoppingService.aliExpress({
    keyword: "키보드",
    lang: "ko",
    max_results: 10,
  });
  typia.assert(aliExpress);

  const oliveYoung = await googleShoppingService.oliveYoung({
    keyword: "선크림",
    lang: "ko",
    max_results: 10,
  });
  typia.assert(oliveYoung);

  const yes24 = await googleShoppingService.yes24({
    keyword: "타입스크립트",
    lang: "ko",
    max_results: 10,
  });
  typia.assert(yes24);

  const aladine = await googleShoppingService.aladine({
    keyword: "도커",
    lang: "ko",
    max_results: 10,
  });
  typia.assert(aladine);

  // const amazon = await googleShoppingService.amazon(
  //
  //   {
  //     keyword: "macbook",
  //     lang: "en",
  //     max_results: 10,
  //   },
  // );

  // const ebay = await googleShoppingService.ebay(
  //
  //   {
  //     keyword: "macbook",
  //     lang: "en",
  //     max_results: 10,
  //   },
  // );
  // typia.assert(ebay);

  // const walmart = await googleShoppingService.walmart(
  //
  //   {
  //     keyword: "macbook",
  //     lang: "en",
  //     max_results: 10,
  //   },
  // );
  // typia.assert(walmart);
};
