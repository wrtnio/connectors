import express from "express";
import { Server } from "http";

import { ConnectorConfiguration } from "../../src/ConnectorConfiguration";
import { ConnectorGlobal } from "../../src/ConnectorGlobal";

export class FakeS3Server {
  private constructor(private readonly server: Server) {}

  public static async open(): Promise<FakeS3Server> {
    const server: Server = await new Promise((resolve, reject) => {
      const app = express();
      app.use(express.static(`${ConnectorConfiguration.ROOT}/assets/s3`));

      const server = app.listen(Number(ConnectorGlobal.env.FAKE_S3_PORT));
      server.on("listening", () => resolve(server));
      server.on("error", (err) => reject(err));
    });
    return new FakeS3Server(server);
  }

  public async close(): Promise<void> {
    return new Promise((resolve, reject) =>
      this.server.close((err) => {
        if (err) reject(err);
        else resolve();
      }),
    );
  }
}
