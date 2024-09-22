import { Controller, Post, Body } from '@nestjs/common';
import { YouTubeCaptionService } from '../../providers/youtube/YouTubeCaptionService';
import { IYouTubeCaption } from '../../api/structures/youtube/IYouTubeCaption';

@Controller('youtube/captions')
export class YouTubeCaptionController {
    constructor(private readonly youtubeCaptionService: YouTubeCaptionService) {}

    @Post('get')
    async getCaption(@Body() input: IYouTubeCaption.Input): Promise<IYouTubeCaption.Output> {
        return this.youtubeCaptionService.getCaption(input);
    }
}
