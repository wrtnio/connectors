import { TypedBody, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { IInnoforest } from "@wrtn/connector-api/lib/structures/connector/innoforest/IInnoforest";
import { InnoforestProvider } from "../../../providers/connector/innoforest/InnoforestProvider";

@Controller("connector/innoforest")
export class InnoforestController {
  constructor(private readonly innoforestProvider: InnoforestProvider) {}

  /**
   * 혁신의숲 회사 데이터 전체 조회
   *
   * 혁신의숲(innoforest)은 다양한 스타트업의 성장 데이터를 제공하는 플랫폼입니다.
   * 혁신의숲의 다른 커넥터에서 제공하는 데이터들을 모두 통합하여 한 번에 제공합니다.
   * 유저가 요청하는 정보가 많을 경우 이 커넥터를 활용하는 것이 유리합니다.
   * 여기에는 아래의 프로퍼티들을 포함됩니다.
   *
   * - corp, corpfinance, corpinvest, corpcommon, product, traffic, sales, salesrebuy, salesavgbuy, salesperson, saleshousehold, salesincome, invest, patent, patentword, finance, employee, press
   *
   * @summary 혁신의숲 회사 데이터 전체 조회
   */
  @TypedRoute.Post("unify")
  async unify(@TypedBody() input: IInnoforest.IUnifyInput) {
    const [
      corp,
      corpfinance,
      corpinvest,
      corpcommon,
      product,
      traffic,
      sales,
      salesrebuy,
      salesavgbuy,
      salesperson,
      saleshousehold,
      salesincome,
      invest,
      patent,
      patentword,
      finance,
      employee,
      press,
    ] = await Promise.all([
      await this.innoforestProvider.getcorp(input),
      await this.innoforestProvider.getcorpfinance(input),
      await this.innoforestProvider.getcorpinvest(input),
      await this.innoforestProvider.getcorpcommon(input),
      await this.innoforestProvider.findproduct(input),
      await this.innoforestProvider.findtraffic(input),
      await this.innoforestProvider.findsales(input),
      await this.innoforestProvider.findsalesrebuy(input),
      await this.innoforestProvider.findsalesavgbuy(input),
      await this.innoforestProvider.findsalesperson(input),
      await this.innoforestProvider.findsaleshousehold(input),
      await this.innoforestProvider.findsalesincome(input),
      await this.innoforestProvider.findinvest(input),
      await this.innoforestProvider.findpatent(input),
      await this.innoforestProvider.findpatentword(input),
      await this.innoforestProvider.findfinance(input),
      await this.innoforestProvider.findemployee(input),
      await this.innoforestProvider.findpress(input),
    ]);

    return {
      corp,
      corpfinance,
      corpinvest,
      corpcommon,
      product,
      traffic,
      sales,
      salesrebuy,
      salesavgbuy,
      salesperson,
      saleshousehold,
      salesincome,
      invest,
      patent,
      patentword,
      finance,
      employee,
      press,
    };
  }

  /**
   * 혁신의숲 회사 식별자 검색
   *
   * 혁신의숲(innoforest)은 다양한 스타트업의 성장 데이터를 제공하는 플랫폼입니다.
   *
   * 혁신의숲에서 현재 조회 가능한 회사의 식별자를 조회하여, 다음 검색에 활용할 수 있습니다.
   *
   * - 오늘의집(버킷플레이스) : 1198691245
   * - 올웨이즈(레브잇) : 1798102225
   * - 트웰브랩스 : 8458601667
   * - 뤼이드 : 1068706394
   * - 클래스101: 4578100277
   *
   * @summary 혁신의숲 회사 식별자 검색
   */
  @TypedRoute.Post("search")
  async search(
    @TypedBody() input: IInnoforest.ISearchInput,
  ): Promise<IInnoforest.ISearchOutput> {
    return {
      companies: [
        {
          corpUniqNum: "1198691245",
          companyName: "오늘의집(버킷플레이스)",
        },
        {
          corpUniqNum: "1798102225",
          companyName: "올웨이즈(레브잇)",
        },
        {
          corpUniqNum: "8458601667",
          companyName: "트웰브랩스",
        },
        {
          corpUniqNum: "1068706394",
          companyName: "뤼이드",
        },
        {
          corpUniqNum: "4578100277",
          companyName: "클래스101",
        },
      ],
    };
  }

  /**
   * 혁신의숲 스타트업 개요 조회
   *
   * 혁신의숲(innoforest)은 다양한 스타트업의 성장 데이터를 제공하는 플랫폼입니다.
   *
   * @summary 혁신의숲 스타트업 개요 조회
   */
  @TypedRoute.Post("seed/party/s1/getcorp")
  async getcorp(
    @TypedBody() input: IInnoforest.IGetcorpInput,
  ): Promise<IInnoforest.IGetcorpOutput> {
    return this.innoforestProvider.getcorp(input);
  }

  /**
   * 혁신의숲 스타트업 개요-재무요약 조회
   *
   * 혁신의숲(innoforest)은 다양한 스타트업의 성장 데이터를 제공하는 플랫폼입니다.
   *
   * @summary 혁신의숲 스타트업 개요-재무요약 조회
   */
  @TypedRoute.Post("seed/party/s1/getcorpfinance")
  async getcorpfinance(
    @TypedBody() input: IInnoforest.IGetcorpfinanceInput,
  ): Promise<IInnoforest.IGetcorpfinanceOutput> {
    return this.innoforestProvider.getcorpfinance(input);
  }

  /**
   * 혁신의숲 스타트업 개요-투자요약 조회
   *
   * 혁신의숲(innoforest)은 다양한 스타트업의 성장 데이터를 제공하는 플랫폼입니다.
   *
   * @summary 혁신의숲 스타트업 개요-투자요약 조회
   */
  @TypedRoute.Post("seed/party/s1/getcorpinvest")
  async getcorpinvest(
    @TypedBody() input: IInnoforest.IGetcorpinvestInput,
  ): Promise<IInnoforest.IGetcorpinvestOutput> {
    return this.innoforestProvider.getcorpinvest(input);
  }

  /**
   * 혁신의숲 스타트업 개요-일반요약 조회
   *
   * 혁신의숲(innoforest)은 다양한 스타트업의 성장 데이터를 제공하는 플랫폼입니다.
   *
   * @summary 혁신의숲 스타트업 개요-일반요약 조회
   */
  @TypedRoute.Post("seed/party/s1/getcorpcommon")
  async getcorpcommon(
    @TypedBody() input: IInnoforest.IGetcorpcommonInput,
  ): Promise<IInnoforest.IGetcorpcommonOutput> {
    return this.innoforestProvider.getcorpcommon(input);
  }

  /**
   * 혁신의숲 서비스 조회
   *
   * 혁신의숲(innoforest)은 다양한 스타트업의 성장 데이터를 제공하는 플랫폼입니다.
   *
   * @summary 혁신의숲 서비스 조회
   */
  @TypedRoute.Post("seed/party/s1/findproduct")
  async findproduct(
    @TypedBody() input: IInnoforest.IFindproductInput,
  ): Promise<IInnoforest.IFindproductOutput> {
    return this.innoforestProvider.findproduct(input);
  }

  /**
   * 혁신의숲 트래픽 조회
   *
   * 혁신의숲(innoforest)은 다양한 스타트업의 성장 데이터를 제공하는 플랫폼입니다.
   *
   * @summary 혁신의숲 트래픽 조회
   */
  @TypedRoute.Post("seed/party/s1/findtraffic")
  async findtraffic(
    @TypedBody() input: IInnoforest.IFindtrafficInput,
  ): Promise<IInnoforest.IFindtrafficOutput> {
    return this.innoforestProvider.findtraffic(input);
  }

  /**
   * 혁신의숲 소비자거래-거래액, 거래건수 조회
   *
   * 혁신의숲(innoforest)은 다양한 스타트업의 성장 데이터를 제공하는 플랫폼입니다.
   *
   * @summary 혁신의숲 소비자거래-거래액, 거래건수 조회
   */
  @TypedRoute.Post("seed/party/s1/findsales")
  async findsales(
    @TypedBody() input: IInnoforest.IFindsalesInput,
  ): Promise<IInnoforest.IFindsalesOutput> {
    return this.innoforestProvider.findsales(input);
  }

  /**
   * 혁신의숲 소비자거래-재구매율 조회
   *
   * 혁신의숲(innoforest)은 다양한 스타트업의 성장 데이터를 제공하는 플랫폼입니다.
   *
   * @summary 혁신의숲 소비자거래-재구매율 조회
   */
  @TypedRoute.Post("seed/party/s1/findsalesrebuy")
  async findsalesrebuy(
    @TypedBody() input: IInnoforest.IFindsalesrebuyInput,
  ): Promise<IInnoforest.IFindsalesrebuyOutput> {
    return this.innoforestProvider.findsalesrebuy(input);
  }

  /**
   * 혁신의숲 소비자거래-평균구매횟수 조회
   *
   * 혁신의숲(innoforest)은 다양한 스타트업의 성장 데이터를 제공하는 플랫폼입니다.
   *
   * @summary 혁신의숲 소비자거래-평균구매횟수 조회
   */
  @TypedRoute.Post("seed/party/s1/findsalesavgbuy")
  async findsalesavgbuy(
    @TypedBody() input: IInnoforest.IFindsalesavgbuyInput,
  ): Promise<IInnoforest.IFindsalesavgbuyOutput> {
    return this.innoforestProvider.findsalesavgbuy(input);
  }

  /**
   * 혁신의숲 소비자유형-성별, 연령 조회
   *
   * 혁신의숲(innoforest)은 다양한 스타트업의 성장 데이터를 제공하는 플랫폼입니다.
   *
   * @summary 혁신의숲 소비자유형-성별, 연령 조회
   */
  @TypedRoute.Post("seed/party/s1/findsalesperson")
  async findsalesperson(
    @TypedBody() input: IInnoforest.IFindsalespersonInput,
  ): Promise<IInnoforest.IFindsalespersonOutput> {
    return this.innoforestProvider.findsalesperson(input);
  }

  /**
   * 혁신의숲 소비자유형-가족구성 조회
   *
   * 혁신의숲(innoforest)은 다양한 스타트업의 성장 데이터를 제공하는 플랫폼입니다.
   *
   * @summary 혁신의숲 소비자유형-가족구성 조회
   */
  @TypedRoute.Post("seed/party/s1/findsaleshousehold")
  async findsaleshousehold(
    @TypedBody() input: IInnoforest.IFindsaleshouseholdInput,
  ): Promise<IInnoforest.IFindsaleshouseholdOutput> {
    return this.innoforestProvider.findsaleshousehold(input);
  }

  /**
   * 혁신의숲 소비자유형-소득수준 조회
   *
   * 혁신의숲(innoforest)은 다양한 스타트업의 성장 데이터를 제공하는 플랫폼입니다.
   *
   * @summary 혁신의숲 소비자유형-소득수준 조회
   */
  @TypedRoute.Post("seed/party/s1/findsalesincome")
  async findsalesincome(
    @TypedBody() input: IInnoforest.IFindsalesincomeInput,
  ): Promise<IInnoforest.IFindsalesincomeOutput> {
    return this.innoforestProvider.findsalesincome(input);
  }

  /**
   * 혁신의숲 투자유치이력 조회
   *
   * 혁신의숲(innoforest)은 다양한 스타트업의 성장 데이터를 제공하는 플랫폼입니다.
   *
   * @summary 혁신의숲 투자유치이력 조회
   */
  @TypedRoute.Post("seed/party/s1/findinvest")
  async findinvest(
    @TypedBody() input: IInnoforest.IFindinvestInput,
  ): Promise<IInnoforest.IFindinvestOutput> {
    return this.innoforestProvider.findinvest(input);
  }

  /**
   * 혁신의숲 특허이력 조회
   *
   * 혁신의숲(innoforest)은 다양한 스타트업의 성장 데이터를 제공하는 플랫폼입니다.
   *
   * @summary 혁신의숲 특허이력 조회
   */
  @TypedRoute.Post("seed/party/s1/findpatent")
  async findpatent(
    @TypedBody() input: IInnoforest.IFindpatentInput,
  ): Promise<IInnoforest.IFindpatentOutput> {
    return this.innoforestProvider.findpatent(input);
  }

  /**
   * 혁신의숲 특허키워드 조회
   *
   * 혁신의숲(innoforest)은 다양한 스타트업의 성장 데이터를 제공하는 플랫폼입니다.
   *
   * @summary 혁신의숲 특허키워드 조회
   */
  @TypedRoute.Post("seed/party/s1/findpatentword")
  async findpatentword(
    @TypedBody() input: IInnoforest.IFindpatentwordInput,
  ): Promise<IInnoforest.IFindpatentwordOutput> {
    return this.innoforestProvider.findpatentword(input);
  }

  /**
   * 혁신의숲 손익재무 조회
   *
   * 혁신의숲(innoforest)은 다양한 스타트업의 성장 데이터를 제공하는 플랫폼입니다.
   *
   * @summary 혁신의숲 손익재무 조회
   */
  @TypedRoute.Post("seed/party/s1/findfinance")
  async findfinance(
    @TypedBody() input: IInnoforest.IFindfinanceInput,
  ): Promise<IInnoforest.IFindfinanceOutput> {
    return this.innoforestProvider.findfinance(input);
  }

  /**
   * 혁신의숲 고용 조회
   *
   * 혁신의숲(innoforest)은 다양한 스타트업의 성장 데이터를 제공하는 플랫폼입니다.
   *
   * @summary 혁신의숲 고용 조회
   */
  @TypedRoute.Post("seed/party/s1/findemployee")
  async findemployee(
    @TypedBody() input: IInnoforest.IFindemployeeInput,
  ): Promise<IInnoforest.IFindemployeeOutput> {
    return this.innoforestProvider.findemployee(input);
  }

  /**
   * 혁신의숲 보도자료 조회
   *
   * 혁신의숲(innoforest)은 다양한 스타트업의 성장 데이터를 제공하는 플랫폼입니다.
   *
   * @summary 혁신의숲 보도자료 조회
   */
  @TypedRoute.Post("seed/party/s1/findpress")
  async findpress(
    @TypedBody() input: IInnoforest.IFindpressInput,
  ): Promise<IInnoforest.IFindpressOutput> {
    return this.innoforestProvider.findpress(input);
  }
}
