import { google } from "googleapis";
import { tags } from "typia";
import { IGoogleCalendarService } from "../structures/IGoogleCalendarService";
import { GoogleService } from "@wrtnlabs/connector-google";

export class GoogleCalendarService {
  constructor(private readonly props: IGoogleCalendarService.IProps) {}

  async calendarList(): Promise<
    IGoogleCalendarService.IGoogleCalendarOutput[]
  > {
    try {
      const googleService = new GoogleService({
        ...this.props,
      });

      const accessToken = await googleService.refreshAccessToken();
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });

      const calendar = google.calendar({ version: "v3", auth: authClient });
      const res = await calendar.calendarList.list();
      const calendarList = res.data.items;
      if (!calendarList) {
        return [];
      }
      const output: IGoogleCalendarService.IGoogleCalendarOutput[] = [];
      for (const calendar of calendarList) {
        const calendarInfo: IGoogleCalendarService.IGoogleCalendarOutput = {
          id: calendar.id,
          summary: calendar.summary,
        };
        output.push(calendarInfo);
      }
      return output;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async createCalendar(
    input: IGoogleCalendarService.ICreateCalendarInput,
  ): Promise<IGoogleCalendarService.IGoogleCalendarOutput> {
    try {
      const googleService = new GoogleService({
        ...this.props,
      });

      const accessToken = await googleService.refreshAccessToken();
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });

      const calendar = google.calendar({ version: "v3", auth: authClient });

      const res = await calendar.calendars.insert({
        requestBody: {
          summary: input.title,
        },
      });

      const calendarInfo = res.data;
      const output: IGoogleCalendarService.IGoogleCalendarOutput = {
        id: calendarInfo.id,
        summary: calendarInfo.summary,
      };
      return output;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async deleteCalendar(calendarId: string): Promise<void> {
    try {
      const googleService = new GoogleService({
        ...this.props,
      });

      const accessToken = await googleService.refreshAccessToken();
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });

