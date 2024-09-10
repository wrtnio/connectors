import { Controller } from "@nestjs/common";
import { CalendlyProvider } from "../../providers/connector/calendly/CalendlyProvider";
import core, { TypedBody, TypedParam } from "@nestia/core";
import { ICalendly } from "@wrtn/connector-api/lib/structures/connector/calendly/ICalendly";

@Controller("connector/calendly")
export class CalendlyController {
  constructor(private readonly calendlyProvider: CalendlyProvider) {}

  /**
   * @summary Create a new scheduling link
   * @description Creates a scheduling link for the authenticated user.
   * @param input The necessary details to create the scheduling link.
   * @returns The created scheduling link details.
   */
  @core.TypedRoute.Post("scheduling_links")
  async createSchedulingLink(
    @TypedBody() input: ICalendly.CreateSchedulingLinkInput,
  ): Promise<ICalendly.CreateSchedulingLinkOutput> {
    return this.calendlyProvider.createSchedulingLink(input);
  }

  /**
   * @summary List all event types
   * @description Retrieves the event types available for the user or organization. Useful to show what types of meetings can be scheduled.
   * @param input The input required to retrieve event types.
   * @returns The list of event types.
   */
  @core.TypedRoute.Post("get-event-types")
  async getEventTypes(
    @TypedBody() input: ICalendly.IGetEventTypeInput,
  ): Promise<ICalendly.IGetEventTypeOutput> {
    return this.calendlyProvider.getEventTypes(input);
  }

  /**
   * @summary Get cancel link for invitee
   * @description Retrieves the cancel link for a specific invitee in an event.
   * @param eventId The ID of the event.
   * @param inviteeId The ID of the invitee.
   * @param input Additional input for cancel link retrieval.
   * @returns The cancel link for the invitee.
   */
  @core.TypedRoute.Post("events/:eventId/invitees/:inviteeId/get-cancel-link")
  async cancel(
    @TypedParam("eventId") eventId: ICalendly.Event["uuid"],
    @TypedParam("inviteeId") inviteeId: ICalendly.Invitee["uuid"],
    @TypedBody() input: ICalendly.ICancelInput,
  ): Promise<ICalendly.ICacnelOutput> {
    const invitee = await this.calendlyProvider.getOneInvitee(
      eventId,
      inviteeId,
      input,
    );
    return invitee.resource.cancel_url;
  }

  /**
   * @summary Get details of a scheduled event
   * @description Fetches the detailed information of a specific scheduled event by its UUID.
   * @param eventId The UUID of the event.
   * @param input Additional input for event retrieval.
   * @returns The detailed information of the scheduled event.
   */
  @core.TypedRoute.Post("get-events/:eventId")
  async getOneScheduledEvent(
    @TypedParam("eventId") eventId: ICalendly.Event["uuid"],
    @TypedBody() input: ICalendly.IGetOneScheduledEventInput,
  ): Promise<ICalendly.IGetOneScheduledEventOutput> {
    return this.calendlyProvider.getOneScheduledEvent(eventId, input);
  }

  /**
   * @summary Get all scheduled events
   * @description Retrieves all scheduled events within a given time period or based on certain criteria.
   * @param input The input to filter scheduled events.
   * @returns The list of scheduled events.
   */
  @core.TypedRoute.Post("get-scheduled-events")
  async getScheduledEvents(
    @TypedBody() input: ICalendly.IGetScheduledEventInput,
  ): Promise<ICalendly.IGetScheduledEventOutput> {
    return this.calendlyProvider.getScheduledEvents(input);
  }

  /**
   * @summary Mark an invitee as no-show
   * @description Marks an invitee as a no-show for a specific event.
   * @param eventId The UUID of the event.
   * @param inviteeId The UUID of the invitee.
   * @param input Additional input for no-show marking.
   * @returns The result of the no-show marking.
   */
  @core.TypedRoute.Post("events/:eventId/invitees/:inviteeId/no-show")
  async checkNoShow(
    @TypedParam("eventId") eventId: ICalendly.Event["uuid"],
    @TypedParam("inviteeId") inviteeId: ICalendly.Invitee["uuid"],
    @TypedBody() input: ICalendly.ICheckNoShowInput,
  ): Promise<ICalendly.ICheckNoShowOutput> {
    return this.calendlyProvider.checkNoShow(eventId, inviteeId, input);
  }

  /**
   * @summary Get invitee details
   * @description Retrieves the details of a specific invitee for a scheduled event.
   * @param eventId The UUID of the event.
   * @param inviteeId The UUID of the invitee.
   * @param input Additional input for invitee retrieval.
   * @returns The details of the invitee.
   */
  @core.TypedRoute.Post("events/:eventId/get-invitees/:inviteeId")
  async getOneInvite(
    @TypedParam("eventId") eventId: ICalendly.Event["uuid"],
    @TypedParam("inviteeId") inviteeId: ICalendly.Invitee["uuid"],
    @TypedBody() input: ICalendly.IGetOneInviteInput,
  ): Promise<ICalendly.IGetOneScheduledEventInviteeOutput> {
    const invitee = await this.calendlyProvider.getOneInvitee(
      eventId,
      inviteeId,
      input,
    );
    return invitee;
  }

  /**
   * @summary Get all invitees for a scheduled event
   * @description Retrieves the list of invitees for a scheduled event.
   * @param input The input to filter invitees.
   * @returns The list of invitees for the event.
   */
  @core.TypedRoute.Post("events/get-invitees")
  async getInvitees(
    @TypedBody() input: ICalendly.IGetScheduledEventInviteeInput,
  ): Promise<ICalendly.IGetScheduledEventInviteeOutput> {
    return this.calendlyProvider.getInvitees(input);
  }

  /**
   * @summary Create a one-off event type
   * @description Allows users to create a one-off event type for special occasions or single events.
   * @param input The details needed to create a one-off event type.
   * @returns The created one-off event type details.
   */
  @core.TypedRoute.Post("one-off-event-types")
  async createOneOffEventType(
    @TypedBody() input: ICalendly.ICreateOneOffEventTypeInput,
  ): Promise<ICalendly.ICreateOneOffEventTypeOutput> {
    return this.calendlyProvider.createOneOffEventType(input);
  }

  /**
   * @summary Get authenticated user details
   * @description Retrieves the details of the authenticated user. Useful for confirming user information during event creation.
   * @param input The input required to get the user details.
   * @returns The authenticated user's details.
   */
  @core.TypedRoute.Post("users/get-me")
  async getUserInfo(
    @TypedBody() input: ICalendly.IGetUserInfoInput,
  ): Promise<ICalendly.IGetUserInfoOutput> {
    return this.calendlyProvider.getUserInfo(input);
  }
}
