import { Controller } from "@nestjs/common";
import { CalendlyProvider } from "../../providers/connector/calendly/CalendlyProvider";
import core, { TypedBody, TypedParam } from "@nestia/core";
import { ICalendly } from "@wrtn/connector-api/lib/structures/connector/calendly/ICalendly";

@Controller("connector/calendly")
export class CalendlyController {
  constructor(private readonly calendlyProvider: CalendlyProvider) {}

  /**
   * Endpoint: /scheduling_links
   * 기능: 미리 정의된 유형의 미팅을 위해 사용 가능한 예약 링크를 생성할 수 있습니다. 이 링크를 통해 사용자는 일정 예약 페이지로 이동할 수 있습니다.
   */
  @core.TypedRoute.Post("sechduling_links")
  async createSchedulingLink(
    input: ICalendly.CreateSchedulingLinkInput,
  ): Promise<ICalendly.CreateSchedulingLinkOutput> {
    return this.calendlyProvider.createSchedulingLink(input);
  }

  /**
   * Endpoint: /event_types
   * 기능: 사용자 또는 조직의 일정 유형을 나열합니다. 이 API는 어떤 유형의 미팅을 제공하는지 사용자에게 보여주기 위해 사용합니다.
   */
  @core.TypedRoute.Post("get-event-types")
  async getEventTypes(
    @TypedBody() input: ICalendly.IGetEventTypeInput,
  ): Promise<ICalendly.IGetEventTypeOutput> {
    return this.calendlyProvider.getEventTypes(input);
  }

  @core.TypedRoute.Post(
    "scheduled_events/:scheduled_event_id/invitees/:invitee_id/get-cancel-link",
  )
  async cancel(
    @TypedParam("scheduled_event_id") scheduledEventId: ICalendly.Event["uuid"],
    @TypedParam("invitee_id") inviteeId: ICalendly.Invitee["uuid"],
    @TypedBody() input: ICalendly.IGetOneScheduledEventInput,
  ): Promise<
    ICalendly.IGetOneScheduledEventInviteeOutput["resource"]["cancel_url"]
  > {
    const invitee = await this.calendlyProvider.getOneInvitee(
      scheduledEventId,
      inviteeId,
      input,
    );

    return invitee.resource.cancel_url;
  }

  /**
   * Endpoint: /scheduled_events/{uuid}
   * 기능: 예약된 이벤트 한 개를 조회라여 세부 정보를 가져옵니다.
   */
  @core.TypedRoute.Post("get-scheduled-events/:scheduled_event_id")
  async getOneScheduledEvent(
    @TypedParam("scheduled_event_id") scheduledEventId: ICalendly.Event["uuid"],
    @TypedBody() input: ICalendly.IGetOneScheduledEventInput,
  ): Promise<ICalendly.IGetOneScheduledEventOutput> {
    return this.calendlyProvider.getOneScheduledEvent(scheduledEventId, input);
  }

  /**
   * Endpoint: /scheduled_events
   * 기능: 예약된 모든 이벤트(미팅)를 조회하고 세부 정보를 가져오는 데 사용됩니다. 예를 들어, 특정 기간 동안 예약된 미팅을 조회할 때 유용합니다.
   */
  @core.TypedRoute.Post("get-scheduled-events")
  async getScheduledEvents(
    @TypedBody() input: ICalendly.IGetScheduledEventInput,
  ): Promise<ICalendly.IGetScheduledEventOutput> {
    return this.calendlyProvider.getScheduledEvents(input);
  }

  /**
   * Endpoint: /scheduled_events/{event_uuid}/invitees
   * 기능: 예약된 이벤트에 초대된 사람들의 정보를 가져옵니다. 이 정보를 활용하여 미팅 참석자를 관리할 수 있습니다.
   */
  @core.TypedRoute.Post("scheduled-events/get-invitees")
  async getInvitees(
    @TypedBody() input: ICalendly.IGetScheduledEventInviteeInput,
  ): Promise<ICalendly.IGetScheduledEventInviteeOutput> {
    return this.calendlyProvider.getInvitees(input);
  }

  /**
   * Endpoint: /one_off_event_types
   * 기능: 사용자가 특정 상황이나 단발성 이벤트를 위해 이벤트 유형을 생성할 수 있게 해줍니다.
   */
  @core.TypedRoute.Post("one-off-event-types")
  async createOneOffEventType(
    @TypedBody() input: ICalendly.ICreateOneOffEventTypeInput,
  ): Promise<ICalendly.ICreateOneOffEventTypeOutput> {
    return this.calendlyProvider.createOneOffEventType(input);
  }

  /**
   * Endpoint: /scheduled_events/{event_uuid}/invitees/{invitee_uuid}/no_show
   * 기능: 초대받은 사람이 참석하지 않았음을 표시할 수 있는 기능입니다. 참석 여부를 관리할 때 유용합니다.
   */
  async checkNoShow() {}

  /**
   * Endpoint: /users/me
   * 기능: 현재 인증된 사용자 정보를 가져옵니다. 이벤트 생성 시 사용자 정보를 확인하거나 관련 정보를 표시할 때 사용할 수 있습니다.
   */
  @core.TypedRoute.Post("users/get-me")
  async getUserInfo(
    @TypedBody() input: ICalendly.IGetUserInfoInput,
  ): Promise<ICalendly.IGetUserInfoOutput> {
    return this.calendlyProvider.getUserInfo(input);
  }
}
