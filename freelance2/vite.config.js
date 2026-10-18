import { defineConfig } from "vite";

const ollamaProxy = {
	target: "http://127.0.0.1:11434",
	changeOrigin: true,
	rewrite: (path) => path.replace(/^\/ollama/, ""),
};

// The research API (agentic-freelance-advisor, FastAPI). A run takes minutes and streams progress events, so the
// proxy must not time out or buffer: no timeout is set, and the API sends a keep-alive line every 15 seconds.
const advisorProxy = {
	target: "http://127.0.0.1:8000",
	changeOrigin: true,
	rewrite: (path) => path.replace(/^\/advisor/, ""),
};

export default defineConfig({
	publicDir: "cerebro/_next/static/media",
	server: {
		host: "0.0.0.0",
		port: 8766,
		strictPort: true,
		proxy: {
			"/ollama": ollamaProxy,
			"/advisor": advisorProxy,
		},
	},
	preview: {
		proxy: {
			"/ollama": ollamaProxy,
			"/advisor": advisorProxy,
		},
	},
});
