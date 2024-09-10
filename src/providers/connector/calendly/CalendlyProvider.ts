import { Injectable } from "@nestjs/common";
import { OAuthSecretProvider } from "../../internal/oauth_secret/OAuthSecretProvider";
import axios from "axios";
import { ICalendly } from "@wrtn/connector-api/lib/structures/connector/calendly/ICalendly";
import { createQueryParameter } from "../../../utils/CreateQueryParameter";
import { ConnectorGlobal } from "../../../ConnectorGlobal";

@Injectable()
export class CalendlyProvider {
  /**
   * Endpoint: /scheduling_links
   * 기능: 미리 정의된 유형의 미팅을 위해 사용 가능한 예약 링크를 생성할 수 있습니다. 이 링크를 통해 사용자는 일정 예약 페이지로 이동할 수 있습니다.
   */
  async createSchedulingLink(
    input: ICalendly.CreateSchedulingLinkInput,
  ): Promise<ICalendly.CreateSchedulingLinkOutput> {
    const { secretKey, owner } = input;
    const token = await this.refresh(input);
    const url = `https://api.calendly.com/scheduling_links`;
    const res = await axios.post(
      url,
      {
        max_event_count: 1 as const,
        owner,
        owner_type: "EventType" as const,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  }

  /**
   * Endpoint: /event_types
   * 기능: 사용자 또는 조직의 일정 유형을 나열합니다. 이 API는 어떤 유형의 미팅을 제공하는지 사용자에게 보여주기 위해 사용합니다.
   */
  async getEventTypes(
    input: ICalendly.IGetEventTypeInput,
  ): Promise<ICalendly.IGetEventTypeOutput> {
    const { secretKey, ...rest } = input;
    const token = await this.refresh(input);
    const queryParameter = createQueryParameter(rest);
    const url = `https://api.calendly.com/event_types?${queryParameter}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  async getOneScheduledEvent(
    scheduledEventId: ICalendly.Event["uuid"],
    input: ICalendly.IGetOneScheduledEventInput,
  ): Promise<ICalendly.IGetOneScheduledEventOutput> {
    const token = await this.refresh(input);

    const url = `https://api.calendly.com/scheduled_events/${scheduledEventId}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = res.data as ICalendly.IGetOneScheduledEventOutput;
    const prefix = "https://api.calendly.com/scheduled_events/";
    data.resource.uuid = data.resource.uri.replace(prefix, "");
    return data;
  }

  /**
   * Endpoint: /scheduled_events
   * 기능: 예약된 모든 이벤트(미팅)를 조회하고 세부 정보를 가져오는 데 사용됩니다. 예를 들어, 특정 기간 동안 예약된 미팅을 조회할 때 유용합니다.
   */
  async getScheduledEvents(
    input: ICalendly.IGetScheduledEventInput,
  ): Promise<ICalendly.IGetScheduledEventOutput> {
    const { secretKey, ...rest } = input;
    const token = await this.refresh(input);
    const queryParameter = createQueryParameter(rest);
    const url = `https://api.calendly.com/scheduled_events?${queryParameter}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = res.data as ICalendly.IGetScheduledEventOutput;

    const collection = data.collection.map((el) => {
      const prefix = "https://api.calendly.com/scheduled_events/";
      const uuid = el.uri.replace(prefix, "");
      return { ...el, uuid };
    });
    return { collection, pagination: data.pagination };
  }

  async cancel(
    scheduledEventId: ICalendly.Event["uuid"],
    inviteeId: ICalendly.Invitee["uuid"],
    input: ICalendly.IGetOneScheduledEventInput,
  ): Promise<
    ICalendly.IGetOneScheduledEventInviteeOutput["resource"]["cancel_url"]
  > {
    const invitee = await this.getOneInvitee(
      scheduledEventId,
      inviteeId,
      input,
    );
    return invitee.resource.cancel_url;
  }

  async getOneInvitee(
    scheduledEventId: ICalendly.Event["uuid"],
    inviteeId: ICalendly.Invitee["uuid"],
    input: ICalendly.IGetOneScheduledEventInput,
  ): Promise<ICalendly.IGetOneScheduledEventInviteeOutput> {
    const token = await this.refresh(input);
    const url = `https://api.calendly.com/scheduled_events/${scheduledEventId}/invitees/${inviteeId}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = res.data as ICalendly.IGetOneScheduledEventInviteeOutput;
    const prefix = `https://calendly.com/scheduled_events/AAAAAAAAAAAAAAAA/invitees/`;
    data.resource.uuid = data.resource.uri.replace(prefix, "");
    return data;
  }

  /**
   * Endpoint: /scheduled_events/{event_uuid}/invitees
   * 기능: 예약된 이벤트에 초대된 사람들의 정보를 가져옵니다. 이 정보를 활용하여 미팅 참석자를 관리할 수 있습니다.
   */
  async getInvitees(
    input: ICalendly.IGetScheduledEventInviteeInput,
  ): Promise<ICalendly.IGetScheduledEventInviteeOutput> {
    const { scheduled_event_uuid, secretKey, ...rest } = input;
    const token = await this.refresh(input);
    const queryParameter = createQueryParameter(rest);
    const url = `https://api.calendly.com/scheduled_events/${scheduled_event_uuid}/invitees?${queryParameter}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = res.data as ICalendly.IGetScheduledEventInviteeOutput;
    const collection = data.collection.map((el) => {
      const prefix = `https://calendly.com/scheduled_events/AAAAAAAAAAAAAAAA/invitees/`;
      const uuid = el.uri.replace(prefix, "");
      return { ...el, uuid };
    });
    return { collection, pagination: data.pagination };
  }

