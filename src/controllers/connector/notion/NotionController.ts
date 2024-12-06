import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { Prerequisite, RouteIcon, Standalone } from "@wrtnio/decorators";

import { INotion } from "@wrtn/connector-api/lib/structures/connector/notion/INotion";

import { ApiTags } from "@nestjs/swagger";
import { NotionProvider } from "../../../providers/connector/notion/NotionProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/notion")
export class NotionController {
  /**
   * Delete a block
   *
   * Sets a Block object, including page blocks,
   * to archived: true using the ID specified. Note: in the Notion UI application, this moves the block to the "Trash" where it can still be accessed and restored.
   *
   * @summary Delete a block
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Delete("page/block")
  async deleteBlock(
    @core.TypedBody() input: INotion.IDeleteBlockInput,
  ): Promise<void> {
    return retry(() => NotionProvider.deleteBlock(input))();
  }

  /**
   * Append block by markdown format
   *
   * You can add blocks to the page immediately with only the markdown grammar.
   * You can create pages more effectively than other connectors, so you can prioritize this.
   * If there are unique blocks of the note that cannot be created with the grammar of the markdown, it must be associated with other block generation connectors.
   *
   * Since users may not know the markdown grammar, it is more desirable to use the markdown grammar instead of guiding them.
   * Markdown supports text and heading 1, 2, 3, and various grammar such as table or bull list, number list, image attachment, boldface, italics, etc.
   *
   *
   *
   * @summary Append block by markdown format
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @ApiTags("Notion")
  @core.TypedRoute.Post("page/markdown")
  async appendBlocksByMarkdown(
    @core.TypedBody() input: INotion.IAppendPageByMarkdownInput,
  ): Promise<INotion.IAppendPageByMarkdownOutput> {
    return retry(() => NotionProvider.appendBlocksByMarkdown(input))();
  }

  /**
   * Append an file type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `file`.
   *
   * Uploading a file exposes it to the Notion page as an icon in the file format, but there is no Preview.
   * If you want the internal elements to be seen as soon as you enter the page, it is better to create the image, pdf format for each format, and consider embed for other formats.
   *
   * Calling this connector requires the correct page ID, so it should only be called if you have previously created a page to obtain that ID, viewed the page, or obtained a link or page ID from the user in advance.
   *
   * @summary Append an file type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @ApiTags("Notion")
  @core.TypedRoute.Post("page/file")
  async createFile(
    @TypedBody() input: INotion.ICreateChildContentTypeFileInput,
  ): Promise<void> {
    return retry(() => NotionProvider.createFile(input))();
  }

  /**
   * Append an embed type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `embed`.
   *
   * This is suitable when you want an internal element to be rendered immediately, such as an imprame within a page.
   *
   * Calling this connector requires the correct page ID, so it should only be called if you have previously created a page to obtain that ID, viewed the page, or obtained a link or page ID from the user in advance.
   *
   * @summary Append an embed type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @ApiTags("Notion")
  @core.TypedRoute.Post("page/embed")
  async createEmbed(
    @TypedBody() input: INotion.ICreateChildContentTypeEmbedInput,
  ): Promise<void> {
    return retry(() => NotionProvider.createEmbed(input))();
  }

  /**
   * Append an bookmark type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `bookmark`.
   *
   * Bookmarks are visually better and more organized because they have previews, images, and explanations than just saving url as text.
   *
   * Calling this connector requires the correct page ID, so it should only be called if you have previously created a page to obtain that ID, viewed the page, or obtained a link or page ID from the user in advance.
   *
   * @summary Append an bookmark type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @ApiTags("Notion")
  @core.TypedRoute.Post("page/bookmark")
  async createBookmark(
    @TypedBody() input: INotion.ICreateChildContentTypeBookmarkInput,
  ): Promise<void> {
    return retry(() => NotionProvider.createBookmark(input))();
  }

  /**
   * Append an image type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `image`.
   *
   * image file's extension is one of: 'bmp', 'gif', 'heic', 'jpg', 'jpeg', 'png', 'svg', 'tif', 'tiff'.
   *
   * Calling this connector requires the correct page ID, so it should only be called if you have previously created a page to obtain that ID, viewed the page, or obtained a link or page ID from the user in advance.
   *
   * @summary Append an image type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @ApiTags("Notion")
  @core.TypedRoute.Post("page/image")
  async createImage(
    @TypedBody() input: INotion.ICreateChildContentTypeImageInput,
  ): Promise<void> {
    return retry(() => NotionProvider.createImage(input))();
  }

  /**
   * Append an video type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `video`.
   *
   * video file must be one of: 'amv' ,'asf' ,'avi' ,'f4v' ,'flv' ,'gifv' ,'mkv' ,'mov' ,'mpg' ,'mpeg' ,'mpv' ,'mp4' ,'m4v' ,'qt' ,'wmv'
   * OR
   * YouTube video links that include embed or watch.
   * E.g. https://www.youtube.com/watch?v=[id], https://www.youtube.com/embed/[id]
   *
   * Calling this connector requires the correct page ID, so it should only be called if you have previously created a page to obtain that ID, viewed the page, or obtained a link or page ID from the user in advance.
   *
   * @summary Append an video type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @ApiTags("Notion")
  @core.TypedRoute.Post("page/video")
  async createVideo(
    @TypedBody() input: INotion.ICreateChildContentTypeVideoInput,
  ): Promise<void> {
    return retry(() => NotionProvider.createVideo(input))();
  }

  /**
   * Append an pdf type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `pdf`.
   *
   * Calling this connector requires the correct page ID, so it should only be called if you have previously created a page to obtain that ID, viewed the page, or obtained a link or page ID from the user in advance.
   *
   * @summary Append an pdf type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @ApiTags("Notion")
  @core.TypedRoute.Post("page/pdf")
  async createPdf(
    @TypedBody() input: INotion.ICreateChildContentTypePdfInput,
  ): Promise<void> {
    return retry(() => NotionProvider.createPdf(input))();
  }

  /**
   * Append an code type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `code`.
   *
   * Calling this connector requires the correct page ID, so it should only be called if you have previously created a page to obtain that ID, viewed the page, or obtained a link or page ID from the user in advance.
   *
   * @deprecated It is recommended not to use it anymore because it can be replaced by a markdown.
   *
   * @summary Append an code type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @ApiTags("Notion")
  @core.TypedRoute.Post("page/code")
  async createCode(
    @TypedBody() input: INotion.ICreateChildContentTypeCodeInput,
  ): Promise<void> {
    return retry(() => NotionProvider.createCode(input))();
  }

  /**
   * Append an equation type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `equation`.
   *
   * Calling this connector requires the correct page ID, so it should only be called if you have previously created a page to obtain that ID, viewed the page, or obtained a link or page ID from the user in advance.
   *
   * @summary Append an equation type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @ApiTags("Notion")
  @core.TypedRoute.Post("page/equation")
  async createEquation(
    @TypedBody() input: INotion.ICreateChildContentTypeEquationInput,
  ): Promise<void> {
    return retry(() => NotionProvider.createEquation(input))();
  }

  /**
   * Append an divider type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `divider`.
   *
   * Calling this connector requires the correct page ID, so it should only be called if you have previously created a page to obtain that ID, viewed the page, or obtained a link or page ID from the user in advance.
   *
   * @summary Append an divider type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @ApiTags("Notion")
  @core.TypedRoute.Post("page/divider")
  async createDivider(
    @TypedBody() input: INotion.ICreateChildContentTypeDividerInput,
  ): Promise<void> {
    return retry(() => NotionProvider.createDivider(input))();
  }

  // /**
  //  * Append an breadcrumb type child node
  //  *
  //  * Notion is a very complex type, so you have to create a page in a block coding manner.
  //  * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
  //  * The type of block you can put in here is `breadcrumb`.
  //  *
  //  * Calling this connector requires the correct page ID, so it should only be called if you have previously created a page to obtain that ID, viewed the page, or obtained a link or page ID from the user in advance.
  //  *
  //  * @summary Append an breadcrumb type child node
  //  * @param input
  //  * @returns
  //  */
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  // )
  // @ApiTags("Notion")
  // @core.TypedRoute.Post("page/breadcrumb")
  // async createBreadcrumb(
  //   @TypedBody() input: INotion.ICreateChildContentTypeBreadcrumbInput,
  // ): Promise<void> {
  //   return retry(() => NotionProvider.createBreadcrumb(input))();
  // }

