import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Test } from "@nestjs/testing";
import { Logger } from "nestjs-pino";

import { ConnectorConfiguration } from "./ConnectorConfiguration";
import { StudioModule } from "./StudioModule";
import { HttpExceptionFilter } from "./common/filters/all-exceptions.filter";
import { LoggingInterceptor } from "./common/interceptors/logging.interceptor";
import {
  IMAGE_OPEN_AI_INJECT_IDENTIFIER,
  OPEN_AI_INJECT_IDENTIFIER,
} from "./providers/open_ai/constants";

export class ConnectorBackend {
  private application_?: INestApplication;

  public async open({ openAIMock }: { openAIMock?: any } = {}): Promise<void> {
    //----
    // OPEN THE BACKEND SERVER
    //----
    // MOUNT CONTROLLERS
    if (!!openAIMock) {
      const moduleRef = await Test.createTestingModule({
        imports: [StudioModule],
      })
        .overrideProvider(OPEN_AI_INJECT_IDENTIFIER)
        .useValue(openAIMock)
        .overrideProvider(IMAGE_OPEN_AI_INJECT_IDENTIFIER)
        .useValue(openAIMock)
        .compile();
      // NOTE:
      //   currently not sure how different application created through testing module is from the one created via normal flow
      //   (haven't found any difference yet but beware.. )
      //   so use separate flows for testing
      this.application_ = moduleRef.createNestApplication();
    } else {
      this.application_ = await NestFactory.create(
        StudioModule,
        //{ logger: false },
        { bufferLogs: true },
      );
    }
    this.application_.enableCors();

    if (!openAIMock) {
      // minimal setup for logging errors for easier development
      // TODO: will need to control what gets logged later
      // https://docs.nestjs.com/exception-filters#inheritance
      this.application_.useGlobalFilters(new HttpExceptionFilter());
      this.application_.useLogger(this.application_.get(Logger));
      this.application_.useGlobalInterceptors(
        new LoggingInterceptor(this.application_.get(Logger)),
      );
    }

    // DO OPEN
    await this.application_.listen(
      ConnectorConfiguration.API_PORT(),
      "0.0.0.0",
    );

    //----
    // POST-PROCESSES
    //----
    // INFORM TO THE PM2
    if (process.send) process.send("ready");

    // WHEN KILL COMMAND COMES
    process.on("SIGINT", async () => {
      await this.close();
      process.exit(0);
    });
  }

  public async close(): Promise<void> {
    if (this.application_ === undefined) return;

    // DO CLOSE
    await this.application_.close();
    delete this.application_;
  }
}
