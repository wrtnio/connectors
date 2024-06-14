import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IGoogleSlides } from "@wrtn/connector-api/lib/structures/connector/google_slides/IGoogleSlides";

import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

const createPresentationName = () => {
  // 현재 시간을 나타내는 Date 객체 생성
  const currentDate = new Date();

  // 한국 표준시(UTC+9)와 로컬 시간과의 차이(분) 계산
  const offset = 9 * 60; // 한국 표준시는 UTC+9
  const localOffset = currentDate.getTimezoneOffset(); // 로컬 시간과 UTC와의 차이(분)
  const koreanOffset = offset + localOffset; // 한국 표준시와 로컬 시간과의 차이(분)

  // 한국 표준시(UTC+9)로 현재 시간 설정
  const koreanTime = new Date(currentDate.getTime() + koreanOffset * 60 * 1000);

  // 한국 표준시를 출력하기 위해 각 부분 추출
  const year = koreanTime.getFullYear();
  const month = koreanTime.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더함
  const day = koreanTime.getDate();
  const hours = koreanTime.getHours();
  const minutes = koreanTime.getMinutes();
  const seconds = koreanTime.getSeconds();

  return (
    year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds
  );
};

/**
 * 어떤 파라미터를 넣든 간에 presentationId를 제외한 다른 body 데이터는 무시되고 빈 프레젠테이션이 생성된다.
 * @param connection
 */
export const test_api_connector_google_slides_create_presentation = async (
  connection: CApi.IConnection,
) => {
  /**
   * create a new Google Slides Presentation.
   */
  const res =
    await CApi.functional.connector.google_slides.presentations.createPresentation(
      connection,
      {
        secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
        pageSize: {
          width: {
            magnitude: 9_144_000,
            unit: "EMU",
          },
          height: {
            magnitude: 6_858_000,
            unit: "EMU",
          },
        },
        slides: [],
        title: `${createPresentationName()} - no slides`,
        masters: [],
        layouts: [],
        locale: "ko",
      },
    );

  typia.assertEquals(res);
};

/**
 * 어떤 파라미터를 넣든 간에 presentationId를 제외한 다른 body 데이터는 무시되고 빈 프레젠테이션이 생성된다.
 * @param connection
 */
export const test_api_connector_google_slides_create_presentation_with_one_slide =
  async (connection: CApi.IConnection) => {
    const PresentationName = `${createPresentationName()} - with one slide`;
    /**
     * create a new Google Slides Presentation.
     */
    const res =
      await CApi.functional.connector.google_slides.presentations.createPresentation(
        connection,
        {
          secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
          pageSize: {
            width: {
              magnitude: 9_144_000,
              unit: "EMU",
            },
            height: {
              magnitude: 6_858_000,
              unit: "EMU",
            },
          },
          slides: [
            {
              pageType: "MASTER",
              objectId: `${PresentationName} - objectId`,
              masterProperties: {
                displayName: `${PresentationName} - displayName`,
              },
              pageElements: [
                {
                  description: `${PresentationName} - page0 - description`,
                  image: {
                    contentUrl: "",
                    imageProperties: {},
                  },
                  objectId: "",
                  size: {
                    height: {
                      unit: "EMU",
                    },
                    width: {
                      unit: "EMU",
                    },
                  },
                  transform: {
                    scaleX: 1,
                    scaleY: 1,
                    unit: "EMU",
                  },
                },
              ],
              pageProperties: {},
            },
          ],
          title: PresentationName,
          masters: [],
          layouts: [],
          locale: "ko",
        },
      );

    typia.assertEquals(res);
  };

/**
 * 어떤 파라미터를 넣든 간에 presentationId를 제외한 다른 body 데이터는 무시되고 빈 프레젠테이션이 생성된다.
 * @param connection
 */
export const test_api_connector_google_slides_create_random_presentation =
  async (connection: CApi.IConnection) => {
    /**
     * create a new Google Slides Presentation.
     */
    const random = typia.random<IGoogleSlides.ICreatePresentationInput>();
    const res =
      await CApi.functional.connector.google_slides.presentations.createPresentation(
        connection,
        {
          ...random,
          secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
          title: `${createPresentationName()} - random presentation`,
        },
      );

    typia.assertEquals(res);

    return res;
  };

export const test_api_connector_google_slides_get_one_presentation = async (
  connection: CApi.IConnection,
) => {
  const createdPresentation =
    await test_api_connector_google_slides_create_random_presentation(
      connection,
    );

  if (!createdPresentation.presentationId) {
    throw new Error("생성 단계에서 실패하여 조회 로직 실패");
  }

  const presentation =
    await CApi.functional.connector.google_slides.get_presentations.getPresentation(
      connection,
      {
        secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
        presentationId: createdPresentation.presentationId,
      },
    );

  typia.assertEquals(presentation);
};
