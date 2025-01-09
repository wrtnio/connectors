import { GoogleSlidesController } from "../../../../../src/controllers/connector/google_slides/GoogleSlidesController";
import { IFunctionCallBenchmarkExpected } from "../../structures/IFunctionCallBenchmarkExpected";

export const scenario_google_slide_operations =
  (): IFunctionCallBenchmarkExpected.IArray => ({
    type: "array",
    items: [
      {
        type: "standalone",
        function: GoogleSlidesController.prototype.createPresentation,
      },
      {
        type: "anyOf",
        anyOf: [
          GoogleSlidesController.prototype.appendEntireImageSlide,
          GoogleSlidesController.prototype.appendLandscapeImageSlide,
          GoogleSlidesController.prototype.appendQuarterDivisionImageSlide,
          GoogleSlidesController.prototype.appendSquareImageSlide,
          GoogleSlidesController.prototype.appendVerticalImageSlide,
          GoogleSlidesController.prototype.appendImageSlide,
        ].map((func) => ({
          type: "standalone",
          function: func,
        })),
      },
    ],
  });
