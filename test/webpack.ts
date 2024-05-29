import { DynamicExecutor } from "@nestia/e2e";
import cp from "child_process";
import { sleep_for } from "tstl";

import { ConnectorConfiguration } from "../src/ConnectorConfiguration";
import api from "../src/api";

const main = async (): Promise<void> => {
  // OPEN BUNDLED SERVER
  const backend = cp.fork(`${ConnectorConfiguration.ROOT}/dist/server.js`, {
    cwd: `${ConnectorConfiguration.ROOT}/dist`,
  });
  await sleep_for(2_500);

  // DO TEST
  const connection: api.IConnection = {
    host: `http://127.0.0.1:${ConnectorConfiguration.API_PORT()}`,
  };
  const report: DynamicExecutor.IReport = await DynamicExecutor.validate({
    prefix: "test",
    parameters: () => [
      {
        host: connection.host,
        encryption: connection.encryption,
      },
    ],
  })(__dirname + "/features");

  backend.kill();

  const failures: DynamicExecutor.IReport.IExecution[] =
    report.executions.filter((exec) => exec.error !== null);
  if (failures.length === 0) {
    console.log("Success");
    console.log("Elapsed time", report.time.toLocaleString(), `ms`);
  } else {
    for (const f of failures) console.log(f.error);
    process.exit(-1);
  }
};
main().catch((exp) => {
  console.log(exp);
  process.exit(-1);
});
