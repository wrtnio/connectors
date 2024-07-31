import { Controller } from "@nestjs/common";
import { SlackProvider } from "../../../providers/connector/slack/SlackProvider";

@Controller("connector/slack")
export class SlackController {
  constructor(private readonly slackProvider: SlackProvider) {}
}
