import { Controller } from '@nestjs/common';
import { AmazonProvider } from '../../providers/amazon/AmazonProvider';
import { IAmazon } from '../../api/structures/amazon/IAmazon';

@Controller()
export class AmazonController {
  constructor(private readonly amazonProvider: AmazonProvider) {}

  @core.TypedRoute.Post('get-product')
  async getProduct(@TypedBody() input: IAmazon.IGetProductInput): Promise<IAmazon.IGetProductOutput> {
    return this.amazonProvider.getProduct(input);
  }
}
