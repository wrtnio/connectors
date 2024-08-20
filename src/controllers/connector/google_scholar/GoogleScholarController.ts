import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtnio/decorators";

import { IGoogleScholar } from "@wrtn/connector-api/lib/structures/connector/google_scholar/IGoogleScholar";

import { GoogleScholarProvider } from "../../../providers/connector/google_scholar/GoogleScholarProvider";
import { retry } from "../../../utils/retry";

@Controller("connector/google-scholar")
export class GoogleScholarController {
  /**
   * 구글 스콜라에 있는 논문 목록을 가져옵니다.
   *
   * @summary 구글 스콜라 논문 목록 검색
   *
   * @param input 구글 스콜라 논문 검색 조건
   *
   * @returns 구글 스콜라 논문 목록
   *
   * @tag Google-Scholar
   * @tag 구글 스칼라
   * @tag 학술 검색
   * @tag 논문
   * @tag 논문 찾기
   * @tag 학술 자료
   * @tag 학술 논문
   * @tag 논문 인용
   * @tag 연구 논문
   * @tag 연구 자료
   * @tag 통계
   * @tag 출처
   * @tag 초록
   * @tag 초록 요약
   * @tag 학회지
   * @tag 연구 결과
   * @tag 학술지
   * @tag 피어 리뷰 논문
   * @tag 논문 다운로드
   * @tag 논문 작성
   * @tag 학술 연구
   * @tag 연구자
   * @tag 학술 데이터베이스
   * @tag 참고 문헌
   * @tag 인용
   * @tag 논문 추천
   * @tag 학위 논문
   * @tag 과학 논문
   * @tag 기술 논문
   * @tag 인용 지수
   * @tag h-인덱스
   * @tag 연구 트렌드
   * @tag 수학
   * @tag 물리학
   * @tag 생물학
   * @tag 컴퓨터과학
   * @tag 화학
   * @tag 머신러닝
   * @tag 인공지능
   * @tag HCI
   * @tag 대학원
   * @tag 석사
   * @tag 박사
   * @tag 대학원 프로그램 추천
   * @tag 교수 추천
   * @tag ACM
   * @tag AAAI
   * @tag NeurIPS
   * @tag ICML
   * @tag CVPR
   * @tag SIGGRAPH
   * @tag CHI
   * @tag ICCV
   * @tag ECCV
   * @tag ACL
   * @tag EMNLP
   * @tag ICASSP
   * @tag KDD
   * @tag WWW
   * @tag AAAS
   * @tag ACS
   * @tag APS
   * @tag AAS
   * @tag AGU
   * @tag GSA
   * @tag MRS
   * @tag RSC
   * @tag ESA
   * @tag ASCB
   * @tag ASM
   * @tag ASHG
   * @tag AACR
   * @tag AHA
   * @tag ADA
   * @tag SfN
   * @tag FASEB
   * @tag ISCB
   * @tag IUBMB
   * @tag ASME
   * @tag ASCE
   * @tag AIAA
   * @tag SAE
   * @tag SPIE
   * @tag AOM
   * @tag AMA
   * @tag AEA
   * @tag INFORMS
   * @tag APA
   * @tag APSA
   * @tag ASA
   * @tag MLA
   * @tag AHA
   * @tag ISA
   * @tag UNESCO
   * @tag Google Scholar
   * @tag Academic Search
   * @tag Paper
   * @tag Find Papers
   * @tag Academic Resources
   * @tag Academic Paper
   * @tag Cite Papers
   * @tag Research Paper
   * @tag Research Resources
   * @tag Statistics
   * @tag Source
   * @tag Abstract
   * @tag Abstract Summary
   * @tag Journal
   * @tag Research Findings
   * @tag Academic Journal
   * @tag Peer-Reviewed Paper
   * @tag Download Paper
   * @tag Write Paper
   * @tag Academic Research
   * @tag Researcher
   * @tag Academic Database
   * @tag References
   * @tag Citation
   * @tag Recommend Papers
   * @tag Thesis
   * @tag Scientific Paper
   * @tag Technical Paper
   * @tag Citation Index
   * @tag h-Index
   * @tag Research Trends
   * @tag Mathematics
   * @tag Physics
   * @tag Biology
   * @tag Computer Science
   * @tag Chemistry
   * @tag Machine Learning
   * @tag Artificial Intelligence
   * @tag HCI
   * @tag Human-Computer Interaction
   * @tag Graduate School
   * @tag Master's
   * @tag PhD
   * @tag Recommend Graduate Programs
   * @tag Recommend Professors
   * @tag ACM
   * @tag AAAI
   * @tag NeurIPS
   * @tag ICML
   * @tag CVPR
   * @tag SIGGRAPH
   * @tag CHI
   * @tag ICCV
   * @tag ECCV
   * @tag ACL
   * @tag EMNLP
   * @tag ICASSP
   * @tag KDD
   * @tag WWW
   * @tag AAAS
   * @tag ACS
   * @tag APS
   * @tag AAS
   * @tag AGU
   * @tag GSA
   * @tag MRS
   * @tag RSC
   * @tag ESA
   * @tag ASCB
   * @tag ASM
   * @tag ASHG
   * @tag AACR
   * @tag AHA
   * @tag ADA
   * @tag SfN
   * @tag FASEB
   * @tag ISCB
   * @tag IUBMB
   * @tag ASME
   * @tag ASCE
   * @tag AIAA
   * @tag SAE
   * @tag SPIE
   * @tag AOM
   * @tag AMA
   * @tag AEA
   * @tag INFORMS
   * @tag APA
   * @tag APSA
   * @tag ASA
   * @tag MLA
   * @tag AHA
   * @tag ISA
   * @tag UNESCO
   */
  @Standalone()
  @core.TypedRoute.Post()
  @RouteIcon(
    "https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/fulls/GoogleScholar_full.svg",
  )
  async search(
    @core.TypedBody() input: IGoogleScholar.ISearchInput,
  ): Promise<IGoogleScholar.ISearchOutput[]> {
    return retry(() => GoogleScholarProvider.search(input))();
  }
}
