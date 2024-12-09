import CApi from "@wrtn/connector-api/lib/index";
import type { IWebCrawler } from "@wrtn/connector-api/lib/structures/connector/web_crawler/IWebCrawler";
import fs from "fs";

export const test_api_connector_web_crawler_get_content = async (
  pool: CApi.IConnection,
) => {
  const OHOU = "https://ohou.se/productions/770267/selling";
  const MUSINSA = "https://www.musinsa.com/products/3711564";
  const IHERB =
    "https://kr.iherb.com/pr/nature-s-bounty-vitamin-c-1-000-mg-100-caplets/67786?rec=home&_gl=1*1e3yhzv*_up*MQ..*_gs*MQ..&gclid=CjwKCAiA9bq6BhAKEiwAH6bqoFTM1Fdubc0rzz27xbGReWNBU1kx6GCTNWtagHhcUv0shXDQnNEnfBoCtlUQAvD_BwE&gclsrc=aw.ds";
  const CUPANG =
    "https://www.coupang.com/vp/products/8246353393?vendorItemId=86646022701&sourceType=HOME_GW_PROMOTION&searchId=feed-f214edf3bd3b481aabe1ba244d82887a-gw_promotion&isAddedCart=";
  const ALADIN = "https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=243943792";
  const ALIEXPRESS =
    "https://ko.aliexpress.com/item/1005006838602057.html?spm=a2g0o.tm1000010823.d0.1.231511b5b0zJDl&pvid=aaf918ca-6785-47f0-bfc0-804f94c71423&pdp_ext_f=%7B%22ship_from%22:%22CN%22,%22sku_id%22:%2212000038468714588%22%7D&scm=1007.51228.386262.0&scm-url=1007.51228.386262.0&scm_id=1007.51228.386262.0&pdp_npi=4%40dis%21KRW%21%E2%82%A9%2050%2C962%21%E2%82%A9%2037%2C707%21%21%21251.61%21186.16%21%402141115b17337163412444621e3ed2%2112000038468714588%21gdf%21KR%21%21X&channel=bigSave&aecmd=true&_gl=1*cv9zel*_gcl_au*MTMxMTg1MjkyMy4xNzMzNzE2MzM3*_ga*MjExMzkwNDgxNS4xNzMzNzE2MzM3*_ga_VED1YSGNC7*MTczMzcxNjMzNy4xLjEuMTczMzcxNjM0NC41My4wLjA.";
  const NAVERSTORE =
    "https://brand.naver.com/stena/products/9205111057?site_preference=device&NaPm=ct%3Dm4gknwh2%7Cci%3Dshopn%7Ctr%3Dnshfd%7Chk%3D9ff83a29ff768da277fcf5a1fde48206e7c5524d%7Ctrx%3Dundefined";

  const execute = async (url: string, name: string) => {
    console.log(`Start ${name}...`);
    const res: IWebCrawler.IResponse =
      await CApi.functional.connector.crawler.get_web_content.getWebContent(
        pool,
        {
          url: url,
          pagination: {
            followNextPage: true,
            followNextPageCount: 2,
          },
        },
      );

    await fs.promises.writeFile(
      `/Users/jeonsehyeon/Documents/wrtn/connectors/test/features/api/connector/web_crawler/logs/${name}.json`,
      JSON.stringify(res),
      "utf8",
    );
  };

  // await execute(OHOU, "OHOU");
  // await execute(MUSINSA, "MUSINSA");
  // await execute(IHERB, "IHERB");
  // await execute(CUPANG, "CUPANG");
  // await execute(ALADIN, "ALADIN");
  // await execute(ALIEXPRESS, "ALIEXPRESS");
  await execute(NAVERSTORE, "NAVERSTORE");
};
