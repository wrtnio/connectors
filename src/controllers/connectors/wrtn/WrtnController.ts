import { Controller } from '@nestjs/common';
import { WrtnProvider } from '../../providers/wrtn/WrtnProvider';
import { IWrtn } from '../../api/structures/wrtn/IWrtn';

@Controller()
export class WrtnController {
  constructor(private readonly wrtnProvider: WrtnProvider) {}

  /**
   * 데이터 분석을 위한 Wrtn API 호출
   *
   * Wrtn 서비스에서 데이터를 가져와 분석합니다.
   *
   * @summary Wrtn 데이터 분석
   */
  @core.TypedRoute.Post("analyze-data")
  async analyzeData(
    @TypedBody() input: IWrtn.IAnalyzeDataInput,
  ): Promise<IWrtn.IAnalyzeDataOutput> {
    return this.wrtnProvider.analyzeData(input);
  }
}
