import { Module } from "@nestjs/common";
import { ArxivSearchModule } from "../controllers/connector/arxiv_search/ArxivSearchModule";
import { GoogleScholarModule } from "../controllers/connector/google_scholar/GoolgeScholarModule";

/**
 * 학술/연구
 */
@Module({
  imports: [ArxivSearchModule, GoogleScholarModule],
})
export class ResearchModule {}
