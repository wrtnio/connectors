import { Controller } from "@nestjs/common";
import { SimilarwebProvider } from "../../../providers/connector/similarweb/SimilarwebProvider";

@Controller("connector/similarweb")
export class SimilarwebController {
  constructor(private readonly similarwebProvider: SimilarwebProvider) {}
}
