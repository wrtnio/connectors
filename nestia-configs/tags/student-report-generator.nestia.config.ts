// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { StudentReportGeneratorModule } from "../../src/controllers/connector/student_report_generator/StudentReportGeneratorModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(StudentReportGeneratorModule),
  swagger: {
    info: {
      title: "생활기록부",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/categories/student-report.swagger.json",
    servers: [
      {
        url: "https://studio-connector-api.wrtn.ai",
        description: "Production Server",
      },
      {
        url: "https://studio-connector-poc.dev.wrtn.club",
        description: "Develop Server",
      },
      {
        url: "http://localhost:3003",
        description: "Local Server",
      },
    ],
  },
};
export default NESTIA_CONFIG;
