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
   * Generate Google Docs By markdown format string
   *
   * Create a document with a markdown, which is the ID of the markdown file and the ID of the document.
   * In the case of Google Docs, URLs are included, so you can open and inquire files directly based on your ID.
   *
   * @summary Write Google Docs by markdown format string
   * @param input Google Docs infomation to write
   * @returns Created Google Docs and markdown File ids
   */
  @core.TypedRoute.Post("markdown")
  async write(
    @core.TypedBody() input: IGoogleDocs.IRequest,
  ): Promise<IGoogleDocs.IResponse> {
    return retry(() => this.googleDocsProvider.write(input))();
  }

  /**
   * Remove entire contents of google docs
   *
   * Make Google Docs a blank file like you just created.
   *
   * @summary erase the entire contents of a file and make it an empty file
   * @param input Google Drive and Docs Secret Key and information to clear file
   * @returns
   */
  @core.TypedRoute.Delete("contents")
  async clear(
    @TypedBody() input: IGoogleDocs.IClearInput,
  ): Promise<IGoogleDocs.IClearOutput> {
    return retry(() => this.googleDocsProvider.clear(input))();
  }

  /**
   * Generate Google Docs
   *
   * Since this is creating a blank page, we recommend that you use
   * connectors that add the content of google-docs in a row.
   * Alternatively, we recommend using a different connector because
   * there are other connectors that have the ability to generate
   * documents with markdown.
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
  ): Promise<IGoogleDocs.ICreateEmptyFileOutput> {
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
   * @sumamry Update Google Docs title and contents
   * @param file_id Google Docs File ID to update
   * @param input Google Secret Key and information to update google docs
   * @returns Updated Google Docs file info
   */
  @core.TypedRoute.Put(":id")
  async update(
    /**
     * @title Docs file to update
     * @description Please select the docs file to update
     */
    @Prerequisite({
      neighbor: () => GoogleDocsController.prototype.list,
      jmesPath: "[].{value: id, label: title || ''}",
    })
    @core.TypedParam("id")
    file_id: string,
    @TypedBody() input: IGoogleDocs.IUpdateInput,
  ): Promise<IGoogleDocs.IUpdateOutput> {
    return this.googleDocsProvider.update(file_id, input);
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
   * When you pass the input of the markdown format, change the markdown to the appropriate format.
   * It is recommended to check the existing content
   * and then use the `update` connector to include the existing content,
   * in the case of the 'append' connector, it is not fully Markdown compatible.
   * Update connector is `PUT /connector/google-docs/:id`.
   *
   * @summary Add text to Google Docs
   * @deprecated It is better to use the update connector than append.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Google+Docs_full.svg",
  )
  @ApiTags("Google Docs")
  @core.TypedRoute.Post("/append")
  async append(
    @TypedBody() input: IGoogleDocs.IAppendTextGoogleDocsInput,
  ): Promise<IGoogleDocs.ICreateGoogleDocsOutput> {
    return this.googleDocsProvider.append(input);
  }
}
