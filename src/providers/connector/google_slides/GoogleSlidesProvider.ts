import { Injectable } from "@nestjs/common";
import axios from "axios";
import typia from "typia";
import { v4 } from "uuid";

import { IGoogleSlides } from "@wrtn/connector-api/lib/structures/connector/google_slides/IGoogleSlides";

import { GoogleProvider } from "../../internal/google/GoogleProvider";
import { AwsProvider } from "../aws/AwsProvider";

@Injectable()
export class GoogleSlidesProvider {
  private readonly uploadPrefix: string = "google-slides-connector";
  constructor(
    private readonly googleProvider: GoogleProvider,
    private readonly awsProvider: AwsProvider,
  ) {}

  async createHanshow(
    presentationId: string,
    input: IGoogleSlides.IExportPresentationInput,
  ): Promise<IGoogleSlides.IExportHanshowOutput> {
    try {
      const accessToken = await this.googleProvider.refreshAccessToken(
        input.secretKey,
      );

      const mimeType = `application/vnd.openxmlformats-officedocument.presentationml.presentation`;
      const url = `https://www.googleapis.com/drive/v3/files/${presentationId}/export?mimeType=${mimeType}`;
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: "arraybuffer",
      });

      const hanshow = await this.awsProvider.uploadObject({
        contentType: mimeType,
        data: res.data,
        key: `${this.uploadPrefix}/${v4()}.show`,
      });
      return { hanshow };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async createPowerPoint(
    presentationId: string,
    input: IGoogleSlides.IExportPresentationInput,
  ): Promise<IGoogleSlides.IExportPresentationOutput> {
    try {
      const accessToken = await this.googleProvider.refreshAccessToken(
        input.secretKey,
      );

      const mimeType = `application/vnd.openxmlformats-officedocument.presentationml.presentation`;
      const url = `https://www.googleapis.com/drive/v3/files/${presentationId}/export?mimeType=${mimeType}`;
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: "arraybuffer",
      });

