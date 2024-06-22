import { Module } from "@nestjs/common";

import { Work24Controller } from "./Work24Controller";

@Module({
  controllers: [Work24Controller],
  providers: [],
})
export class Work24Module {}
