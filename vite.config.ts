import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const [githubOwner, githubRepo] = (process.env.GITHUB_REPOSITORY ?? "").split("/");
const isGitHubUserSite = githubRepo === `${githubOwner}.github.io`;

export default defineConfig({
  base: process.env.GITHUB_ACTIONS === "true" && githubRepo && !isGitHubUserSite ? `/${githubRepo}/` : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        about: fileURLToPath(new URL("./about.html", import.meta.url)),
      },
    },
  },
});
