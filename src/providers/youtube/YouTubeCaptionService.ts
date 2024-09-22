import { Injectable } from '@nestjs/common';
import { IYouTubeCaption } from '../../api/structures/youtube/IYouTubeCaption';
import axios from 'axios';

@Injectable()
export class YouTubeCaptionService {
    async getCaption(input: IYouTubeCaption.Input): Promise<IYouTubeCaption.Output> {
        const response = await axios.get(`https://www.youtube.com/api/timedtext?v=${input.videoId}&lang=${input.lang}`);
        
        // XML 문자열을 파싱하여 DOM 객체로 변환
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "application/xml");
        
        const textElements = xmlDoc.getElementsByTagName('text');
        const captions = Array.from(textElements).map((element) => {
            const start = element.getAttribute('start');
            const dur = element.getAttribute('dur');
            const text = element.textContent;

            if (typeof start !== 'string' || typeof dur !== 'string' || typeof text !== 'string') {
                throw new Error('Invalid caption data format');
            }

            return {
                start,
                dur,
                text
            };
        });

        return { captions };
    }
}
