import CApi from "@wrtn/connector-api/lib/index";
import { IJira } from "@wrtn/connector-api/lib/structures/connector/jira/IJira";
import typia from "typia";
import { ConnectorGlobal } from "../../../../../src/ConnectorGlobal";
import { markdownToJiraBlock } from "../../../../../src/utils/markdownToJiraBlock";

const Configuration = {
  email: "studio@wrtn.io",
  token: ConnectorGlobal.env.JIRA_TEST_SECRET,
  domain: "https://wrtn-ecosystem.atlassian.net",
} as const;

export const test_api_connector_jira_create_table_issue_by_markdown = async (
  connection: CApi.IConnection,
) => {
  const markdown = `
| 제목 1 | 제목 2 | 제목 3 |
|--------|--------|--------|
| 데이터 1 | 데이터 2 | 데이터 3 |
| 데이터 4 | 데이터 5 | 데이터 6 |
`;

  const blocks = markdownToJiraBlock(markdown);
  typia.assert<(IJira.TopLevelBlockNode | IJira.TableNode)[]>(blocks);

  const res =
    await CApi.functional.connector.jira.issues.markdown.createIssueByMarkdown(
      connection,
      {
        secretKey: JSON.stringify(Configuration),
        fields: {
          summary: "TEST",
          project: { key: "KAK" },
          issuetype: { id: "10005" },

          description: {
            type: "doc",
            version: 1,
            content: markdown,
          },
        },
      },
    );

  typia.assert(res);
};

export const test_api_connector_jira_create_issue_by_markdown = async (
  connection: CApi.IConnection,
) => {
  const markdown = `
# Jira Issue: Refactor User Authentication Module (NestJS)

---

## Issue Summary  
The user authentication module needs refactoring to improve performance and security. The current implementation lacks proper dependency injection for the JWT service and doesn't adhere to clean architecture principles.

---

## Acceptance Criteria
1. Refactor authentication service to follow NestJS's dependency injection patterns.
2. Ensure JWT secret is securely managed and stored in environment variables.
3. Write unit tests to cover edge cases.
4. Performance benchmarks must show a 20% improvement in request processing time.

---

## Technical Details

**NestJS Version**: \`v9.1.0\`  
**TypeScript Version**: \`v5.2.2\`

**Reference Links**:  
- [NestJS Official Documentation](https://docs.nestjs.com)
- [JWT Documentation](https://github.com/auth0/node-jsonwebtoken)
- [Best Practices for Dependency Injection](https://docs.nestjs.com/fundamentals/dependency-injection)

---

## Steps to Reproduce  
1. Clone the repo.
2. Checkout the \`develop\` branch.
3. Install dependencies:  
  \`\`\`bash
  npm install
  \`\`\`
4. Run the app
  \`\`\`
  npm run start:dev
  \`\`\`
  
# Code Example
\`\`\`typescript
import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
\`\`\`

# Checklist
- [ ] Dependency injection follows best practices.
- [ ] JWT secret is securely stored in .env.
- [ ] Unit tests added for all functions.
- [ ] Performance benchmarks achieved.

## Assignee  
![Developer Profile](https://avatars.githubusercontent.com/u/55487286?v=4)

`;

  const blocks = markdownToJiraBlock(markdown);
  typia.assert<(IJira.TopLevelBlockNode | IJira.TableNode)[]>(blocks);

  const res =
    await CApi.functional.connector.jira.issues.markdown.createIssueByMarkdown(
      connection,
      {
        secretKey: JSON.stringify(Configuration),
        fields: {
          summary: "TEST",
          project: { key: "KAK" },
          issuetype: { id: "10005" },

          description: {
            type: "doc",
            version: 1,
            content: markdown,
          },
        },
      },
    );

  typia.assert(res);
};

// 실패 케이스 검증
export const test_api_connector_jira_create_issue_fail_case_1 = async (
  connection: CApi.IConnection,
) => {
  const content =
    "This is a detailed description of the issue in markdown format.";
  const res =
    await CApi.functional.connector.jira.issues.markdown.createIssueByMarkdown(
      connection,
      {
        secretKey: JSON.stringify(Configuration),
        fields: {
          description: { content, type: "doc", version: 1 },
          issuetype: { id: "10005" },
          priority: { id: "3" },
          project: { id: "10001" },
          summary: "New Issue Summary",
        },
      },
    );

  typia.assert(res);
};

export const test_api_connector_jira_create_issue_fail_case_2 = async (
  connection: CApi.IConnection,
) => {
  const content =
    "This is a detailed description of the issue in markdown format.";
  const res =
    await CApi.functional.connector.jira.issues.markdown.createIssueByMarkdown(
      connection,
      {
        secretKey: JSON.stringify(Configuration),
        fields: {
          description: { content, type: "doc", version: 1 },
          issuetype: { id: "10005" },
          priority: { id: "2" },
          project: { id: "10001" },
          summary: "New Issue Summary",
        },
      },
    );

  typia.assert(res);
};
