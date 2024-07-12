import { Module } from "@nestjs/common";
import { GoogleScholarController } from "./GoogleScholarController";

@Module({
  controllers: [GoogleScholarController],
  providers: [],
})
export class GoogleScholarModule {}
