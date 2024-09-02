import core, { TypedBody } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { Prerequisite, RouteIcon, Standalone } from "@wrtnio/decorators";

import { INotion } from "@wrtn/connector-api/lib/structures/connector/notion/INotion";

import { NotionProvider } from "../../../providers/connector/notion/NotionProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/notion")
export class NotionController {
  /**
   * Append an file type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `file`.
   *
   * @summary Append an file type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("page/file")
  async createFile(
    @TypedBody() input: INotion.ICreateChildContentTypeFileInput,
  ): Promise<void> {
    return NotionProvider.createFile(input);
  }

  /**
   * Append an embed type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `embed`.
   *
   * @summary Append an embed type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("page/embed")
  async createEmbed(
    @TypedBody() input: INotion.ICreateChildContentTypeEmbedInput,
  ): Promise<void> {
    return NotionProvider.createEmbed(input);
  }

  /**
   * Append an bookmark type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `bookmark`.
   *
   * @summary Append an bookmark type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("page/bookmark")
  async createBookmark(
    @TypedBody() input: INotion.ICreateChildContentTypeBookmarkInput,
  ): Promise<void> {
    return NotionProvider.createBookmark(input);
  }

  /**
   * Append an image type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `image`.
   *
   * @summary Append an image type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("page/image")
  async createImage(
    @TypedBody() input: INotion.ICreateChildContentTypeImageInput,
  ): Promise<void> {
    return NotionProvider.createImage(input);
  }

  /**
   * Append an video type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `video`.
   *
   * @summary Append an video type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("page/video")
  async createVideo(
    @TypedBody() input: INotion.ICreateChildContentTypeVideoInput,
  ): Promise<void> {
    return NotionProvider.createVideo(input);
  }

  /**
   * Append an pdf type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `pdf`.
   *
   * @summary Append an pdf type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("page/pdf")
  async createPdf(
    @TypedBody() input: INotion.ICreateChildContentTypePdfInput,
  ): Promise<void> {
    return NotionProvider.createPdf(input);
  }

  /**
   * Append an audio type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `audio`.
   *
   * @summary Append an audio type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("page/audio")
  async createAudio(
    @TypedBody() input: INotion.ICreateChildContentTypeAudioInput,
  ): Promise<void> {
    return NotionProvider.createAudio(input);
  }

  /**
   * Append an code type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `code`.
   *
   * @summary Append an code type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("page/code")
  async createCode(
    @TypedBody() input: INotion.ICreateChildContentTypeCodeInput,
  ): Promise<void> {
    return NotionProvider.createCode(input);
  }

  /**
   * Append an equation type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `equation`.
   *
   * @summary Append an equation type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("page/equation")
  async createEquation(
    @TypedBody() input: INotion.ICreateChildContentTypeEquationInput,
  ): Promise<void> {
    return NotionProvider.createEquation(input);
  }

  /**
   * Append an divider type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `divider`.
   *
   * @summary Append an divider type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("page/divider")
  async createDivider(
    @TypedBody() input: INotion.ICreateChildContentTypeDividerInput,
  ): Promise<void> {
    return NotionProvider.createDivider(input);
  }

  /**
   * Append an breadcrumb type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `breadcrumb`.
   *
   * @summary Append an breadcrumb type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("page/breadcrumb")
  async createBreadcrumb(
    @TypedBody() input: INotion.ICreateChildContentTypeBreadcrumbInput,
  ): Promise<void> {
    return NotionProvider.createBreadcrumb(input);
  }

  /**
   * Append an table_of_contents type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `table_of_contents`.
   *
   * @summary Append an table_of_contents type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("page/table_of_contents")
  async createTableOfContents(
    @TypedBody() input: INotion.ICreateChildContentTypeTableOfContentsInput,
  ): Promise<void> {
    return NotionProvider.createTableOfContents(input);
  }

  /**
   * Append an link_to_page type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `link_to_page`.
   *
   * @summary Append an link_to_page type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("page/link_to_page")
  async createLinkToPage(
    @TypedBody() input: INotion.ICreateChildContentTypeLinkToPageInput,
  ): Promise<void> {
    return NotionProvider.createLinkToPage(input);
  }

  /**
   * Append an table_row type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `table_row`.
   *
   * @summary Append an table_row type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("page/table_row")
  async createTableRow(
    @TypedBody() input: INotion.ICreateChildContentTypeTableRowInput,
  ): Promise<void> {
    return NotionProvider.createTableRow(input);
  }

  /**
   * Append an table type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `table`.
   *
   * @summary Append an table type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("page/table")
  async createTable(
    @TypedBody() input: INotion.ICreateChildContentTypeTableInput,
  ): Promise<void> {
    return NotionProvider.createTable(input);
  }

  /**
   * Append an column_list type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `column_list`.
   *
   * @summary Append an column_list type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("page/column_list")
  async createColumnList(
    @TypedBody() input: INotion.ICreateChildContentTypeColumnListInput,
  ): Promise<void> {
    return NotionProvider.createColumnList(input);
  }

  /**
   * Append an column type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `column`.
   *
   * @summary Append an column type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("page/column")
  async createColumn(
    @TypedBody() input: INotion.ICreateChildContentTypeColumnInput,
  ): Promise<void> {
    return NotionProvider.createColumn(input);
  }

  /**
   * Append an heading_1 type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `heading_1`.
   *
   * @summary Append an heading_1 type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("page/heading_1")
  async createHeading_1(
    @TypedBody() input: INotion.ICreateChildContentTypeHeading_1Input,
  ): Promise<void> {
    return NotionProvider.createHeading_1(input);
  }

  /**
   * Append an heading_2 type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `heading_2`.
   *
   * @summary Append an heading_2 type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("page/heading_2")
  async createHeading_2(
    @TypedBody() input: INotion.ICreateChildContentTypeHeading_2Input,
  ): Promise<void> {
    return NotionProvider.createHeading_2(input);
  }

  /**
   * Append an heading_3 type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `heading_3`.
   *
   * @summary Append an heading_3 type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("page/heading_3")
  async createHeading_3(
    @TypedBody() input: INotion.ICreateChildContentTypeHeading_3Input,
  ): Promise<void> {
    return NotionProvider.createHeading_3(input);
  }

  /**
   * Append an paragraph type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `paragraph`.
   *
   * @summary Append an paragraph type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("page/paragraph")
  async createParagraph(
    @TypedBody() input: INotion.ICreateChildContentTypeParagraphInput,
  ): Promise<void> {
    return NotionProvider.createParagraph(input);
  }

  /**
   * Append an bulleted_list_item type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `bulleted_list_item`.
   *
   * @summary Append an bulleted_list_item type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("page/bulleted_list_item")
  async createBulletedListItem(
    @TypedBody() input: INotion.ICreateChildContentTypeBulletedListItemInput,
  ): Promise<void> {
    return NotionProvider.createBulletedListItem(input);
  }

  /**
   * Append an numbered_list_item type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `numbered_list_item`.
   *
   * @summary Append an numbered_list_item type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("page/numbered_list_item")
  async createNumberedListItem(
    @TypedBody() input: INotion.ICreateChildContentTypeNumberedListItemInput,
  ): Promise<void> {
    return NotionProvider.createNumberedListItem(input);
  }

  /**
   * Append an quote type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `quote`.
   *
   * @summary Append an quote type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("page/quote")
  async createQuote(
    @TypedBody() input: INotion.ICreateChildContentTypeQuoteInput,
  ): Promise<void> {
    return NotionProvider.createQuote(input);
  }

  /**
   * Append an to_do type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `to_do`.
   *
   * @summary Append an to_do type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("page/to_do")
  async createToDo(
    @TypedBody() input: INotion.ICreateChildContentTypeToDoInput,
  ): Promise<void> {
    return NotionProvider.createToDo(input);
  }

  /**
   * Append an toggle type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `toggle`.
   *
   * @summary Append an toggle type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("page/toggle")
  async createToggle(
    @TypedBody() input: INotion.ICreateChildContentTypeToggleInput,
  ): Promise<void> {
    return NotionProvider.createToggle(input);
  }

  /**
   * Append an template type child node
   *
   * Notion is a very complex type, so you have to create a page in a block coding manner.
   * Therefore, this connector is designed to create a page by taking only the page ID and one block of the corresponding block and continuously adding it to the bottom.
   * The type of block you can put in here is `template`.
   *
   * @summary Append an template type child node
   * @param input
   * @returns
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("page/template")
  async createTemplate(
    @TypedBody() input: INotion.ICreateChildContentTypeTemplateInput,
  ): Promise<void> {
    return NotionProvider.createTemplate(input);
  }

  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("page/callout")
  async createCallout(
    @TypedBody() input: INotion.ICreateChildContentTypeCalloutInput,
  ): Promise<void> {
    return NotionProvider.createCallout(input);
  }

  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("page/synced_block")
  async createSyncedBlock(
    @TypedBody() input: INotion.ICreateChildContentTypeSyncedBlockInput,
  ): Promise<void> {
    return NotionProvider.createSyncedBlock(input);
  }

  /**
   * 노션 페이지를 생성합니다.
   *
   * Since a parent ID is required, when a user gives you a link to the page,
   * you should take out the ID from it and use it, or first look up the list of pages accessible to the user.
   *
   * @summary 페이지 생성
   * @param input 페이지 생성에 필요한 정보
   * @returns 생성된 페이지 고유 id
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("/page")
  async createPage(
    @core.TypedBody() input: INotion.ICreatePageInput,
  ): Promise<INotion.ICreatePageOutput> {
    return NotionProvider.createPage(input);
  }

  /**
   * 노션 워크스페이스에 존재하는 모든 페이지 목록을 조회합니다.
   *
   * @summary 페이지 목록 조회
   * @returns 페이지 정보들
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @Standalone()
  @core.TypedRoute.Post("/get/page")
  async readPageList(
    @core.TypedBody() input: INotion.ISecret,
  ): Promise<INotion.IReadPageOutput[]> {
    return retry(() => NotionProvider.readPageList(input))();
  }

  /**
   * 워크스페이스에 있는 유저 목록을 조회합니다.
   *
   * @summary 유저 목록 조회
   * @returns 유저 정보들
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @Standalone()
  @core.TypedRoute.Post("get/users")
  async getUsers(
    @core.TypedBody() input: INotion.ISecret,
  ): Promise<INotion.IUserOutput[]> {
    return retry(() => NotionProvider.getUsers(input))();
  }

  /**
   * 페이지 끝에 내용을 추가합니다.
   *
   * @summary 페이지에 내용 추가
   *
   * @param input 페이지에 추가할 내용 및 추가할 페이지 정보
   * @returns void
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("/page/content/:pageId")
  async appendPageToContent(
    /**
     * @title 내용을 추가할 페이지
     * @description 내용을 추가할 페이지를 선택해 주세요.
     */
    @Prerequisite({
      neighbor: () => NotionController.prototype.readPageList,
      jmesPath: "[].{value:pageId, label:title || ''}",
    })
    @core.TypedParam("pageId")
    pageId: string,
    @core.TypedBody() input: INotion.IAppendPageToContentInput,
  ): Promise<void> {
    return retry(() => NotionProvider.appendPageToContent(pageId, input))();
  }

  /**
   * 데이터베이스에 아이템을 생성하기 위해 데이터베이스 목록을 조회합니다.
   *
   * @summary 데이터베이스 목록 조회
   * @returns 데이터베이스 정보 목록
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @Standalone()
  @core.TypedRoute.Post("get/database-info")
  async getDatabaseListInfo(
    @core.TypedBody() input: INotion.ISecret,
  ): Promise<INotion.IDatabaseInfo[]> {
    return retry(() => NotionProvider.getDatabaseListInfo(input))();
  }

  /**
   * 데이터베이스에 아이템을 생성하기 위한 데이터베이스 정보를 조회합니다.
   *
   * @summary 데이터베이스 정보 조회
   *
   * @param databaseId 데이터베이스 고유 id
   * @returns 데이터베이스 정보
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("get/database-info/:databaseId")
  async getDatabaseInfo(
    @core.TypedBody() input: INotion.ISecret,
    /**
     * @title 정보를 받아올 데이터베이스
     * @description 정보를 받아올 데이터베이스를 선택해 주세요.
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
   * 노션 테이블 데이터베이스에 아이템을 생성합니다.
   *
   * @summary 데이터베이스 아이템 생성
   *
   * @param input 데이터베이스 아이템 생성에 필요한 정보
   *
   * @param databaseId 아이템을 생성할 데이터베이스 고유 id
   * @returns 생성된 데이터베이스 아이템 정보
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("/database-item/:databaseId")
  async createDatabaseItem(
    @core.TypedBody() input: INotion.ICreateDatabaseItemInput,
    /**
     * @title 아이템을 추가할 데이터베이스
     * @description 아이템을 추가할 데이터베이스를 선택해 주세요.
     */
    @Prerequisite({
      neighbor: () => NotionController.prototype.getDatabaseListInfo,
      jmesPath: "[].{value:id, label:title || ''}",
    })
    @core.TypedParam("databaseId")
    databaseId: string,
  ): Promise<INotion.IDatabaseItemOutput> {
    return NotionProvider.createDatabaseItem(input, databaseId);
  }

  /**
   * 데이터베이스에 있는 아이템 정보를 수정합니다.
   *
   * @summary 데이터베이스 아이템 수정
   *
   * @param input 수정할 데이터베이스 아이템 정보
   *
   * @param databaseId 수정할 데이터베이스 고유 id
   * @returns 수정된 데이터베이스 아이템 정보
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Patch("/database-item/:databaseId")
  async updateDatabaseItem(
    @core.TypedBody() input: INotion.IUpdateDatabaseItemInput,
    /**
     * @title 아이템을 수정할 데이터베이스
     * @description 아이템을 수정할 데이터베이스를 선택해 주세요.
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
   * 제목으로 페이지를 검색합니다.
   *
   * @summary 제목으로 페이지 검색
   *
   * @param input 페이지 제목
   * @returns 검색된 페이지 정보
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @Standalone()
  @core.TypedRoute.Post("/get-page-by-title")
  async getPageByTitle(
    @core.TypedBody() input: INotion.IFindPageOrDatabaseItemInput,
  ): Promise<INotion.IFindPageByTitleOutput> {
    return retry(() => NotionProvider.findPageByTitle(input))();
  }

  /**
   * 테이블 데이터베이스에 존재하는 아이템 목록을 조회합니다.
   *
   * @summary 데이터베이스 아이템 목록 조회
   *
   * @param databaseId 데이터베이스 고유 id
   * @returns 조회된 데이터베이스 아이템 목록 정보
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("/find-item-list/:databaseId")
  async getDatabaseItemList(
    @core.TypedBody() input: INotion.ISecret,
    /**
     * @title 아이템 목록을 가져올 데이터베이스
     * @description 아이템 목록을 가져올 데이터베이스를 선택해 주세요.
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
   * 테이블 데이터베이스에 존재하는 아이템을 조회합니다.
   *
   * @summary 데이터베이스 아이템 조회
   *
   * @param input 데이터베이스 아이템 조회에 필요한 정보
   *
   * @param databaseId 데이터베이스 고유 id
   * @returns 조회된 데이터베이스 아이템 정보
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/Notion_full.svg",
  )
  @core.TypedRoute.Post("/find-item/:databaseId")
  async getDatabaseItem(
    @core.TypedBody() input: INotion.IFindDatabaseItemInput,
    /**
     * @title 아이템 정보를 가져올 데이터베이스
     * @description 아이템 정보를 가져올 데이터베이스를 선택해 주세요.
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
}
