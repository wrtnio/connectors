// nestia configuration file
import type sdk from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { KakaoMapModule } from "../src/controllers/connector/kakao_map/KakaoMapModule";

const NESTIA_CONFIG: sdk.INestiaConfig = {
  input: async () => NestFactory.create(KakaoMapModule),
  swagger: {
    info: {
      title: "카카오 지도 정보 검색",
      summary: "카카오 맵으로 원하는 장소를 쉽게 찾아요.",
      description:
        "카카오 맵에서 키워드로 장소를 검색할 수 있어요. 검색 결과로 장소의 이름, 주소, 전화번호, 카테고리 등 상세 정보를 얻을 수 있어요. 특정 위치 주변의 시설물을 검색할 수 있고, 검색 결과를 거리순이나 인기순으로 정렬할 수 있어요. 또한 장소의 좌표 정보를 얻어 지도에 표시하거나, 길찾기에 활용할 수 있어요. 이를 통해 여행 계획을 세우거나, 주변 맛집을 찾거나, 비즈니스 위치를 분석하는 등 다양한 목적으로 활용할 수 있어요.",
    },
    beautify: true,
    decompose: true,
    output: "packages/api/connectors/kakao-map.swagger.json",
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
