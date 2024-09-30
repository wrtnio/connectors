import { Placeholder, Prerequisite } from "@wrtnio/decorators";
import { tags } from "typia";
import { ICommon } from "../common/ISecretValue";

export namespace ICalendly {
  export type IGetUserInfoOutput = {
    resource: User;
  };

  export type IGetUserInfoInput = Secret;

  export interface ICreateOneOffEventTypeOutput {
    /**
     * @title EventType
     * A configuration for an Event
     */
    resource: EventType;
  }

  export interface ICreateOneOffEventTypeInput extends Secret {
    /**
     * @title name
     * Event type name
     * @example "My Meeting"
     */
    name: string & tags.MaxLength<55> & Placeholder<"My Meeting">;

    /**
     * @title host
     * Host user uri
     * @example "https://api.calendly.com/users/AAAAAAAAAAAAAAAA"
     */
    host: string &
      tags.Format<"uri"> &
      Prerequisite<{
        method: "post";
        path: "/connector/calendly/users/get-me";
        jmesPath: "resource.{value:url, label:name}";
      }>;

    /**
     * @title co_hosts
     * Collection of meeting co-host(s) user URIs
     */
    co_host?: (string & tags.Format<"iri">)[] & tags.MaxItems<9>;

    /**
     * @title duration
     * Duration of meeting in minutes
     */
    duration: number &
      tags.Type<"uint32"> &
      tags.Minimum<1> &
      tags.Maximum<720>;

    /**
     * @title timezone
     * Time zone used for meeting. Defaults to host's time zone.
     * @example "America/New_York"
     */
    timezone?: string & Placeholder<"America/New_York">;

    /**
     * @title date_setting
     * Only allow scheduling within a specified date range
     */
    date_setting: {
      /**
       * @title type
       * @enum ["date_range"]
       */
      type: tags.Constant<"date_range", { title: "date_range" }>;

      /**
       * @title start_date
       * Availability start - Must be before end_date. Format: YYYY-MM-DD
       */
      start_date: string & tags.Format<"date">;

      /**
       * @title end_date
       * Availability end - Must be a date in the future and less than 365 days in the future from start_date. Format: YYYY-MM-DD
       */
      end_date: string & tags.Format<"date">;
    };

    /**
     * @title location
     * Information for a Custom Location
     */
    location: {
      /**
       * @title kind
       * @enum ["custom"]
       */
      kind: tags.Constant<"custom", { title: "custom" }>;

      /**
       * @title location
       */
      location: string;
    };
  }

  export interface IGetOneScheduledEventInviteeOutput {
    resource: Invitee;
  }

  export type IGetOneScheduledEventInviteeInput = Secret;

  export interface IGetScheduledEventInviteeOutput {
    collection: Invitee[];
    pagination: Pagination;
  }

  export interface IGetScheduledEventInviteeInput extends Secret {
    /**
     * @title scheduled_event_uuid
     */
    scheduled_event_uuid: string;

    /**
     * @title count
     * The number of rows to return (1 to 100)
     * @default 20
     * @minimum 1
     * @maximum 100
     */
    count?: number & tags.Minimum<1> & tags.Maximum<100> & tags.Default<20>;

    /**
     * @title email
     * Filter results by email address (optional)
     * @example "bob@example.com"
     */
    email?: string & tags.Format<"email">;

    /**
     * @title page_token
     * The token to pass for pagination to get the next or previous portion of the collection
     */
    page_token?: string;

    /**
     * @title sort
     * Order results by the `created_at` field and direction.
     * Allowed values: "asc" for ascending, "desc" for descending.
     * @default "created_at:asc"
     */
    sort?:
      | (
          | tags.Constant<"created_at:asc", { title: "created_at:asc" }>
          | tags.Constant<'"created_at:desc"', { title: '"created_at:desc"' }>
        )
      | tags.Default<"created_at:asc">;

    /**
     * @title status
     * Filter by invitee status (either "active" or "canceled").
     * @enum ["active", "canceled"]
     */
    status?:
      | tags.Constant<"active", { title: "active" }>
      | tags.Constant<"canceled", { title: "canceled" }>;
  }

  export interface ICheckNoShowOutput {
    resource: ICalendly.NoShow;
  }

  export type ICheckNoShowInput = Secret;

  export type IGetOneInviteInput = Secret;

