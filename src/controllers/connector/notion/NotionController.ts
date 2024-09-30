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
   * Append block by markdown format
   *
   * You can add blocks to the page immediately with only the markdown grammar.
   * You can create pages more effectively than other connectors, so you can prioritize this.
   * If there are unique blocks of the note that cannot be created with the grammar of the markdown, it must be associated with other block generation connectors.
   *
   * Since users may not know the markdown grammar, it is more desirable to use the markdown grammar instead of guiding them.
   * Markdown supports text and heading 1, 2, 3, and various grammar such as table or bull list, number list, image attachment, boldface, italics, etc.
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
  ): Promise<void> {
    return retry(() => NotionProvider.appendBlocksByMarkdown(input))();
  }

  /**
   * Append an audio type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `audio`.
   *
   * Calling this connector requires the correct page ID, so it should only be called if you have previously created a page to obtain that ID, viewed the page, or obtained a link or page ID from the user in advance.
   *
   * @summary Append an audio type child node
   * @param input
   * @returns
   */
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  // )
  // @core.TypedRoute.Post("page/audio")
  // async createAudio(
  //   @TypedBody() input: INotion.ICreateChildContentTypeAudioInput,
  // ): Promise<void> {
  //   return retry(() => NotionProvider.createAudio(input))();
  // }

  /**
   * Append an table_row type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `table_row`.
   *
   * Calling this connector requires the correct page ID, so it should only be called if you have previously created a page to obtain that ID, viewed the page, or obtained a link or page ID from the user in advance.
   *
   * @summary Append an table_row type child node
   * @param input
   * @returns
   */
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  // )
  // @core.TypedRoute.Post("page/table_row")
  // async createTableRow(
  //   @TypedBody() input: INotion.ICreateChildContentTypeTableRowInput,
  // ): Promise<void> {
  //   return retry(() => NotionProvider.createTableRow(input))();
  // }

  /**
   * Append an table type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `table`.
   *
   * Calling this connector requires the correct page ID, so it should only be called if you have previously created a page to obtain that ID, viewed the page, or obtained a link or page ID from the user in advance.
   *
   * @summary Append an table type child node
   * @param input
   * @returns
   */
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  // )
  // @core.TypedRoute.Post("page/table")
  // async createTable(
  //   @TypedBody() input: INotion.ICreateChildContentTypeTableInput,
  // ): Promise<void> {
  //   return retry(() => NotionProvider.createTable(input))();
  // }

  /**
   * Append an column_list type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `column_list`.
   *
   * Calling this connector requires the correct page ID, so it should only be called if you have previously created a page to obtain that ID, viewed the page, or obtained a link or page ID from the user in advance.
   *
   * @summary Append an column_list type child node
   * @param input
   * @returns
   */
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  // )
  // @core.TypedRoute.Post("page/column_list")
  // async createColumnList(
  //   @TypedBody() input: INotion.ICreateChildContentTypeColumnListInput,
  // ): Promise<void> {
  //   return retry(() => NotionProvider.createColumnList(input))();
  // }

  /**
   * Append an column type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `column`.
   *
   * Calling this connector requires the correct page ID, so it should only be called if you have previously created a page to obtain that ID, viewed the page, or obtained a link or page ID from the user in advance.
   *
   * @summary Append an column type child node
   * @param input
   * @returns
   */
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  // )
  // @core.TypedRoute.Post("page/column")
  // async createColumn(
  //   @TypedBody() input: INotion.ICreateChildContentTypeColumnInput,
  // ): Promise<void> {
  //   return retry(() => NotionProvider.createColumn(input))();
  // }

  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  // )
  // @core.TypedRoute.Post("page/callout")
  // async createCallout(
  //   @TypedBody() input: INotion.ICreateChildContentTypeCalloutInput,
  // ): Promise<void> {
  //   return retry(() => NotionProvider.createCallout(input))();
  // }

  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  // )
  // @core.TypedRoute.Post("page/synced_block")
  // async createSyncedBlock(
  //   @TypedBody() input: INotion.ICreateChildContentTypeSyncedBlockInput,
  // ): Promise<void> {
  //   return retry(() => NotionProvider.createSyncedBlock(input))();
  // }

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

  /**
   * Append an breadcrumb type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `breadcrumb`.
   *
   * Calling this connector requires the correct page ID, so it should only be called if you have previously created a page to obtain that ID, viewed the page, or obtained a link or page ID from the user in advance.
   *
   * @summary Append an breadcrumb type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @ApiTags("Notion")
  @core.TypedRoute.Post("page/breadcrumb")
  async createBreadcrumb(
    @TypedBody() input: INotion.ICreateChildContentTypeBreadcrumbInput,
  ): Promise<void> {
    return retry(() => NotionProvider.createBreadcrumb(input))();
  }

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
   * Append an heading_1 type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `heading_1`.
   *
   * Calling this connector requires the correct page ID, so it should only be called if you have previously created a page to obtain that ID, viewed the page, or obtained a link or page ID from the user in advance.
   *
   * @deprecated It is recommended not to use it anymore because it can be replaced by a markdown.
   * @summary Append an heading_1 type child node
   * @param input
   * @returns
   */
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  // )
  // @core.TypedRoute.Post("page/heading_1")
  // async createHeading_1(
  //   @TypedBody() input: INotion.ICreateChildContentTypeHeading_1Input,
  // ): Promise<void> {
  //   return retry(() => NotionProvider.createHeading_1(input))();
  // }

  /**
   * Append an heading_2 type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `heading_2`.
   *
   * Calling this connector requires the correct page ID, so it should only be called if you have previously created a page to obtain that ID, viewed the page, or obtained a link or page ID from the user in advance.
   *
   * @deprecated It is recommended not to use it anymore because it can be replaced by a markdown.
   * @summary Append an heading_2 type child node
   * @param input
   * @returns
   */
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  // )
  // @core.TypedRoute.Post("page/heading_2")
  // async createHeading_2(
  //   @TypedBody() input: INotion.ICreateChildContentTypeHeading_2Input,
  // ): Promise<void> {
  //   return retry(() => NotionProvider.createHeading_2(input))();
  // }

  /**
   * Append an heading_3 type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `heading_3`.
   *
   * Calling this connector requires the correct page ID, so it should only be called if you have previously created a page to obtain that ID, viewed the page, or obtained a link or page ID from the user in advance.
   *
   * @deprecated It is recommended not to use it anymore because it can be replaced by a markdown.
   * @summary Append an heading_3 type child node
   * @param input
   * @returns
   */
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  // )
  // @core.TypedRoute.Post("page/heading_3")
  // async createHeading_3(
  //   @TypedBody() input: INotion.ICreateChildContentTypeHeading_3Input,
  // ): Promise<void> {
  //   return retry(() => NotionProvider.createHeading_3(input))();
  // }

  /**
   * Append an paragraph type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `paragraph`.
   *
   * Calling this connector requires the correct page ID, so it should only be called if you have previously created a page to obtain that ID, viewed the page, or obtained a link or page ID from the user in advance.
   *
   * @deprecated It is recommended not to use it anymore because it can be replaced by a markdown.
   * @summary Append an paragraph type child node
   * @param input
   * @returns
   */
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  // )
  // @core.TypedRoute.Post("page/paragraph")
  // async createParagraph(
  //   @TypedBody() input: INotion.ICreateChildContentTypeParagraphInput,
  // ): Promise<void> {
  //   return retry(() => NotionProvider.createParagraph(input))();
  // }

  /**
   * Append an bulleted_list_item type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `bulleted_list_item`.
   *
   * Calling this connector requires the correct page ID, so it should only be called if you have previously created a page to obtain that ID, viewed the page, or obtained a link or page ID from the user in advance
   *
   * @deprecated It is recommended not to use it anymore because it can be replaced by a markdown.
   * @summary Append an bulleted_list_item type child node
   * @param input
   * @returns
   */
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  // )
  // @core.TypedRoute.Post("page/bulleted_list_item")
  // async createBulletedListItem(
  //   @TypedBody() input: INotion.ICreateChildContentTypeBulletedListItemInput,
  // ): Promise<void> {
  //   return retry(() => NotionProvider.createBulletedListItem(input))();
  // }

  /**
   * Append an numbered_list_item type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `numbered_list_item`.
   *
   * Calling this connector requires the correct page ID, so it should only be called if you have previously created a page to obtain that ID, viewed the page, or obtained a link or page ID from the user in advance.
   *
   * @deprecated It is recommended not to use it anymore because it can be replaced by a markdown.
   * @summary Append an numbered_list_item type child node
   * @param input
   * @returns
   */
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  // )
  // @core.TypedRoute.Post("page/numbered_list_item")
  // async createNumberedListItem(
  //   @TypedBody() input: INotion.ICreateChildContentTypeNumberedListItemInput,
  // ): Promise<void> {
  //   return retry(() => NotionProvider.createNumberedListItem(input))();
  // }

  /**
   * Append an quote type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `quote`.
   *
   * Calling this connector requires the correct page ID, so it should only be called if you have previously created a page to obtain that ID, viewed the page, or obtained a link or page ID from the user in advance.
   *
   * @deprecated It is recommended not to use it anymore because it can be replaced by a markdown.
   * @summary Append an quote type child node
   * @param input
   * @returns
   */
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  // )
  // @core.TypedRoute.Post("page/quote")
  // async createQuote(
  //   @TypedBody() input: INotion.ICreateChildContentTypeQuoteInput,
  // ): Promise<void> {
  //   return retry(() => NotionProvider.createQuote(input))();
  // }

  /**
   * Append an to_do type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `to_do`.
   *
   * Calling this connector requires the correct page ID, so it should only be called if you have previously created a page to obtain that ID, viewed the page, or obtained a link or page ID from the user in advance.
   *
   * @deprecated It is recommended not to use it anymore because it can be replaced by a markdown.
   * @summary Append an to_do type child node
   * @param input
   * @returns
   */
  // @RouteIcon(
  //   "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  // )
  // @core.TypedRoute.Post("page/to_do")
  // async createToDo(
  //   @TypedBody() input: INotion.ICreateChildContentTypeToDoInput,
  // ): Promise<void> {
  //   return retry(() => NotionProvider.createToDo(input))();
  // }

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
   *
   * @summary Create page
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
   * Retrieve block children
   *
   * Returns a paginated array of child block objects contained in the block using the ID specified.
   * In order to receive a complete representation of a block, you may need to recursively retrieve the block children of child blocks.
   * Returns only the first level of children for the specified block. See block objects for more detail on determining if that block has nested children.
   * It is used to check the contents of the page by inquiring about the children of the page or block.
   *
   * @summary Retrieve block children
   * @param input
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
   * Retrieve a list of all pages in your Notion workspace.
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
   * Retrieve the list of users in the workspace.
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
   * Query the database list to create items in the database.
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
   * Retrieves database information to create items in the database.
   *
   * @summary Retrieves database information
   *
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
     * @description Please select the database to receive information from.
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
   * Create an item in the Notion Table database.
   *
   * @summary Create a database item
   *
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
   * Modify item information in the database.
   *
   * @summary Modify database item
   *
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
     * @description Please select the database to modify item.
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
   * Search for pages by title.
   *
   * @summary Search for pages by title
   *
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
   * Retrieve a list of items that exist in a table database.
   *
   * @summary Retrieve a list of database items
   *
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
   * Retrieves an item that exists in a table database.
   *
   * @summary Retrieval of database items
   *
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
     * @description Please select the database to retrieve item information.
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
}
