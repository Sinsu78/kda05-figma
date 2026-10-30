import react from "@vitejs/plugin-react";
import { existsSync } from "node:fs";
import type { IncomingMessage } from "node:http";
import path from "node:path";
import { defineConfig, loadEnv, type Plugin } from "vite";

/**
 * 로컬 개발용: `npm run dev`에서도 api/ 폴더의 서버 함수를 실행한다.
 * (배포 환경에서는 Vercel이 api/*.ts 를 서버리스 함수로 직접 실행하므로 이 플러그인은 쓰이지 않음)
 */
const vercelApiDev = (): Plugin => ({
  name: "vercel-api-dev",
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      const match = req.url?.match(/^\/api\/([\w-]+)(?:\?.*)?$/);
      if (!match) return next();
      const file = path.resolve(process.cwd(), "api", `${match[1]}.ts`);
      if (!existsSync(file)) return next();

      // Vercel처럼 JSON 본문을 req.body에 넣어 준다
      const chunks: Buffer[] = [];
      for await (const chunk of req) chunks.push(chunk as Buffer);
      const raw = Buffer.concat(chunks).toString("utf8");
      (req as IncomingMessage & { body?: unknown }).body = raw || undefined;

      try {
        const mod = await server.ssrLoadModule(file);
        await mod.default(req, res);
      } catch (error) {
        console.error(error);
        res.statusCode = 500;
        res.end(JSON.stringify({ ok: false, message: "dev 서버 함수 오류" }));
      }
    });
  },
});

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // .env.local 의 SUPABASE_URL 같은 "VITE_ 없는" 값을 서버 함수(process.env)에서 읽을 수 있게 한다.
  // 이 값들은 브라우저 번들에는 들어가지 않는다 (Vite는 VITE_ 로 시작하는 값만 브라우저에 넣음).
  for (const [key, value] of Object.entries(loadEnv(mode, process.cwd(), ""))) {
    process.env[key] ??= value;
  }

  return {
    plugins: [react(), vercelApiDev()],
    base: "./",
  };
});
