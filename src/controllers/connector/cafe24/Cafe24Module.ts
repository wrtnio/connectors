import { Module } from "@nestjs/common";

import { Cafe24Controller } from "./Cafe24Controller";

@Module({
  controllers: [Cafe24Controller],
})
export class Cafe24Module {}
