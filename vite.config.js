import { defineConfig } from "vite";
import { imageOptimizer } from './.vite/imageOptimizer.js';
import handlebars from '@vituum/vite-plugin-handlebars';
import vituum from 'vituum';


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
		}),
		imageOptimizer({
			resolutions:[
				'iPhone 6',
				{name:'iPhone 15 Pro', width:430, height:930, deviceScaleFactor:3},
				{name:'fullhd', width: 1920, height: 1080, deviceScaleFactor:1},
				{name:'Macbook Pro 16" 2023', width:3456 , height: 2304, deviceScaleFactor:1}
			],
			quality: 80
		})
	],
	build: {
        rollupOptions: {
            input: ['src/pages/*.html','src/pages/*.hbs']
        }
    }
});
