import core, { TypedBody, TypedParam } from "@nestia/core";
import { Controller } from "@nestjs/common";

import { IGoogleSlides } from "@wrtn/connector-api/lib/structures/connector/google_slides/IGoogleSlides";

import { RouteIcon } from "@wrtnio/decorators";
import { GoogleSlidesProvider } from "../../../providers/connector/google_slides/GoogleSlidesProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/google-slides")
export class GoogleSlidesController {
  constructor(private readonly googleSlideProvider: GoogleSlidesProvider) {}

  /**
   * Export Google Slides presentations to Hanshow format!
   *
   * @summary Export presentations to Hanshow files
   *
   * @param presentationId Presentation ID to convert
   * @param input Authentication information
   * @returns Link to download Hanshow files
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSlides_full.svg",
  )
  @core.TypedRoute.Post("presentations/:id/export/hanshow")
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
   * Export Google Slides presentations to PowerPoint format!
   *
   * A connector that can be used when creating stories or picture books.
   *
   * @summary Export presentations to PPT files
   *
   * @param presentationId Presentation ID to convert
   * @param input Authentication information
   * @returns Link to download PowerPoint files
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSlides_full.svg",
  )
  @core.TypedRoute.Post("presentations/:id/export/power-point")
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
   * Retrieve a Google Slides presentation.
   *
   * @summary Retrieve a Google Slides presentation.
   *
   * @param input Condition DTO for retrieving a presentation.
   * @returns Retrieve presentation information DTO.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSlides_full.svg",
  )
  @core.TypedRoute.Post("get-presentations")
  async getPresentation(
    @TypedBody() input: IGoogleSlides.IGetPresentationInput,
  ): Promise<IGoogleSlides.ISimplePresentationIdOutput> {
    return retry(() => this.googleSlideProvider.getPresentation(input))();
  }

  /**
   * Add division type slides to a Google Slides presentation.
   *
   * You may need an image when the user asks you to add a slide.
   * In this case, rather than inserting any image, you should first secure the image using a search connector or an image creation connector.
   * It is safe to ask the user for consent to this process.
   *
   * @summary Add division type image slides to a Google Slides presentation.
   * @param presentationId Presentation id to add slides to
   * @param input Template to add
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSlides_full.svg",
  )
  @core.TypedRoute.Put("presentations/:id/slides/quarter-divisions")
  async appendQuarterDivisionImageSlide(
    @TypedParam("id") presentationId: string,
    @TypedBody() input: IGoogleSlides.AppendQuarterDivisionSlideInput,
  ): Promise<IGoogleSlides.ISimplePresentationIdOutput> {
    const { templates, secretKey } = input;
    const presentation = await this.googleSlideProvider.getPresentation({
      presentationId,
      secretKey,
    });

    const size = this.googleSlideProvider.getSize(presentation);
    const type = "QuarterDivision" as const;
    const typed = { templates: templates.map((el) => ({ ...el, type })) };
    const body = this.googleSlideProvider.createSlide(typed, size);

    await this.googleSlideProvider.appendSlide(presentationId, {
      body,
      secretKey,
    });

    return presentation;
  }

  /**
   * Add entire type slides to a Google Slides presentation.
   *
   * You may need an image when the user asks you to add a slide.
   * In this case, rather than inserting any image, you should first secure the image using a search connector or an image creation connector.
   * It is safe to ask the user for consent to this process.
   *
   * @summary Add entire type image slides to a Google Slides presentation.
   * @param presentationId Presentation id to add slides to
   * @param input Template to add
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSlides_full.svg",
  )
  @core.TypedRoute.Put("presentations/:id/slides/entires")
  async appendEntireImageSlide(
    @TypedParam("id") presentationId: string,
    @TypedBody() input: IGoogleSlides.AppendEntireSlideInput,
  ): Promise<IGoogleSlides.ISimplePresentationIdOutput> {
    const { templates, secretKey } = input;
    const presentation = await this.googleSlideProvider.getPresentation({
      presentationId,
      secretKey,
    });

    const size = this.googleSlideProvider.getSize(presentation);
    const type = "Entire" as const;
    const typed = { templates: templates.map((el) => ({ ...el, type })) };
    const body = this.googleSlideProvider.createSlide(typed, size);

    await this.googleSlideProvider.appendSlide(presentationId, {
      body,
      secretKey,
    });

    return presentation;
  }

  /**
   * Add landscape type slides to a Google Slides presentation.
   *
   * You may need an image when the user asks you to add a slide.
   * In this case, rather than inserting any image, you should first secure the image using a search connector or an image creation connector.
   * It is safe to ask the user for consent to this process.
   *
   * @summary Add landscape type image slides to a Google Slides presentation.
   * @param presentationId Presentation id to add slides to
   * @param input Template to add
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSlides_full.svg",
  )
  @core.TypedRoute.Put("presentations/:id/slides/landscapes")
  async appendLandscapeImageSlide(
    @TypedParam("id") presentationId: string,
    @TypedBody() input: IGoogleSlides.AppendLandscapeSlideInput,
  ): Promise<IGoogleSlides.ISimplePresentationIdOutput> {
    const { templates, secretKey } = input;
    const presentation = await this.googleSlideProvider.getPresentation({
      presentationId,
      secretKey,
    });

    const size = this.googleSlideProvider.getSize(presentation);
    const type = "Landscape" as const;
    const typed = { templates: templates.map((el) => ({ ...el, type })) };
    const body = this.googleSlideProvider.createSlide(typed, size);

    await this.googleSlideProvider.appendSlide(presentationId, {
      body,
      secretKey,
    });

    return presentation;
  }

  /**
   * Add square type slides to a Google Slides presentation.
   *
   * You may need an image when the user asks you to add a slide.
   * In this case, rather than inserting any image, you should first secure the image using a search connector or an image creation connector.
   * It is safe to ask the user for consent to this process.
   *
   * @summary Add square type image slides to a Google Slides presentation.
   * @param presentationId Presentation id to add slides to
   * @param input Template to add
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSlides_full.svg",
  )
  @core.TypedRoute.Put("presentations/:id/slides/squares")
  async appendSquareImageSlide(
    @TypedParam("id") presentationId: string,
    @TypedBody() input: IGoogleSlides.AppendSquareSlideInput,
  ): Promise<IGoogleSlides.ISimplePresentationIdOutput> {
    const { templates, secretKey } = input;
    const presentation = await this.googleSlideProvider.getPresentation({
      presentationId,
      secretKey,
    });

    const size = this.googleSlideProvider.getSize(presentation);
    const type = "Square" as const;
    const typed = { templates: templates.map((el) => ({ ...el, type })) };
    const body = this.googleSlideProvider.createSlide(typed, size);

    await this.googleSlideProvider.appendSlide(presentationId, {
      body,
      secretKey,
    });

    return presentation;
  }

  /**
   * Add vertical type slides to a Google Slides presentation.
   *
   * You may need an image when the user asks you to add a slide.
   * In this case, rather than inserting any image, you should first secure the image using a search connector or an image creation connector.
   * It is safe to ask the user for consent to this process.
   *
   * @summary Add vertical type image slides to a Google Slides presentation.
   * @param presentationId Presentation id to add slides to
   * @param input Template to add
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSlides_full.svg",
  )
  @core.TypedRoute.Put("presentations/:id/slides/verticals")
  async appendVerticalImageSlide(
    @TypedParam("id") presentationId: string,
    @TypedBody() input: IGoogleSlides.AppendVerticalSlideInput,
  ): Promise<IGoogleSlides.ISimplePresentationIdOutput> {
    const { templates, secretKey } = input;
    const presentation = await this.googleSlideProvider.getPresentation({
      presentationId,
      secretKey,
    });

    const size = this.googleSlideProvider.getSize(presentation);
    const type = "Vertical" as const;
    const typed = { templates: templates.map((el) => ({ ...el, type })) };
    const body = this.googleSlideProvider.createSlide(typed, size);

    await this.googleSlideProvider.appendSlide(presentationId, {
      body,
      secretKey,
    });

    return presentation;
  }

  /**
   * Add slides to a Google Slides presentation.
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
   * @summary Add image and text slides to a Google Slides presentation.
   * @param presentationId Presentation id to add slides to
   * @param input Template to add
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSlides_full.svg",
  )
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
   * Create a Google Slides presentation.
   *
   * This connector can be used when creating a story or picture book.
   * Please use it with the connector/google-slides/image-slide connector when creating a story or picture book.
   * When creating a story or picture book, create a new presentation with this connector and insert the created story and picture into the slide using the connector/google-slides/image-slide connector.
   * When creating a story or picture book, be careful not to use it with the connector/google-slides/image-slide connector, as it may result in an empty picture book.
   *
   * @summary Create a Google Slides presentation.
   *
   * @param input Condition DTO for creating a presentation.
   * @returns Generated presentation information DTO.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleSlides_full.svg",
  )
  @core.TypedRoute.Post("presentations")
  async createPresentation(
    @TypedBody() input: IGoogleSlides.ICreatePresentationInput,
  ): Promise<IGoogleSlides.ISimplePresentationIdOutput> {
    return retry(() => this.googleSlideProvider.createPresentation(input))();
  }
}
