export namespace IImage {
  export interface Size {
    /**
     * @title 이미지 crop의 시작점이 되는 x축 좌푯값
     */
    left: number;

    /**
     * @title 이미지 crop의 시작점이 되는 y축 좌푯값
     */
    top: number;

    /**
     * @title 원본으로부터 잘라낸 후의 너비
     */
    width: number;

    /**
     * @title 원본으로부터 잘라낸 후의 높이
     */
    height: number;
  }
}