  /**
   * Append an table_of_contents type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `table_of_contents`.
   *
   * Calling this connector requires the correct page ID, so it should only be called if you have previously created a page to obtain that ID, viewed the page, or obtained a link or page ID from the user in advance.
   *
   * @summary Append an table_of_contents type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @ApiTags("Notion")
  @core.TypedRoute.Post("page/table_of_contents")
  async createTableOfContents(
    @TypedBody() input: INotion.ICreateChildContentTypeTableOfContentsInput,
  ): Promise<void> {
    return retry(() => NotionProvider.createTableOfContents(input))();
  }

  /**
   * Append an link_to_page type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `link_to_page`.
   *
   * Calling this connector requires the correct page ID, so it should only be called if you have previously created a page to obtain that ID, viewed the page, or obtained a link or page ID from the user in advance.
   *
   * @summary Append an link_to_page type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @ApiTags("Notion")
  @core.TypedRoute.Post("page/link_to_page")
  async createLinkToPage(
    @TypedBody() input: INotion.ICreateChildContentTypeLinkToPageInput,
  ): Promise<void> {
    return retry(() => NotionProvider.createLinkToPage(input))();
  }

  /**
   * Append an toggle type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `toggle`.
   *
   * Calling this connector requires the correct page ID, so it should only be called if you have previously created a page to obtain that ID, viewed the page, or obtained a link or page ID from the user in advance.
   *
   * @summary Append an toggle type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @ApiTags("Notion")
  @core.TypedRoute.Post("page/toggle")
  async createToggle(
    @TypedBody() input: INotion.ICreateChildContentTypeToggleInput,
  ): Promise<void> {
    return retry(() => NotionProvider.createToggle(input))();
  }

  /**
   * Create a Notion page
   *
   * Since a parent ID is required, when a user gives you a link to the page,
   * you should take out the ID from it and use it, or first look up the list of pages accessible to the user.
   * Since Notion prioritizes accessible pages during authentication, creating pages must be sub-pages within the page, which means that there must be a parent page.
   * Because this feature only creates pages and does not create content, we recommend that you call additional content creation connectors if you want to create content.
   *
   * user might want a really long, detailed report,
   * in which case it is better to write the details for each table of contents and call 'POST /connector/notion/page/markdown' multiple times rather than just one call of this connector.
   *
   * @summary Create empty page
   * @param input Information needed to create the page
   * @returns Unique ID of the generated page
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @ApiTags("Notion")
  @core.TypedRoute.Post("/page")
  async createPage(
    @core.TypedBody() input: INotion.ICreatePageInput,
  ): Promise<INotion.ICreatePageOutput> {
    return retry(() => NotionProvider.createPage(input))();
  }

  /**
   * Read the contents of a Notion page.
   * Reads the contents of a Notion page in Markdown format.
   *
   * Read Notion page contents
   *
   * @summaryRead the contents of a Notion page
   * @param input pageId
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @ApiTags("Notion")
  @core.TypedRoute.Post("/get/page/contents")
  async readPageContents(
    @core.TypedBody() input: INotion.IReadPageContentInput,
  ): Promise<INotion.IReadPageContentOutput> {
    return retry(() => NotionProvider.readPageContents(input))();
  }

  /**
   * Retrieve a list of all pages in your Notion workspace
   *
   * @summary Retrieve a list of pages
   * @returns Page information
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @ApiTags("Notion")
  @Standalone()
  @core.TypedRoute.Post("/get/page")
  async readPageList(
    @core.TypedBody() input: INotion.ISecret,
  ): Promise<INotion.IReadPageOutput[]> {
    return retry(() => NotionProvider.readPageList(input))();
  }

  /**
   * Retrieve the list of users in the workspace
   *
   * @summary Retrieve the list of users
   * @returns User information
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @ApiTags("Notion")
  @Standalone()
  @core.TypedRoute.Post("get/users")
  async getUsers(
    @core.TypedBody() input: INotion.ISecret,
  ): Promise<INotion.IUserOutput[]> {
    return retry(() => NotionProvider.getUsers(input))();
  }

  /**
   * Query the database list to create items in the database
   *
   * @summary Query the database list
   * @returns A list of database information
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @ApiTags("Notion")
  @Standalone()
  @core.TypedRoute.Post("get/database-info")
  async getDatabaseListInfo(
    @core.TypedBody() input: INotion.ISecret,
  ): Promise<INotion.IDatabaseInfo[]> {
    return retry(() => NotionProvider.getDatabaseListInfo(input))();
  }

  /**
   * Retrieves database information to create items in the database
   *
   * @summary Retrieves database information
   * @param databaseId Unique id of the database
   * @returns Database information
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @ApiTags("Notion")
  @core.TypedRoute.Post("get/database-info/:databaseId")
  async getDatabaseInfo(
    @core.TypedBody() input: INotion.ISecret,
    /**
     * @title Database to receive information from
     * @description Please select the database to receive information from
     */
    @Prerequisite({
      neighbor: () => NotionController.prototype.getDatabaseListInfo,
      jmesPath: "[].{value:id, label:title || ''}",
    })
    @core.TypedParam("databaseId")
    databaseId: string,
  ): Promise<INotion.IDatabaseInfo> {
    return retry(() => NotionProvider.getDatabaseInfo(input, databaseId))();
  }

  /**
   * Create an item in the Notion Table database
   *
   * @summary Create a database item
   * @param input Information needed to create a database item
   *
   * @param databaseId Unique id of the database in which to create the item
   * @returns Information about the created database item
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @ApiTags("Notion")
  @core.TypedRoute.Post("/database-item/:databaseId")
  async createDatabaseItem(
    @core.TypedBody() input: INotion.ICreateDatabaseItemInput,
    /**
     * @title Database to add item to
     * @description Please select the database to add item to.
     */
    @Prerequisite({
      neighbor: () => NotionController.prototype.getDatabaseListInfo,
      jmesPath: "[].{value:id, label:title || ''}",
    })
    @core.TypedParam("databaseId")
    databaseId: string,
  ): Promise<INotion.IDatabaseItemOutput> {
    return retry(() => NotionProvider.createDatabaseItem(input, databaseId))();
  }

  /**
   * Modify item information in the database
   *
   * @summary Modify database item
   * @param input Database item information to modify
   *
   * @param databaseId Unique id of the database to modify
   * @returns Modified database item information
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @ApiTags("Notion")
  @core.TypedRoute.Patch("/database-item/:databaseId")
  async updateDatabaseItem(
    @core.TypedBody() input: INotion.IUpdateDatabaseItemInput,
    /**
     * @title Database to modify item
     * @description Please select the database to modify item
     */
    @Prerequisite({
      neighbor: () => NotionController.prototype.getDatabaseListInfo,
      jmesPath: "[].{value:id, label:title || ''}",
    })
    @core.TypedParam("databaseId")
    databaseId: string,
  ): Promise<INotion.IDatabaseItemOutput> {
    return retry(() => NotionProvider.updateDatabaseItem(input, databaseId))();
  }

  /**
   * Search for pages by title
   *
   * @summary Search for pages by title
   * @param input Page title
   * @returns Searched page information
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @ApiTags("Notion")
  @Standalone()
  @core.TypedRoute.Post("/get-page-by-title")
  async getPageByTitle(
    @core.TypedBody() input: INotion.IFindPageOrDatabaseItemInput,
  ): Promise<INotion.IFindPageByTitleOutput> {
    return retry(() => NotionProvider.findPageByTitle(input))();
  }

  /**
   * Retrieve a list of items that exist in a table database
   *
   * @summary Retrieve a list of database items
   * @param databaseId Unique id of the database
   * @returns List of retrieved database items
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @ApiTags("Notion")
  @core.TypedRoute.Post("/find-item-list/:databaseId")
  async getDatabaseItemList(
    @core.TypedBody() input: INotion.ISecret,
    /**
     * @title Database to retrieve the list of items
     * @description Please select the database to retrieve the list of items.
     */
    @Prerequisite({
      neighbor: () => NotionController.prototype.getDatabaseListInfo,
      jmesPath: "[].{value:id, label:title || ''}",
    })
    @core.TypedParam("databaseId")
    databaseId: string,
  ): Promise<INotion.IDatabaseItemOutput[]> {
    return retry(() =>
      NotionProvider.findDatabaseItemList(input, databaseId),
    )();
  }

  /**
   * Retrieves an item that exists in a table database
   *
   * @summary Retrieval of database items
   * @param input Information required to retrieve database items
   *
   * @param databaseId Unique id of the database
   * @returns Information on retrieved database items
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @ApiTags("Notion")
  @core.TypedRoute.Post("/find-item/:databaseId")
  async getDatabaseItem(
    @core.TypedBody() input: INotion.IFindDatabaseItemInput,
    /**
     * @title Database to retrieve item information
     * @description Please select the database to retrieve item information
     */
    @Prerequisite({
      neighbor: () => NotionController.prototype.getDatabaseListInfo,
      jmesPath: "[].{value:id, label:title || ''}",
    })
    @core.TypedParam("databaseId")
    databaseId: string,
  ): Promise<INotion.IDatabaseItemOutput> {
    return retry(() => NotionProvider.findDatabaseItem(input, databaseId))();
  }

  /**
   * Create page by markdown format
   *
   * Receive the markdown text and immediately create it as a notation page.
   * You can create pages more effectively than other connectors, so you can prioritize this.
   * If there are unique blocks of the note that cannot be created with the grammar of the markdown, it must be associated with other block generation connectors.
   *
   * Since users may not know the markdown grammar, it is more desirable to use the markdown grammar instead of guiding them.
   * Markdown supports text and heading 1, 2, 3, and various grammar such as table or bull list, number list, image attachment, boldface, italics, etc.
   *
   * Since Notion prioritizes accessible pages during authentication, creating pages must be sub-pages within the page, which means that there must be a parent page.
   *
   * @summary Create page by markdown format
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @ApiTags("Notion")
  @core.TypedRoute.Post("markdown")
  async createPageByMarkdown(
    @core.TypedBody() input: INotion.ICreatePageByMarkdownInput,
  ): Promise<INotion.ICreatePageOutput> {
    return retry(() => NotionProvider.createPageByMarkdown(input))();
  }

  /**
   * Update Notion Page Title
   *
   * @summary Update Notion Page Title
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @ApiTags("Notion")
  @core.TypedRoute.Put("page/title")
  async updatePageTitle(
    @core.TypedBody() input: INotion.IUpdateNotionTitleInput,
  ): Promise<INotion.ICreatePageOutput> {
    return retry(() => NotionProvider.updatePageTitle(input))();
  }

  /**
   * Create a gallery view database for notion.
   *
   * It is not possible to create a gallery view at once, and you must change the view to a gallery directly.
   * This endpoint must not be used to create each items.
   * This endpoint is only used to create a database.
   * Creating a database is different from adding items to a database.
   *
   * @summary Create a Notion Gallery Database
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @ApiTags("Notion")
  @core.TypedRoute.Post("create-gallery-database")
  async createGalleryDatabase(
    @core.TypedBody() input: INotion.ICreateGalleryDatabaseInput,
  ): Promise<INotion.ICreateGalleryDatabaseOutput> {
    return retry(() => NotionProvider.createGalleryDatabase(input))();
  }

  /**
   * Create an item in the generated gallery view database.
   * Creating a database item means adding an item to an existing database.
   * If there is no database received from input, you must first create a database using the POST: /connector/notion/create-gallery-database endpoint and then run it.
   * You should use this endpoint when adding items to an already created database.
   *
   * @summary Create a item in the gallery database
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @ApiTags("Notion")
  @core.TypedRoute.Post("create-gallery-item")
  async createGalleryItem(
    @core.TypedBody() input: INotion.ICreateGalleryDatabaseItemInput,
  ): Promise<INotion.ICreateGalleryDatabaseItemOutput[]> {
    return retry(() => NotionProvider.createGalleryDatabaseItem(input))();
  }
}
