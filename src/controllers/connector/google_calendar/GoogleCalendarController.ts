import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { Prerequisite, RouteIcon, Standalone } from "@wrtn/decorators";

import { ICommon } from "@wrtn/connector-api/lib/structures/connector/common/ISecretValue";
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
   *
   * @tag Google-Calendar
   * @tag 구글 캘린더
   * @tag 캘린더
   * @tag 일정 관리
   * @tag 일정 추가
   * @tag 일정 생성
   * @tag 일정 공유
   * @tag 일정 알림
   * @tag 회의 추가
   * @tag 약속 추가
   * @tag 시간 관리
   * @tag 달력
   * @tag 스케줄 관리
   * @tag 일정 조정
   * @tag 반복 일정
   * @tag 일정 동기화
   * @tag 일정 초대
   * @tag 일정 리마인더
   * @tag 캘린더 공유
   * @tag 시간표
   * @tag 구글 일정
   * @tag 스케줄러
   * @tag 이번 주 일정
   * @tag 다음 주 일정
   * @tag 월간 일정
   * @tag 개인 일정
   * @tag 팀 일정
   * @tag 회의 예약
   * @tag 업무 캘린더
   * @tag 휴가 일정
   * @tag Google Calendar
   * @tag Calendar
   * @tag Manage Schedule
   * @tag Add Event
   * @tag Create Event
   * @tag Share Event
   * @tag Event Reminder
   * @tag Add Meeting
   * @tag Add Appointment
   * @tag Time Management
   * @tag Calendar
   * @tag Schedule Management
   * @tag Adjust Schedule
   * @tag Recurring Event
   * @tag Sync Calendar
   * @tag Invite to Event
   * @tag Event Reminder
   * @tag Share Calendar
   * @tag Timetable
   * @tag Google Schedule
   * @tag Scheduler
   * @tag This Week's Schedule
   * @tag Next Week's Schedule
   * @tag Monthly Schedule
   * @tag Personal Schedule
   * @tag Team Schedule
   * @tag Schedule Meeting
   * @tag Work Calendar
   * @tag Vacation Schedule
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_calendar.svg",
  )
  @core.TypedRoute.Post("get-list")
  async readCalenders(
    @core.TypedBody()
    input: ICommon.ISecret<
      "google",
      ["https://www.googleapis.com/auth/calendar"]
    >,
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
   *
   * @tag Google-Calendar
   * @tag 구글 캘린더
   * @tag 캘린더
   * @tag 일정 관리
   * @tag 일정 추가
   * @tag 일정 생성
   * @tag 일정 공유
   * @tag 일정 알림
   * @tag 회의 추가
   * @tag 약속 추가
   * @tag 시간 관리
   * @tag 달력
   * @tag 스케줄 관리
   * @tag 일정 조정
   * @tag 반복 일정
   * @tag 일정 동기화
   * @tag 일정 초대
   * @tag 일정 리마인더
   * @tag 캘린더 공유
   * @tag 시간표
   * @tag 구글 일정
   * @tag 스케줄러
   * @tag 이번 주 일정
   * @tag 다음 주 일정
   * @tag 월간 일정
   * @tag 개인 일정
   * @tag 팀 일정
   * @tag 회의 예약
   * @tag 업무 캘린더
   * @tag 휴가 일정
   * @tag Google Calendar
   * @tag Calendar
   * @tag Manage Schedule
   * @tag Add Event
   * @tag Create Event
   * @tag Share Event
   * @tag Event Reminder
   * @tag Add Meeting
   * @tag Add Appointment
   * @tag Time Management
   * @tag Calendar
   * @tag Schedule Management
   * @tag Adjust Schedule
   * @tag Recurring Event
   * @tag Sync Calendar
   * @tag Invite to Event
   * @tag Event Reminder
   * @tag Share Calendar
   * @tag Timetable
   * @tag Google Schedule
   * @tag Scheduler
   * @tag This Week's Schedule
   * @tag Next Week's Schedule
   * @tag Monthly Schedule
   * @tag Personal Schedule
   * @tag Team Schedule
   * @tag Schedule Meeting
   * @tag Work Calendar
   * @tag Vacation Schedule
   */
  @Standalone()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_calendar.svg",
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
   *
   * @tag Google-Calendar
   * @tag 구글 캘린더
   * @tag 캘린더
   * @tag 일정 관리
   * @tag 일정 추가
   * @tag 일정 생성
   * @tag 일정 공유
   * @tag 일정 알림
   * @tag 회의 추가
   * @tag 약속 추가
   * @tag 시간 관리
   * @tag 달력
   * @tag 스케줄 관리
   * @tag 일정 조정
   * @tag 반복 일정
   * @tag 일정 동기화
   * @tag 일정 초대
   * @tag 일정 리마인더
   * @tag 캘린더 공유
   * @tag 시간표
   * @tag 구글 일정
   * @tag 스케줄러
   * @tag 이번 주 일정
   * @tag 다음 주 일정
   * @tag 월간 일정
   * @tag 개인 일정
   * @tag 팀 일정
   * @tag 회의 예약
   * @tag 업무 캘린더
   * @tag 휴가 일정
   * @tag Google Calendar
   * @tag Calendar
   * @tag Manage Schedule
   * @tag Add Event
   * @tag Create Event
   * @tag Share Event
   * @tag Event Reminder
   * @tag Add Meeting
   * @tag Add Appointment
   * @tag Time Management
   * @tag Calendar
   * @tag Schedule Management
   * @tag Adjust Schedule
   * @tag Recurring Event
   * @tag Sync Calendar
   * @tag Invite to Event
   * @tag Event Reminder
   * @tag Share Calendar
   * @tag Timetable
   * @tag Google Schedule
   * @tag Scheduler
   * @tag This Week's Schedule
   * @tag Next Week's Schedule
   * @tag Monthly Schedule
   * @tag Personal Schedule
   * @tag Team Schedule
   * @tag Schedule Meeting
   * @tag Work Calendar
   * @tag Vacation Schedule
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_calendar.svg",
  )
  @core.TypedRoute.Delete("/:calendarId")
  async deleteCalendar(
    @Prerequisite({
      neighbor: () => GoogleCalendarController.prototype.readCalenders,
      array: (response): IGoogleCalendar.IGoogleCalendarOutput[] => response,
      value: (elem) => elem.id,
      label: (elem) => elem.summary ?? "",
    })
    @core.TypedParam("calendarId")
    calendarId: string,
    @core.TypedBody()
    input: ICommon.ISecret<
      "google",
      ["https://www.googleapis.com/auth/calendar"]
    >,
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
   *
   * @tag Google-Calendar
   * @tag 구글 캘린더
   * @tag 캘린더
   * @tag 일정 관리
   * @tag 일정 추가
   * @tag 일정 생성
   * @tag 일정 공유
   * @tag 일정 알림
   * @tag 회의 추가
   * @tag 약속 추가
   * @tag 시간 관리
   * @tag 달력
   * @tag 스케줄 관리
   * @tag 일정 조정
   * @tag 반복 일정
   * @tag 일정 동기화
   * @tag 일정 초대
   * @tag 일정 리마인더
   * @tag 캘린더 공유
   * @tag 시간표
   * @tag 구글 일정
   * @tag 스케줄러
   * @tag 이번 주 일정
   * @tag 다음 주 일정
   * @tag 월간 일정
   * @tag 개인 일정
   * @tag 팀 일정
   * @tag 회의 예약
   * @tag 업무 캘린더
   * @tag 휴가 일정
   * @tag Google Calendar
   * @tag Calendar
   * @tag Manage Schedule
   * @tag Add Event
   * @tag Create Event
   * @tag Share Event
   * @tag Event Reminder
   * @tag Add Meeting
   * @tag Add Appointment
   * @tag Time Management
   * @tag Calendar
   * @tag Schedule Management
   * @tag Adjust Schedule
   * @tag Recurring Event
   * @tag Sync Calendar
   * @tag Invite to Event
   * @tag Event Reminder
   * @tag Share Calendar
   * @tag Timetable
   * @tag Google Schedule
   * @tag Scheduler
   * @tag This Week's Schedule
   * @tag Next Week's Schedule
   * @tag Monthly Schedule
   * @tag Personal Schedule
   * @tag Team Schedule
   * @tag Schedule Meeting
   * @tag Work Calendar
   * @tag Vacation Schedule
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_calendar.svg",
  )
  @core.TypedRoute.Post("/:calendarId/get-events")
  async readEvents(
    @Prerequisite({
      neighbor: () => GoogleCalendarController.prototype.readCalenders,
      array: (response): IGoogleCalendar.IGoogleCalendarOutput[] => response,
      value: (elem) => elem.id,
      label: (elem) => elem.summary ?? "",
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
   *
   * @tag Google-Calendar
   * @tag 구글 캘린더
   * @tag 캘린더
   * @tag 일정 관리
   * @tag 일정 추가
   * @tag 일정 생성
   * @tag 일정 공유
   * @tag 일정 알림
   * @tag 회의 추가
   * @tag 약속 추가
   * @tag 시간 관리
   * @tag 달력
   * @tag 스케줄 관리
   * @tag 일정 조정
   * @tag 반복 일정
   * @tag 일정 동기화
   * @tag 일정 초대
   * @tag 일정 리마인더
   * @tag 캘린더 공유
   * @tag 시간표
   * @tag 구글 일정
   * @tag 스케줄러
   * @tag 이번 주 일정
   * @tag 다음 주 일정
   * @tag 월간 일정
   * @tag 개인 일정
   * @tag 팀 일정
   * @tag 회의 예약
   * @tag 업무 캘린더
   * @tag 휴가 일정
   * @tag Google Calendar
   * @tag Calendar
   * @tag Manage Schedule
   * @tag Add Event
   * @tag Create Event
   * @tag Share Event
   * @tag Event Reminder
   * @tag Add Meeting
   * @tag Add Appointment
   * @tag Time Management
   * @tag Calendar
   * @tag Schedule Management
   * @tag Adjust Schedule
   * @tag Recurring Event
   * @tag Sync Calendar
   * @tag Invite to Event
   * @tag Event Reminder
   * @tag Share Calendar
   * @tag Timetable
   * @tag Google Schedule
   * @tag Scheduler
   * @tag This Week's Schedule
   * @tag Next Week's Schedule
   * @tag Monthly Schedule
   * @tag Personal Schedule
   * @tag Team Schedule
   * @tag Schedule Meeting
   * @tag Work Calendar
   * @tag Vacation Schedule
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_calendar.svg",
  )
  @core.TypedRoute.Post("/:calendarId/quick-event")
  async createQuickEvent(
    @Prerequisite({
      neighbor: () => GoogleCalendarController.prototype.readCalenders,
      array: (response): IGoogleCalendar.IGoogleCalendarOutput[] => response,
      value: (elem) => elem.id,
      label: (elem) => elem.summary ?? "",
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
   *
   * @tag Google-Calendar
   * @tag 구글 캘린더
   * @tag 캘린더
   * @tag 일정 관리
   * @tag 일정 추가
   * @tag 일정 생성
   * @tag 일정 공유
   * @tag 일정 알림
   * @tag 회의 추가
   * @tag 약속 추가
   * @tag 시간 관리
   * @tag 달력
   * @tag 스케줄 관리
   * @tag 일정 조정
   * @tag 반복 일정
   * @tag 일정 동기화
   * @tag 일정 초대
   * @tag 일정 리마인더
   * @tag 캘린더 공유
   * @tag 시간표
   * @tag 구글 일정
   * @tag 스케줄러
   * @tag 이번 주 일정
   * @tag 다음 주 일정
   * @tag 월간 일정
   * @tag 개인 일정
   * @tag 팀 일정
   * @tag 회의 예약
   * @tag 업무 캘린더
   * @tag 휴가 일정
   * @tag Google Calendar
   * @tag Calendar
   * @tag Manage Schedule
   * @tag Add Event
   * @tag Create Event
   * @tag Share Event
   * @tag Event Reminder
   * @tag Add Meeting
   * @tag Add Appointment
   * @tag Time Management
   * @tag Calendar
   * @tag Schedule Management
   * @tag Adjust Schedule
   * @tag Recurring Event
   * @tag Sync Calendar
   * @tag Invite to Event
   * @tag Event Reminder
   * @tag Share Calendar
   * @tag Timetable
   * @tag Google Schedule
   * @tag Scheduler
   * @tag This Week's Schedule
   * @tag Next Week's Schedule
   * @tag Monthly Schedule
   * @tag Personal Schedule
   * @tag Team Schedule
   * @tag Schedule Meeting
   * @tag Work Calendar
   * @tag Vacation Schedule
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_calendar.svg",
  )
  @core.TypedRoute.Post("/:calendarId/event")
  async createEvent(
    @Prerequisite({
      neighbor: () => GoogleCalendarController.prototype.readCalenders,
      array: (response): IGoogleCalendar.IGoogleCalendarOutput[] => response,
      value: (elem) => elem.id,
      label: (elem) => elem.summary ?? "",
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
   *
   * @tag Google-Calendar
   * @tag 구글 캘린더
   * @tag 캘린더
   * @tag 일정 관리
   * @tag 일정 추가
   * @tag 일정 생성
   * @tag 일정 공유
   * @tag 일정 알림
   * @tag 회의 추가
   * @tag 약속 추가
   * @tag 시간 관리
   * @tag 달력
   * @tag 스케줄 관리
   * @tag 일정 조정
   * @tag 반복 일정
   * @tag 일정 동기화
   * @tag 일정 초대
   * @tag 일정 리마인더
   * @tag 캘린더 공유
   * @tag 시간표
   * @tag 구글 일정
   * @tag 스케줄러
   * @tag 이번 주 일정
   * @tag 다음 주 일정
   * @tag 월간 일정
   * @tag 개인 일정
   * @tag 팀 일정
   * @tag 회의 예약
   * @tag 업무 캘린더
   * @tag 휴가 일정
   * @tag Google Calendar
   * @tag Calendar
   * @tag Manage Schedule
   * @tag Add Event
   * @tag Create Event
   * @tag Share Event
   * @tag Event Reminder
   * @tag Add Meeting
   * @tag Add Appointment
   * @tag Time Management
   * @tag Calendar
   * @tag Schedule Management
   * @tag Adjust Schedule
   * @tag Recurring Event
   * @tag Sync Calendar
   * @tag Invite to Event
   * @tag Event Reminder
   * @tag Share Calendar
   * @tag Timetable
   * @tag Google Schedule
   * @tag Scheduler
   * @tag This Week's Schedule
   * @tag Next Week's Schedule
   * @tag Monthly Schedule
   * @tag Personal Schedule
   * @tag Team Schedule
   * @tag Schedule Meeting
   * @tag Work Calendar
   * @tag Vacation Schedule
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_calendar.svg",
  )
  @core.TypedRoute.Put("/:calendarId/event/:eventId")
  async updateEvent(
    @Prerequisite({
      neighbor: () => GoogleCalendarController.prototype.readCalenders,
      array: (response): IGoogleCalendar.IGoogleCalendarOutput[] => response,
      value: (elem) => elem.id,
      label: (elem) => elem.summary ?? "",
    })
    @core.TypedParam("calendarId")
    calendarId: string,
    @Prerequisite({
      neighbor: () => GoogleCalendarController.prototype.readEvents,
      array: (response): IGoogleCalendar.IGoogleCalendarEvent[] =>
        response.events,
      value: (elem) => elem.id,
      label: (elem) => elem.title ?? "",
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
   *
   * @tag Google-Calendar
   * @tag 구글 캘린더
   * @tag 캘린더
   * @tag 일정 관리
   * @tag 일정 추가
   * @tag 일정 생성
   * @tag 일정 공유
   * @tag 일정 알림
   * @tag 회의 추가
   * @tag 약속 추가
   * @tag 시간 관리
   * @tag 달력
   * @tag 스케줄 관리
   * @tag 일정 조정
   * @tag 반복 일정
   * @tag 일정 동기화
   * @tag 일정 초대
   * @tag 일정 리마인더
   * @tag 캘린더 공유
   * @tag 시간표
   * @tag 구글 일정
   * @tag 스케줄러
   * @tag 이번 주 일정
   * @tag 다음 주 일정
   * @tag 월간 일정
   * @tag 개인 일정
   * @tag 팀 일정
   * @tag 회의 예약
   * @tag 업무 캘린더
   * @tag 휴가 일정
   * @tag Google Calendar
   * @tag Calendar
   * @tag Manage Schedule
   * @tag Add Event
   * @tag Create Event
   * @tag Share Event
   * @tag Event Reminder
   * @tag Add Meeting
   * @tag Add Appointment
   * @tag Time Management
   * @tag Calendar
   * @tag Schedule Management
   * @tag Adjust Schedule
   * @tag Recurring Event
   * @tag Sync Calendar
   * @tag Invite to Event
   * @tag Event Reminder
   * @tag Share Calendar
   * @tag Timetable
   * @tag Google Schedule
   * @tag Scheduler
   * @tag This Week's Schedule
   * @tag Next Week's Schedule
   * @tag Monthly Schedule
   * @tag Personal Schedule
   * @tag Team Schedule
   * @tag Schedule Meeting
   * @tag Work Calendar
   * @tag Vacation Schedule
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_calendar.svg",
  )
  @core.TypedRoute.Put("/:calendarId/event/:eventId/attendees")
  async addAttendeesToEvent(
    @Prerequisite({
      neighbor: () => GoogleCalendarController.prototype.readCalenders,
      array: (response): IGoogleCalendar.IGoogleCalendarOutput[] => response,
      value: (elem) => elem.id,
      label: (elem) => elem.summary ?? "",
    })
    @core.TypedParam("calendarId")
    calendarId: string,
    @Prerequisite({
      neighbor: () => GoogleCalendarController.prototype.readEvents,
      array: (response): IGoogleCalendar.IGoogleCalendarEvent[] =>
        response.events,
      value: (elem) => elem.id,
      label: (elem) => elem.title ?? "",
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
   *
   * @tag Google-Calendar
   * @tag 구글 캘린더
   * @tag 캘린더
   * @tag 일정 관리
   * @tag 일정 추가
   * @tag 일정 생성
   * @tag 일정 공유
   * @tag 일정 알림
   * @tag 회의 추가
   * @tag 약속 추가
   * @tag 시간 관리
   * @tag 달력
   * @tag 스케줄 관리
   * @tag 일정 조정
   * @tag 반복 일정
   * @tag 일정 동기화
   * @tag 일정 초대
   * @tag 일정 리마인더
   * @tag 캘린더 공유
   * @tag 시간표
   * @tag 구글 일정
   * @tag 스케줄러
   * @tag 이번 주 일정
   * @tag 다음 주 일정
   * @tag 월간 일정
   * @tag 개인 일정
   * @tag 팀 일정
   * @tag 회의 예약
   * @tag 업무 캘린더
   * @tag 휴가 일정
   * @tag Google Calendar
   * @tag Calendar
   * @tag Manage Schedule
   * @tag Add Event
   * @tag Create Event
   * @tag Share Event
   * @tag Event Reminder
   * @tag Add Meeting
   * @tag Add Appointment
   * @tag Time Management
   * @tag Calendar
   * @tag Schedule Management
   * @tag Adjust Schedule
   * @tag Recurring Event
   * @tag Sync Calendar
   * @tag Invite to Event
   * @tag Event Reminder
   * @tag Share Calendar
   * @tag Timetable
   * @tag Google Schedule
   * @tag Scheduler
   * @tag This Week's Schedule
   * @tag Next Week's Schedule
   * @tag Monthly Schedule
   * @tag Personal Schedule
   * @tag Team Schedule
   * @tag Schedule Meeting
   * @tag Work Calendar
   * @tag Vacation Schedule
   */
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/google_calendar.svg",
  )
  @core.TypedRoute.Delete("/:calendarId/event/:eventId")
  async deleteEvent(
    @Prerequisite({
      neighbor: () => GoogleCalendarController.prototype.readCalenders,
      array: (response): IGoogleCalendar.IGoogleCalendarOutput[] => response,
      value: (elem) => elem.id,
      label: (elem) => elem.summary ?? "",
    })
    @core.TypedParam("calendarId")
    calendarId: string,
    @Prerequisite({
      neighbor: () => GoogleCalendarController.prototype.readEvents,
      array: (response): IGoogleCalendar.IGoogleCalendarEvent[] =>
        response.events,
      value: (elem) => elem.id,
      label: (elem) => elem.title ?? "",
    })
    @core.TypedParam("eventId")
    eventId: string,
    @core.TypedBody()
    input: ICommon.ISecret<
      "google",
      ["https://www.googleapis.com/auth/calendar"]
    >,
  ): Promise<void> {
    return retry(() =>
      this.googleCalendarProvider.deleteEvent(calendarId, eventId, input),
    )();
  }
}
