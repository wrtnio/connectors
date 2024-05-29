import { Controller, Post } from "@nestjs/common";

import { SwaggerProvider } from "../../providers/swagger/SwaggerProvider";

@Controller("swagger")
export class SwaggerController {
  constructor(private readonly swaggerProvider: SwaggerProvider) {}

  /**
   * Swagger.json 업데이트.
   *
   * @internal
   */
  @Post("update")
  async updateSwagger() {
    return await this.swaggerProvider.updateSwagger();
  }
}