      const calendar = google.calendar({ version: "v3", auth: authClient });
      await calendar.calendars.delete({ calendarId: calendarId });
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      throw error;
    }
  }

  async eventList(
    calendarId: string,
    input: IGoogleCalendarService.IReadGoogleCalendarEventInput,
  ): Promise<IGoogleCalendarService.IReadGoogleCalendarEventOutput> {
    try {
      const googleService = new GoogleService({
        ...this.props,
      });

      const accessToken = await googleService.refreshAccessToken();
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });

      const calendar = google.calendar({ version: "v3", auth: authClient });
      const response = await calendar.events.list({
        calendarId: calendarId,
        timeMin: input.time_min ? this.makeDateForUTC(input.time_min) : "",
        timeMax: input.time_max ? this.makeDateForUTC(input.time_max) : "",
        maxResults: input.max_results,
        q: input.query,
        singleEvents: true,
        orderBy: input.orderBy,
      });
      const events = response.data.items;

      /**
       * 이벤트 조회 결과가 없을 때
       */
      if (!events) {
        return {
          events: [],
        };
      }

      const output: IGoogleCalendarService.IGoogleCalendarEvent[] = [];

      for (const event of events) {
        const eventInfo = this.parseEventInfo(event);
        output.push(eventInfo);
      }
      return {
        events: output,
      };
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async createQuickEvent(
    calendarId: string,
    input: IGoogleCalendarService.ICreateQuickEventInput,
  ): Promise<void> {
    try {
      const googleService = new GoogleService({
        ...this.props,
      });

      const accessToken = await googleService.refreshAccessToken();
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });

      const calendar = google.calendar({ version: "v3", auth: authClient });
      const params = { calendarId: calendarId, text: input.text };
      await calendar.events.quickAdd(params);
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async createEvent(
    calendarId: string,
    input: IGoogleCalendarService.IEventRequestBodyInput,
  ): Promise<IGoogleCalendarService.IGoogleCalendarEvent> {
    try {
      const googleService = new GoogleService({
        ...this.props,
      });

      const accessToken = await googleService.refreshAccessToken();
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });

      const calendar = google.calendar({ version: "v3", auth: authClient });

      const event = await calendar.events.insert({
        calendarId: calendarId,
        conferenceDataVersion: input.isConferencing === true ? 1 : 0,
        requestBody: this.makeEventRequestBody(input),
      });
      return this.parseEventInfo(event.data);
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async updateEvent(
    calendarId: string,
    eventId: string,
    input: IGoogleCalendarService.IEventRequestBodyInput,
  ): Promise<IGoogleCalendarService.IGoogleCalendarEvent> {
    const googleService = new GoogleService({
      ...this.props,
    });

    const accessToken = await googleService.refreshAccessToken();
    const authClient = new google.auth.OAuth2();

    authClient.setCredentials({ access_token: accessToken });

    const calendar = google.calendar({ version: "v3", auth: authClient });

    try {
      const event = await calendar.events.update({
        calendarId: calendarId,
        eventId: eventId,
        conferenceDataVersion: input.isConferencing === true ? 1 : 0,
        requestBody: this.makeEventRequestBody(input),
      });

      return this.parseEventInfo(event);
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async addAttendeesToEvent(
    calendarId: string,
    eventId: string,
    input: IGoogleCalendarService.IAddAttendeesToEventInput,
  ): Promise<IGoogleCalendarService.IGoogleCalendarEvent> {
    const googleService = new GoogleService({
      ...this.props,
    });

    const accessToken = await googleService.refreshAccessToken();
    const authClient = new google.auth.OAuth2();

    authClient.setCredentials({ access_token: accessToken });

    const calendar = google.calendar({ version: "v3", auth: authClient });

    try {
      const originalEvent = await calendar.events.get({
        calendarId,
        eventId,
      });
      const attendees = originalEvent.data.attendees || [];
      input.attendeesEmail.forEach((email) => {
        attendees.push({ email });
      });

      const event = await calendar.events.update({
        calendarId: calendarId,
        eventId: eventId,
        requestBody: {
          start: originalEvent.data.start,
          end: originalEvent.data.end,
          attendees,
        },
      });

      return this.parseEventInfo(event);
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async deleteEvent(calendarId: string, eventId: string): Promise<void> {
    const googleService = new GoogleService({
      ...this.props,
    });

    const accessToken = await googleService.refreshAccessToken();
    const authClient = new google.auth.OAuth2();

    authClient.setCredentials({ access_token: accessToken });

    const calendar = google.calendar({ version: "v3", auth: authClient });
    try {
      await calendar.events.delete({
        calendarId: calendarId,
        eventId: eventId,
      });
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  parseEventInfo(event: any): IGoogleCalendarService.IGoogleCalendarEvent {
    return {
      id: event.id || null,
      htmlLink: event.htmlLink || null,
      color: event.colorId || null,
      createdDate: event.created || null,
      updatedDate: event.updated || null,
      title: event.summary || null,
      description: event.description || null,
      location: event.location || null,
      organizer: event.organizer || null,
      creator: event.creator || null,
      startDate: event.start || null,
      endDate: event.end || null,
      recurrence: event.recurrence || null,
      guestsCanModify: event.guestsCanModify || null,
      transparency: event.transparency || null,
      attendees: event.attendees || null,
      reminders: event.reminders || null,
      attachments: event.attachments || null,
      hangoutLink: event.hangoutLink || null,
      visibility: event.visibility || null,
    };
  }

  makeEventRequestBody(input: IGoogleCalendarService.IEventRequestBodyInput) {
    const {
      start,
      end,
      title,
      description,
      location,
      repeatFrequency,
      repeatUntil,
      repeatNum,
      isBusy,
      visibility,
      colorId,
      isGuestCanModify,
      attendeesEmail,
      isUseDefaultReminder,
      remindersType,
      minutesBeforeReminders,
    } = input;

    const requestBody: any = {
      start: {
        dateTime: this.makeDateForUTC(start),
        timeZone: "UTC",
      },
      end: {
        dateTime: this.makeDateForUTC(end),
        timeZone: "UTC",
      },
      summary: title,
      description: description,
      location: location,
      recurrence:
        repeatFrequency || repeatUntil || repeatNum
          ? this.createRecurrence(repeatFrequency, repeatUntil, repeatNum)
          : undefined,
      transparency:
        isBusy !== undefined ? (isBusy ? "opaque" : "transparent") : undefined,
      visibility: visibility,
      colorId: colorId,
      guestsCanModify: isGuestCanModify,
      attendees: attendeesEmail?.length
        ? [{ email: attendeesEmail.join(",") }]
        : undefined,
      reminders: isUseDefaultReminder
        ? {
            useDefault: isUseDefaultReminder,
          }
        : remindersType && minutesBeforeReminders
          ? {
              useDefault: false,
              overrides: [
                {
                  method: remindersType,
                  minutes: minutesBeforeReminders,
                },
              ],
            }
          : undefined,
    };

    /**
     * 값이 undefined인 field 제외
     */
    Object.keys(requestBody).forEach(
      (field) => requestBody[field] === undefined && delete requestBody[field],
    );

    return requestBody;
  }

  /**
   * 이벤트 시작 / 종료날짜 지정시 KST로 변환해서 지정해줘야 함
   */
  makeDateForUTC(dateTime: string & tags.Format<"date-time">) {
    const date = new Date(dateTime); // date-time 문자열을 Date 객체로 변환
    return date.toISOString(); // UTC 기준 ISO 문자열 반환
  }

  /**
   * 이벤트 반복 script 지정
   */
  createRecurrence(
    freq?: string,
    until?: string & tags.Format<"date-time">,
    count?: number,
  ) {
    const recurrenceFields = [`FREQ=${freq?.toUpperCase()}`];

    if (until) {
      /**
       * until은 항상 자정이어야 하며 yyyyMMddT000000Z 형식이어야함
       * month와 date에 한 자리 숫자가 입력된 경우 앞에 0으로 채워줌
       */
      const date = new Date(until);
      const untilDate = `${date.getUTCFullYear()}${String(date.getUTCMonth() + 1).padStart(2, "0")}${String(date.getUTCDate()).padStart(2, "0")}T000000Z`;
      recurrenceFields.push(`UNTIL=${untilDate}`);
    } else if (count) {
      recurrenceFields.push(`COUNT=${count}`);
    }

    return [`RRULE:${recurrenceFields.join(";")}`];
  }
}
