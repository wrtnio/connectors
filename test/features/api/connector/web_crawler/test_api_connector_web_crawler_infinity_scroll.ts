import puppeteer, { Browser, Page } from "puppeteer";
import { Queue } from "queue-typescript";

// types.ts
export interface CrawlerConfig {
  maxConcurrency: number;
  rateLimit: number;
  respectRobotsTxt: boolean;
  userAgent: string;
  timeout: number;
  retries: number;
}

export interface CrawlJob {
  url: string;
  retries: number;
  createdAt: Date;
}

export interface PageConfig {
  selectors: Record<string, string>;
  paginationType: "infinite-scroll" | "button-click" | "url-params";
  waitForSelectors?: string[];
  customScripts?: string[];
}

// queue.ts

export class QueueManager {
  private readonly queue: Queue<CrawlJob>;
  private processing: Set<string>;
  private readonly maxConcurrency: number;
  private readonly maxRetries: number;

  constructor(maxConcurrency: number, maxRetries: number = 3) {
    this.queue = new Queue<CrawlJob>();
    this.processing = new Set<string>();
    this.maxConcurrency = maxConcurrency;
    this.maxRetries = maxRetries;
  }

  async addUrl(url: string): Promise<void> {
    const job: CrawlJob = {
      url,
      retries: 0,
      createdAt: new Date(),
    };
    this.queue.enqueue(job);
  }

  async getNext(): Promise<CrawlJob | null> {
    if (
      this.processing.size >= this.maxConcurrency ||
      this.queue.length === 0
    ) {
      return null;
    }

    const job = this.queue.dequeue();
    this.processing.add(job.url);
    return job;
  }

  markComplete(url: string): void {
    this.processing.delete(url);
  }

  async retry(url: string): Promise<void> {
    const job = Array.from(this.processing).find((u) => u === url);
    if (job) {
      const retryJob: CrawlJob = {
        url,
        retries: this.getRetryCount(url) + 1,
        createdAt: new Date(),
      };

      if (retryJob.retries < this.maxRetries) {
        this.queue.enqueue(retryJob);
      }
      this.processing.delete(url);
    }
  }

  private getRetryCount(url: string): number {
    const jobs = Array.from(this.queue);
    const job = jobs.find((j) => j.url === url);
    return job?.retries || 0;
  }

  isEmpty(): boolean {
    return this.queue.length === 0 && this.processing.size === 0;
  }
}
export class Crawler {
  private browser: Browser | null = null;
  private config: CrawlerConfig;
  private queueManager: QueueManager;

  constructor(config: CrawlerConfig) {
    this.config = config;
    this.queueManager = new QueueManager(config.maxConcurrency, config.retries);
  }

  async init(): Promise<void> {
    this.browser = await puppeteer.launch({
      headless: true,
    });
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  async addUrl(url: string): Promise<void> {
    if (this.config.respectRobotsTxt) {
      const allowed = await this.checkRobotsTxt(url);
      if (!allowed) {
        console.log(`URL ${url} is not allowed by robots.txt`);
        return;
      }
    }
    await this.queueManager.addUrl(url);
  }

  async start(pageConfig: PageConfig): Promise<void> {
    if (!this.browser) {
      throw new Error("Browser not initialized. Call init() first.");
    }

    while (!this.queueManager.isEmpty()) {
      const job = await this.queueManager.getNext();
      if (!job) {
        await new Promise((resolve) =>
          setTimeout(resolve, this.config.rateLimit),
        );
        continue;
      }

      try {
        const data = await this.crawlPage(job, pageConfig);
        console.log(`Successfully crawled ${job.url}:`, data);
        this.queueManager.markComplete(job.url);
        await new Promise((resolve) =>
          setTimeout(resolve, this.config.rateLimit),
        );
      } catch (error) {
        console.error(`Error crawling ${job.url}:`, error);
        await this.queueManager.retry(job.url);
      }
    }
  }

  private async crawlPage(job: CrawlJob, pageConfig: PageConfig): Promise<any> {
    if (!this.browser) throw new Error("Browser not initialized");

    const page = await this.browser.newPage();
    await page.setUserAgent(this.config.userAgent);

    try {
      await page.goto(job.url, {
        waitUntil: "networkidle0",
        timeout: this.config.timeout,
      });

      if (pageConfig.waitForSelectors) {
        await Promise.all(
          pageConfig.waitForSelectors.map((selector: any) =>
            page.waitForSelector(selector, { timeout: this.config.timeout }),
          ),
        );
      }

      if (pageConfig.paginationType === "infinite-scroll") {
        await this.handleInfiniteScroll(page);
      }

      const data = await this.extractData(page, pageConfig.selectors);
      return data;
    } finally {
      await page.close();
    }
  }

  private async handleInfiniteScroll(page: Page): Promise<void> {
    await page.evaluate(async () => {
      await new Promise<void>((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
  }

  private async extractData(
    page: Page,
    selectors: Record<string, string>,
  ): Promise<Record<string, any>> {
    const data: Record<string, any> = {};

    for (const [key, selector] of Object.entries(selectors)) {
      try {
        if (selector.includes("@attr:")) {
          // Extract attribute value
          const [sel, attr] = selector.split("@attr:");
          data[key] = await page.$eval(
            sel,
            (el, attribute) => el.getAttribute(attribute),
            attr,
          );
        } else if (selector.includes("@html")) {
          // Extract innerHTML
          data[key] = await page.$eval(
            selector.replace("@html", ""),
            (el) => el.innerHTML,
          );
        } else {
          // Extract text content
          data[key] = await page.$eval(selector, (el) =>
            el.textContent?.trim(),
          );
        }
      } catch (error) {
        console.warn(`Failed to extract ${key} using selector ${selector}`);
        data[key] = null;
      }
    }

    return data;
  }

  private async checkRobotsTxt(url: string): Promise<boolean> {
    // 간단한 robots.txt 체크 구현
    // 실제 구현에서는 더 정교한 파싱이 필요할 수 있습니다
    try {
      const urlObj = new URL(url);
      const robotsTxtUrl = `${urlObj.protocol}//${urlObj.hostname}/robots.txt`;

      const page = await this.browser?.newPage();
      if (!page) return true;

      try {
        await page.goto(robotsTxtUrl, { waitUntil: "networkidle0" });
        const content = await page.content();

        // 매우 기본적인 체크만 수행
        const userAgentSection = content.includes("User-agent: *");
        const disallowed = content.includes("Disallow: " + urlObj.pathname);

        return !userAgentSection || !disallowed;
      } finally {
        await page.close();
      }
    } catch (error) {
      console.warn("Failed to check robots.txt:", error);
      return true;
    }
  }
}

// usage-example.ts
async function main() {
  const config: CrawlerConfig = {
    maxConcurrency: 3,
    rateLimit: 1000,
    respectRobotsTxt: true,
    userAgent: "CustomCrawler/1.0",
    timeout: 30000,
    retries: 3,
  };

  const pageConfig: PageConfig = {
    selectors: {
      title: "h1.title",
      content: "div.content",
      author: "span.author@attr:data-author",
      publishDate: "time.published",
      image: "img.main-image@attr:src",
    },
    paginationType: "infinite-scroll",
  };

  const crawler = new Crawler(config);

  try {
    await crawler.init();
    await crawler.addUrl("https://www.capterra.com/p/186596/Notion/reviews/");
    await crawler.start(pageConfig);
  } finally {
    await crawler.close();
  }
}

export const test_api_connector_web_crawler_infinity_scroll = async () => {
  await main();
};
