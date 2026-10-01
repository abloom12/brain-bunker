// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Brain Bunker',
			// Let Starlight discover pages; middleware scopes navigation to each section.
			routeMiddleware: './src/routeData.ts',
		}),
	],
});