  /**
   * {@link docs https://developer.calendly.com/api-docs/v1yuxil3cpmxq-create-one-off-event-type}
   */
  async createOneOffEventType(
    input: ICalendly.ICreateOneOffEventTypeInput,
  ): Promise<ICalendly.ICreateOneOffEventTypeOutput> {
    const { secretKey, ...rest } = input;
    const token = await this.refresh(input);
    const url = `https://api.calendly.com/one_off_event_types`;
    const res = await axios.post(
      url,
      {
        ...rest,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  }

  /**
   * Endpoint: /scheduled_events/{event_uuid}/invitees/{invitee_uuid}/no_show
   * 기능: 초대받은 사람이 참석하지 않았음을 표시할 수 있는 기능입니다. 참석 여부를 관리할 때 유용합니다.
   */
  async checkNoShow(
    eventId: ICalendly.Event["uuid"],
    inviteeId: ICalendly.Invitee["uuid"],
    input: ICalendly.IGetOneInviteInput,
  ): Promise<ICalendly.ICheckNoShowOutput> {
    const token = await this.refresh(input);
    const url = `https://api.calendly.com/invitee_no_shows`;
    const invitee = `https://api.calendly.com/scheduled_events/${eventId}/invitees/${inviteeId}`;
    const res = await axios.post(
      url,
      {
        invitee,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  }

  /**
   * Endpoint: /users/me
   * 기능: 현재 인증된 사용자 정보를 가져옵니다. 이벤트 생성 시 사용자 정보를 확인하거나 관련 정보를 표시할 때 사용할 수 있습니다.
   */
  async getUserInfo(
    input: ICalendly.IGetUserInfoInput,
  ): Promise<ICalendly.IGetUserInfoOutput> {
    const token = await this.refresh(input);
    const url = `https://api.calendly.com/users/me`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  async refresh({ secretKey }: ICalendly.Secret) {
    const refreshToken = await OAuthSecretProvider.getSecretValue(secretKey);
    try {
      const res = await axios.post(
        "https://auth.calendly.com/oauth/token",
        {
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.getBasicAuthorization(),
          },
        },
      );
      return res.data.access_token;
    } catch (err) {
      console.error(JSON.stringify(err));
    }
  }

  getBasicAuthorization() {
    const clientId = ConnectorGlobal.env.CALENDLY_CLIENT_ID;
    const clientSecret = ConnectorGlobal.env.CALENDLY_CLIENT_SECRET;

    // client_id:client_secret 형식으로 문자열 생성
    const credentials = clientId + ":" + clientSecret;

    // Base64 인코딩
    const encodedCredentials = btoa(credentials);
    return "Basic " + encodedCredentials;
  }
}
