import { Controller } from "@nestjs/common";
import { CalendlyProvider } from "../../providers/connector/calendly/CalendlyProvider";
import core, { TypedBody } from "@nestia/core";
import { ICalendly } from "@wrtn/connector-api/lib/structures/connector/calendly/ICalendly";

@Controller("connector/calendly")
export class CalendlyController {
  constructor(private readonly calendlyProvider: CalendlyProvider) {}

  /**
   * Endpoint: /scheduling_links
   * 기능: 사용자 또는 조직의 일정 유형을 나열합니다. 이 API는 어떤 유형의 미팅을 제공하는지 사용자에게 보여주기 위해 사용합니다.
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

  /**
   * Endpoint: /scheduled_events
   * 기능: 예약된 모든 이벤트(미팅)를 조회하고 세부 정보를 가져오는 데 사용됩니다. 예를 들어, 특정 기간 동안 예약된 미팅을 조회할 때 유용합니다.
   */
  async getScheduledEvents() {}

  /**
   * Endpoint: /scheduled_events/{event_uuid}/invitees
   * 기능: 예약된 이벤트에 초대된 사람들의 정보를 가져옵니다. 이 정보를 활용하여 미팅 참석자를 관리할 수 있습니다.
   */
  async getInvitees() {}

  /**
   * Endpoint: /availability
   * 기능: 특정 날짜 또는 시간에 사용자의 일정 가능 여부를 조회할 수 있습니다. 미팅 예약을 위해 사용자의 가능 일정을 확인하는 데 유용합니다.
   */
  async getAvailability() {}

  /**
   * Endpoint: /scheduled_events/{event_uuid}/invitees
   * 기능: 특정 이벤트에 초대자를 생성(추가)할 수 있습니다. 초대 메일을 발송하거나, 새로운 초대자를 이벤트에 등록하는 경우에 사용됩니다.
   */
  async invite() {}

  /**
   * Endpoint: /scheduled_events/{event_uuid}/cancellation
   * 기능: 예약된 이벤트를 취소할 수 있는 API입니다. 사용자가 일정 취소 요청을 할 때 필요합니다.
   */
  async cancel() {}

  /**
   * Endpoint: /scheduled_events/{event_uuid}/invitees/{invitee_uuid}/no_show
   * 기능: 초대받은 사람이 참석하지 않았음을 표시할 수 있는 기능입니다. 참석 여부를 관리할 때 유용합니다.
   */
  async checkNoShow() {}

  /**
   * Endpoint: /users/me
   * 기능: 현재 인증된 사용자 정보를 가져옵니다. 이벤트 생성 시 사용자 정보를 확인하거나 관련 정보를 표시할 때 사용할 수 있습니다.
   */
  async getUserInfo() {}
}
