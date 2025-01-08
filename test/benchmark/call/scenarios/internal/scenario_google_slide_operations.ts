import ConnectorApi from "@wrtnio/connector-api";

import { ILlmBenchmarkOperation } from "../../structures/ILlmBenchmarkOperation";

export const scenario_google_slide_operations =
  (): ILlmBenchmarkOperation[] => [
    {
      type: "standalone",
      function:
        ConnectorApi.functional.connector.google_slides.presentations
          .createPresentation,
      required: true,
    },
    {
      type: "union",
      elements: [
        ConnectorApi.functional.connector.google_slides.presentations.slides
          .entires.appendEntireImageSlide,
        ConnectorApi.functional.connector.google_slides.presentations.slides
          .landscapes.appendLandscapeImageSlide,
        ConnectorApi.functional.connector.google_slides.presentations.slides
          .quarter_divisions.appendQuarterDivisionImageSlide,
        ConnectorApi.functional.connector.google_slides.presentations.slides
          .squares.appendSquareImageSlide,
        ConnectorApi.functional.connector.google_slides.presentations.slides
          .verticals.appendVerticalImageSlide,
        ConnectorApi.functional.connector.google_slides.presentations
          .image_slide.appendImageSlide,
      ].map((func) => ({
        type: "standalone",
        function: func,
        required: true,
      })),
      required: true,
    },
  ];
