import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { IZendesk } from './IZendesk';

/**
 * @title Zendesk Service Provider
 * 
 * Service class responsible for communication with Zendesk API.
 */
@Injectable()
export class ZendeskProvider {
  private readonly zendeskApiUrl = 'https://yourdomain.zendesk.com/api/v2';
  private readonly zendeskApiToken = 'your_api_token';

  /**
   * @title Create Ticket
   * 
   * Creates a new ticket in Zendesk.
   * 
   * @param input - Input data required for ticket creation.
   * @returns Information about the created ticket.
   */
  async createTicket(input: IZendesk.ICreateTicketInput): Promise<IZendesk.ICreateTicketOutput> {
    const response = await axios.post(`${this.zendeskApiUrl}/tickets.json`, {
      ticket: {
        subject: input.subject,
        description: input.description,
        requester: {
          name: input.requester.name,
          email: input.requester.email,
        },
      },
    }, {
      headers: {
        'Authorization': `Bearer ${this.zendeskApiToken}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      ticket_id: response.data.ticket.id,
      status: response.data.ticket.status,
    };
  }

  /**
   * @title Retrieve Ticket
   * 
   * Retrieves information for a specific ticket.
   * 
   * @param ticketId - ID of the ticket to retrieve.
   * @returns Information about the retrieved ticket.
   */
  async getTicket(ticketId: number): Promise<IZendesk.IGetTicketOutput> {
    const response = await axios.get(`${this.zendeskApiUrl}/tickets/${ticketId}.json`, {
      headers: {
        'Authorization': `Bearer ${this.zendeskApiToken}`,
      },
    });

    return {
      ticket_id: response.data.ticket.id,
      subject: response.data.ticket.subject,
      description: response.data.ticket.description,
      status: response.data.ticket.status,
    };
  }

  /**
   * @title Update Ticket
   * 
   * Updates the status of an existing ticket.
   * 
   * @param input - Input data required for ticket update.
   */
  async updateTicket(input: IZendesk.IUpdateTicketInput): Promise<void> {
    await axios.put(`${this.zendeskApiUrl}/tickets/${input.ticket_id}.json`, {
      ticket: {
        status: input.status,
      },
    }, {
      headers: {
        'Authorization': `Bearer ${this.zendeskApiToken}`,
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * @title Create User
   * 
   * Creates a new user in Zendesk.
   * 
   * @param input - Input data required for user creation.
   * @returns Information about the created user.
   */
  async createUser(input: IZendesk.ICreateUserInput): Promise<IZendesk.ICreateUserOutput> {
    const response = await axios.post(`${this.zendeskApiUrl}/users.json`, {
      user: {
        name: input.name,
        email: input.email,
      },
    }, {
      headers: {
        'Authorization': `Bearer ${this.zendeskApiToken}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      user_id: response.data.user.id,
      name: response.data.user.name,
      email: response.data.user.email,
    };
  }

  /**
   * @title Retrieve User
   * 
   * Retrieves information for a specific user.
   * 
   * @param userId - ID of the user to retrieve.
   * @returns Information about the retrieved user.
   */
  async getUser(userId: number): Promise<IZendesk.IGetUserOutput> {
    const response = await axios.get(`${this.zendeskApiUrl}/users/${userId}.json`, {
      headers: {
        'Authorization': `Bearer ${this.zendeskApiToken}`,
      },
    });

    return {
      user_id: response.data.user.id,
      name: response.data.user.name,
      email: response.data.user.email,
    };
  }

  /**
   * @title Add Comment
   * 
   * Adds a comment to a ticket.
   * 
   * @param input - Input data required for adding a comment.
   * @returns Information about the added comment.
   */
  async addComment(input: IZendesk.IAddCommentInput): Promise<IZendesk.IAddCommentOutput> {
    const response = await axios.post(`${this.zendeskApiUrl}/tickets/${input.ticket_id}/comments.json`, {
      comment: {
        body: input.comment,
      },
    }, {
      headers: {
        'Authorization': `Bearer ${this.zendeskApiToken}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      comment_id: response.data.comment.id,
      body: response.data.comment.body,
    };
  }
}
