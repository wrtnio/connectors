import UnpluginTypia from "@ryoppippi/unplugin-typia/vite";
import { defineConfig } from "vitest/config";
import { name } from "./package.json";

export default defineConfig({
  plugins: [
    UnpluginTypia({
      /* options */
    }), // should be placed before other plugins like `react`, `svetle`, etc.
  ],
  test: {
    name,
    coverage: {
      provider: "istanbul",
      include: ["src/**/*"],
    },
  },
});
