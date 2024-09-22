export namespace IYouTubeCaption {
    export interface Input {
        videoId: string;
        lang: string;
    }

    export interface Caption {
        start: string;
        dur: string;
        text: string;
    }

    export interface Output {
        captions: Caption[];
    }
}
