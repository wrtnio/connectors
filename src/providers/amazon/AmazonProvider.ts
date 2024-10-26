import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IAmazon } from '../../api/structures/amazon/IAmazon';

@Injectable()
export class AmazonProvider {
  async getProduct(input: IAmazon.IGetProductInput): Promise<IAmazon.IGetProductOutput> {
    const response = await axios.get(`https://api.amazon.com/products/${input.productId}`);
    return response.data;
  }
}