import { ICommon } from './ICommon';

export namespace IZendesk {
  export interface ICreateTicketInput extends ICommon.ISecret<'zendesk'> {
    subject: string;
    description: string;
    requester: {
      name: string;
      email: string;
    };
  }

  export interface ICreateTicketOutput {
    ticket_id: number;
    status: string;
  }

  export interface IGetTicketOutput {
    ticket_id: number;
    subject: string;
    description: string;
    status: string;
  }

  export interface IUpdateTicketInput extends ICommon.ISecret<'zendesk'> {
    ticket_id: number;
    status: string;
  }

  export interface ICreateUserInput extends ICommon.ISecret<'zendesk'> {
    name: string;
    email: string;
  }

  export interface ICreateUserOutput {
    user_id: number;
    name: string;
    email: string;
  }

  export interface IGetUserOutput {
    user_id: number;
    name: string;
    email: string;
  }

  export interface IAddCommentInput extends ICommon.ISecret<'zendesk'> {
    ticket_id: number;
    comment: string;
  }

  export interface IAddCommentOutput {
    comment_id: number;
    body: string;
  }
}
