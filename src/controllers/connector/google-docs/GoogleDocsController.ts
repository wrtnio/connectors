import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { Prerequisite, RouteIcon, Standalone } from "@wrtnio/decorators";

import { IGoogleDocs } from "@wrtn/connector-api/lib/structures/connector/google_docs/IGoogleDocs";

import { ApiTags } from "@nestjs/swagger";
import { GoogleDocsProvider } from "../../../providers/connector/google_docs/GoogleDocsProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/google-docs")
export class GoogleDocsController {
  constructor(private readonly googleDocsProvider: GoogleDocsProvider) {}
  /**
   * Generate Google Docs
   *
   * @summary Generate Google Docs
   * @param input Title of Google Docs to generate
   * @returns Unique ID of generated Google Docs
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Google+Docs_full.svg",
  )
  @ApiTags("Google Docs")
  @core.TypedRoute.Post()
  async createDocs(
    @core.TypedBody() input: IGoogleDocs.ICreateGoogleDocsInput,
  ): Promise<IGoogleDocs.ICreateGoogleDocsOutput> {
    return retry(() => this.googleDocsProvider.createDocs(input))();
  }

  /**
   * Grant permission to Google Docs
   *
   * @summary Grant permission to Google Docs
   * @param input Information for granting permission to Google Docs
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Google+Docs_full.svg",
  )
  @ApiTags("Google Docs")
  @core.TypedRoute.Post("/permission")
  async permission(
    @core.TypedBody() input: IGoogleDocs.IPermissionGoogleDocsInput,
  ): Promise<void> {
    return retry(() => this.googleDocsProvider.permission(input))();
  }

  /**
   * Read the contents of Google Docs
   *
   * @summary Read Google Docs
   * @TODO read other elements if necessary
   * @param id Google Docs unique ID
   * @returns Google Docs contents
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Google+Docs_full.svg",
  )
  @ApiTags("Google Docs")
  @core.TypedRoute.Post("get/:id")
  async readDocs(
    /**
     * @title Docs file to import
     * @description Please select the docs file to import
     */
    @Prerequisite({
      neighbor: () => GoogleDocsController.prototype.list,
      jmesPath: "[].{value: id, label: title || ''}",
    })
    @core.TypedParam("id")
    id: string,
    @core.TypedBody()
    input: IGoogleDocs.ISecret,
  ): Promise<IGoogleDocs.IReadGoogleDocsOutput> {
    return retry(() => this.googleDocsProvider.readDocs(id, input))();
  }

  /**
   * Create new Google Docs by copying existing Google Docs
   *
   * @summary Copy Google Docs
   * @param input Links to Google Docs to copy and titles of Google Docs to create
   * @returns Unique ID of the generated Google Docs
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Google+Docs_full.svg",
  )
  @ApiTags("Google Docs")
  @core.TypedRoute.Post("/template")
  async createDocByTemplate(
    @core.TypedBody() input: IGoogleDocs.ICreateDocByTemplateInput,
  ): Promise<IGoogleDocs.ICreateDocByTemplateOutput> {
    return retry(() => this.googleDocsProvider.createDocByTemplate(input))();
  }

  /**
   * Delete Google Docs
   *
   * @summary Delete Google Docs
   * @param id Unique ID of the Google Docs to delete
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Google+Docs_full.svg",
  )
  @ApiTags("Google Docs")
  @core.TypedRoute.Delete(":id")
  async deleteById(
    /**
     * @title Docs file to delete
     * @description Please select the docs file to delete
     */
    @Prerequisite({
      neighbor: () => GoogleDocsController.prototype.list,
      jmesPath: "[].{value: id, label: title || ''}",
    })
    @core.TypedParam("id")
    id: string,
    @core.TypedBody()
    input: IGoogleDocs.ISecret,
  ): Promise<void> {
    return retry(() => this.googleDocsProvider.deleteById(id, input))();
  }

  /**
   * Get a list of Google Docs
   *
   * @summary Get a list of Google Docs
   * @returns a list of Google Docs
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Google+Docs_full.svg",
  )
  @ApiTags("Google Docs")
  @core.TypedRoute.Post("get-list")
  async list(
    @core.TypedBody()
    input: IGoogleDocs.ISecret,
  ): Promise<IGoogleDocs.IListGoogleDocsOutput> {
    return retry(() => this.googleDocsProvider.list(input))();
  }

  /**
   * Add text to Google Docs
   *
   * @summary Add text to Google Docs
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Google+Docs_full.svg",
  )
  @ApiTags("Google Docs")
  @core.TypedRoute.Post("/append")
  async append(
    @TypedBody() input: IGoogleDocs.IAppendTextGoogleDocsInput,
  ): Promise<void> {
    return this.googleDocsProvider.append(input);
  }
}
