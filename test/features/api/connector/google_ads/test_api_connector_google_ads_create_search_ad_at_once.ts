import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";

export const test_api_connector_google_ads_create_ad_at_once_search_type =
  async (connection: CApi.IConnection) => {
    const res =
      await CApi.functional.connector.google_ads.search_ads.createSearchAd(
        connection,
        {
          customerId: "8655555186", // Prerequsite ( 고객이 자기 자신의 계정을 조회 후 계정 아이디 전달)
          campaign: {
            advertisingChannelType: "SEARCH", // 검색 광고를 만들 것이고,
            campaignBudget: 1, // 예산은 1원을 쓸 것이고
            campaignName: `카카수 광고`, // 캠페인 이름은 이렇게 작성할 것이며 ( 추후 기본 값을 넣어서, 유저가 입력 안하면 랜덤으로 채우기 )
          },
          ad: {
            finalUrl: "https://wrtn.ai", // 광고하려는 상품 또는 랜딩 페이지의 링크
            headlines: ["제목1", "아무거나", "제목은 3개 이상"], // 광고 제목들
            descriptions: ["차카", "타파"], // 광고 설명들
            keywords: ["인공지능", "뤼튼", "카카수"], // 해당 광고를 보여주기 위한 트리거에 해당하는 검색어
          },
        },
      );

    typia.assert(res);
  };
