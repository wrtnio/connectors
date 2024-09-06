import { Controller } from "@nestjs/common";
import { CalendlyProvider } from "../../providers/connector/calendly/CalendlyProvider";

@Controller("connector/calendly")
export class CalendlyController {
  constructor(private readonly calendlyProvider: CalendlyProvider) {}
}
