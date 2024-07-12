import { Module } from "@nestjs/common";
import { ArxivSearchModule } from "../controllers/connector/arxiv_search/ArxivSearchModule";
import { GoogleScholarModule } from "../controllers/connector/google_scholar/GoolgeScholarModule";
import { NotionModule } from "../controllers/connector/notion/NotionModule";

/**
 * 교육
 */
@Module({
  imports: [ArxivSearchModule, GoogleScholarModule, NotionModule],
})
export class EducationModule {}