  export type ICacnelOutput =
    ICalendly.IGetOneScheduledEventInviteeOutput["resource"]["cancel_url"];

  export type ICancelInput = Secret;

  export interface IGetOneScheduledEventOutput {
    /**
     * @title event
     */
    resource: ICalendly.Event;
  }

  export type IGetOneScheduledEventInput = Secret;

  export interface IGetScheduledEventOutput {
    collection: Event[];
    pagination: Pagination;
  }

  /**
   * @title Conditions for querying scheduled events
   */
  export interface IGetScheduledEventInput extends Secret {
    /**
     * @title count
     * The number of rows to return.
     */
    count?: number &
      tags.Type<"uint32"> &
      tags.Minimum<1> &
      tags.Maximum<100> &
      tags.Default<20>;

    /**
     * @title Whose event is it?
     *
     * - If you are an administrator/owner of an organization, you can use both and to get a list of events for a specific user within an organization user.
     * - If you are the administrator/owner of an organization, you can use both and to get a list of events for a specific group within an organization group.
     * - User Only available for requesting private events; events within all organizations that are currently or previously affiliated are returned.
     */
    who:
      | {
          /**
           * @title user
           * Return events that are scheduled with the user associated with this URI.
           * There must be either a user or a group.
           *
           * @example "https://api.calendly.com/users/EBHAAFHDCAEQTSEZ"
           */
          user: string & tags.Format<"iri">;

          /**
           * @title group
           * Return events that are scheduled with the group associated with this URI.
           * There must be either a user or a group.
           */
          group: string & tags.Format<"iri">;
        }
      | {
          /**
           * @title user
           * Return events that are scheduled with the user associated with this URI.
           * There must be either a user or a group.
           *
           * @example "https://api.calendly.com/users/EBHAAFHDCAEQTSEZ"
           */
          user: string & tags.Format<"iri">;

          /**
           * @title group
           * Return events that are scheduled with the group associated with this URI.
           * There must be either a user or a group.
           */
          group: string & tags.Format<"iri">;
        }
      | {
          /**
           * @title user
           * Return events that are scheduled with the user associated with this URI.
           * There must be either a user or a group.
           *
           * @example "https://api.calendly.com/users/EBHAAFHDCAEQTSEZ"
           */
          user: string & tags.Format<"iri">;
        };

    /**
     * @title organization
     * Return events that are scheduled with the organization associated with this URI.
     * @example "https://api.calendly.com/organizations/EBHAAFHDCAEQTSEZ"
     */
    organization?: string & tags.Format<"iri">;

    /**
     * @title invitee_email
     * Return events that are scheduled with the invitee associated with this email address.
     * @example alice@example.com
     */
    invitee_email?: string & tags.Format<"email">;

    /**
     * @title max_start_time
     * Include events with start times prior to this time. This time should use the UTC timezone.
     * @example "2020-01-02T12:30:00.000000Z"
     */
    max_start_time?: string & tags.Format<"date-time">;

    /**
     * @title min_start_time
     * Include events with start times after this time. This time should use the UTC timezone.
     * @example "2020-01-02T12:30:00.000000Z"
     */
    min_start_time?: string & tags.Format<"date-time">;

    /**
     * @title page_token
     * The token to pass to get the next or previous portion of the collection.
     */
    page_token?: string;

    /**
     * @title sort
     * Order results by the specified field and direction. Accepts comma-separated list of {field}:{direction} values.
     * Supported fields are: start_time. Sort direction is specified as: asc, desc.
     * @example "start_time:asc"
     */
    sort?:
      | tags.Constant<"start_time:asc", { title: "시작 시간 정순 정렬" }>
      | tags.Constant<"start_time:desc", { title: "시작 시간 역순 정렬" }>;

    /**
     * @title status
     * Whether the scheduled event is active or canceled.
     * Allowed values: active, canceled.
     */
    status?:
      | tags.Constant<"active", { title: "active" }>
      | tags.Constant<"canceled", { title: "canceled" }>;
  }

  export interface IGetEventTypeOutput {
    collection: EventType[];
    pagination: Pagination;
  }

