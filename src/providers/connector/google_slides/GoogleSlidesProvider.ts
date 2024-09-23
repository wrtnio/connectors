import { Injectable } from "@nestjs/common";
import axios from "axios";
import typia from "typia";
import { v4 } from "uuid";

import { IGoogleSlides } from "@wrtn/connector-api/lib/structures/connector/google_slides/IGoogleSlides";

import { GoogleProvider } from "../../internal/google/GoogleProvider";
import { OAuthSecretProvider } from "../../internal/oauth_secret/OAuthSecretProvider";
import { IOAuthSecret } from "../../internal/oauth_secret/structures/IOAuthSecret";
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
      const token = await this.getToken(input.secretKey);
      const accessToken = await this.googleProvider.refreshAccessToken(token);

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
      const token = await this.getToken(input.secretKey);
      const accessToken = await this.googleProvider.refreshAccessToken(token);

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
      const token = await this.getToken(secretKey);
      const accessToken = await this.googleProvider.refreshAccessToken(token);

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
      /https?:\/\/([^.]+)\.s3(?:\.([^.]+))?\.amazonaws\.com\/([a-zA-Z0-9\/.\-_%]+)/gu,
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

  private createQuarterDivisionImageSlide(
    template: IGoogleSlides.Template.QuarterDivision,
    imageSize: {
      height: number; // heigh와 width의 크기가 같다.
      width: number;
      unit?: IGoogleSlides.Unit | null;
    },
  ): IGoogleSlides.BatchUpdateInput[] {
    const slideId = v4();
    const firstImageId = v4();
    const firstShapeId = v4();

    const secondImageId = v4();
    const secondShapeId = v4();

    const thirdImageId = v4();
    const thirdShapeId = v4();

    const fourthImageId = v4();
    const fourthShapeId = v4();

    const imageWidthSize = imageSize.width * 0.25;
    const imageHeightSize = imageSize.width * 0.25;
    const textBoxWidthSize = imageWidthSize * 0.75;
    const blank = {
      width: (imageSize.width - (imageWidthSize + textBoxWidthSize) * 2) / 3,
      height: (imageSize.height - imageHeightSize * 2) / 3,
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
                unit: imageSize.unit,
              },
              width: {
                magnitude: imageHeightSize,
                unit: imageSize.unit,
              },
            },
            transform: {
              translateX: blank.width,
              translateY: blank.height,
              scaleX: 1,
              scaleY: 1,
              shearX: 0,
              shearY: 0,
              unit: imageSize.unit,
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
                unit: imageSize.unit,
              },
              width: {
                magnitude: textBoxWidthSize,
                unit: imageSize.unit,
              },
            },
            transform: {
              translateX: blank.width + imageWidthSize,
              translateY: blank.height,
              scaleX: 1,
              scaleY: 1,
              shearX: 0,
              shearY: 0,
              unit: imageSize.unit,
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
                unit: imageSize.unit,
              },
              width: {
                magnitude: imageHeightSize,
                unit: imageSize.unit,
              },
            },
            transform: {
              translateX:
                blank.width + imageWidthSize + textBoxWidthSize + blank.width,
              translateY: blank.height,
              scaleX: 1,
              scaleY: 1,
              shearX: 0,
              shearY: 0,
              unit: imageSize.unit,
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
                unit: imageSize.unit,
              },
              width: {
                magnitude: textBoxWidthSize,
                unit: imageSize.unit,
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
              unit: imageSize.unit,
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
                unit: imageSize.unit,
              },
              width: {
                magnitude: imageHeightSize,
                unit: imageSize.unit,
              },
            },
            transform: {
              translateX: blank.width,
              translateY: blank.height + imageHeightSize + blank.height,
              scaleX: 1,
              scaleY: 1,
              shearX: 0,
              shearY: 0,
              unit: imageSize.unit,
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
                unit: imageSize.unit,
              },
              width: {
                magnitude: textBoxWidthSize,
                unit: imageSize.unit,
              },
            },
            transform: {
              translateX: blank.width + imageWidthSize,
              translateY: blank.height + imageHeightSize + blank.height,
              scaleX: 1,
              scaleY: 1,
              shearX: 0,
              shearY: 0,
              unit: imageSize.unit,
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
                unit: imageSize.unit,
              },
              width: {
                magnitude: imageHeightSize,
                unit: imageSize.unit,
              },
            },
            transform: {
              translateX:
                blank.width + imageWidthSize + textBoxWidthSize + blank.width,
              translateY: blank.height + imageHeightSize + blank.height,
              scaleX: 1,
              scaleY: 1,
              shearX: 0,
              shearY: 0,
              unit: imageSize.unit,
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
                unit: imageSize.unit,
              },
              width: {
                magnitude: textBoxWidthSize,
                unit: imageSize.unit,
              },
            },
            transform: {
              translateX:
                blank.width +
                imageWidthSize +
                imageWidthSize +
                textBoxWidthSize +
                blank.width,
              translateY: blank.height + imageHeightSize + blank.height,
              scaleX: 1,
              scaleY: 1,
              shearX: 0,
              shearY: 0,
              unit: imageSize.unit,
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

  private createEntireImageSlide(
    template: IGoogleSlides.Template.Entire,
    imageSize: {
      height: number; // heigh와 width의 크기가 같다.
      width: number;
      unit?: IGoogleSlides.Unit | null;
    },
  ): IGoogleSlides.BatchUpdateInput[] {
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
                magnitude: imageSize.height,
                unit: imageSize.unit,
              },
              width: {
                magnitude: imageSize.width,
                unit: imageSize.unit,
              },
            },
          },
          url: template.contents.url,
        },
      },
    ];
  }

  private createLandscapeImageSlide(
    template: IGoogleSlides.Template.Landscape,
    imageSize: {
      height: number; // heigh와 width의 크기가 같다.
      width: number;
      unit?: IGoogleSlides.Unit | null;
    },
  ): IGoogleSlides.BatchUpdateInput[] {
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
                magnitude: imageSize.height * 0.75,
                unit: imageSize.unit,
              },
              width: {
                magnitude: imageSize.width,
                unit: imageSize.unit,
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
                magnitude: imageSize.height * 0.25,
                unit: imageSize.unit,
              },
              width: {
                magnitude: imageSize.width,
                unit: imageSize.unit,
              },
            },
            transform: {
              translateX: 0,
              translateY: imageSize.height * 0.75,
              scaleX: 1,
              scaleY: 1,
              shearX: 0,
              shearY: 0,
              unit: imageSize.unit,
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

  private createVerticalImageSlide(
    template: IGoogleSlides.Template.Vertical,
    imageSize: {
      height: number; // heigh와 width의 크기가 같다.
      width: number;
      unit?: IGoogleSlides.Unit | null;
    },
  ): IGoogleSlides.BatchUpdateInput[] {
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
                magnitude: imageSize.height,
                unit: imageSize.unit,
              },
              width: {
                magnitude: imageSize.width / 2,
                unit: imageSize.unit,
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
                magnitude: imageSize.height,
                unit: imageSize.unit,
              },
              width: {
                magnitude: imageSize.width / 2,
                unit: imageSize.unit,
              },
            },
            transform: {
              translateX: imageSize.width / 2,
              translateY: 0,
              scaleX: 1,
              scaleY: 1,
              shearX: 0,
              shearY: 0,
              unit: imageSize.unit,
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

  private createSqaureImageSlide(
    template: IGoogleSlides.Template.Square,
    imageSize: {
      height: number; // heigh와 width의 크기가 같다.
      width: number;
      unit?: IGoogleSlides.Unit | null;
    },
  ): IGoogleSlides.BatchUpdateInput[] {
    const slideId = v4();
    const imageId = v4();
    const shapeId = v4();

    return [
      { createSlide: { objectId: slideId } },
      {
        createImage: {
          objectId: imageId,
          elementProperties: {
            pageObjectId: slideId,
            size: {
              height: {
                magnitude: imageSize.height,
                unit: imageSize.unit,
              },
              width: {
                magnitude: imageSize.width,
                unit: imageSize.unit,
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
                magnitude: imageSize.height,
                unit: imageSize.unit,
              },
              width: {
                magnitude: imageSize.width - imageSize.height,
                unit: imageSize.unit,
              },
            },
            transform: {
              translateX: imageSize.height,
              translateY: 0,
              scaleX: 1,
              scaleY: 1,
              shearX: 0,
              shearY: 0,
              unit: imageSize.unit,
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

  async appendImageSlide(
    presentationId: string,
    input: IGoogleSlides.AppendSlideInput,
  ): Promise<IGoogleSlides.ISimplePresentationIdOutput> {
    try {
      input = await this.transformUrl(input);
      const { secretKey, templates } = input;
      const token = await this.getToken(secretKey);

      const accessToken = await this.googleProvider.refreshAccessToken(token);

      const presentation = await this.getPresentation({
        presentationId,
        secretKey: input.secretKey,
      });

      const heightMagnitude = presentation.pageSize?.height
        ?.magnitude as number;
      const unit = presentation.pageSize?.height?.unit;
      const widthMagnitude = presentation.pageSize?.width?.magnitude as number;

      const body: Pick<IGoogleSlides.IUpdatePresentationInput, "requests"> = {
        requests: templates
          .flatMap((template): IGoogleSlides.BatchUpdateInput[] => {
            if (template.type === "Vertical") {
              return this.createVerticalImageSlide(template, {
                height: heightMagnitude,
                width: widthMagnitude,
                unit: unit,
              });
            } else if (template.type === "Square") {
              return this.createSqaureImageSlide(template, {
                height: heightMagnitude,
                width: widthMagnitude,
                unit: unit,
              });
            } else if (template.type === "Landscape") {
              return this.createLandscapeImageSlide(template, {
                height: heightMagnitude,
                width: widthMagnitude,
                unit: unit,
              });
            } else if (template.type === "Entire") {
              return this.createEntireImageSlide(template, {
                height: heightMagnitude,
                width: widthMagnitude,
                unit: unit,
              });
            } else if (template.type === "QuarterDivision") {
              return this.createQuarterDivisionImageSlide(template, {
                height: heightMagnitude,
                width: widthMagnitude,
                unit: unit,
              });
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
      const token = await this.getToken(input.secretKey);

      const accessToken = await this.googleProvider.refreshAccessToken(token);

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

  private async getToken(secretValue: string): Promise<string> {
    const secret = await OAuthSecretProvider.getSecretValue(secretValue);
    const token =
      typeof secret === "string"
        ? secret
        : (secret as IOAuthSecret.ISecretValue).value;
    return token;
  }
}
