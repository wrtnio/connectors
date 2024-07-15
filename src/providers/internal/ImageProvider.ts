import { IImage } from "@wrtn/connector-api/lib/structures/internal/IImage";
import axios from "axios";
import sharp from "sharp";

export namespace ImageProvider {
  export async function getImageFile(imageUrl: string) {
    const { data } = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const image = sharp(data);

    const metadata = await image.metadata();

    const size: IImage.Size = {
      left: 0,
      top: 0,
      width: metadata.width ?? 0,
      height: metadata.height ?? 0,
    };

    return { image, size };
  }

  export function getSize(
    orignal: IImage.Size,
    ratio: 1.91 | 1 | 0.8,
  ): IImage.Size {
    let maxWidth: number;
    let maxHeight: number;

    if (orignal.width / orignal.height > ratio) {
      // 원본 사각형이 비율보다 더 넓을 때, 높이를 기준으로 최대 너비 계산
      maxHeight = orignal.height;
      maxWidth = Math.round(orignal.height * ratio);
    } else {
      // 원본 사각형이 비율보다 더 좁을 때, 너비를 기준으로 최대 높이 계산
      maxWidth = orignal.width;
      maxHeight = Math.round(orignal.width / ratio);
    }

    return {
      top: Math.round((orignal.height - maxHeight) / 2),
      left: Math.round((orignal.width - maxWidth) / 2),
      width: maxWidth,
      height: maxHeight,
    };
  }
}
