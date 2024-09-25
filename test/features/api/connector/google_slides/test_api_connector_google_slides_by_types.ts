import CApi from "@wrtn/connector-api/lib/index";

import axios from "axios";
import { randomUUID } from "crypto";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { AwsProvider } from "../../../../../src/providers/connector/aws/AwsProvider";
import { GoogleSlidesProvider } from "../../../../../src/providers/connector/google_slides/GoogleSlidesProvider";
import { GoogleProvider } from "../../../../../src/providers/internal/google/GoogleProvider";

export const test_api_connector_google_slides_append_image_slide_by_type =
  async (connection: CApi.IConnection) => {
    const presentation =
      await CApi.functional.connector.google_slides.presentations.createPresentation(
        connection,
        {
          secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
          title: `${randomUUID()} - random presentation`,
        },
      );

    const testImage = `https://dev-studio-pro.s3.amazonaws.com/connector/generate-story-copy/f42e4450-3064-43d1-b973-2c913f08581a`;

    await CApi.functional.connector.google_slides.presentations.slides.verticals.appendVerticalImageSlide(
      connection,
      presentation.presentationId as string,
      {
        secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
        templates: [
          {
            contents: { text: { text: "Vertical" }, url: testImage },
          },
        ],
      },
    );

    await CApi.functional.connector.google_slides.presentations.slides.squares.appendSquareImageSlide(
      connection,
      presentation.presentationId as string,
      {
        secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
        templates: [
          {
            contents: { text: { text: "Square" }, url: testImage },
          },
        ],
      },
    );

    await CApi.functional.connector.google_slides.presentations.slides.landscapes.appendLandscapeImageSlide(
      connection,
      presentation.presentationId as string,
      {
        secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
        templates: [
          {
            contents: { text: { text: "Landscape" }, url: testImage },
          },
        ],
      },
    );

    await CApi.functional.connector.google_slides.presentations.slides.verticals.appendVerticalImageSlide(
      connection,
      presentation.presentationId as string,
      {
        secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
        templates: [
          {
            contents: { text: { text: "Entire" }, url: testImage },
          },
        ],
      },
    );

    await CApi.functional.connector.google_slides.presentations.slides.quarter_divisions.appendQuarterDivisionImageSlide(
      connection,
      presentation.presentationId as string,
      {
        secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
        templates: [
          {
            contents: [
              { text: { text: "QuarterDivision1" }, url: testImage },
              { text: { text: "QuarterDivision2" }, url: testImage },
              { text: { text: "QuarterDivision3" }, url: testImage },
              { text: { text: "QuarterDivision4" }, url: testImage },
            ],
          },
        ],
      },
    );
  };

export const test_api_connector_google_slides_fail_case_of_quarter_division_by_depcreated_connector =
  async () => {
    const googleProvider = new GoogleProvider();
    const awsProvider = new AwsProvider();
    const gs = new GoogleSlidesProvider(googleProvider, awsProvider);

    const response = await gs.transformUrl({
      secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
      templates: [
        {
          type: "QuarterDivision",
          contents: [
            {
              text: { text: "작업실의 평화" },
              url: `https://dev-studio-pro.s3.ap-northeast-2.amazonaws.com/connector/generate-image-node/sdxl-beta/1de2644a-7193-4ace-81ba-cbeb7a901bf5`,
            },
            {
              text: { text: "내면의 불꽃" },
              url: `https://dev-studio-pro.s3.ap-northeast-2.amazonaws.com/connector/generate-image-node/sdxl-beta/9947e221-d37b-4f18-91db-6a9f5f287f64`,
            },
            {
              text: { text: "낯선 소리" },
              url: `https://dev-studio-pro.s3.ap-northeast-2.amazonaws.com/connector/generate-image-node/sdxl-beta/dab59dfe-0c02-46cd-bc8a-b425b37295cc`,
            },
            {
              text: { text: "새로운 발견" },
              url: `https://dev-studio-pro.s3.ap-northeast-2.amazonaws.com/connector/generate-image-node/sdxl-beta/dab59dfe-0c02-46cd-bc8a-b425b37295cc`,
            },
          ],
        },
      ],
    });

    const urls = response.templates.flatMap((el) => {
      if (el.contents instanceof Array) {
        return el.contents.map((content) => content.url);
      }
      return [el.contents.url];
    });

    for await (const url of urls) {
      await axios.get(url);
    }
  };

export const test_api_connector_google_slides_fail_case_of_quarter_division =
  async (connection: CApi.IConnection) => {
    const presentation =
      await CApi.functional.connector.google_slides.presentations.createPresentation(
        connection,
        {
          secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
          title: `${randomUUID()} - random presentation`,
        },
      );

    const res =
      await CApi.functional.connector.google_slides.presentations.slides.quarter_divisions.appendQuarterDivisionImageSlide(
        connection,
        presentation.presentationId as string,
        {
          secretKey: ConnectorGlobal.env.GOOGLE_TEST_SECRET,
          templates: [
            {
              contents: [
                {
                  text: { text: "작업실의 평화" },
                  url: `https://dev-studio-pro.s3.ap-northeast-2.amazonaws.com/connector/generate-image-node/sdxl-beta/1de2644a-7193-4ace-81ba-cbeb7a901bf5`,
                },
                {
                  text: { text: "내면의 불꽃" },
                  url: `https://dev-studio-pro.s3.ap-northeast-2.amazonaws.com/connector/generate-image-node/sdxl-beta/9947e221-d37b-4f18-91db-6a9f5f287f64`,
                },
                {
                  text: { text: "낯선 소리" },
                  url: `https://dev-studio-pro.s3.ap-northeast-2.amazonaws.com/connector/generate-image-node/sdxl-beta/dab59dfe-0c02-46cd-bc8a-b425b37295cc`,
                },
                {
                  text: { text: "새로운 발견" },
                  url: `https://dev-studio-pro.s3.ap-northeast-2.amazonaws.com/connector/generate-image-node/sdxl-beta/dab59dfe-0c02-46cd-bc8a-b425b37295cc`,
                },
              ],
            },
          ],
        },
      );

    typia.assert(res);
  };
