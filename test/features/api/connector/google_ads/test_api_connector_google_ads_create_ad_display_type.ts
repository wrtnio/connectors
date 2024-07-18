import CApi from "@wrtn/connector-api/lib/index";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { test_api_connector_google_ads_create_campaign_display_type } from "./test_api_connector_google_ads_create_campaign";

export const test_api_connector_google_ads_create_ad_display_type = async (
  connection: CApi.IConnection,
) => {
  const { campaign } =
    await test_api_connector_google_ads_create_campaign_display_type(
      connection,
    );

  const campaignResourceName = campaign.resourceName;

  const bucket = ConnectorGlobal.env.AWS_S3_BUCKET;
  const landscapeImage = `https://${bucket}.s3.amazonaws.com/landscapeImage.jpg`;
  const squareImage = `https://${bucket}.s3.amazonaws.com/squareImage.jpeg`;
  const res = await CApi.functional.connector.google_ads.campaigns.ads.appendAd(
    connection,
    {
      secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
      customerId: "8655555186",
      campaignResourceName,
      type: "DISPLAY_STANDARD",
      finalUrl: "https://wrtn.ai",
      longHeadline: "구글 디스플레이 광고 생성 테스트",
      headlines: ["가나다", "라마바", "사아자"],
      descriptions: ["차카", "타파"],
      keywords: ["키워드1", "키워드2"],
      businessName: "카카수 컴퍼니",
      landscapeImages: [landscapeImage],
      logoImages: [squareImage], // 로고도 1:1 이미지이기 때문에 그냥 정방형 이미지를 함께 사용해서 테스트한다.
      squareImages: [squareImage],
    },
  );

  typia.assert(res);
};
