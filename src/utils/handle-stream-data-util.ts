/**
 * JSON data인지 판단
 */
function isJson(str: string) {
  if (typeof str !== "string") return false;

  try {
    const obj = JSON.parse(str);
    if (typeof obj === "string") return false;

    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Chunk 데이터 파싱
 */
function parseChunk(chunk: any): string[] {
  return chunk
    .toString()
    .split("\n")
    .filter((line: string) => line.trim() !== "");
}

/**
 * 스트리밍 데이터 변환 처리
 */
export function getStreamHandler(
  callback: (result: string) => void,
  callback2?: (results: string[]) => void,
): (data: any) => void {
  let lostContent = "";
  return (data: any) => {
    /**
     * chunk 데이터를 줄 단위로 파싱
     */
    const lines = parseChunk(data);

    const resultLines: string[] = [];
    lines.forEach((line: string) => {
      const message = line.replace("\r", "").replace(/^data: /, "");
      // 메시지가 잘려서 전송되는 문제 해결
      if (isJson(message)) {
        // 정상적인 메시지
        callback(message);
        resultLines.push(message);
      } else {
        lostContent += message;
        if (isJson(lostContent)) {
          // 잘려진 메시지
          callback(lostContent);
          resultLines.push(lostContent);
          lostContent = "";
        }
      }
    });

    if (callback2) {
      callback2(resultLines);
    }
  };
}

/**
 * JSON Object로 Parsing
 */
export function getJsonObject<T extends { [key: string]: any }>(
  str: any,
): T | null {
  if (typeof str !== "string") return null;

  try {
    const obj = JSON.parse(str);
    if (typeof obj === "string") return null;

    return obj;
  } catch (err) {
    return null;
  }
}
