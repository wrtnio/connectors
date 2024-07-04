import core from "@nestia/core";
import { Controller } from "@nestjs/common";
import { RouteIcon, Standalone } from "@wrtn/decorators";

import { IConnector } from "@wrtn/connector-api/lib/structures/common/IConnector";

import { ArxivSearchProvider } from "../../../providers/connector/arxiv_search/ArxivSearchProvider";
import { Try, createResponseForm } from "../../../utils/createResponseForm";
import { retry } from "../../../utils/retry";

@Controller("connector/arxiv-search")
export class ArxivSearchController {
  /**
   * 입력한 검색 조건을 기반으로 아카이브에서 논문을 검색합니다.
   *
   * @summary 아카이브 논문 검색
   *
   * @param input 아카이브 논문 검색 조건
   *
   * @returns 검색 조건을 기반으로 아카이브에서 검색된 논문 목록.
   *
   * @tag Arxiv
   * @tag 아카이브
   * @tag Arxiv
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
   * @tag IEEE
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
   * @tag Arxiv
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
  @RouteIcon("https://ecosystem-connector.s3.ap-northeast-2.amazonaws.com/icon/light/arxiv.svg")
  async search(@core.TypedBody() input: IConnector.ISearchInput): Promise<Try<IConnector.ISearchOutput>> {
    const data = await retry(() => ArxivSearchProvider.search(input))();
    return createResponseForm(data);
  }
}
