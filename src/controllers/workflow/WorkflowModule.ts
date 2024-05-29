import { Module } from "@nestjs/common";

import { WorkflowProvider } from "../../providers/workflow/WorkflowProvider";
import { WorkflowStateManager } from "../../utils/WorkflowStateManager";
import { WorkflowController } from "./WorkflowController";

@Module({
  providers: [
    // TODO: hierarchy is a awkward but move on for now
    WorkflowStateManager,
    WorkflowProvider,
  ],
  controllers: [WorkflowController],
})
export class WorkflowModule {}
