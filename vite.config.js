import { defineConfig } from "vite";
import { resolve } from "path";
import vituum from 'vituum'
import handlebars from '@vituum/vite-plugin-handlebars'
export default defineConfig({
	base: "./",
	assetsInclude: ['../images/**/*'],
	plugins: [
		vituum({
			dir:'pages',
			normalizeBasePath:true
		}),
		handlebars({
			"partials":{
				directory:"partials",
				extname:false
			},
			"formats":['hbs','html'],
		})/*
		handlebars({
			partialDirectory: resolve(__dirname, "public/partials"),
		}),*/
	],
	build: {
        rollupOptions: {
            input: ['src/pages/*.html','src/pages/*.hbs']
        }
    }
});
