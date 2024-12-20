import core, { TypedBody, TypedParam } from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IGoogleSlides } from "@wrtn/connector-api/lib/structures/connector/google_slides/IGoogleSlides";

import { ApiTags } from "@nestjs/swagger";
import { RouteIcon } from "@wrtnio/decorators";
import { GoogleSlidesProvider } from "../../../providers/connector/google_slides/GoogleSlidesProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/google-slides")
export class GoogleSlidesController {
  constructor(private readonly googleSlideProvider: GoogleSlidesProvider) {}

  /**
   * Export Google Slides presentations to Hanshow format
   *
   * @summary Export presentations to Hanshow files
   * @param presentationId Presentation ID to convert
   * @param input Authentication information
   * @returns Link to download Hanshow files
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSlides_full.svg",
  )
  @ApiTags("Google Slide")
  @core.TypedRoute.Post("presentations/:id/exports/hanshow")
  async hanshow(
    @TypedParam("id") presentationId: string,
    @TypedBody() input: IGoogleSlides.IExportPresentationInput,
  ): Promise<IGoogleSlides.IExportHanshowOutput> {
    return retry(() =>
      this.googleSlideProvider.createHanshow(presentationId, {
        secretKey: input.secretKey,
      }),
    )();
  }

  /**
   * Export Google Slides presentations to PowerPoint format
   *
   * A connector that can be used when creating stories or picture books.
   *
   * @summary Export presentations to PPT files
   * @param presentationId Presentation ID to convert
   * @param input Authentication information
   * @returns Link to download PowerPoint files
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSlides_full.svg",
  )
  @ApiTags("Google Slide")
  @core.TypedRoute.Post("presentations/:id/exports/power-point")
  async powerPoint(
    @TypedParam("id") presentationId: string,
    @TypedBody() input: IGoogleSlides.IExportPresentationInput,
  ): Promise<IGoogleSlides.IExportPresentationOutput> {
    return retry(() =>
      this.googleSlideProvider.createPowerPoint(presentationId, {
        secretKey: input.secretKey,
      }),
    )();
  }

  /**
   * Retrieve a Google Slides presentation
   *
   * @summary Retrieve a Google Slides presentation
   * @param input Condition DTO for retrieving a presentation
   * @returns Retrieve presentation information DTO
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSlides_full.svg",
  )
  @ApiTags("Google Slide")
  @core.TypedRoute.Post("get-presentations")
  async getPresentation(
    @TypedBody() input: IGoogleSlides.IGetPresentationInput,
  ): Promise<IGoogleSlides.ISimplePresentationIdOutput> {
    return retry(() => this.googleSlideProvider.getPresentation(input))();
  }

  /**
   * Add "QuarterDivision" type slides to a Google Slides presentation
   *
   * The "QuarterDivision" type slides are templates that are designed to place images and text in the upper left, upper right, lower left, and lower right, like a four-cut cartoon.
   * Four images are required for this template, and the text is located right under each image.
   *
   * You may need an image when the user asks you to add a slide.
   * In this case, rather than inserting any image, you should first secure the image using a search connector or an image creation connector.
   * It is safe to ask the user for consent to this process.
   *
   * @summary Add "QuarterDivision" type image slides to a Google Slides presentation
   * @param presentationId Presentation id to add slides to
   * @param input Template to add
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSlides_full.svg",
  )
  @ApiTags("Google Slide")
  @core.TypedRoute.Put("presentations/:id/slides/quarter-divisions")
  async appendQuarterDivisionImageSlide(
    @TypedParam("id") presentationId: string,
    @TypedBody() input: IGoogleSlides.AppendQuarterDivisionSlideInput,
  ): Promise<IGoogleSlides.ISimplePresentationIdOutput> {
    const type = "QuarterDivision" as const;
    return this.googleSlideProvider.appendSlidesByType(
      presentationId,
      type,
      input,
    );
  }

  /**
   * Add "Entire" type slides to a Google Slides presentation
   *
   * The "Entire" type of slide is a template that packs an image all over, and you can't put any extra text in it. Maybe it's usually suitable for putting a cover.
   * Because ordinary presentations have longer horizontal lengths, if you put a square image, gaps on the left and right can appear large.
   *
   * You may need an image when the user asks you to add a slide.
   * In this case, rather than inserting any image, you should first secure the image using a search connector or an image creation connector.
   * It is safe to ask the user for consent to this process.
   *
   * @summary Add entire type image slides to a Google Slides presentation
   * @param presentationId Presentation id to add slides to
   * @param input Template to add
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSlides_full.svg",
  )
  @ApiTags("Google Slide")
  @core.TypedRoute.Put("presentations/:id/slides/entires")
  async appendEntireImageSlide(
    @TypedParam("id") presentationId: string,
    @TypedBody() input: IGoogleSlides.AppendEntireSlideInput,
  ): Promise<IGoogleSlides.ISimplePresentationIdOutput> {
    const type = "Entire" as const;
    return this.googleSlideProvider.appendSlidesByType(
      presentationId,
      type,
      input,
    );
  }

  /**
   * Add "Landscape" type slides to a Google Slides presentation
   *
   * The "Landscape" type template fits text underneath with a longer horizontal image tightly packed like a background.
   * It is suitable when the image is highlighted and the text is short.
   * It is suitable for marking images and titles as if they were on display.
   *
   * You may need an image when the user asks you to add a slide.
   * In this case, rather than inserting any image, you should first secure the image using a search connector or an image creation connector.
   * It is safe to ask the user for consent to this process.
   *
   * @summary Add "Landscape" type image slides to a Google Slides presentation
   * @param presentationId Presentation id to add slides to
   * @param input Template to add
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSlides_full.svg",
  )
  @ApiTags("Google Slide")
  @core.TypedRoute.Put("presentations/:id/slides/landscapes")
  async appendLandscapeImageSlide(
    @TypedParam("id") presentationId: string,
    @TypedBody() input: IGoogleSlides.AppendLandscapeSlideInput,
  ): Promise<IGoogleSlides.ISimplePresentationIdOutput> {
    const type = "Landscape" as const;
    return this.googleSlideProvider.appendSlidesByType(
      presentationId,
      type,
      input,
    );
  }

  /**
   * Add "Square" type slides to a Google Slides presentation
   *
   * The "Square" type slides put square images and text. In this case, you should put at least four to five lines of text, because there is so much space to put text.
   * The picture is on the left, and the text is on the right.
   *
   * You may need an image when the user asks you to add a slide.
   * In this case, rather than inserting any image, you should first secure the image using a search connector or an image creation connector.
   * It is safe to ask the user for consent to this process.
   *
   * @summary Add "Square" type image slides to a Google Slides presentation
   * @param presentationId Presentation id to add slides to
   * @param input Template to add
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSlides_full.svg",
  )
  @ApiTags("Google Slide")
  @core.TypedRoute.Put("presentations/:id/slides/squares")
  async appendSquareImageSlide(
    @TypedParam("id") presentationId: string,
    @TypedBody() input: IGoogleSlides.AppendSquareSlideInput,
  ): Promise<IGoogleSlides.ISimplePresentationIdOutput> {
    const type = "Square" as const;
    return this.googleSlideProvider.appendSlidesByType(
      presentationId,
      type,
      input,
    );
  }

  /**
   * Add "Vertical" type slides to a Google Slides presentation
   *
   * The "Vertical" type is like a square type slide, with an image on the left and text on the right.
   * In this case, unlike the square type, the image is filled to the height of the presentation while maintaining the proportion.
   * This also allows for enough text.
   *
   * You may need an image when the user asks you to add a slide.
   * In this case, rather than inserting any image, you should first secure the image using a search connector or an image creation connector.
   * It is safe to ask the user for consent to this process.
   *
   * @summary Add "Vertical" type image slides to a Google Slides presentation
   * @param presentationId Presentation id to add slides to
   * @param input Template to add
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSlides_full.svg",
  )
  @ApiTags("Google Slide")
  @core.TypedRoute.Put("presentations/:id/slides/verticals")
  async appendVerticalImageSlide(
    @TypedParam("id") presentationId: string,
    @TypedBody() input: IGoogleSlides.AppendVerticalSlideInput,
  ): Promise<IGoogleSlides.ISimplePresentationIdOutput> {
    const type = "Vertical" as const;
    return this.googleSlideProvider.appendSlidesByType(
      presentationId,
      type,
      input,
    );
  }

  /**
   * Add slides to a Google Slides presentation
   *
   * Use this connector with connector/google-slides/presentations when creating a story or picture book.
   * When creating a story or picture book, insert the story and pictures created using this connector into the presentation created from connector/google-slides/presentations connector.
   * Be careful not to use this connector when creating a story or picture book, as it may result in an empty picture book.
   * Slide type must be one of: "Vertical", "Square", "Landscape", "Entire", "QuarterDivision".
   * It is common to choose a "Square" type when there is one image.
   *
   * You may need an image when the user asks you to add a slide.
   * In this case, rather than inserting any image, you should first secure the image using a search connector or an image creation connector.
   * It is safe to ask the user for consent to this process.
   *
   * @deprecated
   *
   * @summary Add image and text slides to a Google Slides presentation
   * @param presentationId Presentation id to add slides to
   * @param input Template to add
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSlides_full.svg",
  )
  @ApiTags("Google Slide")
  @core.TypedRoute.Put("presentations/:id/image-slide")
  async appendImageSlide(
    @TypedParam("id") presentationId: string,
    @TypedBody() input: IGoogleSlides.AppendSlideInput,
  ): Promise<IGoogleSlides.ISimplePresentationIdOutput> {
    return retry(() =>
      this.googleSlideProvider.appendImageSlide(presentationId, input),
    )();
  }

  /**
   * Create a Google Slides presentation
   *
   * This connector can be used when creating a story or picture book.
   * Please use it with the connector/google-slides/image-slide connector when creating a story or picture book.
   * When creating a story or picture book, create a new presentation with this connector and insert the created story and picture into the slide using other connector.
   * This creates a blank presentation file, which is basically created with the first slide with no text.
   *
   * @summary Create a Google Slides presentation
   * @param input Condition DTO for creating a presentation
   * @returns Generated presentation information DTO
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSlides_full.svg",
  )
  @ApiTags("Google Slide")
  @core.TypedRoute.Post("presentations")
  async createPresentation(
    @TypedBody() input: IGoogleSlides.ICreatePresentationInput,
  ): Promise<IGoogleSlides.ISimplePresentationIdOutput> {
    return retry(() => this.googleSlideProvider.createPresentation(input))();
  }
}
