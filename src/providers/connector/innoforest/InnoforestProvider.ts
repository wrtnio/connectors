import { Injectable } from "@nestjs/common";
import { IInnoforest } from "@wrtn/connector-api/lib/structures/connector/innoforest/IInnoforest";

@Injectable()
export class InnoforestProvider {
  async getcorp(
    input: IInnoforest.IGetcorpInput,
  ): Promise<IInnoforest.IGetcorpOutput> {
    return 1 as any;
  }

  async getcorpfinance(
    input: IInnoforest.IGetcorpfinanceInput,
  ): Promise<IInnoforest.IGetcorpfinanceOutput> {
    return 1 as any;
  }

  async getcorpinvest(
    input: IInnoforest.IGetcorpinvestInput,
  ): Promise<IInnoforest.IGetcorpinvestOutput> {
    return 1 as any;
  }

  async getcorpcommon(
    input: IInnoforest.IGetcorpcommonInput,
  ): Promise<IInnoforest.IGetcorpcommonOutput> {
    return 1 as any;
  }

  async findproduct(
    input: IInnoforest.IFindproductInput,
  ): Promise<IInnoforest.IFindproductOutput> {
    return 1 as any;
  }

  async findtraffic(
    input: IInnoforest.IFindtrafficInput,
  ): Promise<IInnoforest.IFindtrafficOutput> {
    return 1 as any;
  }

  async findsales(
    input: IInnoforest.IFindsalesInput,
  ): Promise<IInnoforest.IFindsalesOutput> {
    return 1 as any;
  }

  async findsalesrebuy(
    input: IInnoforest.IFindsalesrebuyInput,
  ): Promise<IInnoforest.IFindsalesrebuyOutput> {
    return 1 as any;
  }

  async findsalesavgbuy(
    input: IInnoforest.IFindsalesavgbuyInput,
  ): Promise<IInnoforest.IFindsalesavgbuyOutput> {
    return 1 as any;
  }

  async findsalesperson(
    input: IInnoforest.IFindsalespersonInput,
  ): Promise<IInnoforest.IFindsalespersonOutput> {
    return 1 as any;
  }

  async findsaleshousehold(
    input: IInnoforest.IFindsaleshouseholdInput,
  ): Promise<IInnoforest.IFindsaleshouseholdOutput> {
    return 1 as any;
  }

  async findsalesincome(
    input: IInnoforest.IFindsalesincomeInput,
  ): Promise<IInnoforest.IFindsalesincomeOutput> {
    return 1 as any;
  }

  async findinvest(
    input: IInnoforest.IFindinvestInput,
  ): Promise<IInnoforest.IFindinvestOutput> {
    return 1 as any;
  }

  async findpatent(
    input: IInnoforest.IFindpatentInput,
  ): Promise<IInnoforest.IFindpatentOutput> {
    return 1 as any;
  }

  async findpatentword(
    input: IInnoforest.IFindpatentwordInput,
  ): Promise<IInnoforest.IFindpatentwordOutput> {
    return 1 as any;
  }

  async findfinance(
    input: IInnoforest.IFindfinanceInput,
  ): Promise<IInnoforest.IFindfinanceOutput> {
    return 1 as any;
  }

  async findemployee(
    input: IInnoforest.IFindemployeeInput,
  ): Promise<IInnoforest.IFindemployeeOutput> {
    return 1 as any;
  }

  async findpress(
    input: IInnoforest.IFindpressInput,
  ): Promise<IInnoforest.IFindpressOutput> {
    return 1 as any;
  }
}
