import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { Prerequisite, RouteIcon, Standalone } from "@wrtn/decorators";

import { INotion } from "@wrtn/connector-api/lib/structures/connector/notion/INotion";

import { NotionProvider } from "../../../providers/connector/notion/NotionProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/notion")
export class NotionController {
  /**
   * 노션 페이지를 생성합니다.
   *
   * @summary 페이지 생성
   *
   * @param input 페이지 생성에 필요한 정보
   *
   * @returns 생성된 페이지 고유 id
   *
   * @tag Notion
   * @tag 노션
   * @tag 노트
   * @tag 메모
   * @tag 작업 관리
   * @tag 프로젝트 관리
   * @tag 할 일 목록
   * @tag 일정 관리
   * @tag 문서 작성
   * @tag 회의록 작성
   * @tag 체크리스트
   * @tag 아이디어 정리
   * @tag 업무 기록
   * @tag 학습 노트
   * @tag 스터디 플래너
   * @tag 제품기획
   * @tag 이력서
   * @tag 포트폴리오
   * @tag 협업
   * @tag 문서
   * @tag Notion
   * @tag Note
   * @tag Memo
   * @tag Task Management
   * @tag Project Management
   * @tag To do list
   * @tag Schedule Management
   * @tag Document Creation
   * @tag Meeting Notes
   * @tag Checklist
   * @tag Idea Organization
   * @tag Work Logging
   * @tag Study Notes
   * @tag Study Planner
   * @tag Product Management
   * @tag Resume
   * @tag Portfolio
   * @tag Collaboration
   * @tag Document
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/notion.svg",
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
   *
   * @returns 페이지 정보들
   *
   * @tag Notion
   * @tag 노션
   * @tag 노트
   * @tag 메모
   * @tag 작업 관리
   * @tag 프로젝트 관리
   * @tag 할 일 목록
   * @tag 일정 관리
   * @tag 문서 작성
   * @tag 회의록 작성
   * @tag 체크리스트
   * @tag 아이디어 정리
   * @tag 업무 기록
   * @tag 학습 노트
   * @tag 스터디 플래너
   * @tag 제품기획
   * @tag 이력서
   * @tag 포트폴리오
   * @tag 협업
   * @tag 문서
   * @tag Notion
   * @tag Note
   * @tag Memo
   * @tag Task Management
   * @tag Project Management
   * @tag To do list
   * @tag Schedule Management
   * @tag Document Creation
   * @tag Meeting Notes
   * @tag Checklist
   * @tag Idea Organization
   * @tag Work Logging
   * @tag Study Notes
   * @tag Study Planner
   * @tag Product Management
   * @tag Resume
   * @tag Portfolio
   * @tag Collaboration
   * @tag Document
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/notion.svg",
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
   *
   * @returns 유저 정보들
   *
   * @tag Notion
   * @tag 노션
   * @tag 노트
   * @tag 메모
   * @tag 작업 관리
   * @tag 프로젝트 관리
   * @tag 할 일 목록
   * @tag 일정 관리
   * @tag 문서 작성
   * @tag 회의록 작성
   * @tag 체크리스트
   * @tag 아이디어 정리
   * @tag 업무 기록
   * @tag 학습 노트
   * @tag 스터디 플래너
   * @tag 제품기획
   * @tag 이력서
   * @tag 포트폴리오
   * @tag 협업
   * @tag 문서
   * @tag Notion
   * @tag Note
   * @tag Memo
   * @tag Task Management
   * @tag Project Management
   * @tag To do list
   * @tag Schedule Management
   * @tag Document Creation
   * @tag Meeting Notes
   * @tag Checklist
   * @tag Idea Organization
   * @tag Work Logging
   * @tag Study Notes
   * @tag Study Planner
   * @tag Product Management
   * @tag Resume
   * @tag Portfolio
   * @tag Collaboration
   * @tag Document
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/notion.svg",
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
   *
   * @returns void
   *
   * @tag Notion
   * @tag 노션
   * @tag 노트
   * @tag 메모
   * @tag 작업 관리
   * @tag 프로젝트 관리
   * @tag 할 일 목록
   * @tag 일정 관리
   * @tag 문서 작성
   * @tag 회의록 작성
   * @tag 체크리스트
   * @tag 아이디어 정리
   * @tag 업무 기록
   * @tag 학습 노트
   * @tag 스터디 플래너
   * @tag 제품기획
   * @tag 이력서
   * @tag 포트폴리오
   * @tag 협업
   * @tag 문서
   * @tag Notion
   * @tag Note
   * @tag Memo
   * @tag Task Management
   * @tag Project Management
   * @tag To do list
   * @tag Schedule Management
   * @tag Document Creation
   * @tag Meeting Notes
   * @tag Checklist
   * @tag Idea Organization
   * @tag Work Logging
   * @tag Study Notes
   * @tag Study Planner
   * @tag Product Management
   * @tag Resume
   * @tag Portfolio
   * @tag Collaboration
   * @tag Document
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/notion.svg",
  )
  @core.TypedRoute.Post("/page/content/:pageId")
  async appendPageToContent(
    @Prerequisite({
      neighbor: () => NotionController.prototype.readPageList,
      array: (response): INotion.IReadPageOutput[] => response,
      value: (elem) => elem.pageId,
      label: (elem) => elem.title ?? "",
    })
    /**
     * 내용을 추가할 페이지를 선택해 주세요.
     *
     * @summary 내용을 추가할 페이지
     */
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
   *
   * @returns 데이터베이스 정보 목록
   *
   * @tag Notion
   * @tag 노션
   * @tag 노트
   * @tag 메모
   * @tag 작업 관리
   * @tag 프로젝트 관리
   * @tag 할 일 목록
   * @tag 일정 관리
   * @tag 문서 작성
   * @tag 회의록 작성
   * @tag 체크리스트
   * @tag 아이디어 정리
   * @tag 업무 기록
   * @tag 학습 노트
   * @tag 스터디 플래너
   * @tag 제품기획
   * @tag 이력서
   * @tag 포트폴리오
   * @tag 협업
   * @tag 문서
   * @tag Notion
   * @tag Note
   * @tag Memo
   * @tag Task Management
   * @tag Project Management
   * @tag To do list
   * @tag Schedule Management
   * @tag Document Creation
   * @tag Meeting Notes
   * @tag Checklist
   * @tag Idea Organization
   * @tag Work Logging
   * @tag Study Notes
   * @tag Study Planner
   * @tag Product Management
   * @tag Resume
   * @tag Portfolio
   * @tag Collaboration
   * @tag Document
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/notion.svg",
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
   *
   * @returns 데이터베이스 정보
   *
   * @tag Notion
   * @tag 노션
   * @tag 노트
   * @tag 메모
   * @tag 작업 관리
   * @tag 프로젝트 관리
   * @tag 할 일 목록
   * @tag 일정 관리
   * @tag 문서 작성
   * @tag 회의록 작성
   * @tag 체크리스트
   * @tag 아이디어 정리
   * @tag 업무 기록
   * @tag 학습 노트
   * @tag 스터디 플래너
   * @tag 제품기획
   * @tag 이력서
   * @tag 포트폴리오
   * @tag 협업
   * @tag 문서
   * @tag Notion
   * @tag Note
   * @tag Memo
   * @tag Task Management
   * @tag Project Management
   * @tag To do list
   * @tag Schedule Management
   * @tag Document Creation
   * @tag Meeting Notes
   * @tag Checklist
   * @tag Idea Organization
   * @tag Work Logging
   * @tag Study Notes
   * @tag Study Planner
   * @tag Product Management
   * @tag Resume
   * @tag Portfolio
   * @tag Collaboration
   * @tag Document
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/notion.svg",
  )
  @core.TypedRoute.Post("get/database-info/:databaseId")
  async getDatabaseInfo(
    @core.TypedBody() input: INotion.ISecret,
    @Prerequisite({
      neighbor: () => NotionController.prototype.getDatabaseListInfo,
      array: (response): INotion.IDatabaseInfo[] => response,
      value: (elem) => elem.id,
      label: (elem) => elem.title ?? "",
    })
    /**
     *정보를 받아올 데이터베이스를 선택해 주세요.
     *
     * @summary 정보를 받아올 데이터베이스
     */
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
   *
   * @returns 생성된 데이터베이스 아이템 정보
   *
   * @tag Notion
   * @tag 노션
   * @tag 노트
   * @tag 메모
   * @tag 작업 관리
   * @tag 프로젝트 관리
   * @tag 할 일 목록
   * @tag 일정 관리
   * @tag 문서 작성
   * @tag 회의록 작성
   * @tag 체크리스트
   * @tag 아이디어 정리
   * @tag 업무 기록
   * @tag 학습 노트
   * @tag 스터디 플래너
   * @tag 제품기획
   * @tag 이력서
   * @tag 포트폴리오
   * @tag 협업
   * @tag 문서
   * @tag Notion
   * @tag Note
   * @tag Memo
   * @tag Task Management
   * @tag Project Management
   * @tag To do list
   * @tag Schedule Management
   * @tag Document Creation
   * @tag Meeting Notes
   * @tag Checklist
   * @tag Idea Organization
   * @tag Work Logging
   * @tag Study Notes
   * @tag Study Planner
   * @tag Product Management
   * @tag Resume
   * @tag Portfolio
   * @tag Collaboration
   * @tag Document
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/notion.svg",
  )
  @core.TypedRoute.Post("/database-item/:databaseId")
  async createDatabaseItem(
    @core.TypedBody() input: INotion.ICreateDatabaseItemInput,
    @Prerequisite({
      neighbor: () => NotionController.prototype.getDatabaseListInfo,
      array: (response): INotion.IDatabaseInfo[] => response,
      value: (elem) => elem.id,
      label: (elem) => elem.title ?? "",
    })
    /**
     * 아이템을 추가할 데이터베이스를 선택해 주세요.
     *
     * @summary 아이템을 추가할 데이터베이스
     */
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
   *
   * @returns 수정된 데이터베이스 아이템 정보
   *
   * @tag Notion
   * @tag 노션
   * @tag 노트
   * @tag 메모
   * @tag 작업 관리
   * @tag 프로젝트 관리
   * @tag 할 일 목록
   * @tag 일정 관리
   * @tag 문서 작성
   * @tag 회의록 작성
   * @tag 체크리스트
   * @tag 아이디어 정리
   * @tag 업무 기록
   * @tag 학습 노트
   * @tag 스터디 플래너
   * @tag 제품기획
   * @tag 이력서
   * @tag 포트폴리오
   * @tag 협업
   * @tag 문서
   * @tag Notion
   * @tag Note
   * @tag Memo
   * @tag Task Management
   * @tag Project Management
   * @tag To do list
   * @tag Schedule Management
   * @tag Document Creation
   * @tag Meeting Notes
   * @tag Checklist
   * @tag Idea Organization
   * @tag Work Logging
   * @tag Study Notes
   * @tag Study Planner
   * @tag Product Management
   * @tag Resume
   * @tag Portfolio
   * @tag Collaboration
   * @tag Document
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/notion.svg",
  )
  @core.TypedRoute.Patch("/database-item/:databaseId")
  async updateDatabaseItem(
    @core.TypedBody() input: INotion.IUpdateDatabaseItemInput,
    @Prerequisite({
      neighbor: () => NotionController.prototype.getDatabaseListInfo,
      array: (response): INotion.IDatabaseInfo[] => response,
      value: (elem) => elem.id,
      label: (elem) => elem.title ?? "",
    })
    /**
     * 아이템을 수정할 데이터베이스를 선택해 주세요.
     *
     * @summary 아이템을 수정할 데이터베이스
     */
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
   *
   * @returns 검색된 페이지 정보
   *
   * @tag Notion
   * @tag 노션
   * @tag 노트
   * @tag 메모
   * @tag 작업 관리
   * @tag 프로젝트 관리
   * @tag 할 일 목록
   * @tag 일정 관리
   * @tag 문서 작성
   * @tag 회의록 작성
   * @tag 체크리스트
   * @tag 아이디어 정리
   * @tag 업무 기록
   * @tag 학습 노트
   * @tag 스터디 플래너
   * @tag 제품기획
   * @tag 이력서
   * @tag 포트폴리오
   * @tag 협업
   * @tag 문서
   * @tag Notion
   * @tag Note
   * @tag Memo
   * @tag Task Management
   * @tag Project Management
   * @tag To do list
   * @tag Schedule Management
   * @tag Document Creation
   * @tag Meeting Notes
   * @tag Checklist
   * @tag Idea Organization
   * @tag Work Logging
   * @tag Study Notes
   * @tag Study Planner
   * @tag Product Management
   * @tag Resume
   * @tag Portfolio
   * @tag Collaboration
   * @tag Document
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/notion.svg",
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
   *
   * @returns 조회된 데이터베이스 아이템 목록 정보
   *
   * @tag Notion
   * @tag 노션
   * @tag 노트
   * @tag 메모
   * @tag 작업 관리
   * @tag 프로젝트 관리
   * @tag 할 일 목록
   * @tag 일정 관리
   * @tag 문서 작성
   * @tag 회의록 작성
   * @tag 체크리스트
   * @tag 아이디어 정리
   * @tag 업무 기록
   * @tag 학습 노트
   * @tag 스터디 플래너
   * @tag 제품기획
   * @tag 이력서
   * @tag 포트폴리오
   * @tag 협업
   * @tag 문서
   * @tag Notion
   * @tag Note
   * @tag Memo
   * @tag Task Management
   * @tag Project Management
   * @tag To do list
   * @tag Schedule Management
   * @tag Document Creation
   * @tag Meeting Notes
   * @tag Checklist
   * @tag Idea Organization
   * @tag Work Logging
   * @tag Study Notes
   * @tag Study Planner
   * @tag Product Management
   * @tag Resume
   * @tag Portfolio
   * @tag Collaboration
   * @tag Document
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/notion.svg",
  )
  @core.TypedRoute.Post("/find-item-list/:databaseId")
  async getDatabaseItemList(
    @core.TypedBody() input: INotion.ISecret,
    @Prerequisite({
      neighbor: () => NotionController.prototype.getDatabaseListInfo,
      array: (response): INotion.IDatabaseInfo[] => response,
      value: (elem) => elem.id,
      label: (elem) => elem.title ?? "",
    })
    /**
     * 아이템 목록을 가져올 데이터베이스를 선택해 주세요.
     *
     * @summary 아이템 목록을 가져올 데이터베이스
     */
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
   *
   * @returns 조회된 데이터베이스 아이템 정보
   *
   * @tag Notion
   * @tag 노션
   * @tag 노트
   * @tag 메모
   * @tag 작업 관리
   * @tag 프로젝트 관리
   * @tag 할 일 목록
   * @tag 일정 관리
   * @tag 문서 작성
   * @tag 회의록 작성
   * @tag 체크리스트
   * @tag 아이디어 정리
   * @tag 업무 기록
   * @tag 학습 노트
   * @tag 스터디 플래너
   * @tag 제품기획
   * @tag 이력서
   * @tag 포트폴리오
   * @tag 협업
   * @tag 문서
   * @tag Notion
   * @tag Note
   * @tag Memo
   * @tag Task Management
   * @tag Project Management
   * @tag To do list
   * @tag Schedule Management
   * @tag Document Creation
   * @tag Meeting Notes
   * @tag Checklist
   * @tag Idea Organization
   * @tag Work Logging
   * @tag Study Notes
   * @tag Study Planner
   * @tag Product Management
   * @tag Resume
   * @tag Portfolio
   * @tag Collaboration
   * @tag Document
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/notion.svg",
  )
  @core.TypedRoute.Post("/find-item/:databaseId")
  async getDatabaseItem(
    @core.TypedBody() input: INotion.IFindDatabaseItemInput,
    @Prerequisite({
      neighbor: () => NotionController.prototype.getDatabaseListInfo,
      array: (response): INotion.IDatabaseInfo[] => response,
      value: (elem) => elem.id,
      label: (elem) => elem.title ?? "",
    })
    /**
     * 아이템 정보를 가져올 데이터베이스를 선택해 주세요.
     *
     * @summary 아이템 정보를 가져올 데이터베이스
     */
    @core.TypedParam("databaseId")
    databaseId: string,
  ): Promise<INotion.IDatabaseItemOutput> {
    return retry(() => NotionProvider.findDatabaseItem(input, databaseId))();
  }
}
