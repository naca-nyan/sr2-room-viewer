import { defineConfig } from "vite";
import deno from "@deno/vite-plugin";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vite.dev/config/
export default defineConfig({
  base: "/sr2-room-viewer/",
  plugins: [deno(), svelte()],
});
