import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

export const test_api_kakao_talk_text_memo = async (
  connection: CApi.IConnection,
) => {
  /**
   * 액세스 토큰 갱신.
   */
  const res = await CApi.functional.connector.kakao_talk.refresh(connection, {
    refresh_token: ConnectorGlobal.env.KAKAO_TALK_TEST_REFRESH_TOKEN,
  });

  typia.assertEquals(res);

  /**
   * 텍스트 메시지 발송.
   */
  const sendTextForm = await CApi.functional.connector.kakao_talk.memo(
    connection,
    {
      secretKey: res.access_token,
      template_object: {
        object_type: "text",
        text: "텍스트 영역입니다. 최대 200자 표시 가능합니다.",
        link: {
          web_url: "https://developers.kakao.com",
          mobile_web_url: "https://developers.kakao.com",
        },
      },
    },
  );

  typia.assertEquals(sendTextForm);
};

export const test_api_kakao_talk_feed_memo = async (
  connection: CApi.IConnection,
) => {
  /**
   * 액세스 토큰 갱신.
   */
  const res = await CApi.functional.connector.kakao_talk.refresh(connection, {
    refresh_token: ConnectorGlobal.env.KAKAO_TALK_TEST_REFRESH_TOKEN,
  });

  typia.assertEquals(res);

  /**
   * 피드 메시지 발송.
   */
  const sendTextForm = await CApi.functional.connector.kakao_talk.memo(
    connection,
    {
      secretKey: res.access_token,
      template_object: {
        object_type: "feed",
        content: {
          title: "오늘의 디저트",
          description: "아메리카노, 빵, 케익",
          image_url:
            "https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg",
          image_width: 640,
          image_height: 640,
          link: {
            web_url: "http://www.daum.net",
            mobile_web_url: "http://m.daum.net",
            android_execution_params: "contentId=100",
            ios_execution_params: "contentId=100",
          },
        },
        item_content: {
          profile_text: "Kakao",
          profile_image_url:
            "https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
          title_image_url:
            "https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
          title_image_text: "Cheese cake",
          title_image_category: "Cake",
          items: [
            {
              item: "Cake1",
              item_op: "1000원",
            },
            {
              item: "Cake2",
              item_op: "2000원",
            },
            {
              item: "Cake3",
              item_op: "3000원",
            },
            {
              item: "Cake4",
              item_op: "4000원",
            },
            {
              item: "Cake5",
              item_op: "5000원",
            },
          ],
          sum: "Total",
          sum_op: "15000원",
        },
        social: {
          like_count: 100,
          comment_count: 200,
          shared_count: 300,
          view_count: 400,
          subscriber_count: 500,
        },
        buttons: [
          {
            title: "웹으로 이동",
            link: {
              web_url: "http://www.daum.net",
              mobile_web_url: "http://m.daum.net",
            },
          },
          {
            title: "앱으로 이동",
            link: {
              android_execution_params: "contentId=100",
              ios_execution_params: "contentId=100",
            },
          },
        ],
      },
    },
  );

  typia.assertEquals(sendTextForm);
};

export const test_api_kakao_talk_get_calendars = async (
  connection: CApi.IConnection,
) => {
  /**
   * 액세스 토큰 갱신.
   */
  const res = await CApi.functional.connector.kakao_talk.refresh(connection, {
    refresh_token: ConnectorGlobal.env.KAKAO_TALK_TEST_REFRESH_TOKEN,
  });

  typia.assertEquals(res);

  const calendarInfo =
    await CApi.functional.connector.kakao_talk.get_calendars.getCalendars(
      connection,
      {
        secretKey: res.access_token,
      },
    );

  typia.assertEquals(calendarInfo);
};
