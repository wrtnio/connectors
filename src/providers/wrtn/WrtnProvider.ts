import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IWrtn } from '../../api/structures/wrtn/IWrtn';

@Injectable()
export class WrtnProvider {
  async analyzeData(input: IWrtn.IAnalyzeDataInput): Promise<IWrtn.IAnalyzeDataOutput> {
    // Wrtn API와 통신하여 데이터 분석 수행
    const res = await axios.post('https://api.wrtn.io/analyze', input);
    return res.data;
  }
}
