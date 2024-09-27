import core, { TypedBody, TypedParam } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { ICalendly } from "@wrtn/connector-api/lib/structures/connector/calendly/ICalendly";
import { Prerequisite } from "@wrtnio/decorators";
import typia from "typia";
import { CalendlyProvider } from "../../../providers/connector/calendly/CalendlyProvider";
import { ApiTags } from "@nestjs/swagger";

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
  @ApiTags("Calendly")
  async createSchedulingLink(
    @TypedBody() input: ICalendly.CreateSchedulingLinkInput,
  ): Promise<ICalendly.CreateSchedulingLinkOutput> {
    const data = await this.calendlyProvider.createSchedulingLink(input);
    const validated = typia.misc.validateClone(data);
    if (validated.success === false) {
      console.error(JSON.stringify(validated.errors, null, 2));
    }
    return data;
  }

  /**
   * @summary List all event types
   * @description Retrieves the event types available for the user or organization. Useful to show what types of meetings can be scheduled.
   * @param input The input required to retrieve event types.
   * @returns The list of event types.
   */
  @core.TypedRoute.Post("get-event-types")
  @ApiTags("Calendly")
  async getEventTypes(
    @TypedBody() input: ICalendly.IGetEventTypeInput,
  ): Promise<ICalendly.IGetEventTypeOutput> {
    const data = await this.calendlyProvider.getEventTypes(input);
    const validated = typia.misc.validateClone(data);
    if (validated.success === false) {
      console.error(JSON.stringify(validated.errors, null, 2));
    }
    return data;
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
  @ApiTags("Calendly")
  async cancel(
    @Prerequisite({
      neighbor: () => CalendlyController.prototype.getScheduledEvents,
      jmesPath: "collection[].{value:uuid, label:name}",
    })
    @TypedParam("eventId")
    eventId: ICalendly.Event["uuid"],
    @Prerequisite({
      neighbor: () => CalendlyController.prototype.getScheduledEvents,
      jmesPath: "collection[].{value:uuid, label:name}",
    })
    @TypedParam("inviteeId")
    inviteeId: ICalendly.Invitee["uuid"],
    @TypedBody() input: ICalendly.ICancelInput,
  ): Promise<ICalendly.ICacnelOutput> {
    const invitee = await this.calendlyProvider.getOneInvitee(
      eventId,
      inviteeId,
      input,
    );
    const data = await invitee.resource.cancel_url;
    const validated = typia.misc.validateClone(data);
    if (validated.success === false) {
      console.error(JSON.stringify(validated.errors, null, 2));
    }
    return data;
  }

  /**
   * @summary Get details of a scheduled event
   * @description Fetches the detailed information of a specific scheduled event by its UUID.
   * @param eventId The UUID of the event.
   * @param input Additional input for event retrieval.
   * @returns The detailed information of the scheduled event.
   */
  @core.TypedRoute.Post("get-events/:eventId")
  @ApiTags("Calendly")
  async getOneScheduledEvent(
    @TypedParam("eventId") eventId: ICalendly.Event["uuid"],
    @TypedBody() input: ICalendly.IGetOneScheduledEventInput,
  ): Promise<ICalendly.IGetOneScheduledEventOutput> {
    const data = await this.calendlyProvider.getOneScheduledEvent(
      eventId,
      input,
    );
    const validated = typia.misc.validateClone(data);
    if (validated.success === false) {
      console.error(JSON.stringify(validated.errors, null, 2));
    }
    return data;
  }

  /**
   * @summary Get all scheduled events
   * @description Retrieves all scheduled events within a given time period or based on certain criteria.
   * @param input The input to filter scheduled events.
   * @returns The list of scheduled events.
   */
  @core.TypedRoute.Post("get-scheduled-events")
  @ApiTags("Calendly")
  async getScheduledEvents(
    @TypedBody() input: ICalendly.IGetScheduledEventInput,
  ): Promise<ICalendly.IGetScheduledEventOutput> {
    const data = await this.calendlyProvider.getScheduledEvents(input);
    const validated = typia.misc.validateClone(data);
    if (validated.success === false) {
      console.error(JSON.stringify(validated.errors, null, 2));
    }
    return data;
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
  @ApiTags("Calendly")
  async checkNoShow(
    @TypedParam("eventId") eventId: ICalendly.Event["uuid"],
    @TypedParam("inviteeId") inviteeId: ICalendly.Invitee["uuid"],
    @TypedBody() input: ICalendly.ICheckNoShowInput,
  ): Promise<ICalendly.ICheckNoShowOutput> {
    const data = await this.calendlyProvider.checkNoShow(
      eventId,
      inviteeId,
      input,
    );
    const validated = typia.misc.validateClone(data);
    if (validated.success === false) {
      console.error(JSON.stringify(validated.errors, null, 2));
    }
    return data;
  }

  /**
   * @summary Get invitee details
   * @description Retrieves the details of a specific invitee for a scheduled event.
   * @param eventId The UUID of the event.
   * @param inviteeId The UUID of the invitee.
   * @param input Additional input for invitee retrieval.
   * @returns The details of the invitee.
   */
  @core.TypedRoute.Post("events/:eventId/invitees/:inviteeId")
  @ApiTags("Calendly")
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
    const data = await invitee;
    const validated = typia.misc.validateClone(data);
    if (validated.success === false) {
      console.error(JSON.stringify(validated.errors, null, 2));
    }
    return data;
  }

  /**
   * @summary Get all invitees for a scheduled event
   * @description Retrieves the list of invitees for a scheduled event.
   * @param input The input to filter invitees.
   * @returns The list of invitees for the event.
   */
  @core.TypedRoute.Post("events/get-invitees")
  @ApiTags("Calendly")
  async getInvitees(
    @TypedBody() input: ICalendly.IGetScheduledEventInviteeInput,
  ): Promise<ICalendly.IGetScheduledEventInviteeOutput> {
    const data = await this.calendlyProvider.getInvitees(input);
    const validated = typia.misc.validateClone(data);
    if (validated.success === false) {
      console.error(JSON.stringify(validated.errors, null, 2));
    }
    return data;
  }

  /**
   * @summary Create a one-off event type
   * @description Allows users to create a one-off event type for special occasions or single events.
   * @param input The details needed to create a one-off event type.
   * @returns The created one-off event type details.
   */
  @core.TypedRoute.Post("one-off-event-types")
  @ApiTags("Calendly")
  async createOneOffEventType(
    @TypedBody() input: ICalendly.ICreateOneOffEventTypeInput,
  ): Promise<ICalendly.ICreateOneOffEventTypeOutput> {
    const data = await this.calendlyProvider.createOneOffEventType(input);
    const validated = typia.misc.validateClone(data);
    if (validated.success === false) {
      console.error(JSON.stringify(validated.errors, null, 2));
    }
    return data;
  }

  /**
   * @summary Get authenticated user details
   * @description Retrieves the details of the authenticated user. Useful for confirming user information during event creation.
   * @param input The input required to get the user details.
   * @returns The authenticated user's details.
   */
  @core.TypedRoute.Post("users/get-me")
  @ApiTags("Calendly")
  async getUserInfo(
    @TypedBody() input: ICalendly.IGetUserInfoInput,
  ): Promise<ICalendly.IGetUserInfoOutput> {
    const data = await this.calendlyProvider.getUserInfo(input);
    const validated = typia.misc.validateClone(data);
    if (validated.success === false) {
      console.error(JSON.stringify(validated.errors, null, 2));
    }
    return data;
  }
}
