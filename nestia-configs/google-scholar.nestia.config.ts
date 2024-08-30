// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { GoogleScholarModule } from "../src/controllers/connector/google_scholar/GoolgeScholarModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(GoogleScholarModule),
  swagger: {
    info: {
      title: "구글 학술 자료 통합 검색",
      summary:
        "구글 스칼라를 이용해 학술 자료를 빠르고 정확하게 찾을 수 있어요.",
      description:
        "구글 스칼라를 통해 논문, 학술지, 도서, 학위 논문 등 다양한 학술 자료를 효율적으로 검색하고 접근할 수 있어요. 키워드, 저자, 출판 연도 등으로 검색할 수 있고, 인용 횟수나 관련성에 따라 결과를 정렬할 수 있어요. 특정 논문의 인용 정보를 확인하거나, 관련 논문을 쉽게 찾아볼 수 있어요. 또한, 일부 자료의 경우 전문(full-text)을 바로 확인할 수 있어 연구나 학습에 매우 유용해요. 학생, 연구자, 그리고 지식에 관심 있는 모든 분들이 활용하기 좋은 도구예요.",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/google-scholar.swagger.json",
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
