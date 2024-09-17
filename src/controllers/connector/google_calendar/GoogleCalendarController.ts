import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { Prerequisite, RouteIcon, Standalone } from "@wrtnio/decorators";

import { IGoogleCalendar } from "@wrtn/connector-api/lib/structures/connector/google_calendar/IGoogleCalendar";

import { GoogleCalendarProvider } from "../../../providers/connector/google_calendar/GoogleCalendarProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/google-calendar")
export class GoogleCalendarController {
  constructor(
    private readonly googleCalendarProvider: GoogleCalendarProvider,
  ) {}
  /**
   * 구글 캘린더 목록을 가져옵니다.
   *
   * @summary 구글 캘린더 목록 가져오기.
   *
   * @returns 구글 캘린더 목록.
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleCal_full.svg",
  )
  @core.TypedRoute.Post("get-list")
  async readCalenders(
    @core.TypedBody()
    input: IGoogleCalendar.ISecret,
  ): Promise<IGoogleCalendar.IGoogleCalendarOutput[]> {
    return retry(() => this.googleCalendarProvider.calendarList(input))();
  }

  /**
   * 구글 캘린더를 생성합니다.
   *
   * @summary 구글 캘린더 생성.
   *
   * @param input 생성할 캘린더 제목.
   *
   * @returns 캘린더 고유 ID와 캘린더 제목.
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleCal_full.svg",
  )
  @core.TypedRoute.Post("")
  async createCalendar(
    @core.TypedBody() input: IGoogleCalendar.ICreateCalendarInput,
  ): Promise<IGoogleCalendar.IGoogleCalendarOutput> {
    return retry(() => this.googleCalendarProvider.createCalendar(input))();
  }

  /**
   * 캘린더를 삭제합니다.
   *
   * @summary 구글 캘린더 삭제.
   *
   * @param calendarId 삭제할 캘린더 고유 ID.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleCal_full.svg",
  )
  @core.TypedRoute.Delete("/:calendarId")
  async deleteCalendar(
    /**
     * @title 삭제할 캘린더
     * @description 삭제할 캘린더를 선택해주세요.
     */
    @Prerequisite({
      neighbor: () => GoogleCalendarController.prototype.readCalenders,
      jmesPath: "[].{value:id, label:summary || ''}",
    })
    @core.TypedParam("calendarId")
    calendarId: string,
    @core.TypedBody()
    input: IGoogleCalendar.ISecret,
  ): Promise<void> {
    return retry(() =>
      this.googleCalendarProvider.deleteCalendar(calendarId, input),
    )();
  }

  /**
   * 구글 캘린더에 있는 이벤트 목록을 가져옵니다.
   *
   * @summary 구글 캘린더 이벤트 목록 가져오기.
   *
   * @param calendarId 이벤트 목록을 가져올 캘린더 고유 ID.
   *
   * @param input 이벤트 목록을 가져오기 위한 조건.
   *
   * @returns 구글 캘린더 이벤트 목록.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleCal_full.svg",
  )
  @core.TypedRoute.Post("/:calendarId/get-events")
  async readEvents(
    /**
     * @title 이벤트 목록을 가져올 캘린더
     * @description 이벤트 목록을 가져올 캘린더를 선택해주세요.
     */
    @Prerequisite({
      neighbor: () => GoogleCalendarController.prototype.readCalenders,
      jmesPath: "[].{value:id, label:summary || ''}",
    })
    @core.TypedParam("calendarId")
    calendarId: string,
    @core.TypedBody() input: IGoogleCalendar.IReadGoogleCalendarEventInput,
  ): Promise<IGoogleCalendar.IReadGoogleCalendarEventOutput> {
    return retry(() =>
      this.googleCalendarProvider.eventList(calendarId, input),
    )();
  }

  /**
   * 구글 캘린더에 빠른 이벤트를 추가합니다.
   *
   * @summary 구글 캘린더 빠른 이벤트 추가.
   *
   * @param calendarId 이벤트를 추가할 캘린더 고유 ID.
   *
   * @param input 이벤트를 추가할 캘린더 고유 ID, 이벤트 명.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleCal_full.svg",
  )
  @core.TypedRoute.Post("/:calendarId/quick-event")
  async createQuickEvent(
    /**
     * @title 이벤트를 추가할 캘린더
     * @description 빠른 이벤트를 추가할 캘린더를 선택해주세요.
     */
    @Prerequisite({
      neighbor: () => GoogleCalendarController.prototype.readCalenders,
      jmesPath: "[].{value:id, label:summary || ''}",
    })
    @core.TypedParam("calendarId")
    calendarId: string,
    @core.TypedBody() input: IGoogleCalendar.ICreateQuickEventInput,
  ): Promise<void> {
    return retry(() =>
      this.googleCalendarProvider.createQuickEvent(calendarId, input),
    )();
  }

  /**
   * 구글 캘린더에 이벤트를 추가합니다.
   *
   * @summary 구글 캘린더 이벤트 추가.
   *
   * @param calendarId 이벤트를 추가할 캘린더 고유 ID.
   *
   * @param input 이벤트 추가를 위한 정보.
   *
   * @returns 추가한 이벤트 정보.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleCal_full.svg",
  )
  @core.TypedRoute.Post("/:calendarId/event")
  async createEvent(
    /**
     * @title 이벤트를 추가할 캘린더
     * @description 이벤트를 추가할 캘린더를 선택해주세요.
     */
    @Prerequisite({
      neighbor: () => GoogleCalendarController.prototype.readCalenders,
      jmesPath: "[].{value:id, label:summary || ''}",
    })
    @core.TypedParam("calendarId")
    calendarId: string,
    @core.TypedBody() input: IGoogleCalendar.IEventRequestBodyInput,
  ): Promise<IGoogleCalendar.IGoogleCalendarEvent> {
    return retry(() =>
      this.googleCalendarProvider.createEvent(calendarId, input),
    )();
  }

  /**
   * 이벤트를 수정합니다.
   *
   * @summary 구글 캘린더 이벤트 수정.
   *
   * @param calendarId 이벤트가 있는 캘린더 고유 ID.
   *
   * @param eventId 수정할 이벤트 고유 ID.
   *
   * @param input 업데이트 할 이벤트 정보.
   *
   * @returns 업데이트 된 이벤트 정보.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleCal_full.svg",
  )
  @core.TypedRoute.Put("/:calendarId/event/:eventId")
  async updateEvent(
    /**
     * @title 이벤트를 수정할 캘린더
     * @description 이벤트를 수정할 캘린더를 선택해주세요.
     */
    @Prerequisite({
      neighbor: () => GoogleCalendarController.prototype.readCalenders,
      jmesPath: "[].{value:id, label:summary || ''}",
    })
    @core.TypedParam("calendarId")
    calendarId: string,
    /**
     * @title 수정할 이벤트
     * @description 수정할 이벤트를 선택해주세요.
     */
    @Prerequisite({
      neighbor: () => GoogleCalendarController.prototype.readEvents,
      jmesPath: "[].{value: id, label: title || ''}",
    })
    @core.TypedParam("eventId")
    eventId: string,
    @core.TypedBody() input: IGoogleCalendar.IEventRequestBodyInput,
  ): Promise<IGoogleCalendar.IGoogleCalendarEvent> {
    return retry(() =>
      this.googleCalendarProvider.updateEvent(calendarId, eventId, input),
    )();
  }

  /**
   * 이벤트에 참석자를 추가합니다.
   *
   * @summary 구글 캘린더 이벤트 참석자 추가.
   *
   * @param calendarId 이벤트가 있는 캘린더 고유 ID.
   *
   * @param eventId 참석자를 추가할 이벤트 고유 ID.
   *
   * @param input 추가할 참석자 이메일 목록.
   *
   * @returns 참석자가 추가된 이벤트 정보.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleCal_full.svg",
  )
  @core.TypedRoute.Put("/:calendarId/event/:eventId/attendees")
  async addAttendeesToEvent(
    /**
     * @title 참석자를 추가할 캘린더
     * @description 참석자를 추가할 캘린더를 선택해주세요.
     */
    @Prerequisite({
      neighbor: () => GoogleCalendarController.prototype.readCalenders,
      jmesPath: "[].{value:id, label:summary || ''}",
    })
    @core.TypedParam("calendarId")
    calendarId: string,
    /**
     * 참석자를 추가할 이벤트를 선택해주세요.
     *
     * @summary 참석자를 추가할 이벤트
     */
    @Prerequisite({
      neighbor: () => GoogleCalendarController.prototype.readEvents,
      jmesPath: "[].{value: id, label: title || ''}",
    })
    @core.TypedParam("eventId")
    eventId: string,
    @core.TypedBody() input: IGoogleCalendar.IAddAttendeesToEventInput,
  ): Promise<IGoogleCalendar.IGoogleCalendarEvent> {
    return retry(() =>
      this.googleCalendarProvider.addAttendeesToEvent(
        calendarId,
        eventId,
        input,
      ),
    )();
  }

  /**
   * 이벤트를 삭제합니다.
   *
   * @summary 구글 캘린더 이벤트 삭제.
   *
   * @param calendarId 이벤트가 있는 캘린더 고유 ID.
   *
   * @param eventId 삭제할 이벤트 고유 ID.
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleCal_full.svg",
  )
  @core.TypedRoute.Delete("/:calendarId/event/:eventId")
  async deleteEvent(
    /**
     * @title 이벤트를 삭제할 캘린더
     * @description 이벤트를 삭제할 캘린더를 선택해주세요.
     */
    @Prerequisite({
      neighbor: () => GoogleCalendarController.prototype.readCalenders,
      jmesPath: "[].{value:id, label:summary || ''}",
    })
    @core.TypedParam("calendarId")
    calendarId: string,
    /**
     * @title 삭제할 이벤트
     * @description 삭제할 이벤트를 선택해주세요.
     */
    @Prerequisite({
      neighbor: () => GoogleCalendarController.prototype.readEvents,
      jmesPath: "[].{value: id, label: title || ''}",
    })
    @core.TypedParam("eventId")
    eventId: string,
    @core.TypedBody()
    input: IGoogleCalendar.ISecret,
  ): Promise<void> {
    return retry(() =>
      this.googleCalendarProvider.deleteEvent(calendarId, eventId, input),
    )();
  }
}