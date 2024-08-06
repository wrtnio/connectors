// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { GoogleHotelModule } from "../src/controllers/connector/google_hotel/GoogleHotelModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(GoogleHotelModule),
  swagger: {
    info: {
      title: "구글 호텔 정보 검색 및 예약",
      summary: "일정에 맞는 숙소를 쉽게 찾아볼 수 있어요.",
      description:
        "여행 일정에 맞는 호텔, 리조트, 펜션 등 다양한 숙소를 검색할 수 있어요. 목적지, 체크인/체크아웃 날짜, 인원 수 등을 입력하면 조건에 맞는 숙소 목록을 볼 수 있어요. 가격, 평점, 위치 등으로 검색 결과를 필터링하거나 정렬할 수 있어요. 또한 지도 보기를 통해 숙소의 위치를 직관적으로 파악할 수 있어, 여행 계획을 더욱 쉽고 효율적으로 세울 수 있어요.",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/google-hotel.swagger.json",
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
