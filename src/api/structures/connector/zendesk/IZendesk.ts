export namespace IZendesk {
  export interface ICreateTicketInput {
    subject: string;
    description: string;
    requester: {
      name: string;
      email: string;
    };
  }

  export interface ICreateTicketOutput {
    ticket: {
      id: number;
      url: string;
    };
  }
}