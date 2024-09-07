import { Placeholder } from "@wrtnio/decorators";
import { tags } from "typia";
import { ICommon } from "../common/ISecretValue";

export namespace ICalendly {
  export interface IGetEventTypeOutput {
    collection: EventType[];
    pagination: Pagination;
  }

  export interface CreateSchedulingLinkOutput {
    resource: {
      /**
       * @title Scheduling link url
       */
      booking_url: string & tags.Format<"uri">;

      /**
       * @title owner
       * A link to the resource that owns this Scheduling Link (currently, this is always an Event Type)
       */
      owner: string & tags.Format<"uri">;

      /**
       * @title owner_type
       * Resource type (currently, this is always EventType)
       */
      owner_type: "EventType";
    };
  }

  export interface CreateSchedulingLinkInput extends Secret {
    owner: EventType["uri"];
  }

  export interface IGetEventTypeInput extends Secret {
    /**
     * @title admin_managed
     * Return only admin managed event types if true, exclude admin managed event types if false, or include all event types if this parameter is omitted.
     */
    admin_managed?: boolean;

    /**
     * @title organization
     * View available personal, team, and organization event types associated with the organization's URI.
     */
    organization?: string & tags.Format<"uri">;

    /**
     * @title user
     * View available personal, team, and organization event types associated with the user's URI.
     */
    user?: string & tags.Format<"uri">;

    /**
     * @title user_availability_schedule
     */
    user_availability_schedule?: string & tags.Format<"uri">;

    /**
     * @title active
     * Return only active event types if true, only inactive if false, or all event types if this parameter is omitted.
     */
    active?: boolean;

    /**
     * @title count
     * The number of rows to return
     */
    count?: number &
      tags.Type<"uint32"> &
      tags.Minimum<1> &
      tags.Maximum<100> &
      tags.Default<20>;

    /**
     * @title page_token
     * The token to pass to get the next or previous portion of the collection.
     */
    page_token?: string;

    /**
     * @title sort
     * Order results by the specified field and direction. Accepts comma-separated list of {field}:{direction} values.
     * Supported fields are: name, position, created_at, updated_at. Sort direction is specified as: asc, desc.
     * It must be one of: 'name:asc', 'name:desc', 'position:asc', 'position:desc', 'created_at:asc', 'created_at:desc', 'updated_at:asc', 'updated_at:desc'.
     */
    sort?:
      | tags.Constant<"name:asc", { title: "이름 정순 정렬" }>
      | tags.Constant<"name:desc", { title: "이름 역순 정렬" }>
      | tags.Constant<"position:asc", { title: "위치 정순 정렬" }>
      | tags.Constant<"position:desc", { title: "위치 역순 정렬" }>
      | tags.Constant<"created_at:asc", { title: "생성일자 정순 정렬" }>
      | tags.Constant<"created_at:desc", { title: "생성일자 역순 정렬" }>
      | tags.Constant<"updated_at:asc", { title: "수정일자 정순 정렬" }>
      | tags.Constant<"updated_at:desc", { title: "수정일자 역순 정렬" }>;
  }

  type Secret = ICommon.ISecret<"calendly">;

