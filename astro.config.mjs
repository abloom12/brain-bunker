// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Brain Bunker',
			sidebar: [
				{
					label: 'Recipes',
					items: [
						{ label: 'Overview', slug: 'recipes' },
						{ label: 'Generate an SSH key', slug: 'recipes/generate-ssh-key' },
					],
				},
				{
					label: 'Stack',
					items: [
						{ label: 'Overview', slug: 'stack' },
						{ label: 'Better Auth', slug: 'stack/better-auth' },
						{ label: 'Expo', slug: 'stack/expo' },
						{ label: 'Fastify', slug: 'stack/fastify' },
						{ label: 'Git', slug: 'stack/git' },
						{ label: 'JavaScript', slug: 'stack/javascript' },
						{ label: 'Node.js', slug: 'stack/nodejs' },
						{ label: 'React', slug: 'stack/react' },
						{ label: 'React Native', slug: 'stack/react-native' },
						{ label: 'TanStack', slug: 'stack/tanstack' },
						{ label: 'tRPC', slug: 'stack/trpc' },
						{ label: 'TypeScript', slug: 'stack/typescript' },
					],
				},
			],
		}),
	],
});
