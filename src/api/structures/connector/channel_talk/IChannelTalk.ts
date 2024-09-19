export namespace IChannelTalk {
  export interface IToken {
    sessionJWT: string;
    expiresAt: number;
  }

  export interface IGetUserChatOutput {
    prev: string;
    next: string;
    userChats: ICommonUserChatOutput[];
    sessions: ChatSession[];
    messages: Message[];
    users: User[];
    managers: Manager[];
    chatTags: ChatTag[];
  }

  // Message
  interface Message {
    chatKey: string;
    id: string;
    mainKey: string;
    threadKey: string;
    meetKey: string;
    frontKey: string;
    channelId: string;
    chatType: string;
    chatId: string;
    personType: string;
    personId: string;
    requestId?: string;
    language: string;
    createdAt: number;
    version: number;
    blocks?: Block[];
    plainText?: string;
    updatedAt: number;
    inboundEmailId?: string;
    thread?: MessageThread;
    meet?: MessageMeet;
    buttons?: Button[];
    files?: File[];
    webPage?: WebPage;
    log?: Log;
    reactions?: Reaction[];
    form?: Form;
    state: "sending" | "sent" | "failed" | "removed";
    options?: (
      | "actAsManager"
      | "displayAsChannel"
      | "doNotPost"
      | "doNotSearch"
      | "doNotSendApp"
      | "doNotUpdateDesk"
      | "immutable"
      | "private"
      | "silent"
      | "silentToManager"
      | "silentToUser"
    )[];
    marketing?: MessageMarketing;
    supportBot?: MessageSupportBot;
    workflow?: MessageWorkflow;
    alf?: MessageAlf;
    alertLevel?: "alert" | "unread" | "none";
    threadMsg?: boolean;
    threadRoot?: boolean;
    meetRoot?: boolean;
    meetMsg?: boolean;
    broadcastedMsg?: boolean;
    workflowButton?: boolean;
    rootMessageId?: string;
  }

  // ChatSession
  interface ChatSession {
    key: string;
    chatId: string;
    teamChatSectionId?: string;
    chatKey: string;
    updatedKey: string;
    unreadKey: string;
    channelId: string;
    alert: number;
    unread: number;
    watch?: "all" | "info" | "none";
    allMentionImportant?: boolean;
    readAt: number;
    receivedAt: number;
    postedAt: number;
    updatedAt: number;
    createdAt: number;
    version: number;
    id: string;
    chatType: string;
    personType: string;
    personId: string;
  }

  // UserChat
  interface ICommonUserChatOutput {
    id: string;
    channelId: string;
    alfStateKey?: string;
    contactKey?: string;
    contactMediumType?: string;
    liveMeetId?: string;
    sync: boolean;
    state: "closed" | "opened" | "snoozed" | "queued";
    missedReason?:
      | "notInOperation"
      | "userLeft"
      | "ringTimeOver"
      | "rateLimit"
      | "noOperator"
      | "preservedNumber"
      | "unregisteredNumber"
      | "exceededQueue"
      | "abandonedInQueue";
    managed: boolean;
    priority?: "low" | "medium" | "high";
    userId: string;
    xerId?: string;
    name: string;
    title?: string;
    description?: string;
    subtextType?: "description" | "incoming";
    handling?: UserChatHandling;
    source?: UserChatSource;
    managerIds: string[];
    assigneeId?: string;
    teamId?: string;
    tags?: string[];
    profile?: Record<string, any>;
    goalEventName?: string;
    goalEventQuery?: Expression;
    goalCheckedAt?: number;
    goalState?: "achieved" | "notAchieved" | "waiting" | "none";
    firstOpenedAt?: number;
    openedAt?: number;
    firstQueuedAt?: number;
    queuedAt?: number;
    createdAt: number;
    updatedAt: number;
    frontMessageId?: string;
    frontUpdatedAt?: number;
    deskMessageId?: string;
    deskUpdatedAt?: number;
    userLastMessageId?: string;
    followUpTriggeredAt?: number;
    firstAssigneeIdAfterOpen?: string;
    firstRepliedAtAfterOpen?: number;
    oneStop: boolean;
    waitingTime?: number;
    avgReplyTime?: number;
    totalReplyTime?: number;
    replyCount?: number;
    resolutionTime?: number;
    operationWaitingTime?: number;
    operationAvgReplyTime?: number;
    operationTotalReplyTime?: number;
    operationReplyCount?: number;
    operationResolutionTime?: number;
    askedAt?: number;
    firstAskedAt?: number;
    closedAt?: number;
    snoozedAt?: number;
    expiresAt?: number;
    version: number;
    lastInboundEmailId?: string;
    alfRequestedAt?: number;
  }

  // User
  interface User {
    id: string;
    channelId: string;
    memberId?: string;
    veilId?: string;
    unifiedId?: string;
    type: "member" | "lead" | "unified";
    name: string;
    mobileNumberQualified: boolean;
    emailQualified: boolean;
    profile?: UserProfile;
    profileOnce?: UserProfile;
    tags?: string[];
    alert: number;
    unread: number;
    popUpChatId?: string;
    blocked: boolean;
    blockedKey?: string;
    unsubscribeEmail: boolean;
    unsubscribeTexting: boolean;
    hasChat: boolean;
    mainChatId?: string;
    hasPushToken: boolean;
    language: string;
    country?: string;
    timeZone?: string;
    province?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
    web?: WebInfo;
    mobile?: MobileInfo;
    sessionsCount: number;
    lastSeenAt: number;
    createdAt: number;
    updatedAt: number;
    version: number;
    managedKey?: number;
    named: boolean;
    member: boolean;
    email?: string;
    avatarUrl?: string;
    mobileNumber?: string;
    landlineNumber?: string;
    constrainted: boolean;
    systemLanguage: string;
  }

  // Manager
  interface Manager {
    id: string;
    channelId: string;
    accountId: string;
    name: string;
    description?: string;
    showDescriptionToFront: boolean;
    nameDescI18nMap?: Record<string, NameDesc>;
    profile?: Record<string, any>;
    email: string;
    showEmailToFront: boolean;
    mobileNumber?: string;
    showMobileNumberToFront: boolean;
    roleId: string;
    removed: boolean;
    createdAt: number;
    updatedAt: number;
    displayAsChannel: boolean;
    defaultGroupWatch: "all" | "info" | "none";
    defaultDirectChatWatch: "all" | "info" | "none";
    defaultUserChatWatch: "all" | "info" | "none";
    chatAlertSound?:
      | "none"
      | "drop"
      | "woody"
      | "bounce"
      | "crystal"
      | "xylo"
      | "quickKnock"
      | "candy"
      | "shine";
    meetAlertSound?: "cute" | "basic" | "gentle" | "marimba";
    showPrivateMessagePreview: boolean;
    operatorScore?: number;
    touchScore?: number;
    avatar?: TinyFile;
    operatorEmailReminder: boolean;
    receiveUnassignedChatAlert?: boolean;
    receiveUnassignedMeetAlert?: boolean;
    operator: boolean;
    defaultAllMentionImportant: boolean;
    userMessageImportant: boolean;
    autoAssignCapacity?: number;
    statusEmoji?: string;
    statusText?: string;
    statusClearAt?: number;
    doNotDisturb: boolean;
    doNotDisturbClearAt?: number;
    accountDoNotDisturb: boolean;
    accountDoNotDisturbClearAt?: number;
    enableReactedMessageIndex: boolean;
    enableTeamMentionedMessageIndex: boolean;
    operatorUpdatedAt: number;
    pcInboxMeetAlert: boolean;
    mobileInboxMeetAlert: boolean;
    pcTeamChatMeetAlert: boolean;
    mobileTeamChatMeetAlert: boolean;
    managerId: string;
    meetOperator: boolean;
    avatarUrl?: string;
    emailForFront?: string;
    mobileNumberForFront?: string;
  }

  // ChatTag
  interface ChatTag {
    id: string;
    channelId: string;
    colorVariant?:
      | "red"
      | "orange"
      | "yellow"
      | "olive"
      | "green"
      | "cobalt"
      | "purple"
      | "pink"
      | "navy";
    name: string;
    key: string;
    description?: string;
    createdAt: number;
  }

  // Additional Interfaces
  interface Block {
    type: "bullets" | "code" | "text";
    language?: string;
    value?: string;
    blocks?: Block[];
  }

  interface Button {
    title: string;
    colorVariant?:
      | "cobalt"
      | "green"
      | "orange"
      | "red"
      | "black"
      | "pink"
      | "purple";
    action: Action;
  }

  interface File {
    id: string;
    type?: string;
    name: string;
    size: number;
    contentType?: string;
    duration?: number;
    width?: number;
    height?: number;
    orientation?: number;
    animated?: boolean;
    bucket: string;
    key: string;
    previewKey?: string;
    channelId: string;
    chatType: string;
    chatId: string;
  }

  interface WebPage {
    id: string;
    url: string;
    title?: string;
    description?: string;
    imageUrl?: string;
    videoUrl?: string;
    publisher?: string;
    author?: string;
    width?: number;
    height?: number;
    bucket?: string;
    previewKey?: string;
    logo?: string;
    name?: string;
  }

  interface Log {
    action?: string;
    values?: string[];
    triggerType?: string;
    triggerId?: string;
  }

  interface Reaction {
    emojiName: string;
    personKeys?: string[];
  }

  interface Form {
    submittedAt?: number;
    inputs?: FormInput[];
    type: string;
  }

  interface FormInput {
    value?: any;
    readOnly?: boolean;
    type?:
      | "text"
      | "number"
      | "bool"
      | "date"
      | "datetime"
      | "radio"
      | "singleSelect"
      | "checkbox"
      | "multiSelect";
    userChatProfileBindingKey?: boolean;
    userProfileBindingKey?: boolean;
    label?: string;
    bindingKey?: string;
    dataType?:
      | "string"
      | "date"
      | "list"
      | "listOfNumber"
      | "number"
      | "datetime"
      | "boolean";
  }

  interface MessageThread {
    id: string;
    managerIds?: string[];
    repliedManagerIds?: string[];
    replyCount?: number;
    chatType: string;
    chatId: string;
    rootMessageId: string;
  }

  interface MessageMeet {
    id: string;
    chatType: string;
    channelId: string;
    state:
      | "live"
      | "ended"
      | "transcribing"
      | "transcribed"
      | "transcribeFailed";
    mode: "audio" | "video";
    amassedPersons?: string[];
    roomStartedAt?: number;
    call?: Call;
    front?: Front;
    recording?: Recording;
    country?: string;
    meetEndedAt?: number;
    meetType: "front" | "call" | "team";
    managerIds?: string[];
  }

  interface Call {
    id: string;
    from: string;
    to: string;
    direction: "inbound" | "outbound";
    callServerIp?: string;
    missedReason?:
      | "notInOperation"
      | "userLeft"
      | "ringTimeOver"
      | "rateLimit"
      | "noOperator"
      | "preservedNumber"
      | "unregisteredNumber"
      | "exceededQueue"
      | "abandonedInQueue";
    createAt: number;
    engagedAt?: number;
    closedAt?: number;
    missedHandledAt?: number;
  }

  interface Front {
    id: string;
    direction: "inbound" | "outbound";
    missedReason?:
      | "notInOperation"
      | "userLeft"
      | "ringTimeOver"
      | "rateLimit"
      | "noOperator"
      | "preservedNumber"
      | "unregisteredNumber"
      | "exceededQueue"
      | "abandonedInQueue";
    engagedAt?: number;
    missedHandledAt?: number;
  }

  interface Recording {
    id: string;
    bucket: string;
    key: string;
    contentType?: string;
    duration?: number;
    size?: number;
    name?: string;
    channelId: string;
    chatType: string;
    chatId: string;
  }

  interface MessageMarketing {
    type?: string;
    id?: string;
    advertising?: boolean;
    sendToOfflineXms?: boolean;
    sendToOfflineEmail?: boolean;
    exposureType?: "fullScreen";
  }

  interface MessageSupportBot {
    id?: string;
    revisionId?: string;
    sectionId?: string;
    stepIndex?: number;
    buttons?: SupportBotButton[];
    submitButtonIndex?: number;
  }

  interface SupportBotButton {
    text: string;
    nextSectionId: string;
  }

  interface MessageWorkflow {
    id?: string;
    revisionId?: string;
    sectionId?: string;
    actionIndex?: number;
    submitButtonId?: string;
  }

  interface MessageAlf {
    type:
      | "complete"
      | "rag"
      | "incomplete"
      | "impossible"
      | "command"
      | "faq"
      | "failed"
      | "openUserChat"
      | "system";
    references?: AlfReference[];
  }

  interface AlfReference {
    index?: string;
    type: string;
  }

  interface UserProfile {
    name?: string;
    email?: string;
    recentPurchaseCount?: number;
    recentPurchaseAmount?: number;
    avatarUrl?: string;
    mobileNumber?: string;
    landlineNumber?: string;
    firstName?: string;
    lastName?: string;
    [key: string]: any; // For additional custom properties
  }

  interface WebInfo {
    device?: string;
    os?: string;
    osName?: string;
    browser?: string;
    browserName?: string;
    sessionsCount?: number;
    lastSeenAt?: number;
  }

  interface MobileInfo {
    device?: string;
    os?: string;
    osName?: string;
    appName?: string;
    appVersion?: string;
    sessionsCount?: number;
    lastSeenAt?: number;
  }

  interface NameDesc {
    name: string;
    description?: string;
  }

  interface TinyFile {
    bucket: string;
    key: string;
    width?: number;
    height?: number;
  }

  interface Expression {
    key?: string;
    type?:
      | "boolean"
      | "date"
      | "datetime"
      | "list"
      | "listOfNumber"
      | "number"
      | "string";
    operator?: Operator;
    values?: any[];
    and?: Expression[];
    or?: Expression[];
  }

  interface Operator {
    // Operator properties would go here
  }

  interface UserChatHandling {
    type: string;
    // Additional properties based on the specific handling type
  }

  interface UserChatSource {
    page?: string;
    marketing?: Marketing;
    supportBot?: SupportBot;
    workflow?: Workflow;
    appMessenger?: AppMessenger;
  }

  interface Marketing {
    id: string;
    type: string;
  }

  interface SupportBot {
    id: string;
    revisionId: string;
    sectionPath: string[];
  }

  interface Workflow {
    id: string;
    revisionId: string;
    traceId: string;
    sectionPath: string[];
    causeOfEnd?: string;
  }

  interface AppMessenger {
    id: string;
    mediumType: string;
    displayName: string;
  }

  interface Action {
    type: string;
    attributes?: ActionAttributes;
  }

  interface ActionAttributes {
    // Action attributes properties would go here
  }

  // Additional interfaces that might be needed based on the API structure
  interface AlfBot {
    id: string;
    channelId: string;
    name: string;
    description?: string;
    createdAt: number;
    avatarUrl?: string;
    ai: boolean;
    color: string;
  }

  interface HandlingBot {
    name: string;
    avatarUrl?: string;
    nameDescI18nMap?: Record<string, NameDesc>;
  }
}
