import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_connector_google_ads_create_ad_at_once_display_type =
  async (connection: CApi.IConnection) => {
    const bucket = ConnectorGlobal.env.AWS_S3_BUCKET;
    const landscapeImage = `https://${bucket}.s3.amazonaws.com/landscapeImage.jpg`;
    // const squareImage = `https://${bucket}.s3.amazonaws.com/squareImage.jpeg`;

    const res =
      await CApi.functional.connector.google_ads.display_ads.createDisplayAd(
        connection,
        {
          secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
          customerId: "8655555186", // Prerequsite ( 고객이 자기 자신의 계정을 조회 후 계정 아이디 전달)
          campaign: {
            advertisingChannelType: "DISPLAY", // 검색 광고를 만들 것이고,
            campaignBudget: 1, // 예산은 1원을 쓸 것이고
            campaignName: `AT-ONCE-TEST-${new Date().getTime()}`,
          },
          ad: {
            finalUrl: "https://wrtn.ai",
            longHeadline: "구글 디스플레이 광고 생성 테스트",
            headlines: ["가나다", "라마바", "사아자"],
            descriptions: ["차카", "타파"],
            keywords: ["키워드1", "키워드2"],
            businessName: "카카수 컴퍼니",
            landscapeImages: [landscapeImage],
            logoImages: [landscapeImage], // 이미지 사이즈가 다를 경우 crop해서 넣는다.
            squareImages: [landscapeImage],
          },
        },
      );

    typia.assert(res);
  };