      const powerPoint = await this.awsProvider.uploadObject({
        contentType: mimeType,
        data: res.data,
        key: `${this.uploadPrefix}/${v4()}.pptx`,
      });
      return { powerPoint };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getPresentation(
    input: IGoogleSlides.IGetPresentationInput,
  ): Promise<IGoogleSlides.ISimplePresentationIdOutput> {
    try {
      const { secretKey, presentationId } = input;
      const accessToken =
        await this.googleProvider.refreshAccessToken(secretKey);

      const res = await axios.get(
        `https://slides.googleapis.com/v1/presentations/${presentationId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const data: IGoogleSlides.Presentation = res.data;
      return {
        presentationId: data.presentationId,
        pageSize: data.pageSize,
        title: data.title,
      };
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  // NOTE: quick fix for s3 urls - need a more centralized solution
  async transformUrl(
    input: IGoogleSlides.AppendSlideInput,
  ): Promise<IGoogleSlides.AppendSlideInput> {
    let stringified = JSON.stringify(input);

    // if there are s3 buckets urls, get presigned url
    const matches = JSON.stringify(input).match(
      /https?:\/\/([^.]+)\.s3(?:\.([^.]+))?\.amazonaws\.com\/([\p{L}\p{N}\/.-]+)/gu,
    );

    if (!matches) {
      return input;
    }

    const transformed = await Promise.all(
      matches.map(async (match) => this.awsProvider.getGetObjectUrl(match)),
    );

    matches.forEach((match, index) => {
      stringified = stringified.replace(match, transformed[index]);
    });

    return typia.assert<IGoogleSlides.AppendSlideInput>(
      JSON.parse(stringified),
    );
  }

  async appendImageSlide(
    presentationId: string,
    input: IGoogleSlides.AppendSlideInput,
  ): Promise<IGoogleSlides.ISimplePresentationIdOutput> {
    try {
      input = await this.transformUrl(input);
      const { secretKey, templates } = input;
      const accessToken =
        await this.googleProvider.refreshAccessToken(secretKey);

      const presentation = await this.getPresentation({
        presentationId,
        secretKey: input.secretKey,
      });

      const heightMagnitude = presentation.pageSize?.height
        ?.magnitude as number;
      const heightUnit = presentation.pageSize?.height?.unit;
      const widthMagnitude = presentation.pageSize?.width?.magnitude as number;
      const widthUnit = presentation.pageSize?.width?.unit;

      const body: Pick<IGoogleSlides.IUpdatePresentationInput, "requests"> = {
        requests: templates
          .flatMap((template): IGoogleSlides.BatchUpdateInput[] => {
            if (template.type === "Vertical") {
              const slideId = v4();
              const imageId = v4();
              const shapeId = v4();

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
                          magnitude: heightMagnitude,
                          unit: heightUnit,
                        },
                        width: {
                          magnitude: widthMagnitude / 2,
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
                          magnitude: heightMagnitude,
                          unit: heightUnit,
                        },
                        width: {
                          magnitude: widthMagnitude / 2,
                          unit: widthUnit,
                        },
                      },
                      transform: {
                        translateX: widthMagnitude / 2,
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
            } else if (template.type === "Square") {
              const slideId = v4();
              const imageId = v4();
              const shapeId = v4();

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
                          magnitude: heightMagnitude,
                          unit: heightUnit,
                        },
                        width: {
                          magnitude: heightMagnitude,
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
                          magnitude: heightMagnitude,
                          unit: heightUnit,
                        },
                        width: {
                          magnitude: widthMagnitude - heightMagnitude,
                          unit: widthUnit,
                        },
                      },
                      transform: {
                        translateX: heightMagnitude,
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
            } else if (template.type === "Landscape") {
              const slideId = v4();
              const imageId = v4();
              const shapeId = v4();

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
                          magnitude: heightMagnitude * 0.75,
                          unit: heightUnit,
                        },
                        width: {
                          magnitude: widthMagnitude,
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
                          magnitude: heightMagnitude * 0.25,
                          unit: heightUnit,
                        },
                        width: {
                          magnitude: widthMagnitude,
                          unit: widthUnit,
                        },
                      },
                      transform: {
                        translateX: 0,
                        translateY: heightMagnitude * 0.75,
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
            } else if (template.type === "Entire") {
              const slideId = v4();
              const imageId = v4();

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
                          magnitude: heightMagnitude,
                          unit: heightUnit,
                        },
                        width: {
                          magnitude: widthMagnitude,
                          unit: widthUnit,
                        },
                      },
                    },
                    url: template.contents.url,
                  },
                },
              ];
            } else if (template.type === "QuarterDivision") {
              const slideId = v4();
              const firstImageId = v4();
              const firstShapeId = v4();

              const secondImageId = v4();
              const secondShapeId = v4();

              const thirdImageId = v4();
              const thirdShapeId = v4();

              const fourthImageId = v4();
              const fourthShapeId = v4();

              const imageWidthSize = widthMagnitude * 0.25;
              const imageHeightSize = widthMagnitude * 0.25;
              const textBoxWidthSize = imageWidthSize * 0.75;
              const blank = {
                width:
                  (widthMagnitude - (imageWidthSize + textBoxWidthSize) * 2) /
                  3,
                height: (heightMagnitude - imageHeightSize * 2) / 3,
              };

              return [
                /**
                 * 1번 이미지와 텍스트 필드.
                 */
                {
                  createSlide: {
                    objectId: slideId,
                  },
                },
                {
                  createImage: {
                    objectId: firstImageId,
                    elementProperties: {
                      pageObjectId: slideId,
                      size: {
                        height: {
                          magnitude: imageWidthSize,
                          unit: heightUnit,
                        },
                        width: {
                          magnitude: imageHeightSize,
                          unit: widthUnit,
                        },
                      },
                      transform: {
                        translateX: blank.width,
                        translateY: blank.height,
                        scaleX: 1,
                        scaleY: 1,
                        shearX: 0,
                        shearY: 0,
                        unit: widthUnit,
                      },
                    },
                    url: template.contents[0].url,
                  },
                },
                {
                  createShape: {
                    objectId: firstShapeId,
                    elementProperties: {
                      pageObjectId: slideId,
                      size: {
                        height: {
                          magnitude: imageHeightSize,
                          unit: heightUnit,
                        },
                        width: {
                          magnitude: textBoxWidthSize,
                          unit: widthUnit,
                        },
                      },
                      transform: {
                        translateX: blank.width + imageWidthSize,
                        translateY: blank.height,
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
                    text: template.contents[0].text.text,
                    objectId: firstShapeId,
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
                    objectId: firstShapeId,
                  },
                },

                /**
                 * 2번 이미지와 텍스트 필드.
                 */
                {
                  createImage: {
                    objectId: secondImageId,
                    elementProperties: {
                      pageObjectId: slideId,
                      size: {
                        height: {
                          magnitude: imageWidthSize,
                          unit: heightUnit,
                        },
                        width: {
                          magnitude: imageHeightSize,
                          unit: widthUnit,
                        },
                      },
                      transform: {
                        translateX:
                          blank.width +
                          imageWidthSize +
                          textBoxWidthSize +
                          blank.width,
                        translateY: blank.height,
                        scaleX: 1,
                        scaleY: 1,
                        shearX: 0,
                        shearY: 0,
                        unit: widthUnit,
                      },
                    },
                    url: template.contents[0].url,
                  },
                },
                {
                  createShape: {
                    objectId: secondShapeId,
                    elementProperties: {
                      pageObjectId: slideId,
                      size: {
                        height: {
                          magnitude: imageHeightSize,
                          unit: heightUnit,
                        },
                        width: {
                          magnitude: textBoxWidthSize,
                          unit: widthUnit,
                        },
                      },
                      transform: {
                        translateX:
                          blank.width +
                          imageWidthSize +
                          imageWidthSize +
                          textBoxWidthSize +
                          blank.width,
                        translateY: blank.height,
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
                    text: template.contents[0].text.text,
                    objectId: secondShapeId,
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
                    objectId: secondShapeId,
                  },
                },

                /**
                 * 3번 이미지와 텍스트 필드.
                 */
                {
                  createImage: {
                    objectId: thirdImageId,
                    elementProperties: {
                      pageObjectId: slideId,
                      size: {
                        height: {
                          magnitude: imageWidthSize,
                          unit: heightUnit,
                        },
                        width: {
                          magnitude: imageHeightSize,
                          unit: widthUnit,
                        },
                      },
                      transform: {
                        translateX: blank.width,
                        translateY:
                          blank.height + imageHeightSize + blank.height,
                        scaleX: 1,
                        scaleY: 1,
                        shearX: 0,
                        shearY: 0,
                        unit: widthUnit,
                      },
                    },
                    url: template.contents[0].url,
                  },
                },
                {
                  createShape: {
                    objectId: thirdShapeId,
                    elementProperties: {
                      pageObjectId: slideId,
                      size: {
                        height: {
                          magnitude: imageHeightSize,
                          unit: heightUnit,
                        },
                        width: {
                          magnitude: textBoxWidthSize,
                          unit: widthUnit,
                        },
                      },
                      transform: {
                        translateX: blank.width + imageWidthSize,
                        translateY:
                          blank.height + imageHeightSize + blank.height,
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
                    text: template.contents[0].text.text,
                    objectId: thirdShapeId,
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
                    objectId: thirdShapeId,
                  },
                },

                /**
                 * 4번째 이미지와 텍스트 필드.
                 */
                {
                  createImage: {
                    objectId: fourthImageId,
                    elementProperties: {
                      pageObjectId: slideId,
                      size: {
                        height: {
                          magnitude: imageWidthSize,
                          unit: heightUnit,
                        },
                        width: {
                          magnitude: imageHeightSize,
                          unit: widthUnit,
                        },
                      },
                      transform: {
                        translateX:
                          blank.width +
                          imageWidthSize +
                          textBoxWidthSize +
                          blank.width,
                        translateY:
                          blank.height + imageHeightSize + blank.height,
                        scaleX: 1,
                        scaleY: 1,
                        shearX: 0,
                        shearY: 0,
                        unit: widthUnit,
                      },
                    },
                    url: template.contents[0].url,
                  },
                },
                {
                  createShape: {
                    objectId: fourthShapeId,
                    elementProperties: {
                      pageObjectId: slideId,
                      size: {
                        height: {
                          magnitude: imageHeightSize,
                          unit: heightUnit,
                        },
                        width: {
                          magnitude: textBoxWidthSize,
                          unit: widthUnit,
                        },
                      },
                      transform: {
                        translateX:
                          blank.width +
                          imageWidthSize +
                          imageWidthSize +
                          textBoxWidthSize +
                          blank.width,
                        translateY:
                          blank.height + imageHeightSize + blank.height,
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
                    text: template.contents[0].text.text,
                    objectId: fourthShapeId,
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
                    objectId: fourthShapeId,
                  },
                },
              ];
            }

            return null!;
          })
          .filter(Boolean),
      };

      const res = await axios.post(
        `https://slides.googleapis.com/v1/presentations/${presentationId}:batchUpdate`,
        body,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const data: IGoogleSlides.Presentation = res.data;
      return {
        presentationId: data.presentationId,
        pageSize: data.pageSize,
        title: data.title,
      };
    } catch (err) {
      console.error(JSON.stringify(err));
      throw err;
    }
  }

  async createPresentation(
    input: IGoogleSlides.ICreatePresentationInput,
  ): Promise<IGoogleSlides.ISimplePresentationIdOutput> {
    try {
      const accessToken = await this.googleProvider.refreshAccessToken(
        input.secretKey,
      );

      const res = await axios.post(
        "https://slides.googleapis.com/v1/presentations",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const data: IGoogleSlides.Presentation = res.data;
      return {
        presentationId: data.presentationId,
        pageSize: data.pageSize,
        title: data.title,
      };
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }
}
