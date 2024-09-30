import CApi from "@wrtn/connector-api/lib/index";
import assert from "assert";
import typia from "typia";

export const test_api_connector_open_data_get_get_stock_price_info = async (
  connection: CApi.IConnection,
) => {
  const res = await CApi.functional.connector.open_data.getStockPriceInfo(
    connection,
    {
      beginBasDt: "20240620",
    },
  );

  typia.assert(res);
  assert(res.response.body.items.item.length > 0);
};

export const test_api_connector_open_data_get_get_stock_price_info_with_exact_company_name =
  async (connection: CApi.IConnection) => {
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 20);

    const year = oneWeekAgo.getFullYear();
    const month = ("0" + (oneWeekAgo.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 +1 필요
    const day = ("0" + oneWeekAgo.getDate()).slice(-2); // 2자리 숫자로 맞추기 위해 '0'을 추가

    const formattedDate = `${year}${month}${day}`;

    const res = await CApi.functional.connector.open_data.getStockPriceInfo(
      connection,
      {
        likeItmsNm: "삼성전자",
        beginBasDt: formattedDate,
      },
    );

    typia.assert(res);
    assert(res.response.body.items.item.length > 0);
  };

/**
 * 1달 전 데이터는 얻을 수 있음
 * @param connection
 */
export const test_api_connector_open_data_get_get_stock_price_info_59_days_ago =
  async (connection: CApi.IConnection) => {
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 59);

    const year = oneWeekAgo.getFullYear();
    const month = ("0" + (oneWeekAgo.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 +1 필요
    const day = ("0" + oneWeekAgo.getDate()).slice(-2); // 2자리 숫자로 맞추기 위해 '0'을 추가

    const formattedDate = `${year}${month}${day}`;

    const res = await CApi.functional.connector.open_data.getStockPriceInfo(
      connection,
      {
        likeItmsNm: "삼성전자",
        beginBasDt: formattedDate,
      },
    );

    typia.assert(res);
    assert(res.response.body.items.item.length > 0);
  };

/**
 * 1달 전 데이터는 얻을 수 있음 / 오락가락함
 * @param connection
 */
export const test_api_connector_open_data_get_get_stock_price_info_20_days_ago =
  async (connection: CApi.IConnection) => {
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 20);

    const year = oneWeekAgo.getFullYear();
    const month = ("0" + (oneWeekAgo.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 +1 필요
    const day = ("0" + oneWeekAgo.getDate()).slice(-2); // 2자리 숫자로 맞추기 위해 '0'을 추가

    const formattedDate = `${year}${month}${day}`;

    const res = await CApi.functional.connector.open_data.getStockPriceInfo(
      connection,
      {
        likeItmsNm: "삼성전자",
        beginBasDt: formattedDate,
      },
    );

    typia.assert(res);
    assert(res.response.body.items.item.length > 0);
  };

/**
 * 1주 전 데이터 얻을 수 있음
 */
export const test_api_connector_open_data_get_get_stock_price_info_before_one_week =
  async (connection: CApi.IConnection) => {
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 59);

    const year = oneWeekAgo.getFullYear();
    const month = ("0" + (oneWeekAgo.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 +1 필요
    const day = ("0" + oneWeekAgo.getDate()).slice(-2); // 2자리 숫자로 맞추기 위해 '0'을 추가

    const formattedDate = `${year}${month}${day}`;

    const res = await CApi.functional.connector.open_data.getStockPriceInfo(
      connection,
      {
        likeItmsNm: "삼성전자",
        beginBasDt: formattedDate,
      },
    );

    typia.assert(res);
    assert(res.response.body.items.item.length > 0);
  };

/**
 * 오늘 데이터는 얻을 수 없음
 */
export const test_api_connector_open_data_get_get_today_stock_price_info =
  async (connection: CApi.IConnection) => {
    const year = String(new Date().getFullYear());
    const month = String(new Date().getMonth() + 1).padStart(2, "0");
    const date = String(new Date().getDate()).padStart(2, "0");

    const res = await CApi.functional.connector.open_data.getStockPriceInfo(
      connection,
      {
        likeItmsNm: "삼성전자",
        beginBasDt: `${year}${month}${date}`,
      },
    );

    typia.assert(res);
    assert(res.response.body.items.item.length === 0);
  };
