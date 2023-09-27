import { defineConfig, splitVendorChunkPlugin } from "vite";
import liveReload from "vite-plugin-live-reload";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		liveReload([
			// using this for our example:
			__dirname + "/../pages/*.php",
		]),
		splitVendorChunkPlugin(),
	],

	// config
	root: "../",
	base: process.env.APP_ENV === "development" ? "/" : "/dist/",

	build: {
		// output dir for production build
		outDir: "public/dist",
		emptyOutDir: true,

		// emit manifest so PHP can find the hashed files
		manifest: true,

		// our entry
		rollupOptions: {
			input: path.resolve(__dirname, "../../js/main.js"),
		},
	},

	server: {
		// we need a strict port to match on PHP side
		// change freely, but update on PHP to match the same port
		// tip: choose a different port per project to run them at the same time
		strictPort: true,
		port: 5133,
	},
});