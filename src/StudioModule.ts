import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";

import { pinoLoggerParams } from "./common/logger/logger";
import { HealthCheckController } from "./controllers/HealthCheckController";
import { ConnectorModule } from "./controllers/connector/ConnectorModule";
import { SwaggerModule } from "./controllers/swagger/SwaggerModule";
import { WorkflowModule } from "./controllers/workflow/WorkflowModule";

@Module({
  imports: [
    WorkflowModule,
    ConnectorModule,
    LoggerModule.forRoot({ ...pinoLoggerParams }),
    SwaggerModule,
  ],
  controllers: [HealthCheckController],
})
export class StudioModule {}