  export interface CreateSchedulingLinkOutput {
    resource: {
      /**
       * @title Scheduling link url
       */
      booking_url: string & tags.Format<"iri">;

      /**
       * @title owner
       * A link to the resource that owns this Scheduling Link (currently, this is always an Event Type)
       */
      owner: EventType["uri"];

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
     * user or organization must be filled.
     */
    organization?: string & tags.Format<"iri">;

    /**
     * @title user
     * View available personal, team, and organization event types associated with the user's URI.
     * user or organization must be filled.
     */
    user?: User["uri"] &
      Prerequisite<{
        method: "post";
        path: "/connector/calendly/users/get-me";
        jmesPath: "resource.{value:url, label:name}";
      }>;

    /**
     * @title user_availability_schedule
     */
    user_availability_schedule?: string & tags.Format<"iri">;

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

  export type Secret = ICommon.ISecret<"calendly">;

  export type EventType = {
    /**
     * @title uri
     * Canonical reference (unique identifier) for the event type.
     * For example, 'https://api.calendly.com/event_types/AAAAAAAAAAAAAAAA'
     */
    uri: string & tags.Format<"iri">;

    /**
     * @title name
     * The event type name (in human-readable format)
     */
    name: (string & Placeholder<"15 Minute Meeting">) | null;

    /**
     * @title active
     * Indicates if the event is active or not.
     */
    active: boolean;

    /**
     * @title slug
     * The portion of the event type's URL that identifies a specific web page (in a human-readable format)
     */
    slug: (string & Placeholder<"acmesales">) | null;

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
    color: string &
      tags.Pattern<"^#([0-9A-Fa-f]{6})$"> &
      Placeholder<"#fff200">;

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
    description_plain: (string & Placeholder<"15 Minute Meeting">) | null;

    /**
     * @title description_html
     * The event type's description (formatted with HTML)
     */
    description_html: (string & Placeholder<"<p>15 Minute Meeting</p>">) | null;

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

  export type Profile = {
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

  export type Location = {
    /**
     * @title kind
     */
    kind: string;

    /**
     * @title phone_number
     */
    phone_number?: number | string;

    /**
     * @title additional_info
     */
    additional_info?: string;
  };

  export type CustomQuestion = {
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

  export interface Event {
    /**
     * @title uuid
     * uuid from url (ex. "https://api.calendly.com/scheduled_events/:uuid" )
     */
    uuid: string;

    /**
     * @title uri
     * Canonical reference (unique identifier) for the resource
     * @example "https://api.calendly.com/scheduled_events/GBGBDCAADAEDCRZ2"
     */
    uri: string & tags.Format<"iri">;

    /**
     * @title name
     * The event name
     * @example "15 Minute Meeting"
     */
    name: (string & Placeholder<"15 Minute Meeting">) | null;

    /**
     * @title meeting_notes_plain
     * The internal meeting notes (in non formatted text)
     * @example "15 Minute Meeting"
     */
    meeting_notes_plain: (string & Placeholder<"15 Minute Meeting">) | null;

    /**
     * @title meeting_notes_html
     * The internal meeting notes (formatted with HTML)
     * @example "<p>15 Minute Meeting</p>"
     */
    meeting_notes_html: string | null;

    /**
     * @title status
     * Indicates if the event is "active" or "canceled"
     * @enum ["active", "canceled"]
     */
    status:
      | tags.Constant<"active", { title: "active" }>
      | tags.Constant<"canceled", { title: "canceled" }>;

    /**
     * @title start_time
     * The moment the event was scheduled to start in UTC time
     * @example "2020-01-02T03:04:05.678123Z"
     */
    start_time: string & tags.Format<"date-time">;

    /**
     * @title end_time
     * The moment the event was scheduled to end in UTC time
     * @example "2020-01-02T03:04:05.678123Z"
     */
    end_time: string & tags.Format<"date-time">;

    /**
     * @title event_type
     * Event Type URI
     * @example "https://api.calendly.com/event_types/GBGBDCAADAEDCRZ2"
     */
    event_type: string & tags.Format<"iri">;

    /**
     * @title location
     * The event type associated with this event
     * @enum ["In-Person Meeting"]
     */
    location: {
      /**
       * @title type
       * Indicates that the event will be an in-person meeting.
       */
      type: "physical" | "custom";

      /**
       * @title location
       * The physical location specified by the event host (publisher)
       * @example Calendly Office
       */
      location: string;

      /**
       * @title additional_info
       * 추가 정보
       * @example "Please check in at the main lobby."
       */
      additional_info?: string;
    };

    /**
     * @title invitees_counter
     * Invitees counter
     */
    invitees_counter: {
      /**
       * @title total
       * Total invitees for an event, including invitees that have canceled
       */
      total: number & tags.Type<"uint32">;

      /**
       * @title active
       * Total invitees for an event that have not canceled
       */
      active: number & tags.Type<"uint32">;

      /**
       * @title limit
       * Maximum number of active invitees that can book the event
       */
      limit: number & tags.Type<"uint32">;
    };

    /**
     * @title created_at
     * The moment when the event was created
     * @example "2019-01-02T03:04:05.678123Z"
     */
    created_at: string & tags.Format<"date-time">;

    /**
     * @title updated_at
     * The moment when the event was last updated
     * @example "2019-01-02T03:04:05.678123Z"
     */
    updated_at: string & tags.Format<"date-time">;

    /**
     * @title event_memberships
     * Event Membership List
     */
    event_memberships: {
      /**
       * @title user
       * Canonical reference (unique identifier) for the user
       * @example "https://api.calendly.com/users/GBGBDCAADAEDCRZ2"
       */
      user: string & tags.Format<"iri">;

      /**
       * @title user_email
       * The user's email
       * @example "user@example.com"
       */
      user_email: string & tags.Format<"email">;

      /**
       * @title user_name
       * The user's name
       * @example "John Smith"
       */
      user_name: string & Placeholder<"John Smith">;

      /**
       * @title buffered_start_time
       * The moment the membership's time buffer starts for the event in UTC time
       * @example "2020-01-02T03:04:05.678123Z"
       */
      buffered_start_time: string & tags.Format<"date-time">;

      /**
       * @title buffered_end_time
       * The moment the membership's time buffer ends for the event in UTC time
       * @example "2020-01-02T03:04:05.678123Z"
       */
      buffered_end_time: string & tags.Format<"date-time">;
    }[];

    /**
     * @title event_guests
     * Additional people added to an event by an invitee
     */
    event_guests: {
      /**
       * @title email
       */
      email: string & tags.Format<"email">;

      /**
       * @title created_at
       */
      created_at: string & tags.Format<"date-time">;

      /**
       * @title updated_at
       */
      updated_at: string & tags.Format<"date-time">;
    }[];

    /**
     * @title cancellation
     * Information about the calendar event from the calendar provider.
     */
    cancellation?: Cancellation;
  }

  export interface Invitee {
    /**
     * @title uuid
     * uuid from "https://calendly.com/scheduled_events/AAAAAAAAAAAAAAAA/invitees/:uuid"
     */
    uuid: string;

    /**
     * @title uri
     * Canonical reference (unique identifier) for the invitee
     * @example "https://calendly.com/scheduled_events/AAAAAAAAAAAAAAAA/invitees/AAAAAAAAAAAAAAAA"
     */
    uri: string & tags.Format<"iri">;

    /**
     * @title email
     * The invitee’s email address
     * @example "test@example.com"
     */
    email: string & tags.Format<"email">;

    /**
     * @title first_name
     * The first name of the invitee who booked the event when the event type is configured to use separate fields for first name and last name. Null when event type is configured to use a single field for name.
     * @example "John"
     */
    first_name: string | null;

    /**
     * @title last_name
     * The last name of the invitee who booked the event when the event type is configured to use separate fields for first name and last name. Null when event type is configured to use a single field for name.
     * @example "Doe"
     */
    last_name: string | null;

    /**
     * @title name
     * The invitee’s name (in human-readable format)
     * @example "John Doe"
     */
    name: string;

    /**
     * @title status
     * Indicates if the invitee is "active" or "canceled"
     * @example "active"
     */
    status:
      | tags.Constant<"active", { title: "active" }>
      | tags.Constant<"canceled", { title: "canceled" }>;

    /**
     * @title questions_and_answers
     * A collection of the invitee's responses to questions on the event booking confirmation form
     */
    questions_and_answers: Array<{
      /**
       * @title question
       * A question on the invitee's booking form
       */
      question: string;

      /**
       * @title answer
       * The invitee's answer to the question
       */
      answer: string;

      /**
       * @title position
       * The position of the question in relation to others on the booking form
       */
      position: number;
    }>;

    /**
     * @title timezone
     * Time zone to use when displaying time to the invitee
     */
    timezone: string | null;

    /**
     * @title event
     * A reference to the event
     * @example "https://api.calendly.com/scheduled_events/AAAAAAAAAAAAAAAA"
     */
    event: string & tags.Format<"iri">;

    /**
     * @title created_at
     * The moment when the event was created
     * @example "2019-01-02T03:04:05.678123Z"
     */
    created_at: string & tags.Format<"date-time">;

    /**
     * @title updated_at
     * The moment when the event was last updated
     * @example "2019-08-07T06:05:04.321123Z"
     */
    updated_at: string & tags.Format<"date-time">;

    /**
     * @title tracking
     * The UTM and Salesforce tracking parameters associated with an invitee
     */
    tracking: {
      /**
       * @title utm_campaign
       * The UTM parameter used to track a campaign
       */
      utm_campaign: string | null;

      /**
       * @title utm_source
       * The UTM parameter that identifies the source (platform where the traffic originates)
       */
      utm_source: string | null;

      /**
       * @title utm_medium
       * The UTM parameter that identifies the type of input (e.g. CPC, social media, etc.)
       */
      utm_medium: string | null;

      /**
       * @title utm_content
       * UTM content tracking parameter
       */
      utm_content: string | null;

      /**
       * @title utm_term
       * The UTM parameter used to track keywords
       */
      utm_term: string | null;

      /**
       * @title salesforce_uuid
       * The Salesforce record unique identifier
       */
      salesforce_uuid: string | null;
    };

    /**
     * @title text_reminder_number
     * The phone number to use when sending text (SMS) reminders
     * @example "+1 404-555-1234"
     */
    text_reminder_number: string | null;

    /**
     * @title rescheduled
     * Indicates if this invitee has rescheduled
     */
    rescheduled: boolean;

    /**
     * @title old_invitee
     * Reference to old Invitee instance that got rescheduled
     */
    old_invitee: (string & tags.Format<"iri">) | null;

    /**
     * @title new_invitee
     * Link to new invitee after reschedule
     */
    new_invitee: (string & tags.Format<"iri">) | null;

    /**
     * @title cancel_url
     * Link to cancelling the event for the invitee
     */
    cancel_url: string & tags.Format<"iri">;

    /**
     * @title reschedule_url
     * Link to rescheduling the event for the invitee
     */
    reschedule_url: string & tags.Format<"iri">;

    /**
     * @title routing_form_submission
     * Reference to a routing form submission that redirected the invitee to a booking page.
     * @example https://api.calendly.com/routing_form_submissions/AAAAAAAAAAAAAAAA
     */
    routing_form_submission: (string & tags.Format<"iri">) | null;

    /**
     * @title cancellation
     * Provides data pertaining to the cancellation of the Event or the Invitee
     */
    cancellation?: Cancellation;

    /**
     * @title Invitee payment
     */
    payment: Payment | null;

    /**
     * @title no_show
     * Provides data pertaining to the associated no show for the Invitee
     */
    no_show: NoShow | null;

    /**
     * @title reconfirmation
     * Assuming reconfirmation is enabled for the event type, when reconfirmation is requested this object is present with a created_at that reflects when the reconfirmation notification was sent. Once the invitee has reconfirmed
     */
    reconfirmation: Reconfirmation | null;

    /**
     * @title scheduling_method
     * The method used to schedule the event
     * @enum ["instant_book"]
     */
    scheduling_method: tags.Constant<
      "instant_book",
      { title: "instant_book" }
    > | null;

    /**
     * @title invitee_scheduled_by
     * Reference to user URI who scheduled the event
     */
    invitee_scheduled_by: (string & tags.Format<"iri">) | null;
  }

  export type Reconfirmation = {
    /**
     * @title created_at
     * When the reconfirmation was created.
     * @example 2020-11-23T17:51:18.341657Z
     */
    created_at: string & tags.Format<"date-time">;

    /**
     * @title confirmed_at
     * When the Invitee confirmed their attendance.
     * @example 2020-11-23T17:51:18.341657Z
     */
    confirmed_at: (string & tags.Format<"date-time">) | null;
  };

  export type NoShow = {
    /**
     * @title url
     * Canonical reference (unique identifier) for the no show
     */
    url: string & tags.Format<"iri">;

    /**
     * @title created_at
     * The moment when the no show was created
     * @example 2019-01-02T03:04:05.678123Z
     */
    created_at: string & tags.Format<"date-time">;
  };

  export type Payment = {
    /**
     * @title external_id
     * Unique identifier for the payment
     */
    external_id: string;

    /**
     * @title provider
     * Payment provider
     * @enum ["stripe", "paypal"]
     * @example "stripe"
     */
    provider: string;

    /**
     * @title amount
     * The amount of the payment
     */
    amount: number & tags.Type<"float">;

    /**
     * @title currency
     * The currency format that the payment is in.
     */
    currency:
      | tags.Constant<"AUD", { title: "AUD" }>
      | tags.Constant<"CAD", { title: "CAD" }>
      | tags.Constant<"EUR", { title: "EUR" }>
      | tags.Constant<"GBP", { title: "GBP" }>
      | tags.Constant<"USD", { title: "USD" }>;

    /**
     * @title terms
     * Terms of the payment
     * @example sample terms of payment (up to 1,024 characters)
     */
    terms: string | null;

    /**
     * @title successful
     * Indicates whether the payment was successfully processed
     */
    successful: boolean;
  };

  export type Cancellation = {
    /**
     * @title canceled_by
     * Name of the person whom canceled
     */
    canceled_by: string;

    /**
     * @title reason
     * Reason that the cancellation occurred
     */
    reason: string | null;

    /**
     * @title canceler_type
     * @enum ["host", "invitee"]
     */
    canceler_type:
      | tags.Constant<"host", { title: "host" }>
      | tags.Constant<"invitee", { title: "invitee" }>;

    /**
     * @title created_at
     * The moment when the cancellation was created
     * @example "2019-01-02T03:04:05.678123Z"
     */
    created_at: string & tags.Format<"date-time">;
  };

  export type Pagination = {
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
    next_page: (string & tags.Format<"iri">) | null;

    /**
     * @title previous_page
     * URI to return the previous page of an ordered list ("null" indicates no additional results are available)
     */
    previous_page: (string & tags.Format<"iri">) | null;

    /**
     * @title next_page_token
     * Token to return the next page of an ordered list ("null" indicates no additional results are available)
     */
    next_page_token: (string & tags.Format<"iri">) | null;

    /**
     * @title previous_page_token
     * Token to return the previous page of an ordered list ("null" indicates no additional results are available)
     */
    previous_page_token: (string & tags.Format<"iri">) | null;
  };

  /**
   * @title user
   * Information about the user.
   */
  export type User = {
    /**
     * @title uri
     * Canonical reference (unique identifier) for the user
     * @example "https://api.calendly.com/users/AAAAAAAAAAAAAAAA"
     */
    uri: string & tags.Format<"iri">;

    /**
     * @title name
     * The user's name (human-readable format)
     * @example "John Doe"
     */
    name: string;

    /**
     * @title slug
     * The portion of URL for the user's scheduling page (where invitees book sessions)
     * @example "acmesales"
     */
    slug: string;

    /**
     * @title email
     * The user's email address
     * @example "test@example.com"
     */
    email: string & tags.Format<"email">;

    /**
     * @title scheduling_url
     * The URL of the user's Calendly landing page (that lists all the user's event types)
     * @example "https://calendly.com/acmesales"
     */
    scheduling_url: string & tags.Format<"iri">;

    /**
     * @title timezone
     * The time zone to use when presenting time to the user
     * @example "America/New_York"
     */
    timezone: string & Placeholder<"Asia/Tokyo">;

    /**
     * @title avatar_url
     * The URL of the user's avatar (image). Can be null.
     * @example "https://01234567890.cloudfront.net/uploads/user/avatar/0123456/a1b2c3d4.png"
     */
    avatar_url: (string & tags.Format<"iri">) | null;

    /**
     * @title created_at
     * The moment when the user's record was created
     * @example "2019-01-02T03:04:05.678123Z"
     */
    created_at: string & tags.Format<"date-time">;

    /**
     * @title updated_at
     * The moment when the user's record was last updated
     * @example "2019-08-07T06:05:04.321123Z"
     */
    updated_at: string & tags.Format<"date-time">;

    /**
     * @title current_organization
     * A unique reference to the user's current organization
     * @example "https://api.calendly.com/organizations/AAAAAAAAAAAAAAAA"
     */
    current_organization: string & tags.Format<"iri">;

    /**
     * @title resource_type
     * Resource type to support polymorphic associations
     * @example "User"
     */
    resource_type: string;
  };
}
