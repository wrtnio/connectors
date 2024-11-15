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
  async getcorp(@TypedBody() input: IInnoforest.GetcorpInput) {
    return this.innoforestProvider.getcorp();
  }

  /**
   * @summary 스타트업 개요-재무요약
   */
  @TypedRoute.Post("seed/party/s1/getcorpfinance")
  async getcorpfinance(@TypedBody() input: IInnoforest.GetcorpfinanceInput) {
    return this.innoforestProvider.getcorpfinance();
  }

  /**
   * @summary 스타트업 개요-투자요약
   */
  @TypedRoute.Post("seed/party/s1/getcorpinvest")
  async getcorpinvest(@TypedBody() input: IInnoforest.GetcorpinvestInput) {
    return this.innoforestProvider.getcorpinvest();
  }

  /**
   * @summary 스타트업 개요-일반요약
   */
  @TypedRoute.Post("seed/party/s1/getcorpcommon")
  async getcorpcommon(@TypedBody() input: IInnoforest.GetcorpcommonInput) {
    return this.innoforestProvider.getcorpcommon();
  }

  /**
   * @summary 서비스
   */
  @TypedRoute.Post("seed/party/s1/findproduct")
  async findproduct(@TypedBody() input: IInnoforest.FindproductInput) {
    return this.innoforestProvider.findproduct();
  }

  /**
   * @summary 트래픽
   */
  @TypedRoute.Post("seed/party/s1/findtraffic")
  async findtraffic(@TypedBody() input: IInnoforest.FindtrafficInput) {
    return this.innoforestProvider.findtraffic();
  }

  /**
   * @summary 소비자거래-거래액, 거래건수
   */
  @TypedRoute.Post("seed/party/s1/findsales")
  async findsales(@TypedBody() input: IInnoforest.FindsalesInput) {
    return this.innoforestProvider.findsales();
  }

  /**
   * @summary 소비자거래-재구매율
   */
  @TypedRoute.Post("seed/party/s1/findsalesrebuy")
  async findsalesrebuy(@TypedBody() input: IInnoforest.FindsalesrebuyInput) {
    return this.innoforestProvider.findsalesrebuy();
  }

  /**
   * @summary 소비자거래-평균구매횟수
   */
  @TypedRoute.Post("seed/party/s1/findsalesavgbuy")
  async findsalesavgbuy(@TypedBody() input: IInnoforest.FindsalesavgbuyInput) {
    return this.innoforestProvider.findsalesavgbuy();
  }

  /**
   * @summary 소비자유형-성별, 연령
   */
  @TypedRoute.Post("seed/party/s1/findsalesperson")
  async findsalesperson(@TypedBody() input: IInnoforest.FindsalespersonInput) {
    return this.innoforestProvider.findsalesperson();
  }

  /**
   * @summary 소비자유형-가족구성
   */
  @TypedRoute.Post("seed/party/s1/findsaleshousehold")
  async findsaleshousehold(
    @TypedBody() input: IInnoforest.FindsaleshouseholdInput,
  ) {
    return this.innoforestProvider.findsaleshousehold();
  }

  /**
   * @summary 소비자유형-소득수준
   */
  @TypedRoute.Post("seed/party/s1/findsalesincome")
  async findsalesincome(@TypedBody() input: IInnoforest.FindsalesincomeInput) {
    return this.innoforestProvider.findsalesincome();
  }

  /**
   * @summary 투자유치이력
   */
  @TypedRoute.Post("seed/party/s1/findinvest")
  async findinvest(@TypedBody() input: IInnoforest.FindinvestInput) {
    return this.innoforestProvider.findinvest();
  }

  /**
   * @summary 특허이력
   */
  @TypedRoute.Post("seed/party/s1/findpatent")
  async findpatent(@TypedBody() input: IInnoforest.FindpatentInput) {
    return this.innoforestProvider.findpatent();
  }

  /**
   * @summary 특허키워드
   */
  @TypedRoute.Post("seed/party/s1/findpatentword")
  async findpatentword(@TypedBody() input: IInnoforest.FindpatentwordInput) {
    return this.innoforestProvider.findpatentword();
  }

  /**
   * @summary 손익재무
   */
  @TypedRoute.Post("seed/party/s1/findfinance")
  async findfinance(@TypedBody() input: IInnoforest.FindfinanceInput) {
    return this.innoforestProvider.findfinance();
  }

  /**
   * @summary 고용
   */
  @TypedRoute.Post("seed/party/s1/findemployee")
  async findemployee(@TypedBody() input: IInnoforest.FindemployeeInput) {
    return this.innoforestProvider.findemployee();
  }

  /**
   * @summary 보도자료
   */
  @TypedRoute.Post("seed/party/s1/findpress")
  async findpress(@TypedBody() input: IInnoforest.FindpressInput) {
    return this.innoforestProvider.findpress();
  }
}