  type EventType = {
    /**
     * @title uri
     * Canonical reference (unique identifier) for the event type.
     * For example, 'https://api.calendly.com/event_types/AAAAAAAAAAAAAAAA'
     */
    uri: string & tags.Format<"uri">;

    /**
     * @title name
     * The event type name (in human-readable format)
     */
    name: (string | null) & Placeholder<"15 Minute Meeting">;

    /**
     * @title active
     * Indicates if the event is active or not.
     */
    active: boolean;

    /**
     * @title slug
     * The portion of the event type's URL that identifies a specific web page (in a human-readable format)
     */
    slug: (string | null) & Placeholder<"acmesales">;

    /**
     * @title schduling_url
     * The URL of the user’s scheduling site where invitees book this event type
     */
    scheduling_url: string &
      tags.Format<"uri"> &
      Placeholder<"https://calendly.com/acmesales">;

    /**
     * @title duration
     * The length of sessions booked with this event type
     */
    duration: number & tags.Type<"uint32"> & Placeholder<"30">;

    /**
     * @title kind
     * Indicates if the event type is "solo" (belongs to an individual user) or "group"
     */
    kind:
      | tags.Constant<"solo", { title: "solo" }>
      | tags.Constant<"group", { title: "group" }>;

    /**
     * @title pooling_type
     * Indicates if the event type is "round robin" (alternates between hosts) or "collective" (invitees pick a time when all participants are available) or “multi-pool” (considers availability delineated by pools of participants) or "null" (the event type doesn’t consider the availability of a group participants)
     */
    pooling_type:
      | tags.Constant<"round_robin", { title: "round_robin" }>
      | tags.Constant<"collective", { title: "collective" }>
      | tags.Constant<"multi_pool", { title: "multi_pool" }>
      | null;

    /**
     * @title type
     * Indicates if the event type is "AdhocEventType" (ad hoc event) or "StandardEventType" (standard event type)
     */
    type:
      | tags.Constant<"StandardEventType", { title: "StandardEventType" }>
      | tags.Constant<"AdhocEventType", { title: "AdhocEventType" }>;

    /**
     * @title color
     * The hexadecimal color value of the event type's scheduling page
     */
    color: string & tags.Pattern<"^#[a-fd]{6}$"> & Placeholder<"#fff200">;

    /**
     * @title created_at
     * The moment the event type was created (e.g. "2020-01-02T03:04:05.678123Z")
     */
    created_at: string | tags.Format<"date-time">;

    /**
     * @title updated_at
     * The moment the event type was last updated (e.g. "2020-01-02T03:04:05.678123Z")
     */
    updated_at: string | tags.Format<"date-time">;

    /**
     * @title internal_note
     * Contents of a note that may be associated with the event type
     */
    internal_note: string | null;

    /**
     * @title description_plain
     * The event type's description (in non formatted text)
     */
    description_plain: (string | null) & Placeholder<"15 Minute Meeting">;

    /**
     * @title description_html
     * The event type's description (formatted with HTML)
     */
    description_html: (string | null) & Placeholder<"<p>15 Minute Meeting</p>">;

    /**
     * @title profile
     * The publicly visible profile of a User or a Team that's associated with the Event Type (note: some Event Types don't have profiles)
     */
    profile: Profile | null;

    /**
     * @title secret
     * Indicates if the event type is hidden on the owner's main scheduling page
     */
    secret: boolean;

    /**
     * @title booking_method
     * Indicates if the event type is for a poll or an instant booking
     */
    booking_method:
      | tags.Constant<"instant", { title: "instant" }>
      | tags.Constant<"poll", { title: "poll" }>;

    /**
     * @title custom_questions
     */
    custom_questions: CustomQuestion[];

    /**
     * @title deleted_at
     * The moment the event type was deleted (e.g. "2020-01-02T03:04:05.678123Z"). Since event types can be deleted but their scheduled events remain it's useful to fetch a deleted event type when you still require event type data for a scheduled event.
     */
    deleted_at: (string & tags.Format<"date-time">) | null;

    /**
     * @title admin_managed
     * Indicates if this event type is managed by an organization admin
     */
    admin_managed: boolean;

    /**
     * @title locations
     * Configuration information for each possible location for this Event Type
     */
    locations: Location[] | null;

    /**
     * @title position
     * Position order of Event Type, starting with 0 (for display purposes)
     */
    position: number;
  };

  type Profile = {
    /**
     * @title type
     * Indicates if the profile belongs to a "user" (individual) or "team"
     */
    type:
      | tags.Constant<"User", { title: "User" }>
      | tags.Constant<"Team", { title: "Team" }>;

    /**
     * @title name
     * Human-readable name for the profile of the user that's associated with the event type
     */
    name: string & Placeholder<"Tamara Jones">;

    /**
     * @title owner
     * The unique reference to the user associated with the profile
     */
    owner: string &
      tags.Format<"uri"> &
      Placeholder<"https://api.calendly.com/users/AAAAAAAAAAAAAAAA">;
  };

  type Location = {
    /**
     * @title kind
     */
    kind: string;

    /**
     * @title phone_number
     */
    phone_number: number | string;

    /**
     * @title additional_info
     */
    additional_info: string;
  };

  type CustomQuestion = {
    /**
     * @title name
     * The custom question that the host created for the event type.
     */
    name: string;

    /**
     * @title type
     * The type of response that the invitee provides to the custom question; can be one or multiple lines of text, a phone number, or single- or multiple-select.
     */
    type:
      | tags.Constant<"text", { title: "text" }>
      | tags.Constant<"phone_number", { title: "phone_number" }>
      | tags.Constant<"single_select", { title: "single_select" }>
      | tags.Constant<"multi_select", { title: "multi_select" }>;

    /**
     * @title position
     * The numerical position of the question on the event booking page after the name and email address fields.
     */
    position: number;

    /**
     * @title enabled
     * true if the question created by the host is turned ON and visible on the event booking page; false if turned OFF and invisible on the event booking page.
     */
    enabled: boolean;

    /**
     * @title required
     * true if a response to the question created by the host is required for invitees to book the event type; false if not required.
     */
    required: boolean;

    /**
     * @title answer_choices
     * The invitee’s option(s) for single_select or multi_select type of responses.
     */
    answer_choices: string[];

    /**
     * @title include_other
     * true if the custom question lets invitees record a written response in addition to single-select or multiple-select type of responses; false if it doesn’t.
     */
    include_other: boolean;
  };

  type Pagination = {
    /**
     * @title count
     * The number of rows to return
     */
    count: number &
      tags.Minimum<0> &
      tags.Maximum<100> &
      tags.Type<"uint32"> &
      Placeholder<"20">;

    /**
     * @title next_page
     * URI to return the next page of an ordered list ("null" indicates no additional results are available)
     */
    next_page: (string & tags.Format<"uri">) | null;

    /**
     * @title previous_page
     * URI to return the previous page of an ordered list ("null" indicates no additional results are available)
     */
    previous_page: (string & tags.Format<"uri">) | null;

    /**
     * @title next_page_token
     * Token to return the next page of an ordered list ("null" indicates no additional results are available)
     */
    next_page_token: (string & tags.Format<"uri">) | null;

    /**
     * @title previous_page_token
     * Token to return the previous page of an ordered list ("null" indicates no additional results are available)
     */
    previous_page_token: (string & tags.Format<"uri">) | null;
  };
}
