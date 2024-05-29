import typia from "typia";

import CApi from "@wrtn/connector-api/lib/index";
import { IMarketingCopyGenerator } from "@wrtn/connector-api/lib/structures/connector/marketing/IMarketingCopyGenerator";

/**
 * Do not run in `npm run test` since actual calls to OpenAI are made and they are expensive and slow
 */
export async function test_api_marketing_copy_image(
  connection: CApi.IConnection,
): Promise<IMarketingCopyGenerator.IGenerateMarketingCopyImageOutput> {
  const result =
    await CApi.functional.connector.marketing_copy.generate_copy_image.generateCopyImage(
      connection,
      {
        copy: {
          title: "비즈니스 작업을 쉽게 자동화하세요 - Studio Pro로 가능합니다!",
          cta: "지금 바로 Studio Pro를 무료로 체험해보세요!",
          subtitle:
            "AI가 지원하는 워크플로우 자동 생성 기능을 통해 코딩 없이도 비즈니스 작업을 자동화할 수 있습니다. 한 번의 클릭으로 배포하고, 다양한 서드파티 통합을 즉시 사용해보세요. 워크플로우를 저장하고 공유하며, 사전 구축된 워크플로우를 사용하거나 커뮤니티에서 다른 워크플로우 를 빌딩 블록으로 사용할 수 있습니다. 워크플로우 마켓플레이스에서 워크플로우를 판매하고, 데이터에서 자동으로 워크플로우를 생성하며, 일정에 따라 워크플로우를 실행하세요. 신용카드 없이 무료로 사용해보세요.",
        },
        keyword: {
          keyword: "Easily Automate Business Tasks – No-Code Automation Course",
        },
        marketingPurpose: {
          purpose: "visit",
          product_name: "Studio Pro",
          unique_selling_point: ["auto-generate workflows powered by AI"],
          user_benefit: [
            "no-code automation",
            "one-click deployment",
            "rich third-party integrations ready to use",
            "store and share your workflows",
            "use pre-built workflows",
            "use other workflows as building blocks from the community",
            "workflow marketplace to sell your workflows",
            "automatically generate workflows from your data",
            "run your workflows on a schedule",
            "free to use",
            "no credit card required",
          ],
        },
        distributionChannel: {
          channel: "instagram_feed",
          components: ["title", "cta", "subtitle"],
        },
        referenceContent: {
          contents:
            "Learn how to effectively use automation to streamline your business tasks. From mastering lead management with tools like ...",
          image:
            "https://i.ytimg.com/vi/5kJv254sebQ/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBz-zX0cI7T_nUdImU7G89wmrAY_w",
          statistics: { view_count: 97656 },
          title: "Easily Automate Business Tasks – No-Code Automation Course",
          type: "video",
          source: "youtube",
          url: "https://www.youtube.com/watch?v=5kJv254sebQ",
        },
      },
    );
  typia.assert(result);
  return result;
}
