import { Controller, Post } from "@nestjs/common";

@Controller('connector/tiktok')
export class TikTokController {
    @Post('video/upload')
    async uploadVideo() {
        // Logic to upload video to TikTok
    }

    @Post('video/details')
    async getVideoDetails() {
        // Logic to get video details from TikTok
    }
}
