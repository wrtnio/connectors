/**
 * Serp Api search query generator
 * @param andKeywords 반드시 들어가야 하는 키워드
 * @param orKeywords  포함되면 좋은 키워드
 * @param notKeywords 포함되면 안되는 키워드
 */
export function makeQuery(
  andKeywords: string[],
  orKeywords: string[],
  notKeywords: string[],
) {
  let query: string = "";

  // 반드시 들어가야 하는 키워드 처리
  if (andKeywords && andKeywords.length > 0) {
    query += "(" + andKeywords.join(" AND ") + ")";
  }

  // 포함되면 좋은 키워드 처리
  if (orKeywords && orKeywords.length > 0) {
    if (query !== "") query += " OR ";
    query += "(" + orKeywords.join(" OR ") + ")";
  }

  // 포함되면 안되는 키워드 처리
  if (notKeywords && notKeywords.length > 0) {
    notKeywords.forEach((keyword) => {
      query += " -" + keyword;
    });
  }

  return `${query}`;
}
