import fromMarkdown from "mdast-util-from-markdown";

function parseMarkdown(markdown: string) {
  fromMarkdown.fromMarkdown(markdown);
}

console.log(
  JSON.stringify(
    parseMarkdown(`## 삼성전자 추가 분석
### 최근 뉴스 및 시장 동향
1. **[Samsung Electronics Announces Results for Second Quarter of 2024](https://news.samsung.com/global/samsung-electronics-announces-results-for-second-quarter-of-2024)**
   - 삼성전자는 2024년 2분기 실적을 발표했습니다. 회사는 74.07조 원의 통합 매출을 기록했습니다.

2. **[Samsung Electronics Co., Ltd. (005930.KS) Stock Quote](https://finance.yahoo.com/quote/005930.KS/)**
   - 삼성전자 주식의 최신 정보, 주가, 뉴스 등을 제공합니다.
     - 삼성전자 주식의 최신 정보란?`),
    null,
    2,
  ),
);
