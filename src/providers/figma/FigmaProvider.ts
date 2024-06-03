import { Injectable } from "@nestjs/common";

import { IFigma } from "@wrtn/connector-api/lib/structures/connector/figma/IFigma";

@Injectable()
export class FigmaProvider {
  async getFiles(
    input: IFigma.IReadFileInput,
  ): Promise<IFigma.IReadFileOutput> {
    return null!;
  }
}
