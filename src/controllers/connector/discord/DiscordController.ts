import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon } from "@wrtnio/decorators";

import { IExcel } from "@wrtn/connector-api/lib/structures/connector/excel/IExcel";

import { ExcelProvider } from "../../../providers/connector/excel/ExcelProvider";
import { retry } from "../../../utils/retry";
import { DiscordProvider } from "../../../providers/connector/discord/DiscordProvider";

@Controller("connector/discord")
export class DiscordController {
  constructor(private readonly discordProvider: DiscordProvider) {}
}
