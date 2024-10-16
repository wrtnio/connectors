import { Controller } from "@nestjs/common";
import { CrunchbaseProvider } from "../../../providers/connector/crunchbase/CrunchbaseProvider";

@Controller("connector/crunchbase")
export class CrunchbaseController {
  constructor(private readonly crunchbaseProvider: CrunchbaseProvider) {}
}
