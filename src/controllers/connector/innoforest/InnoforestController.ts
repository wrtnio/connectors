import { TypedBody, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { IInnoforest } from "@wrtn/connector-api/lib/structures/connector/innoforest/IInnoforest";
import { InnoforestProvider } from "../../../providers/connector/innoforest/InnoforestProvider";

@Controller("connector/innoforest")
export class InnoforestController {
  constructor(private readonly innoforestProvider: InnoforestProvider) {}

  /**
   * @summary 스타트업 개요
   */
  @TypedRoute.Post("seed/party/s1/getcorp")
  async getcorp(
    @TypedBody() input: IInnoforest.IGetcorpInput,
  ): Promise<IInnoforest.IGetcorpOutput> {
    return this.innoforestProvider.getcorp(input);
  }

  /**
   * @summary 스타트업 개요-재무요약
   */
  @TypedRoute.Post("seed/party/s1/getcorpfinance")
  async getcorpfinance(
    @TypedBody() input: IInnoforest.IGetcorpfinanceInput,
  ): Promise<IInnoforest.IGetcorpfinanceOutput> {
    return this.innoforestProvider.getcorpfinance(input);
  }

  /**
   * @summary 스타트업 개요-투자요약
   */
  @TypedRoute.Post("seed/party/s1/getcorpinvest")
  async getcorpinvest(
    @TypedBody() input: IInnoforest.IGetcorpinvestInput,
  ): Promise<IInnoforest.IGetcorpinvestOutput> {
    return this.innoforestProvider.getcorpinvest(input);
  }

  /**
   * @summary 스타트업 개요-일반요약
   */
  @TypedRoute.Post("seed/party/s1/getcorpcommon")
  async getcorpcommon(
    @TypedBody() input: IInnoforest.IGetcorpcommonInput,
  ): Promise<IInnoforest.IGetcorpcommonOutput> {
    return this.innoforestProvider.getcorpcommon(input);
  }

  /**
   * @summary 서비스
   */
  @TypedRoute.Post("seed/party/s1/findproduct")
  async findproduct(
    @TypedBody() input: IInnoforest.IFindproductInput,
  ): Promise<IInnoforest.IFindproductOutput> {
    return this.innoforestProvider.findproduct(input);
  }

  /**
   * @summary 트래픽
   */
  @TypedRoute.Post("seed/party/s1/findtraffic")
  async findtraffic(
    @TypedBody() input: IInnoforest.IFindtrafficInput,
  ): Promise<IInnoforest.IFindtrafficOutput> {
    return this.innoforestProvider.findtraffic(input);
  }

  /**
   * @summary 소비자거래-거래액, 거래건수
   */
  @TypedRoute.Post("seed/party/s1/findsales")
  async findsales(
    @TypedBody() input: IInnoforest.IFindsalesInput,
  ): Promise<IInnoforest.IFindsalesOutput> {
    return this.innoforestProvider.findsales(input);
  }

  /**
   * @summary 소비자거래-재구매율
   */
  @TypedRoute.Post("seed/party/s1/findsalesrebuy")
  async findsalesrebuy(
    @TypedBody() input: IInnoforest.IFindsalesrebuyInput,
  ): Promise<IInnoforest.IFindsalesrebuyOutput> {
    return this.innoforestProvider.findsalesrebuy(input);
  }

  /**
   * @summary 소비자거래-평균구매횟수
   */
  @TypedRoute.Post("seed/party/s1/findsalesavgbuy")
  async findsalesavgbuy(
    @TypedBody() input: IInnoforest.IFindsalesavgbuyInput,
  ): Promise<IInnoforest.IFindsalesavgbuyOutput> {
    return this.innoforestProvider.findsalesavgbuy(input);
  }

  /**
   * @summary 소비자유형-성별, 연령
   */
  @TypedRoute.Post("seed/party/s1/findsalesperson")
  async findsalesperson(
    @TypedBody() input: IInnoforest.IFindsalespersonInput,
  ): Promise<IInnoforest.IFindsalespersonOutput> {
    return this.innoforestProvider.findsalesperson(input);
  }

  /**
   * @summary 소비자유형-가족구성
   */
  @TypedRoute.Post("seed/party/s1/findsaleshousehold")
  async findsaleshousehold(
    @TypedBody() input: IInnoforest.IFindsaleshouseholdInput,
  ): Promise<IInnoforest.IFindsaleshouseholdOutput> {
    return this.innoforestProvider.findsaleshousehold(input);
  }

  /**
   * @summary 소비자유형-소득수준
   */
  @TypedRoute.Post("seed/party/s1/findsalesincome")
  async findsalesincome(
    @TypedBody() input: IInnoforest.IFindsalesincomeInput,
  ): Promise<IInnoforest.IFindsalesincomeOutput> {
    return this.innoforestProvider.findsalesincome(input);
  }

  /**
   * @summary 투자유치이력
   */
  @TypedRoute.Post("seed/party/s1/findinvest")
  async findinvest(
    @TypedBody() input: IInnoforest.IFindinvestInput,
  ): Promise<IInnoforest.IFindinvestOutput> {
    return this.innoforestProvider.findinvest(input);
  }

  /**
   * @summary 특허이력
   */
  @TypedRoute.Post("seed/party/s1/findpatent")
  async findpatent(
    @TypedBody() input: IInnoforest.IFindpatentInput,
  ): Promise<IInnoforest.IFindpatentOutput> {
    return this.innoforestProvider.findpatent(input);
  }

  /**
   * @summary 특허키워드
   */
  @TypedRoute.Post("seed/party/s1/findpatentword")
  async findpatentword(
    @TypedBody() input: IInnoforest.IFindpatentwordInput,
  ): Promise<IInnoforest.IFindpatentwordOutput> {
    return this.innoforestProvider.findpatentword(input);
  }

  /**
   * @summary 손익재무
   */
  @TypedRoute.Post("seed/party/s1/findfinance")
  async findfinance(
    @TypedBody() input: IInnoforest.IFindfinanceInput,
  ): Promise<IInnoforest.IFindfinanceOutput> {
    return this.innoforestProvider.findfinance(input);
  }

  /**
   * @summary 고용
   */
  @TypedRoute.Post("seed/party/s1/findemployee")
  async findemployee(
    @TypedBody() input: IInnoforest.IFindemployeeInput,
  ): Promise<IInnoforest.IFindemployeeOutput> {
    return this.innoforestProvider.findemployee(input);
  }

  /**
   * @summary 보도자료
   */
  @TypedRoute.Post("seed/party/s1/findpress")
  async findpress(
    @TypedBody() input: IInnoforest.IFindpressInput,
  ): Promise<IInnoforest.IFindpressOutput> {
    return this.innoforestProvider.findpress(input);
  }
}
