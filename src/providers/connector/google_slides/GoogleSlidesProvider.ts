import { Injectable } from "@nestjs/common";
import axios from "axios";
import typia from "typia";
import { v4 } from "uuid";

import { IGoogleSlides } from "@wrtn/connector-api/lib/structures/connector/google_slides/IGoogleSlides";

import { GoogleProvider } from "../../internal/google/GoogleProvider";

@Injectable()
export class GoogleSlidesProvider {
  constructor(private readonly googleProvider: GoogleProvider) {}

  async getPresentation(
    input: IGoogleSlides.IGetPresentationInput,
  ): Promise<IGoogleSlides.Presentation> {
    try {
      const { secretKey, presentationId } = input;
      const accessToken = await this.googleProvider.refreshAccessToken(
        secretKey,
      );

      const res = await axios.get(
        `https://slides.googleapis.com/v1/presentations/${presentationId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return res.data;
    } catch (err) {
      if (typia.is<GoogleProvider.GoogleError>(err)) {
        this.googleProvider.error(err);
      }

      throw err;
    }
  }

  async appendImageSlide(
    presentationId: string,
    input: IGoogleSlides.AppendSlideInput,
  ): Promise<IGoogleSlides.Presentation> {
    try {
      const { secretKey, templates } = input;
      const accessToken = await this.googleProvider.refreshAccessToken(
        secretKey,
      );

      const presentation = await this.getPresentation({
        presentationId,
        secretKey: input.secretKey,
      });

      const heightMagnitude = presentation.pageSize?.height?.magnitude;
      const heightUnit = presentation.pageSize?.height?.unit;
      const widthMagnitude = presentation.pageSize?.width?.magnitude;
      const widthUnit = presentation.pageSize?.width?.unit;

      const body: Pick<IGoogleSlides.IUpdatePresentationInput, "requests"> = {
        requests: templates
          .flatMap((template): IGoogleSlides.BatchUpdateInput[] => {
            const slideId = v4();
            const imageId = v4();
            const shapeId = v4();
            if (template.type === "Vertical") {
              return [
                {
                  createSlide: {
                    objectId: slideId,
                  },
                },
                {
                  createImage: {
                    objectId: imageId,
                    elementProperties: {
                      pageObjectId: slideId,
                      size: {
                        height: {
                          magnitude: heightMagnitude ?? 0,
                          unit: heightUnit,
                        },
                        width: {
                          magnitude: (widthMagnitude ?? 0) / 2,
                          unit: widthUnit,
                        },
                      },
                    },
                    url: template.contents.url,
                  },
                },
                {
                  createShape: {
                    objectId: shapeId,
                    elementProperties: {
                      pageObjectId: slideId,
                      size: {
                        height: {
                          magnitude: heightMagnitude ?? 0,
                          unit: heightUnit,
                        },
                        width: {
                          magnitude: (widthMagnitude ?? 0) / 2,
                          unit: widthUnit,
                        },
                      },
                      transform: {
                        translateX: (widthMagnitude ?? 0) / 2,
                        translateY: 0,
                        scaleX: 1,
                        scaleY: 1,
                        shearX: 0,
                        shearY: 0,
                        unit: widthUnit,
                      },
                    },
                    shapeType: "TEXT_BOX",
                  },
                },
                {
                  insertText: {
                    text: template.contents.text.text,
                    objectId: shapeId,
                  },
                },
                {
                  updateTextStyle: {
                    fields: "*",
                    style: {
                      baselineOffset: "SUPERSCRIPT",
                      fontFamily: "Arial",
                      fontSize: {
                        magnitude: 18,
                        unit: "PT",
                      },
                    },
                    objectId: shapeId,
                  },
                },
              ];
            }
            //  else if (template.type === "Square") {
            //   return [
            //     {
            //       createSlide: {
            //         objectId: slideId,
            //       },
            //       createImage: {
            //         objectId: v4(),
            //         elementProperties: {
            //           pageObjectId: slideId,
            //           size: {
            //             height: { magnitude: 1000 },
            //             width: { magnitude: 1000 },
            //           },
            //         },
            //         url: template.contents.url,
            //       },
            //       // createText: {},
            //     },
            //   ];
            // } else if (template.type === "Landscape") {
            //   return [
            //     {
            //       createSlide: {
            //         objectId: slideId,
            //       },
            //       createImage: {
            //         objectId: v4(),
            //         elementProperties: {
            //           pageObjectId: slideId,
            //           size: {
            //             height: { magnitude: 1000 },
            //             width: { magnitude: 1000 },
            //           },
            //         },
            //         url: template.contents.url,
            //       },
            //       // createText: {},
            //     },
            //   ];
            // } else if (template.type === "Entire") {
            //   return [
            //     {
            //       createSlide: {
            //         objectId: slideId,
            //       },
            //       createImage: {
            //         objectId: v4(),
            //         elementProperties: {
            //           pageObjectId: slideId,
            //           size: {
            //             height: { magnitude: 1000 },
            //             width: { magnitude: 1000 },
            //           },
            //         },
            //         url: template.contents.url,
            //       },
            //       // createText: {},
            //     },
            //   ];
            // } else if (template.type === "QuarterDivision") {
            //   return [
            //     {
            //       createSlide: {
            //         objectId: slideId,
            //       },
            //       createImage: {
            //         objectId: v4(),
            //         elementProperties: {
            //           pageObjectId: slideId,
            //           size: {
            //             height: { magnitude: 1000 },
            //             width: { magnitude: 1000 },
            //           },
            //         },
            //         url: template.contents[0].url,
            //       },
            //       // createText: {},
            //     },
            //   ];
            // } else if (template.type === "SixthDivision") {
            //   return [
            //     {
            //       createSlide: {
            //         objectId: slideId,
            //       },
            //       createImage: {
            //         objectId: v4(),
            //         elementProperties: {
            //           pageObjectId: slideId,
            //           size: {
            //             height: { magnitude: 1000 },
            //             width: { magnitude: 1000 },
            //           },
            //         },
            //         url: template.contents[0].url,
            //       },
            //       // createText: {},
            //     },
            //   ];
            // } else if (template.type === "Exhibition") {
            //   return [
            //     {
            //       createSlide: {
            //         objectId: slideId,
            //       },
            //       createImage: {
            //         objectId: v4(),
            //         elementProperties: {
            //           pageObjectId: slideId,
            //           size: {
            //             height: { magnitude: 1000 },
            //             width: { magnitude: 1000 },
            //           },
            //         },
            //         url: template.contents.url[0],
            //       },
            //       // createText: {},
            //     },
            //   ];
            // } else if (template.type === "Corner") {
            //   return [
            //     {
            //       createSlide: {
            //         objectId: slideId,
            //       },
            //       createImage: {
            //         objectId: v4(),
            //         elementProperties: {
            //           pageObjectId: slideId,
            //           size: {
            //             height: { magnitude: 1000 },
            //             width: { magnitude: 1000 },
            //           },
            //         },
            //         url: template.contents.url[0],
            //       },
            //       // createText: {},
            //     },
            //   ];
            // } else {
            //   return [
            //     {
            //       createSlide: {
            //         objectId: slideId,
            //       },
            //       createImage: {
            //         objectId: v4(),
            //         elementProperties: {
            //           pageObjectId: slideId,
            //           size: {
            //             height: { magnitude: 1000 },
            //             width: { magnitude: 1000 },
            //           },
            //         },
            //         url: template.contents.url[0],
            //       },
            //       // createText: {},
            //     },
            //   ];
            // }

            return null!;
          })
          .filter(Boolean),
      };

      console.log(JSON.stringify(body, null, 2));
      const res = await axios.post(
        `https://slides.googleapis.com/v1/presentations/${presentationId}:batchUpdate`,
        body,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return res.data;
    } catch (err) {
      if (typia.is<GoogleProvider.GoogleError>(err)) {
        this.googleProvider.error(err);
      }

      throw err;
    }
  }

  async createPresentation(
    input: IGoogleSlides.ICreatePresentationInput,
  ): Promise<IGoogleSlides.Presentation> {
    try {
      const { secretKey, ...body } = input;
      const accessToken = await this.googleProvider.refreshAccessToken(
        secretKey,
      );

      const res = await axios.post(
        "https://slides.googleapis.com/v1/presentations",
        body,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return res.data;
    } catch (err) {
      if (typia.is<GoogleProvider.GoogleError>(err)) {
        this.googleProvider.error(err);
      }

      throw err;
    }
  }
}
