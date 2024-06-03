import { Controller } from "@nestjs/common";

import { FigmaProvider } from "../../../providers/figma/FigmaProvider";

@Controller("connector/figma")
export class FigmaController {
  constructor(private readonly figmaProvider: FigmaProvider) {}
}
