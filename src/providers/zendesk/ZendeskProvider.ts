import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IZendesk } from '../../api/structures/connector/zendesk/IZendesk';

@Injectable()
export class ZendeskProvider {
  async createTicket(input: IZendesk.ICreateTicketInput): Promise<IZendesk.ICreateTicketOutput> {
    const response = await axios.post('https://your-zendesk-domain/api/v2/tickets', input, {
      headers: {
        'Authorization': `Bearer YOUR_ZENDESK_API_TOKEN`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }
}
