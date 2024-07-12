import { Module } from "@nestjs/common";
import { ArxivSearchController } from "./ArxivSearchController";

@Module({
  controllers: [ArxivSearchController],
  providers: [],
})
export class ArxivSearchModule {}
