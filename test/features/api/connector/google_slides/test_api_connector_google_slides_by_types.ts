import CApi from "@wrtn/connector-api/lib/index";

import { randomUUID } from "crypto";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";

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
