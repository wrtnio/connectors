import { deepStrictEqual } from "assert";
import { ImageProvider } from "../../../../../src/providers/internal/ImageProvider";

/**
 * 정방형 이미지의 가로형으로의 편집
 */
export const test_api_connector_google_ads_get_size_1_1 = async () => {
  const response = ImageProvider.getSize(
    {
      left: 0,
      top: 0,
      x: 600,
      y: 600,
    },
    1.91,
  );

  deepStrictEqual(response, { left: 0, top: 143, x: 600, y: 314 });
};

/**
 * 정방형 이미지를 정방형으로 편집하는 경우
 */
export const test_api_connector_google_ads_get_size_1_2 = async () => {
  const response = ImageProvider.getSize(
    {
      left: 0,
      top: 0,
      x: 600,
      y: 600,
    },
    1,
  );

  deepStrictEqual(response, { left: 0, top: 0, x: 600, y: 600 });
};

/**
 * 정방형 이미지를 세로형으로 편집하는 경우
 */
export const test_api_connector_google_ads_get_size_1_3 = async () => {
  const response = ImageProvider.getSize(
    {
      left: 0,
      top: 0,
      x: 600,
      y: 600,
    },
    0.8,
  );

  deepStrictEqual(response, { left: 60, top: 0, x: 480, y: 600 });
};

/**
 * 세로형 이미지의 가로형으로의 편집
 */
export const test_api_connector_google_ads_get_size_2_1 = async () => {
  const response = ImageProvider.getSize(
    {
      left: 0,
      top: 0,
      x: 600,
      y: 800,
    },
    1.91,
  );

  deepStrictEqual(response, { left: 0, top: 243, x: 600, y: 314 });
};

/**
 * 세로형 이미지를 정방형으로 편집하는 경우
 */
export const test_api_connector_google_ads_get_size_2_2 = async () => {
  const response = ImageProvider.getSize(
    {
      left: 0,
      top: 0,
      x: 600,
      y: 800,
    },
    1,
  );

  deepStrictEqual(response, { left: 0, top: 100, x: 600, y: 600 });
};

/**
 * 세로형 이미지를 세로형으로 편집하는 경우
 */
export const test_api_connector_google_ads_get_size_2_3 = async () => {
  const response = ImageProvider.getSize(
    {
      left: 0,
      top: 0,
      x: 600,
      y: 800,
    },
    0.8,
  );

  deepStrictEqual(response, { left: 0, top: 25, x: 600, y: 750 });
};

/**
 * 가로형 이미지의 가로형으로의 편집
 */
export const test_api_connector_google_ads_get_size_3_1 = async () => {
  const response = ImageProvider.getSize(
    {
      left: 0,
      top: 0,
      x: 800,
      y: 600,
    },
    1.91,
  );

  deepStrictEqual(response, { left: 0, top: 91, x: 800, y: 419 });
};

/**
 * 가로형 이미지를 정방형으로 편집하는 경우
 */
export const test_api_connector_google_ads_get_size_3_2 = async () => {
  const response = ImageProvider.getSize(
    {
      left: 0,
      top: 0,
      x: 800,
      y: 600,
    },
    1,
  );

  deepStrictEqual(response, { left: 100, top: 0, x: 600, y: 600 });
};

/**
 * 가로형 이미지를 세로형으로 편집하는 경우
 */
export const test_api_connector_google_ads_get_size_3_3 = async () => {
  const response = ImageProvider.getSize(
    {
      left: 0,
      top: 0,
      x: 800,
      y: 600,
    },
    0.8,
  );

  deepStrictEqual(response, { left: 160, top: 0, x: 480, y: 600 });
};
