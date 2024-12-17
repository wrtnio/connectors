import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import {
  Prerequisite,
  RouteIcon,
  SelectBenchmark,
  Standalone,
} from "@wrtnio/decorators";

import { IGoogleCalendar } from "@wrtn/connector-api/lib/structures/connector/google_calendar/IGoogleCalendar";

import { ApiTags } from "@nestjs/swagger";
import { GoogleCalendarProvider } from "../../../providers/connector/google_calendar/GoogleCalendarProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/google-calendar")
export class GoogleCalendarController {
  constructor(
    private readonly googleCalendarProvider: GoogleCalendarProvider,
  ) {}
  /**
   * Get a list of Google Calendars
   *
   * @summary Get a list of Google Calendars
   * @returns A list of Google Calendars
   */
  @SelectBenchmark("캘린더 리스트 조회해줘")
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleCal_full.svg",
  )
  @ApiTags("Google Calendar")
  @core.TypedRoute.Post("get-list")
  async readCalenders(
    @core.TypedBody()
    input: IGoogleCalendar.ISecret,
  ): Promise<IGoogleCalendar.IGoogleCalendarOutput[]> {
    return retry(() => this.googleCalendarProvider.calendarList(input))();
  }

  /**
   * Create a Google Calendar
   *
   * @summary Create a Google Calendar
   * @param input The title of the calendar to be created
   * @returns The unique ID of the calendar and the title of the calendar
   */
  @SelectBenchmark("구글 새 캘린더 만들어줘")
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleCal_full.svg",
  )
  @ApiTags("Google Calendar")
  @core.TypedRoute.Post("")
  async createCalendar(
    @core.TypedBody() input: IGoogleCalendar.ICreateCalendarInput,
  ): Promise<IGoogleCalendar.IGoogleCalendarOutput> {
    return retry(() => this.googleCalendarProvider.createCalendar(input))();
  }

  /**
   * Delete a calendar
   *
   * @summary Delete a Google Calendar
   * @param calendarId The unique ID of the calendar to delete
   */
  @SelectBenchmark("구글 캘린더 중 이거 삭제해줘")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleCal_full.svg",
  )
  @ApiTags("Google Calendar")
  @core.TypedRoute.Delete("/:calendarId")
  async deleteCalendar(
    /**
     * @title Calendar to delete
     * @description Please select the calendar to delete
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
   * Get a list of events in Google Calendar
   *
   * @summary Get a list of Google Calendar events
   * @param calendarId Unique ID of the calendar to get the list of events
   * @param input Condition to get the list of events
   * @returns A list of Google Calendar events
   */
  @SelectBenchmark("캘린더에 등록된 일정 좀 봐줘")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleCal_full.svg",
  )
  @ApiTags("Google Calendar")
  @core.TypedRoute.Post("/:calendarId/get-events")
  async readEvents(
    /**
     * @title Calendar to retrieve event list
     * @description Please select the calendar to retrieve event list
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
   * Add a quick event to Google Calendar
   *
   * @summary Add a quick event to Google Calendar
   * @param calendarId Unique ID of the calendar to add the event to
   * @param input Unique ID of the calendar to add the event to, and the event name
   */
  @SelectBenchmark("구글 캘린더에 이벤트 하나 생성해줘")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleCal_full.svg",
  )
  @ApiTags("Google Calendar")
  @core.TypedRoute.Post("/:calendarId/quick-event")
  async createQuickEvent(
    /**
     * @title Calendar to add event to
     * @description Please select the calendar to which you want to add a quick event
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
   * Add an event to Google Calendar
   *
   * @summary Add a Google Calendar event
   * @param calendarId Unique ID of the calendar to add the event to
   * @param input Information for adding the event
   * @returns Information about the added event
   */
  @SelectBenchmark("구글 캘린더에 이벤트 하나 생성해줘")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleCal_full.svg",
  )
  @ApiTags("Google Calendar")
  @core.TypedRoute.Post("/:calendarId/event")
  async createEvent(
    /**
     * @title Calendar to add event to
     * @description Please select the calendar to which you want to add the event
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
   * Modify an event
   *
   * @summary Modify a Google Calendar event
   * @param calendarId Unique ID of the calendar that contains the event
   * @param eventId Unique ID of the event to modify
   * @param input The event information to update
   * @returns The updated event information
   */
  @SelectBenchmark("구글 캘린더에 이벤트 하나 수정해줘")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleCal_full.svg",
  )
  @ApiTags("Google Calendar")
  @core.TypedRoute.Put("/:calendarId/event/:eventId")
  async updateEvent(
    /**
     * @title Calendar to edit event
     * @description Please select the calendar to edit event
     */
    @Prerequisite({
      neighbor: () => GoogleCalendarController.prototype.readCalenders,
      jmesPath: "[].{value:id, label:summary || ''}",
    })
    @core.TypedParam("calendarId")
    calendarId: string,
    /**
     * @title Event to edit
     * @description Please select the event to edit
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
   * Add attendees to an event
   *
   * @summary Add attendees to a Google Calendar event
   * @param calendarId Unique ID of the calendar where the event is
   * @param eventId Unique ID of the event to add attendees to
   * @param input List of email addresses of attendees to add
   * @returns Event information with attendees added
   */
  @SelectBenchmark("구글 캘린더에 이벤트 참석자 추가해줘")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleCal_full.svg",
  )
  @ApiTags("Google Calendar")
  @core.TypedRoute.Put("/:calendarId/event/:eventId/attendees")
  async addAttendeesToEvent(
    /**
     * @title Calendar to add attendees
     * @description Please select the calendar to add attendees to
     */
    @Prerequisite({
      neighbor: () => GoogleCalendarController.prototype.readCalenders,
      jmesPath: "[].{value:id, label:summary || ''}",
    })
    @core.TypedParam("calendarId")
    calendarId: string,
    /**
     * Please select the event to which you want to add attendees
     *
     * @summary Event to which you want to add attendees
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
   * Delete an event
   *
   * @summary Delete a Google Calendar event
   * @param calendarId The unique ID of the calendar that contains the event
   * @param eventId The unique ID of the event to delete
   */
  @SelectBenchmark("구글 캘린더에 일정 지워줘")
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleCal_full.svg",
  )
  @ApiTags("Google Calendar")
  @core.TypedRoute.Delete("/:calendarId/event/:eventId")
  async deleteEvent(
    /**
     * @title Select the calendar from which to delete the event
     * @description Select the calendar from which to delete the event
     */
    @Prerequisite({
      neighbor: () => GoogleCalendarController.prototype.readCalenders,
      jmesPath: "[].{value:id, label:summary || ''}",
    })
    @core.TypedParam("calendarId")
    calendarId: string,
    /**
     * @title Event to delete
     * @description Please select the event to delete
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
