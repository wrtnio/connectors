import { Injectable } from "@nestjs/common";
import { google } from "googleapis";

import { IGoogleCalendar } from "@wrtn/connector-api/lib/structures/connector/google_calendar/IGoogleCalendar";

import { GoogleProvider } from "../../internal/google/GoogleProvider";

@Injectable()
export class GoogleCalendarProvider {
  constructor(private readonly googleProvider: GoogleProvider) {}
  async calendarList(
    input: IGoogleCalendar.ISecret,
  ): Promise<IGoogleCalendar.IGoogleCalendarOutput[]> {
    try {
      const secretKey = input.secretKey;
      const accessToken = await this.googleProvider.refreshAccessToken(
        secretKey,
      );
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });

      const calendar = google.calendar({ version: "v3", auth: authClient });
      const res = await calendar.calendarList.list();
      const calendarList = res.data.items;
      if (!calendarList) {
        return [];
      }
      const output: IGoogleCalendar.IGoogleCalendarOutput[] = [];
      for (const calendar of calendarList) {
        const calendarInfo: IGoogleCalendar.IGoogleCalendarOutput = {
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
    input: IGoogleCalendar.ICreateCalendarInput,
  ): Promise<IGoogleCalendar.IGoogleCalendarOutput> {
    try {
      const secretKey = input.secretKey;
      const accessToken = await this.googleProvider.refreshAccessToken(
        secretKey,
      );
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });

      const calendar = google.calendar({ version: "v3", auth: authClient });

      const res = await calendar.calendars.insert({
        requestBody: {
          summary: input.title,
        },
      });

      const calendarInfo = res.data;
      const output: IGoogleCalendar.IGoogleCalendarOutput = {
        id: calendarInfo.id,
        summary: calendarInfo.summary,
      };
      return output;
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async deleteCalendar(
    calendarId: string,
    input: IGoogleCalendar.ISecret,
  ): Promise<void> {
    try {
      const secretKey = input.secretKey;
      const accessToken = await this.googleProvider.refreshAccessToken(
        secretKey,
      );
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
    input: IGoogleCalendar.IReadGoogleCalendarEventInput,
  ): Promise<IGoogleCalendar.IReadGoogleCalendarEventOutput> {
    try {
      const secretKey = input.secretKey;
      const accessToken = await this.googleProvider.refreshAccessToken(
        secretKey,
      );
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });

      const calendar = google.calendar({ version: "v3", auth: authClient });
      const extract_fields = input.extract_fields?.join(",");
      const response = await calendar.events.list({
        calendarId: calendarId,
        timeMin: input.time_min ? this.makeDateForKST(input.time_min) : "",
        timeMax: input.time_max ? this.makeDateForKST(input.time_max) : "",
        maxResults: input.max_results,
        q: input.query,
        singleEvents: true,
        orderBy: input.orderBy,
        fields: `items(${extract_fields})`,
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

      const output: IGoogleCalendar.IGoogleCalendarEvent[] = [];

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
    input: IGoogleCalendar.ICreateQuickEventInput,
  ): Promise<void> {
    try {
      const secretKey = input.secretKey;
      const accessToken = await this.googleProvider.refreshAccessToken(
        secretKey,
      );
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
    input: IGoogleCalendar.IEventRequestBodyInput,
  ): Promise<IGoogleCalendar.IGoogleCalendarEvent> {
    try {
      const secretKey = input.secretKey;
      const accessToken = await this.googleProvider.refreshAccessToken(
        secretKey,
      );
      const authClient = new google.auth.OAuth2();

      authClient.setCredentials({ access_token: accessToken });

      const calendar = google.calendar({ version: "v3", auth: authClient });

      const event = await calendar.events.insert({
        calendarId: calendarId,
        conferenceDataVersion: input.isConferencing === true ? 1 : 0,
        requestBody: this.makeEventRequestBody(input),
      });

      return this.parseEventInfo(event);
    } catch (error) {
      console.error(JSON.stringify(error));
      throw error;
    }
  }

  async updateEvent(
    calendarId: string,
    eventId: string,
    input: IGoogleCalendar.IEventRequestBodyInput,
  ): Promise<IGoogleCalendar.IGoogleCalendarEvent> {
    const secretKey = input.secretKey;
    const accessToken = await this.googleProvider.refreshAccessToken(secretKey);
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
    input: IGoogleCalendar.IAddAttendeesToEventInput,
  ): Promise<IGoogleCalendar.IGoogleCalendarEvent> {
    const secretKey = input.secretKey;
    const accessToken = await this.googleProvider.refreshAccessToken(secretKey);
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

  async deleteEvent(
    calendarId: string,
    eventId: string,
    input: IGoogleCalendar.ISecret,
  ): Promise<void> {
    const secretKey = input.secretKey;
    const accessToken = await this.googleProvider.refreshAccessToken(secretKey);
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

  parseEventInfo(event: any): IGoogleCalendar.IGoogleCalendarEvent {
    return {
      id: event.data.id,
      htmlLink: event.data.htmlLink,
      color: event.data.colorId,
      createdDate: event.data.created,
      updatedDate: event.data.updated,
      title: event.data.summary,
      description: event.data.description,
      location: event.data.location,
      organizer: event.data.organizer,
      creator: event.data.creator,
      startDate: event.data.start,
      endDate: event.data.end,
      recurrence: event.data.recurrence,
      guestsCanModify: event.data.guestsCanModify,
      transparency: event.data.transparency,
      attendees: event.data.attendees,
      reminders: event.data.reminders,
      attachments: event.data.attachments,
      hangoutLink: event.data.hangoutLink,
      visibility: event.data.visibility,
    };
  }

  makeEventRequestBody(input: IGoogleCalendar.IEventRequestBodyInput) {
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
        dateTime: this.makeDateForKST(start),
        timeZone: "Asia/Seoul",
      },
      end: {
        dateTime: this.makeDateForKST(end),
        timeZone: "Asia/Seoul",
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
  makeDateForKST(input: IGoogleCalendar.IGoogleCalendarEvent.IDate) {
    const date = new Date(input.year, input.month - 1, input.date, input.hour);
    date.setHours(date.getHours() + 9);
    const kstDate = date.toISOString();
    return kstDate;
  }

  /**
   * 이벤트 반복 script 지정
   */
  createRecurrence(
    freq?: string,
    until?: IGoogleCalendar.IGoogleCalendarEvent.IDate,
    count?: number,
  ) {
    const recurrenceFields = [`FREQ=${freq?.toUpperCase()}`];

    if (until) {
      /**
       * until은 항상 자정이어야 하며 yyyyMMddT000000Z 형식이어야함
       * month와 date에 한 자리 숫자가 입력된 경우 앞에 0으로 채워줌
       */
      const untilDate = `${until.year}${String(until.month).padStart(
        2,
        "0",
      )}${String(until.date).padStart(2, "0")}T000000Z`;
      recurrenceFields.push(`UNTIL=${untilDate}`);
    } else if (count) {
      recurrenceFields.push(`COUNT=${count}`);
    }

    return [`RRULE:${recurrenceFields.join(";")}`];
  }
}
