import { TypedBody, TypedRoute } from "@nestia/core";
import { Controller } from "@nestjs/common";
import { IInnoforest } from "@wrtn/connector-api/lib/structures/connector/innoforest/IInnoforest";
import { SelectBenchmark } from "@wrtnio/decorators";
import { InnoforestProvider } from "../../../providers/connector/innoforest/InnoforestProvider";

@Controller("connector/innoforest")
export class InnoforestController {
  constructor(private readonly innoforestProvider: InnoforestProvider) {}

  /**
   * Retrieve all company data from Innoforest
   *
   * Innoforest is a platform providing growth data of various startups.
   * This endpoint consolidates data provided by other connectors from Innoforest into a single response.
   * If the user requests a large amount of information, using this connector is advantageous.
   * This includes the following properties:
   *
   * - corp, corpfinance, corpinvest, corpcommon, product, traffic, sales, salesrebuy, salesavgbuy, salesperson, saleshousehold, salesincome, invest, patent, patentword, finance, employee, press
   *
   * @summary Retrieve all company data from Innoforest
   */
  @SelectBenchmark("혁신의숲에서 회사 정보 좀 찾아줘")
  @SelectBenchmark("혁신의숲에서 스타트업 정보 좀 찾아줘")
  @SelectBenchmark("혁신의숲에서 회사 투자 라운드 좀 알려줘")
  @SelectBenchmark("혁신의숲에서 회사 정보 좀 찾아줘")
  @TypedRoute.Patch("unify")
  async unify(
    @TypedBody() input: IInnoforest.IUnifyInput,
  ): Promise<IInnoforest.IUnifyOutput> {
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
   * Search for company identifiers from Innoforest
   *
   * Innoforest is a platform providing growth data of various startups.
   * It's recommended to use `POST /connector/innoforest/unify` to provide all information to users at once.
   *
   * Retrieve the identifiers of companies currently available for query in Innoforest, which can be used for further searches.
   *
   * - Bucketplace (Today's House): 1198691245
   * - Always (Revbit): 1798102225
   * - Twelve Labs: 8458601667
   * - Riiid: 1068706394
   * - CLASS101: 4578100277
   *
   * @summary Search for company identifiers from Innoforest
   */
  @TypedRoute.Patch("search")
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
   * Retrieve startup overview from Innoforest
   *
   * Innoforest is a platform providing growth data of various startups.
   * It's recommended to use `POST /connector/innoforest/unify` to provide all information to users at once.
   *
   * @summary Retrieve startup overview from Innoforest
   */
  @TypedRoute.Patch("seed/party/s1/getcorp")
  async getcorp(
    @TypedBody() input: IInnoforest.IGetcorpInput,
  ): Promise<IInnoforest.IGetcorpOutput> {
    return this.innoforestProvider.getcorp(input);
  }

  /**
   * Retrieve startup overview - financial summary from Innoforest
   *
   * Innoforest is a platform providing growth data of various startups.
   * It's recommended to use `POST /connector/innoforest/unify` to provide all information to users at once.
   *
   * @summary Retrieve startup overview - financial summary from Innoforest
   */
  @TypedRoute.Patch("seed/party/s1/getcorpfinance")
  async getcorpfinance(
    @TypedBody() input: IInnoforest.IGetcorpfinanceInput,
  ): Promise<IInnoforest.IGetcorpfinanceOutput> {
    return this.innoforestProvider.getcorpfinance(input);
  }

  /**
   * Retrieve startup overview - investment summary from Innoforest
   *
   * Innoforest is a platform providing growth data of various startups.
   * It's recommended to use `POST /connector/innoforest/unify` to provide all information to users at once.
   *
   * @summary Retrieve startup overview - investment summary from Innoforest
   */
  @TypedRoute.Post("seed/party/s1/getcorpinvest")
  async getcorpinvest(
    @TypedBody() input: IInnoforest.IGetcorpinvestInput,
  ): Promise<IInnoforest.IGetcorpinvestOutput> {
    return this.innoforestProvider.getcorpinvest(input);
  }

  /**
   * Retrieve startup overview - general summary from Innoforest
   *
   * Innoforest is a platform providing growth data of various startups.
   * It's recommended to use `POST /connector/innoforest/unify` to provide all information to users at once.
   *
   * @summary Retrieve startup overview - general summary from Innoforest
   */
  @TypedRoute.Patch("seed/party/s1/getcorpcommon")
  async getcorpcommon(
    @TypedBody() input: IInnoforest.IGetcorpcommonInput,
  ): Promise<IInnoforest.IGetcorpcommonOutput> {
    return this.innoforestProvider.getcorpcommon(input);
  }

  /**
   * Retrieve product information from Innoforest
   *
   * Innoforest is a platform providing growth data of various startups.
   * It's recommended to use `POST /connector/innoforest/unify` to provide all information to users at once.
   *
   * @summary Retrieve product information from Innoforest
   */
  @TypedRoute.Patch("seed/party/s1/findproduct")
  async findproduct(
    @TypedBody() input: IInnoforest.IFindproductInput,
  ): Promise<IInnoforest.IFindproductOutput> {
    return this.innoforestProvider.findproduct(input);
  }

  /**
   * Retrieve traffic data from Innoforest
   *
   * Innoforest is a platform providing growth data of various startups.
   * It's recommended to use `POST /connector/innoforest/unify` to provide all information to users at once.
   *
   * @summary Retrieve traffic data from Innoforest
   */
  @TypedRoute.Patch("seed/party/s1/findtraffic")
  async findtraffic(
    @TypedBody() input: IInnoforest.IFindtrafficInput,
  ): Promise<IInnoforest.IFindtrafficOutput> {
    return this.innoforestProvider.findtraffic(input);
  }

  /**
   * Retrieve sales data from Innoforest
   *
   * Innoforest is a platform providing growth data of various startups.
   * It's recommended to use `POST /connector/innoforest/unify` to provide all information to users at once.
   *
   * @summary Retrieve sales data from Innoforest
   */
  @TypedRoute.Patch("seed/party/s1/findsales")
  async findsales(
    @TypedBody() input: IInnoforest.IFindsalesInput,
  ): Promise<IInnoforest.IFindsalesOutput> {
    return this.innoforestProvider.findsales(input);
  }

  /**
   * Retrieve repeat purchase rate data from Innoforest
   *
   * Innoforest is a platform providing growth data of various startups.
   * It's recommended to use `POST /connector/innoforest/unify` to provide all information to users at once.
   *
   * @summary Retrieve repeat purchase rate data from Innoforest
   */
  @TypedRoute.Patch("seed/party/s1/findsalesrebuy")
  async findsalesrebuy(
    @TypedBody() input: IInnoforest.IFindsalesrebuyInput,
  ): Promise<IInnoforest.IFindsalesrebuyOutput> {
    return this.innoforestProvider.findsalesrebuy(input);
  }

  /**
   * Retrieve average purchase amount data from Innoforest
   *
   * Innoforest is a platform providing growth data of various startups.
   * It's recommended to use `POST /connector/innoforest/unify` to provide all information to users at once.
   *
   * @summary Retrieve average purchase amount data from Innoforest
   */
  @TypedRoute.Patch("seed/party/s1/findsalesavgbuy")
  async findsalesavgbuy(
    @TypedBody() input: IInnoforest.IFindsalesavgbuyInput,
  ): Promise<IInnoforest.IFindsalesavgbuyOutput> {
    return this.innoforestProvider.findsalesavgbuy(input);
  }

  /**
   * Retrieve sales-related personnel data from Innoforest
   *
   * Innoforest is a platform providing growth data of various startups.
   * It's recommended to use `POST /connector/innoforest/unify` to provide all information to users at once.
   *
   * @summary Retrieve sales-related personnel data from Innoforest
   */
  @TypedRoute.Patch("seed/party/s1/findsalesperson")
  async findsalesperson(
    @TypedBody() input: IInnoforest.IFindsalespersonInput,
  ): Promise<IInnoforest.IFindsalespersonOutput> {
    return this.innoforestProvider.findsalesperson(input);
  }

  /**
   * Retrieve household-related sales data from Innoforest
   *
   * Innoforest is a platform providing growth data of various startups.
   * It's recommended to use `POST /connector/innoforest/unify` to provide all information to users at once.
   *
   * @summary Retrieve household-related sales data from Innoforest
   */
  @TypedRoute.Patch("seed/party/s1/findsaleshousehold")
  async findsaleshousehold(
    @TypedBody() input: IInnoforest.IFindsaleshouseholdInput,
  ): Promise<IInnoforest.IFindsaleshouseholdOutput> {
    return this.innoforestProvider.findsaleshousehold(input);
  }

  /**
   * Retrieve income-related sales data from Innoforest
   *
   * Innoforest is a platform providing growth data of various startups.
   * It's recommended to use `POST /connector/innoforest/unify` to provide all information to users at once.
   *
   * @summary Retrieve income-related sales data from Innoforest
   */
  @TypedRoute.Patch("seed/party/s1/findsalesincome")
  async findsalesincome(
    @TypedBody() input: IInnoforest.IFindsalesincomeInput,
  ): Promise<IInnoforest.IFindsalesincomeOutput> {
    return this.innoforestProvider.findsalesincome(input);
  }

  /**
   * Retrieve investment data from Innoforest
   *
   * Innoforest is a platform providing growth data of various startups.
   * It's recommended to use `POST /connector/innoforest/unify` to provide all information to users at once.
   *
   * @summary Retrieve investment data from Innoforest
   */
  @TypedRoute.Patch("seed/party/s1/findinvest")
  async findinvest(
    @TypedBody() input: IInnoforest.IFindinvestInput,
  ): Promise<IInnoforest.IFindinvestOutput> {
    return this.innoforestProvider.findinvest(input);
  }

  /**
   * Retrieve patent data from Innoforest
   *
   * Innoforest is a platform providing growth data of various startups.
   * It's recommended to use `POST /connector/innoforest/unify` to provide all information to users at once.
   *
   * @summary Retrieve patent data from Innoforest
   */
  @TypedRoute.Patch("seed/party/s1/findpatent")
  async findpatent(
    @TypedBody() input: IInnoforest.IFindpatentInput,
  ): Promise<IInnoforest.IFindpatentOutput> {
    return this.innoforestProvider.findpatent(input);
  }

  /**
   * Retrieve patent keyword data from Innoforest
   *
   * Innoforest is a platform providing growth data of various startups.
   * It's recommended to use `POST /connector/innoforest/unify` to provide all information to users at once.
   *
   * @summary Retrieve patent keyword data from Innoforest
   */
  @TypedRoute.Patch("seed/party/s1/findpatentword")
  async findpatentword(
    @TypedBody() input: IInnoforest.IFindpatentwordInput,
  ): Promise<IInnoforest.IFindpatentwordOutput> {
    return this.innoforestProvider.findpatentword(input);
  }

  /**
   * Retrieve financial data from Innoforest
   *
   * Innoforest is a platform providing growth data of various startups.
   * It's recommended to use `POST /connector/innoforest/unify` to provide all information to users at once.
   *
   * @summary Retrieve financial data from Innoforest
   */
  @TypedRoute.Patch("seed/party/s1/findfinance")
  async findfinance(
    @TypedBody() input: IInnoforest.IFindfinanceInput,
  ): Promise<IInnoforest.IFindfinanceOutput> {
    return this.innoforestProvider.findfinance(input);
  }

  /**
   * Retrieve employee data from Innoforest
   *
   * Innoforest is a platform providing growth data of various startups.
   * It's recommended to use `POST /connector/innoforest/unify` to provide all information to users at once.
   *
   * @summary Retrieve employee data from Innoforest
   */
  @TypedRoute.Patch("seed/party/s1/findemployee")
  async findemployee(
    @TypedBody() input: IInnoforest.IFindemployeeInput,
  ): Promise<IInnoforest.IFindemployeeOutput> {
    return this.innoforestProvider.findemployee(input);
  }

  /**
   * Retrieve press-related data from Innoforest
   *
   * Innoforest is a platform providing growth data of various startups.
   * It's recommended to use `POST /connector/innoforest/unify` to provide all information to users at once.
   *
   * @summary Retrieve press-related data from Innoforest
   */
  @TypedRoute.Patch("seed/party/s1/findpress")
  async findpress(
    @TypedBody() input: IInnoforest.IFindpressInput,
  ): Promise<IInnoforest.IFindpressOutput> {
    return this.innoforestProvider.findpress(input);
  }
}
