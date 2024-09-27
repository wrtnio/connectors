import typia from "typia";

import CApi from "@wrtn/connector-api";
import { IDallE3 } from "@wrtn/connector-api/lib/structures/connector/dall_e_3/IDallE3";

export const test_api_connector_dall_e_3 = async (
  connection: CApi.IConnection,
) => {
  const requestBody: IDallE3.IRequest = {
    prompt: `You are a marketing copywriter, given the task of writing a marketing copy.
You are given the marketing purpose, the distribution channel and the reference content, from which you should use the keyword to generate the marketing copy.
The marketing purpose is the following: {
  purpose: 'visit',
  product_name: 'Studio Pro',
  unique_selling_point: [ 'auto-generate workflows powered by AI' ],
  user_benefit: [
    'no-code automation',
    'one-click deployment',
    'rich third-party integrations ready to use',
    'store and share your workflows',
    'use pre-built workflows',
    'use other workflows as building blocks from the community',
    'workflow marketplace to sell your workflows',
    'automatically generate workflows from your data',
    'run your workflows on a schedule',
    'free to use',
    'no credit card required'
  ]
}
The distribution channel is the following: 'instagram_feed'
The keyword is the following: { keyword: 'Easily Automate Business Tasks – No-Code Automation Course' }
The reference content (content from which the keyword was extracted) is the following: {
  contents: 'Learn how to effectively use automation to streamline your business tasks. From mastering lead management with tools like ...',
  image: 'https://i.ytimg.com/vi/5kJv254sebQ/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBz-zX0cI7T_nUdImU7G89wmrAY_w',
  statistics: { view_count: 97656 },
  title: 'Easily Automate Business Tasks – No-Code Automation Course',
  type: 'video',
  source: 'youtube',
  url: 'https://www.youtube.com/watch?v=5kJv254sebQ'
}
Unless specified by the user, always create the marketing copy in Korean.
I REPEAT: unless the user said otherwise, always use Korean.
Generate the marketing copy.`,
    image_ratio: "square",
  };
  const output =
    await CApi.functional.connector.dall_e_3.generate.generateImage(
      connection,
      requestBody,
    );
  typia.assert<IDallE3.IResponse>(output);
};
