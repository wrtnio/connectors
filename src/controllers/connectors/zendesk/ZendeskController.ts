import { Controller, Post, Body } from '@nestjs/common';
import { ZendeskProvider } from '../../providers/zendesk/ZendeskProvider';
import { IZendesk } from '../../api/structures/connector/zendesk/IZendesk';

@Controller('zendesk')
export class ZendeskController {
  constructor(private readonly zendeskProvider: ZendeskProvider) {}

  @Post('create-ticket')
  async createTicket(@Body() input: IZendesk.ICreateTicketInput): Promise<IZendesk.ICreateTicketOutput> {
    return this.zendeskProvider.createTicket(input);
  }
}
